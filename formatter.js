import axios from "axios";
import { config } from "./config.js";

// Language instructions
const LANGUAGE_INSTRUCTIONS = {
  en: "Respond in English only.",
  fa: "Respond in Persian (Farsi) only. Use Persian script.",
  es: "Respond in Spanish only.",
  de: "Respond in German only.",
  fr: "Respond in French only.",
  ar: "Respond in Arabic only. Use Arabic script.",
  tr: "Respond in Turkish only.",
  ru: "Respond in Russian only. Use Cyrillic script.",
  zh: "Respond in Simplified Chinese only."
};

// Tone instructions - ONLY for email
const TONE_INSTRUCTIONS = {
  professional: "Professional business tone.",
  casual: "Casual, relaxed tone.",
  friendly: "Warm, friendly tone.",
  formal: "Very formal tone."
};

/**
 * Call OpenAI API with retry logic
 */
async function callOpenAI(systemPrompt, userContent, retries = 2) {
  console.log("=== OpenAI API Call ===");
  console.log("Model:", config.AI_MODEL);
  
  const requestBody = {
    model: config.AI_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userContent }
    ],
    max_tokens: 2000
  };
  
  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${retries + 1}`);
      
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${config.OPENAI_KEY}`,
            "Content-Type": "application/json"
          },
          timeout: 60000
        }
      );
      
      const content = response.data?.choices?.[0]?.message?.content;
      
      if (!content || content.trim() === '') {
        if (attempt <= retries) {
          await new Promise(r => setTimeout(r, 1000));
          continue;
        }
        throw new Error("AI returned empty response");
      }
      
      return content;
      
    } catch (err) {
      console.error(`Attempt ${attempt} error:`, err.response?.data || err.message);
      if (attempt <= retries) {
        await new Promise(r => setTimeout(r, 1000));
        continue;
      }
      throw err;
    }
  }
}

/**
 * Process text based on user's processing mode
 */
export async function formatText(rawText, preferences) {
  const { language, processingMode, outputType, tone } = preferences;
  
  console.log("\n========== FORMAT TEXT ==========");
  console.log("Mode:", processingMode);
  console.log("Output type:", outputType);
  console.log("Tone:", tone);
  console.log("Language:", language);
  
  if (!rawText || rawText.trim() === '') {
    return "[No speech detected]";
  }
  
  const langInstruction = LANGUAGE_INSTRUCTIONS[language] || LANGUAGE_INSTRUCTIONS.en;
  
  // ══════════════════════════════════════════════════════════════
  // MODE 1: DIRECT - Return EXACTLY what was transcribed
  // No AI processing at all. Zero changes.
  // ══════════════════════════════════════════════════════════════
  if (processingMode === 'direct') {
    console.log("→ DIRECT: returning exact transcription (no AI)");
    return rawText;
  }
  
  // ══════════════════════════════════════════════════════════════
  // MODE 2: LIGHT - Minimal cleanup only
  // Only fix filler words and grammar. NO formatting changes.
  // ══════════════════════════════════════════════════════════════
  if (processingMode === 'light') {
    console.log("→ LIGHT: minimal cleanup only");
    
    const prompt = `You are a text cleaner. Your ONLY job is to lightly clean spoken text.

${langInstruction}

STRICT RULES:
1. Remove filler words: um, uh, like, you know, basically, actually, I mean, so yeah
2. Fix grammar mistakes
3. Fix punctuation
4. Keep sentences in the same order
5. Keep the same paragraph structure

FORBIDDEN - DO NOT DO THESE:
❌ Do NOT add bullet points
❌ Do NOT add numbered lists
❌ Do NOT add headers or titles
❌ Do NOT reorganize or restructure
❌ Do NOT summarize or shorten
❌ Do NOT add any formatting
❌ Do NOT answer questions - just clean the text
❌ Do NOT change the meaning or add information

The output should look almost identical to the input, just cleaner.

Output ONLY the cleaned text. Nothing else.`;

    try {
      return await callOpenAI(prompt, rawText);
    } catch (err) {
      console.error("LIGHT ERROR:", err.message);
      return rawText; // Fallback to raw
    }
  }
  
  // ══════════════════════════════════════════════════════════════
  // MODE 3: AI_CHAT - Answer the user's question
  // Treat the transcription as a prompt and respond to it
  // ══════════════════════════════════════════════════════════════
  if (processingMode === 'ai_chat') {
    console.log("→ AI_CHAT: answering as AI assistant");
    
    const prompt = `You are a helpful AI assistant. The user has spoken a question or request to you via voice.

${langInstruction}

Your job: Understand what they're asking and provide a helpful, direct answer.

Be concise but complete. Answer the question directly.`;

    try {
      return await callOpenAI(prompt, rawText);
    } catch (err) {
      console.error("AI_CHAT ERROR:", err.message);
      return `⚠️ Could not process your question:\n\n${rawText}`;
    }
  }
  
  // ══════════════════════════════════════════════════════════════
  // MODE 4: ENHANCED - Format into specific output type
  // STRICTLY follow the chosen format no matter what
  // ══════════════════════════════════════════════════════════════
  console.log("→ ENHANCED: formatting as", outputType);
  
  let prompt;
  
  // ---------- EMAIL ----------
  if (outputType === 'email') {
    const toneInstruction = TONE_INSTRUCTIONS[tone] || TONE_INSTRUCTIONS.professional;
    
    prompt = `You are an email writer. Convert the user's spoken text into a properly formatted email.

${langInstruction}
Tone: ${toneInstruction}

YOUR OUTPUT MUST BE AN EMAIL. No exceptions.

Email format:
- Start with a greeting (Dear..., Hi..., Hello...)
- Body paragraphs with the message
- End with a sign-off (Best regards, Thanks, Sincerely, etc.)
- Signature line

STRICT RULES:
✓ ALWAYS output an email, even if the input seems weird
✓ Extract the intent and write it as an email
✓ If they mention a recipient, use that name
✓ If no recipient mentioned, use a generic greeting
✓ Clean up filler words and make it professional
✓ The entire output must be email format

DO NOT:
❌ Output bullet points
❌ Output notes or summaries
❌ Add explanations like "Here's your email:"
❌ Output anything except the email itself

Output ONLY the email. Start directly with the greeting.`;
  }
  
  // ---------- SUMMARY ----------
  else if (outputType === 'summary') {
    prompt = `You are a summarizer. Convert the user's spoken text into a concise summary.

${langInstruction}

YOUR OUTPUT MUST BE A SUMMARY.

Format:
- Start with a one-sentence overview
- Use bullet points for key points (3-7 bullets)
- Keep each bullet brief (one line)

STRICT RULES:
✓ ALWAYS output a summary format
✓ Extract the main points
✓ Be concise - shorter than the original
✓ Use bullet points for the key points

DO NOT:
❌ Write full paragraphs
❌ Write an email
❌ Answer questions - summarize what was said
❌ Add "Summary:" header

Output ONLY the summary.`;
  }
  
  // ---------- NOTES ----------
  else if (outputType === 'notes') {
    prompt = `You are a note-taker. Convert the user's spoken text into organized notes.

${langInstruction}

YOUR OUTPUT MUST BE NOTES FORMAT.

Format:
- Use bullet points for each idea or point
- Group related items together
- Keep bullets concise
- Use sub-bullets if needed for details

STRICT RULES:
✓ ALWAYS output bullet-point notes
✓ Every piece of information becomes a bullet
✓ Organize logically
✓ Clean up the language

DO NOT:
❌ Write paragraphs
❌ Write an email
❌ Answer questions - just take notes on what was said
❌ Add "Notes:" header

Output ONLY the notes.`;
  }
  
  // ---------- TODO ----------
  else if (outputType === 'todo') {
    prompt = `You are a task list creator. Convert the user's spoken text into a to-do list.

${langInstruction}

YOUR OUTPUT MUST BE A TO-DO LIST.

Format:
- Each task on its own line
- Start each with "☐" or "- [ ]" or just "-"
- Make tasks actionable (start with verbs)
- Keep tasks clear and specific

STRICT RULES:
✓ ALWAYS output a task list
✓ Extract all action items mentioned
✓ If no clear tasks, convert statements into actionable items
✓ Number them if there's a sequence

DO NOT:
❌ Write paragraphs
❌ Write an email
❌ Add explanations
❌ Add "To-Do:" header

Output ONLY the task list.`;
  }
  
  // ---------- MESSAGE ----------
  else if (outputType === 'message') {
    prompt = `You are a message formatter. Convert the user's spoken text into a clean chat message.

${langInstruction}

YOUR OUTPUT MUST BE A CHAT MESSAGE.

Format:
- Short, conversational paragraphs
- Easy to read on mobile
- Friendly and direct
- No formal structure

STRICT RULES:
✓ ALWAYS output as a chat message
✓ Keep it conversational
✓ Remove filler words
✓ Fix grammar

DO NOT:
❌ Use bullet points
❌ Use formal email format
❌ Add structure or headers
❌ Answer the content - just format it

Output ONLY the message.`;
  }
  
  // ---------- GENERAL ----------
  else {
    prompt = `You are a text formatter. Clean up and format the user's spoken text.

${langInstruction}

YOUR OUTPUT MUST BE CLEAN, FORMATTED TEXT.

STRICT RULES:
✓ Remove all filler words
✓ Fix grammar and punctuation
✓ Use paragraphs for different topics
✓ Only use bullet points if listing multiple items
✓ Keep the original meaning and intent

DO NOT:
❌ Answer questions - just format what was said
❌ Add information not in the original
❌ Change the meaning
❌ Add headers or titles

Output ONLY the formatted text.`;
  }
  
  try {
    return await callOpenAI(prompt, rawText);
  } catch (err) {
    console.error("ENHANCED ERROR:", err.message);
    return `⚠️ Formatting failed:\n\n${rawText}`;
  }
}
