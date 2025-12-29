import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { config } from "./src/config.js";
import { translations, t, getLanguageButtons } from "./src/translations.js";
import { 
  getUser, setUserPreference, isSetupComplete, completeSetup,
  getUserPreferences, addMessages, useMessage, canUseBot, isVIP 
} from "./src/database.js";
import { checkPayment } from "./src/payment.js";
import { formatText } from "./src/formatter.js";
import { sendMessage, editMessage, answerCallback, downloadVoice, transcribeAudio } from "./src/telegram.js";

const app = express();
app.use(express.json());

// Health check
app.get("/", (req, res) => res.send("Voxly Bot is running!"));

// ============ KEYBOARD BUILDERS ============

function buildLanguageKeyboard() {
  const languages = getLanguageButtons();
  const rows = [];
  
  // 2 buttons per row
  for (let i = 0; i < languages.length; i += 2) {
    const row = languages.slice(i, i + 2).map(lang => ({
      text: `${lang.flag} ${lang.name}`,
      callback_data: `lang_${lang.code}`
    }));
    rows.push(row);
  }
  
  return rows;
}

function buildOutputKeyboard(lang) {
  const outputTypes = config.OUTPUT_TYPES;
  const labels = t(lang, 'output_types');
  
  return outputTypes.map(type => ([{
    text: labels[type] || type,
    callback_data: `output_${type}`
  }]));
}

function buildToneKeyboard(lang) {
  const tones = config.TONES;
  const labels = t(lang, 'tones');
  
  return tones.map(tone => ([{
    text: labels[tone] || tone,
    callback_data: `tone_${tone}`
  }]));
}

// ============ COMMAND HANDLERS ============

async function handleStart(chatId) {
  const user = getUser(chatId);
  
  // Always show language selection on /start
  user.awaitingSetup = 'language';
  user.setupComplete = false;
  
  await sendMessage(
    chatId,
    "🎙 <b>Welcome to Voxly!</b>\n\nTurn your voice into perfectly formatted text.\n\nPlease select your language:",
    buildLanguageKeyboard()
  );
}

async function handleLanguageCommand(chatId) {
  const user = getUser(chatId);
  const lang = user.language || 'en';
  
  await sendMessage(
    chatId,
    t(lang, 'welcome'),
    buildLanguageKeyboard()
  );
}

async function handleOutputCommand(chatId) {
  const user = getUser(chatId);
  const lang = user.language || 'en';
  
  await sendMessage(
    chatId,
    t(lang, 'select_output'),
    buildOutputKeyboard(lang)
  );
}

async function handleToneCommand(chatId) {
  const user = getUser(chatId);
  const lang = user.language || 'en';
  
  await sendMessage(
    chatId,
    t(lang, 'select_tone'),
    buildToneKeyboard(lang)
  );
}

async function handleSettingsCommand(chatId, userId, username) {
  const user = getUser(chatId);
  const lang = user.language || 'en';
  const prefs = getUserPreferences(chatId);
  
  const langName = translations[prefs.language]?.name || prefs.language;
  const outputName = t(lang, `output_types.${prefs.outputType}`) || prefs.outputType;
  const toneName = t(lang, `tones.${prefs.tone}`) || prefs.tone;
  
  await sendMessage(
    chatId,
    t(lang, 'current_settings', {
      language: langName,
      output: outputName,
      tone: toneName
    })
  );
}

async function handleStatusCommand(chatId, userId, username) {
  const user = getUser(chatId);
  const lang = user.language || 'en';
  const status = canUseBot(chatId, config.FREE_USES, userId, username, config.VIP_USERS);
  
  if (status.isVIP) {
    await sendMessage(chatId, t(lang, 'status_vip'));
  } else if (user.isPaid) {
    await sendMessage(chatId, t(lang, 'status_premium', {
      remaining: user.messagesRemaining,
      used: user.usageCount
    }));
  } else {
    const remaining = Math.max(0, config.FREE_USES - user.usageCount);
    let msg = t(lang, 'status_trial', {
      used: user.usageCount,
      total: config.FREE_USES,
      remaining: remaining
    });
    if (remaining === 0) {
      msg += t(lang, 'trial_ended');
    }
    await sendMessage(chatId, msg);
  }
}

async function handlePayCommand(chatId) {
  const user = getUser(chatId);
  const lang = user.language || 'en';
  
  await sendMessage(chatId, t(lang, 'pay_instructions', {
    amount: config.PAYMENT_AMOUNT,
    wallet: config.TRON_WALLET,
    messages: config.MESSAGE_LIMIT
  }));
}

async function handleVerifyCommand(chatId, text) {
  const user = getUser(chatId);
  const lang = user.language || 'en';
  
  const parts = text.split(" ");
  if (parts.length < 2) {
    await sendMessage(chatId, t(lang, 'verify_prompt'));
    return;
  }
  
  const userWallet = parts[1].trim();
  await sendMessage(chatId, t(lang, 'verify_checking'));
  
  const payment = await checkPayment(userWallet);
  
  if (payment.found) {
    addMessages(chatId, config.MESSAGE_LIMIT);
    await sendMessage(chatId, t(lang, 'verify_success', {
      amount: payment.amount,
      tx: payment.txId,
      messages: config.MESSAGE_LIMIT
    }));
  } else {
    await sendMessage(chatId, t(lang, 'verify_failed', {
      amount: config.PAYMENT_AMOUNT,
      wallet: config.TRON_WALLET
    }));
  }
}

// ============ CALLBACK HANDLER ============

async function handleCallback(callbackQuery) {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const data = callbackQuery.data;
  const callbackId = callbackQuery.id;
  
  const user = getUser(chatId);
  
  // Handle language selection
  if (data.startsWith('lang_')) {
    const langCode = data.replace('lang_', '');
    setUserPreference(chatId, 'language', langCode);
    
    await answerCallback(callbackId, t(langCode, 'language_set'));
    
    // Show output type selection
    await editMessage(
      chatId,
      messageId,
      t(langCode, 'select_output'),
      buildOutputKeyboard(langCode)
    );
    return;
  }
  
  // Handle output type selection
  if (data.startsWith('output_')) {
    const outputType = data.replace('output_', '');
    const lang = user.language || 'en';
    setUserPreference(chatId, 'outputType', outputType);
    
    const outputName = t(lang, `output_types.${outputType}`);
    await answerCallback(callbackId, t(lang, 'output_set') + outputName);
    
    // Show tone selection
    await editMessage(
      chatId,
      messageId,
      t(lang, 'select_tone'),
      buildToneKeyboard(lang)
    );
    return;
  }
  
  // Handle tone selection
  if (data.startsWith('tone_')) {
    const tone = data.replace('tone_', '');
    const lang = user.language || 'en';
    setUserPreference(chatId, 'tone', tone);
    completeSetup(chatId);
    
    const toneName = t(lang, `tones.${tone}`);
    await answerCallback(callbackId, t(lang, 'tone_set') + toneName);
    
    // Show setup complete message
    await editMessage(
      chatId,
      messageId,
      t(lang, 'setup_complete'),
      null
    );
    return;
  }
  
  await answerCallback(callbackId);
}

// ============ VOICE MESSAGE HANDLER ============

async function handleVoice(chatId, voice, userId, username) {
  const user = getUser(chatId);
  const lang = user.language || 'en';
  
  // Check if setup is complete
  if (!isSetupComplete(chatId)) {
    // Set defaults and continue
    if (!user.language) setUserPreference(chatId, 'language', 'en');
    if (!user.outputType) setUserPreference(chatId, 'outputType', 'general');
    if (!user.tone) setUserPreference(chatId, 'tone', 'professional');
    completeSetup(chatId);
  }
  
  // Check usage limits
  const status = canUseBot(chatId, config.FREE_USES, userId, username, config.VIP_USERS);
  if (!status.allowed) {
    await sendMessage(chatId, t(lang, 'no_messages', {
      messages: config.MESSAGE_LIMIT,
      amount: config.PAYMENT_AMOUNT
    }));
    return;
  }
  
  // Process voice
  console.log("Processing voice:", voice.file_id);
  
  const audioFile = await downloadVoice(voice.file_id);
  const rawText = await transcribeAudio(audioFile);
  console.log("Transcription:", rawText);
  
  const preferences = getUserPreferences(chatId);
  const formattedText = await formatText(rawText, preferences);
  console.log("Formatted:", formattedText);
  
  // Update usage (skip for VIP)
  if (!status.isVIP) {
    useMessage(chatId);
  }
  
  // Check remaining messages
  const newStatus = canUseBot(chatId, config.FREE_USES, userId, username, config.VIP_USERS);
  let footer = "";
  if (!newStatus.isVIP && newStatus.remaining <= 2 && newStatus.remaining > 0) {
    footer = t(lang, 'messages_remaining', { count: newStatus.remaining });
  }
  
  await sendMessage(chatId, formattedText + footer);
}

// ============ MAIN WEBHOOK ============

app.post("/webhook", async (req, res) => {
  try {
    console.log("Update:", JSON.stringify(req.body, null, 2));
    
    // Handle callback queries (button clicks)
    if (req.body.callback_query) {
      await handleCallback(req.body.callback_query);
      return res.sendStatus(200);
    }
    
    const message = req.body.message;
    if (!message) return res.sendStatus(200);
    
    const chatId = message.chat?.id;
    const userId = message.from?.id;
    const username = message.from?.username;
    
    if (!chatId) return res.sendStatus(200);
    
    // Handle text commands
    if (message.text) {
      const cmd = message.text.toLowerCase().trim();
      
      if (cmd === "/start") {
        await handleStart(chatId);
        return res.sendStatus(200);
      }
      
      if (cmd === "/language") {
        await handleLanguageCommand(chatId);
        return res.sendStatus(200);
      }
      
      if (cmd === "/output") {
        await handleOutputCommand(chatId);
        return res.sendStatus(200);
      }
      
      if (cmd === "/tone") {
        await handleToneCommand(chatId);
        return res.sendStatus(200);
      }
      
      if (cmd === "/settings") {
        await handleSettingsCommand(chatId, userId, username);
        return res.sendStatus(200);
      }
      
      if (cmd === "/status") {
        await handleStatusCommand(chatId, userId, username);
        return res.sendStatus(200);
      }
      
      if (cmd === "/pay") {
        await handlePayCommand(chatId);
        return res.sendStatus(200);
      }
      
      if (cmd.startsWith("/verify")) {
        await handleVerifyCommand(chatId, message.text);
        return res.sendStatus(200);
      }
    }
    
    // Handle voice messages
    if (message.voice) {
      await handleVoice(chatId, message.voice, userId, username);
      return res.sendStatus(200);
    }
    
    res.sendStatus(200);
    
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    
    try {
      const chatId = req.body.message?.chat?.id || req.body.callback_query?.message?.chat?.id;
      if (chatId) {
        const user = getUser(chatId);
        const lang = user.language || 'en';
        await sendMessage(chatId, t(lang, 'error'));
      }
    } catch (e) {}
    
    res.sendStatus(200);
  }
});

app.listen(config.PORT, () => {
  console.log(`Voxly Bot running on port ${config.PORT}`);
});
