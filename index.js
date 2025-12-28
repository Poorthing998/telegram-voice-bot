import express from "express";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const OPENAI_KEY = process.env.OPENAI_KEY;

// Health check
app.get("/", (req, res) => {
  res.send("Bot is running!");
});

// Format text using GPT-4o-mini
async function formatText(rawText) {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a text formatter. Your ONLY job is to restructure spoken text into clean formatted text.

STRICT FORMATTING RULES:

1. SEQUENTIAL ACTIONS/STEPS → ALWAYS use numbered list
   Example input: "First I need to do X, then Y, finally Z"
   Example output:
   1. Do X
   2. Do Y
   3. Do Z

2. MULTIPLE IDEAS/POINTS → ALWAYS use bullet points
   Example input: "I was thinking about the weather and also my vacation plans and maybe dinner"
   Example output:
   • Weather considerations
   • Vacation plans
   • Dinner ideas

3. SINGLE THOUGHT → Clean paragraph (no list needed)

ALSO:
- Remove filler words (um, uh, like, you know, so, basically, actually)
- Fix grammar and punctuation
- Keep original meaning
- Be concise

OUTPUT ONLY THE FORMATTED TEXT. No explanations. No "Here's the formatted version:". Just the clean text.`
        },
        {
          role: "user",
          content: rawText
        }
      ],
      max_tokens: 1000,
      temperature: 0.3
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.choices[0].message.content;
}

// Telegram webhook
app.post("/webhook", async (req, res) => {
  try {
    console.log("Received update:", JSON.stringify(req.body, null, 2));

    const voice = req.body.message?.voice;
    const chatId = req.body.message?.chat?.id;

    if (!voice) {
      console.log("No voice message found");
      return res.sendStatus(200);
    }

    console.log("Voice message received, file_id:", voice.file_id);

    // 1. Get file path from Telegram
    const fileInfo = await axios.get(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/getFile?file_id=${voice.file_id}`
    );

    const filePath = fileInfo.data.result.file_path;
    const audioUrl = `https://api.telegram.org/file/bot${TELEGRAM_TOKEN}/${filePath}`;
    console.log("Audio URL:", audioUrl);

    // 2. Download audio
    const audio = await axios.get(audioUrl, { responseType: "arraybuffer" });
    const tempFile = process.platform === "win32" ? "voice.ogg" : "/tmp/voice.ogg";
    fs.writeFileSync(tempFile, audio.data);
    console.log("Audio downloaded");

    // 3. Transcribe audio using Whisper
    const form = new FormData();
    form.append("file", fs.createReadStream(tempFile));
    form.append("model", "whisper-1");

    const transcript = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      form,
      {
        headers: {
          Authorization: `Bearer ${OPENAI_KEY}`,
          ...form.getHeaders(),
        },
      }
    );

    const rawText = transcript.data.text;
    console.log("Raw transcription:", rawText);

    // 4. Format the text
    const formattedText = await formatText(rawText);
    console.log("Formatted text:", formattedText);

    // 5. Send back to Telegram
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        chat_id: chatId,
        text: formattedText
      }
    );

    console.log("Message sent back to user");
    res.sendStatus(200);
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    
    try {
      const chatId = req.body.message?.chat?.id;
      if (chatId) {
        await axios.post(
          `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
          {
            chat_id: chatId,
            text: "Sorry, I couldn't process that voice message. Please try again."
          }
        );
      }
    } catch (e) {}
    
    res.sendStatus(200);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));