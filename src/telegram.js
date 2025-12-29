import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import { config } from "./config.js";

const API_BASE = `https://api.telegram.org/bot${config.TELEGRAM_TOKEN}`;

// Send message with optional inline keyboard
export async function sendMessage(chatId, text, keyboard = null) {
  const payload = {
    chat_id: chatId,
    text: text,
    parse_mode: "HTML"
  };
  
  if (keyboard) {
    payload.reply_markup = { inline_keyboard: keyboard };
  }
  
  await axios.post(`${API_BASE}/sendMessage`, payload);
}

// Edit message (for updating after button click)
export async function editMessage(chatId, messageId, text, keyboard = null) {
  const payload = {
    chat_id: chatId,
    message_id: messageId,
    text: text,
    parse_mode: "HTML"
  };
  
  if (keyboard) {
    payload.reply_markup = { inline_keyboard: keyboard };
  }
  
  try {
    await axios.post(`${API_BASE}/editMessageText`, payload);
  } catch (e) {
    // Message might be the same, ignore error
  }
}

// Answer callback query (removes loading state from button)
export async function answerCallback(callbackId, text = "") {
  await axios.post(`${API_BASE}/answerCallbackQuery`, {
    callback_query_id: callbackId,
    text: text
  });
}

// Download voice file
export async function downloadVoice(fileId) {
  const fileInfo = await axios.get(`${API_BASE}/getFile?file_id=${fileId}`);
  const filePath = fileInfo.data.result.file_path;
  const audioUrl = `https://api.telegram.org/file/bot${config.TELEGRAM_TOKEN}/${filePath}`;
  
  const audio = await axios.get(audioUrl, { responseType: "arraybuffer" });
  const tempFile = process.platform === "win32" ? "voice.ogg" : "/tmp/voice.ogg";
  fs.writeFileSync(tempFile, audio.data);
  
  return tempFile;
}

// Transcribe audio with Whisper
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
