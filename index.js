import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { config } from "./src/config.js";
import { getUser, addMessages, useMessage, canUseBot, isVIP } from "./src/database.js";
import { checkPayment } from "./src/payment.js";
import { formatText } from "./src/formatter.js";
import { sendMessage, downloadVoice, transcribeAudio } from "./src/telegram.js";

const app = express();
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Bot is running!");
});

// Handle commands
async function handleCommand(chatId, text, userId, username) {
  const user = getUser(chatId);
  const command = text.toLowerCase().trim();

  if (command === "/start") {
    await sendMessage(chatId,
      `🎙 <b>Voice to Text Bot</b>\n\n` +
      `Send me a voice message and I'll convert it to clean, formatted text.\n\n` +
      `✨ <b>Free trial:</b> ${config.FREE_USES} voice messages\n` +
      `💎 <b>Premium:</b> ${config.MESSAGE_LIMIT} messages for ${config.PAYMENT_AMOUNT} USDT\n\n` +
      `Commands:\n` +
      `/status - Check your usage\n` +
      `/pay - Get payment instructions\n` +
      `/verify - Verify your payment`
    );
    return true;
  }

  if (command === "/status") {
    const status = canUseBot(chatId, config.FREE_USES, userId, username, config.VIP_USERS);
    if (status.isVIP) {
      await sendMessage(chatId,
        `👑 <b>VIP Status</b>\n\n` +
        `You have unlimited free access!`
      );
    } else if (user.isPaid) {
      await sendMessage(chatId,
        `📊 <b>Your Status</b>\n\n` +
        `Plan: Premium ✅\n` +
        `Messages remaining: ${user.messagesRemaining}\n` +
        `Total used: ${user.usageCount}`
      );
    } else {
      const remaining = Math.max(0, config.FREE_USES - user.usageCount);
      await sendMessage(chatId,
        `📊 <b>Your Status</b>\n\n` +
        `Plan: Free Trial\n` +
        `Used: ${user.usageCount}/${config.FREE_USES}\n` +
        `Remaining: ${remaining}\n\n` +
        `${remaining === 0 ? "⚠️ Free trial ended. Use /pay to continue." : ""}`
      );
    }
    return true;
  }

  if (command === "/pay") {
    await sendMessage(chatId,
      `💳 <b>Payment Instructions</b>\n\n` +
      `Send exactly <b>${config.PAYMENT_AMOUNT} USDT</b> (TRC20) to:\n\n` +
      `<code>${config.TRON_WALLET}</code>\n\n` +
      `You'll get: <b>${config.MESSAGE_LIMIT} messages</b>\n\n` +
      `⚠️ <b>Important:</b>\n` +
      `• Use TRON network (TRC20) only\n` +
      `• After sending, use /verify YOUR_TRON_ADDRESS\n\n` +
      `Example:\n` +
      `<code>/verify TXyz123abc...</code>`
    );
    return true;
  }

  if (command.startsWith("/verify")) {
    const parts = text.split(" ");
    if (parts.length < 2) {
      await sendMessage(chatId,
        `❌ Please provide your TRON wallet address.\n\n` +
        `Example:\n<code>/verify TXyz123abc...</code>`
      );
      return true;
    }

    const userWallet = parts[1].trim();
    await sendMessage(chatId, `🔍 Checking payment from ${userWallet}...`);

    const payment = await checkPayment(userWallet);

    if (payment.found) {
      addMessages(chatId, config.MESSAGE_LIMIT);
      await sendMessage(chatId,
        `✅ <b>Payment Verified!</b>\n\n` +
        `Amount: ${payment.amount} USDT\n` +
        `TX: <code>${payment.txId}</code>\n\n` +
        `🎉 You now have ${config.MESSAGE_LIMIT} messages!\n` +
        `Send a voice message to try it.`
      );
    } else {
      await sendMessage(chatId,
        `❌ <b>Payment not found</b>\n\n` +
        `Please make sure:\n` +
        `• You sent ${config.PAYMENT_AMOUNT} USDT (TRC20)\n` +
        `• You sent to: <code>${config.TRON_WALLET}</code>\n` +
        `• Transaction is confirmed (wait 1-2 min)\n\n` +
        `Try /verify again after confirmation.`
      );
    }
    return true;
  }

  return false;
}

// Webhook endpoint
app.post("/webhook", async (req, res) => {
  try {
    console.log("Update:", JSON.stringify(req.body, null, 2));

    const message = req.body.message;
    if (!message) return res.sendStatus(200);

    const chatId = message.chat?.id;
    const userId = message.from?.id;
    const username = message.from?.username;
    
    if (!chatId) return res.sendStatus(200);

    // Handle text commands
    if (message.text) {
      const handled = await handleCommand(chatId, message.text, userId, username);
      if (handled) return res.sendStatus(200);
    }

    // Handle voice messages
    const voice = message.voice;
    if (!voice) return res.sendStatus(200);

    // Check if user can use bot
    const status = canUseBot(chatId, config.FREE_USES, userId, username, config.VIP_USERS);
    if (!status.allowed) {
      await sendMessage(chatId,
        `⚠️ <b>No messages remaining</b>\n\n` +
        `Get ${config.MESSAGE_LIMIT} more messages for just <b>${config.PAYMENT_AMOUNT} USDT</b>\n\n` +
        `Use /pay to see payment instructions.`
      );
      return res.sendStatus(200);
    }

    // Process voice message
    console.log("Processing voice:", voice.file_id);

    const audioFile = await downloadVoice(voice.file_id);
    const rawText = await transcribeAudio(audioFile);
    console.log("Transcription:", rawText);

    const formattedText = await formatText(rawText);
    console.log("Formatted:", formattedText);

    // Update usage (skip for VIP)
    if (!status.isVIP) {
      useMessage(chatId);
    }
    
    const newStatus = canUseBot(chatId, config.FREE_USES, userId, username, config.VIP_USERS);

    // Add footer warning if low on messages (not for VIP)
    let footer = "";
    if (!newStatus.isVIP && newStatus.remaining <= 2 && newStatus.remaining > 0) {
      footer = `\n\n⚠️ ${newStatus.remaining} message${newStatus.remaining === 1 ? "" : "s"} remaining.`;
    }

    await sendMessage(chatId, formattedText + footer);
    res.sendStatus(200);

  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    try {
      const chatId = req.body.message?.chat?.id;
      if (chatId) {
        await sendMessage(chatId, "Sorry, I couldn't process that. Please try again.");
      }
    } catch (e) {}
    res.sendStatus(200);
  }
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
