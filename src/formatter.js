import axios from "axios";
import { config } from "./config.js";

// Language output instructions - ensures output is ONLY in selected language
const LANGUAGE_INSTRUCTIONS = {
  en: "OUTPUT MUST BE IN ENGLISH ONLY. Do not use any other language.",
  fa: "OUTPUT MUST BE IN PERSIAN (FARSI) ONLY. Use Persian script. Do not use any other language. Right-to-left text.",
  es: "OUTPUT MUST BE IN SPANISH ONLY. Do not use any other language.",
  de: "OUTPUT MUST BE IN GERMAN ONLY. Do not use any other language.",
  fr: "OUTPUT MUST BE IN FRENCH ONLY. Do not use any other language.",
  ar: "OUTPUT MUST BE IN ARABIC ONLY. Use Arabic script. Do not use any other language. Right-to-left text.",
  tr: "OUTPUT MUST BE IN TURKISH ONLY. Do not use any other language.",
  ru: "OUTPUT MUST BE IN RUSSIAN ONLY. Use Cyrillic script. Do not use any other language.",
  zh: "OUTPUT MUST BE IN SIMPLIFIED CHINESE ONLY. Use Chinese characters. Do not use any other language."
};

// Output type specific instructions
const OUTPUT_INSTRUCTIONS = {
  general: `Format as clean, well-structured text.
- Sequential steps → numbered list
- Multiple points → bullet points
- Single thought → clean paragraph`,
  
  email: `Format as a professional email.
- Include appropriate greeting
- Clear paragraphs for body
- Professional sign-off
- Keep it concise and actionable`,
  
  summary: `Create a concise summary.
- Extract key points only
- Use bullet points for main ideas
- Keep it brief and scannable`,
  
  notes: `Format as organized notes.
- Use bullet points for ideas
- Highlight key insights
- Easy to scan and reference`,
  
  todo: `Format as a to-do list.
- Each task on its own line
- Clear, actionable items
- Use numbers or checkboxes`,
  
  message: `Format as a chat message.
- Keep it conversational
- Short paragraphs
- Easy to read on mobile`
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
 * Process text based on user's processing mode preference
 * - direct: Just return raw transcription (no AI processing)
 * - light: Basic cleanup only
 * - enhanced: Full formatting with tone and output type
 */
export async function formatText(rawText, preferences) {
  const { language, processingMode, outputType, tone } = preferences;
  
  // DIRECT MODE: Return raw transcription, no changes
  if (processingMode === 'direct') {
    return rawText;
  }
  
  // LIGHT MODE: Basic cleanup only
  if (processingMode === 'light') {
    const lightPrompt = `You are a text cleaner. Lightly clean up this spoken text.

${LANGUAGE_INSTRUCTIONS[language] || LANGUAGE_INSTRUCTIONS.en}

RULES:
- Remove filler words (um, uh, like, you know, basically, actually)
- Fix obvious grammar errors
- Fix punctuation
- Keep the original structure and meaning
- Do NOT add formatting like bullets or numbers
- Do NOT change the tone or style
- Keep it natural and close to the original

OUTPUT ONLY THE CLEANED TEXT. Nothing else.`;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: config.AI_MODEL,
        messages: [
          { role: "system", content: lightPrompt },
          { role: "user", content: rawText }
        ],
        max_tokens: 1500,
        temperature: 0.2
      },
      {
        headers: {
          Authorization: `Bearer ${config.OPENAI_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;
  }
  
  // ENHANCED MODE: Full formatting with tone and output type
  const enhancedPrompt = `You are a voice-to-text formatter. Convert spoken text into clean, formatted text.

CRITICAL - LANGUAGE REQUIREMENT:
${LANGUAGE_INSTRUCTIONS[language] || LANGUAGE_INSTRUCTIONS.en}

OUTPUT FORMAT (${outputType}):
${OUTPUT_INSTRUCTIONS[outputType] || OUTPUT_INSTRUCTIONS.general}

TONE (${tone}):
${TONE_INSTRUCTIONS[tone] || TONE_INSTRUCTIONS.professional}

ALWAYS:
- Remove ALL filler words (um, uh, like, you know, basically, actually, so, I mean)
- Fix grammar and punctuation
- Preserve the original meaning
- Make it clear and readable
- Apply appropriate formatting based on content

OUTPUT ONLY THE FORMATTED TEXT IN THE SPECIFIED LANGUAGE. No explanations. No meta-commentary. No English translations if another language is selected.`;

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: config.AI_MODEL,
      messages: [
        { role: "system", content: enhancedPrompt },
        { role: "user", content: rawText }
      ],
      max_tokens: 1500,
      temperature: 0.3
    },
    {
      headers: {
        Authorization: `Bearer ${config.OPENAI_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.choices[0].message.content;
}
