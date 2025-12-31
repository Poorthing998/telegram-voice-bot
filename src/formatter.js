import axios from "axios";
import { config } from "./config.js";

// Language output instructions
const LANGUAGE_INSTRUCTIONS = {
  en: "OUTPUT MUST BE IN ENGLISH ONLY. Do not use any other language.",
  fa: "OUTPUT MUST BE IN PERSIAN (FARSI) ONLY. Use Persian script. Do not use any other language.",
  es: "OUTPUT MUST BE IN SPANISH ONLY. Do not use any other language.",
  de: "OUTPUT MUST BE IN GERMAN ONLY. Do not use any other language.",
  fr: "OUTPUT MUST BE IN FRENCH ONLY. Do not use any other language.",
  ar: "OUTPUT MUST BE IN ARABIC ONLY. Use Arabic script. Do not use any other language.",
  tr: "OUTPUT MUST BE IN TURKISH ONLY. Do not use any other language.",
  ru: "OUTPUT MUST BE IN RUSSIAN ONLY. Use Cyrillic script. Do not use any other language.",
  zh: "OUTPUT MUST BE IN SIMPLIFIED CHINESE ONLY. Use Chinese characters. Do not use any other language."
};

// Output type specific instructions
const OUTPUT_INSTRUCTIONS = {
  general: `Format as clean, well-structured text. Use numbered lists for steps, bullet points for multiple items, clean paragraphs for single thoughts.`,
  email: `Format as a professional email with greeting, clear body paragraphs, and professional sign-off.`,
  summary: `Create a concise summary with key points as bullet points. Keep it brief and scannable.`,
  notes: `Format as organized notes with bullet points for ideas and key insights.`,
  todo: `Format as a to-do list with each task on its own line. Clear, actionable items.`,
  message: `Format as a chat message. Keep it conversational with short paragraphs.`
};

// Tone instructions
const TONE_INSTRUCTIONS = {
  professional: "Use professional, business-appropriate language. Avoid slang.",
  casual: "Use relaxed, everyday language. Be conversational.",
  friendly: "Use warm, approachable language. Be personable.",
  formal: "Use formal language. Proper grammar, no contractions.",
  concise: "Be extremely brief. Cut unnecessary words."
};

/**
 * Call OpenAI API with correct parameters for GPT-5 models
 */
async function callOpenAI(systemPrompt, userContent) {
  console.log("=== OpenAI API Call ===");
  console.log("Model:", config.AI_MODEL);
  
  // GPT-5 models require max_completion_tokens, NOT max_tokens
  const requestBody = {
    model: config.AI_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userContent }
    ],
    max_completion_tokens: 2000  // CORRECT parameter for GPT-5 models
  };
  
  console.log("Request body:", JSON.stringify(requestBody, null, 2));
  
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
  
  console.log("Response status:", response.status);
  console.log("Response data:", JSON.stringify(response.data, null, 2));
  
  const content = response.data?.choices?.[0]?.message?.content;
  
  if (!content || content.trim() === '') {
    console.error("ERROR: Empty response from OpenAI");
    throw new Error("AI returned empty response");
  }
  
  return content;
}

/**
 * Process text based on user's processing mode
 */
export async function formatText(rawText, preferences) {
  const { language, processingMode, outputType, tone } = preferences;
  
  console.log("\n========== FORMAT TEXT ==========");
  console.log("Mode:", processingMode);
  console.log("Language:", language);
  console.log("Output type:", outputType);
  console.log("Tone:", tone);
  
  if (!rawText || rawText.trim() === '') {
    return "[No speech detected]";
  }
  
  // MODE 1: DIRECT - Raw transcription, no AI
  if (processingMode === 'direct') {
    console.log("→ DIRECT: returning raw transcription");
    return rawText;
  }
  
  // MODE 2: LIGHT - Basic cleanup only
  if (processingMode === 'light') {
    console.log("→ LIGHT: basic cleanup");
    
    const prompt = `Clean up this spoken text lightly.

${LANGUAGE_INSTRUCTIONS[language] || LANGUAGE_INSTRUCTIONS.en}

Rules:
- Remove filler words (um, uh, like, you know)
- Fix grammar and punctuation
- Keep original structure and meaning
- Do NOT add formatting or change tone

Output only the cleaned text.`;

    try {
      return await callOpenAI(prompt, rawText);
    } catch (err) {
      console.error("LIGHT ERROR:", err.response?.data || err.message);
      return `⚠️ Processing error:\n\n${rawText}`;
    }
  }
  
  // MODE 3: ENHANCED - Full AI formatting
  console.log("→ ENHANCED: full AI formatting");
  
  const prompt = `You are a voice-to-text formatter. Transform spoken text into polished, formatted content.

${LANGUAGE_INSTRUCTIONS[language] || LANGUAGE_INSTRUCTIONS.en}

OUTPUT FORMAT (${outputType}):
${OUTPUT_INSTRUCTIONS[outputType] || OUTPUT_INSTRUCTIONS.general}

TONE (${tone}):
${TONE_INSTRUCTIONS[tone] || TONE_INSTRUCTIONS.professional}

INSTRUCTIONS:
- Remove ALL filler words
- Fix all grammar and punctuation
- If user describes wanting an email → write a complete professional email
- If user describes a to-do → format as proper task list
- Apply the specified format and tone strictly

Output only the final formatted text. No explanations.`;

  try {
    return await callOpenAI(prompt, rawText);
  } catch (err) {
    console.error("ENHANCED ERROR:", err.response?.data || err.message);
    return `⚠️ AI formatting failed:\n\n${rawText}`;
  }
}
