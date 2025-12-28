import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import { config } from "./config.js";

const API_BASE = `https://api.telegram.org/bot${config.TELEGRAM_TOKEN}`;

export async function sendMessage(chatId, text, options = {}) {
  await axios.post(`${API_BASE}/sendMessage`, {
    chat_id: chatId,
    text: text,
    parse_mode: "HTML",
    ...options
  });
}

export async function downloadVoice(fileId) {
  // Get file path
  const fileInfo = await axios.get(`${API_BASE}/getFile?file_id=${fileId}`);
  const filePath = fileInfo.data.result.file_path;
  const audioUrl = `https://api.telegram.org/file/bot${config.TELEGRAM_TOKEN}/${filePath}`;

  // Download audio
  const audio = await axios.get(audioUrl, { responseType: "arraybuffer" });
  const tempFile = process.platform === "win32" ? "voice.ogg" : "/tmp/voice.ogg";
  fs.writeFileSync(tempFile, audio.data);

  return tempFile;
}

export async function transcribeAudio(filePath) {
  const form = new FormData();
  form.append("file", fs.createReadStream(filePath));
  form.append("model", "whisper-1");

  const response = await axios.post(
    "https://api.openai.com/v1/audio/transcriptions",
    form,
    {
      headers: {
        Authorization: `Bearer ${config.OPENAI_KEY}`,
        ...form.getHeaders(),
      },
    }
  );

  return response.data.text;
}
