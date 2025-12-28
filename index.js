import express from "express";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import dotenv from "dotenv";

// Load .env file (for local development)
dotenv.config();

const app = express();
app.use(express.json());

// Environment variables (from .env locally, or Render dashboard in production)
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const OPENAI_KEY = process.env.OPENAI_KEY;

// Health check
app.get("/", (req, res) => {
  res.send("Bot is running!");
});

// Format text using GPT-4
async function formatText(rawText) {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You convert spoken voice notes into clean, well-structured text.

Rules:
- Remove filler words (um, uh, like, you know, so, basically)
- Fix grammar and punctuation
- Preserve original meaning
- If content contains steps or instructions → use numbered list
- If content contains multiple ideas or points → use bullet points
- If it's a single short thought → use a clean paragraph
- Keep it concise

Output only the final cleaned text. No explanations or preamble.`
        },
        {
          role: "user",
          content: rawText
        }
      ],
      max_tokens: 1000
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
        text: formattedText,
        parse_mode: "Markdown"
      }
    );

    console.log("Message sent back to user");
    res.sendStatus(200);
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    
    // Try to notify user of error
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