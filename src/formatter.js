import axios from "axios";
import { config } from "./config.js";

// Language output instructions
const LANGUAGE_INSTRUCTIONS = {
  en: "OUTPUT MUST BE IN ENGLISH ONLY.",
  fa: "OUTPUT MUST BE IN PERSIAN (FARSI) ONLY. Use Persian script.",
  es: "OUTPUT MUST BE IN SPANISH ONLY.",
  de: "OUTPUT MUST BE IN GERMAN ONLY.",
  fr: "OUTPUT MUST BE IN FRENCH ONLY.",
  ar: "OUTPUT MUST BE IN ARABIC ONLY. Use Arabic script.",
  tr: "OUTPUT MUST BE IN TURKISH ONLY.",
  ru: "OUTPUT MUST BE IN RUSSIAN ONLY. Use Cyrillic script.",
  zh: "OUTPUT MUST BE IN SIMPLIFIED CHINESE ONLY."
};

// Output type instructions
const OUTPUT_INSTRUCTIONS = {
  general: `Format as clean, well-structured text. Use numbered lists for steps, bullet points for multiple items.`,
  email: `Write a complete professional email with greeting, body paragraphs, and sign-off.`,
  summary: `Create a concise summary with bullet points for key ideas.`,
  notes: `Format as organized notes with bullet points.`,
  todo: `Format as a task list with each item on its own line.`,
  message: `Format as a conversational chat message.`
};

// Tone instructions
const TONE_INSTRUCTIONS = {
  professional: "Professional, business-appropriate language.",
  casual: "Relaxed, everyday conversational language.",
  friendly: "Warm, approachable language.",
  formal: "Formal language with proper grammar.",
  concise: "Extremely brief. Cut unnecessary words."
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
    max_tokens: 2000  // For non-reasoning models like gpt-4.1-nano
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
      
      console.log("Response status:", response.status);
      
      const content = response.data?.choices?.[0]?.message?.content;
      const finishReason = response.data?.choices?.[0]?.finish_reason;
      
      console.log("Finish reason:", finishReason);
      console.log("Content length:", content?.length || 0);
      
      // Check for empty content
      if (!content || content.trim() === '') {
        console.error("Empty content received!");
        
        if (attempt <= retries) {
          console.log("Retrying...");
          await new Promise(r => setTimeout(r, 1000)); // Wait 1 second
          continue;
        }
        throw new Error("AI returned empty response after retries");
      }
      
      return content;
      
    } catch (err) {
      console.error(`Attempt ${attempt} error:`, err.response?.data || err.message);
      
      if (attempt <= retries) {
        console.log("Retrying after error...");
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
  console.log("Language:", language);
  console.log("Output type:", outputType);
  console.log("Tone:", tone);
  console.log("Input length:", rawText?.length);
  
  if (!rawText || rawText.trim() === '') {
    return "[No speech detected]";
  }
  
  // MODE 1: DIRECT - Raw transcription only
  if (processingMode === 'direct') {
    console.log("→ DIRECT: returning raw transcription");
    return rawText;
  }
  
  // MODE 2: LIGHT - Basic cleanup
  if (processingMode === 'light') {
    console.log("→ LIGHT: basic cleanup");
    
    const prompt = `Clean up this spoken text. ${LANGUAGE_INSTRUCTIONS[language] || LANGUAGE_INSTRUCTIONS.en}

Rules:
- Remove filler words (um, uh, like, you know)
- Fix grammar and punctuation
- Keep original structure and meaning
- Do NOT add formatting or bullet points

Output only the cleaned text, nothing else.`;

    try {
      return await callOpenAI(prompt, rawText);
    } catch (err) {
      console.error("LIGHT ERROR:", err.message);
      return `⚠️ Processing error:\n\n${rawText}`;
    }
  }
  
  // MODE 3: ENHANCED - Full AI formatting
  console.log("→ ENHANCED: full formatting");
  
  const prompt = `Transform this spoken text into polished content.

${LANGUAGE_INSTRUCTIONS[language] || LANGUAGE_INSTRUCTIONS.en}

FORMAT: ${OUTPUT_INSTRUCTIONS[outputType] || OUTPUT_INSTRUCTIONS.general}

TONE: ${TONE_INSTRUCTIONS[tone] || TONE_INSTRUCTIONS.professional}

RULES:
- Remove all filler words
- Fix grammar and punctuation
- If the user describes wanting an email, write a complete email
- If they describe tasks, make a proper task list
- Apply the format and tone strictly

Output only the final text. No explanations or meta-commentary.`;

  try {
    return await callOpenAI(prompt, rawText);
  } catch (err) {
    console.error("ENHANCED ERROR:", err.message);
    return `⚠️ AI formatting failed:\n\n${rawText}`;
  }
}
