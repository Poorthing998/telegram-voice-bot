import axios from "axios";
import { config } from "./config.js";

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
- Keep it brief and scannable
- No unnecessary details`,
  
  notes: `Format as organized notes.
- Use headers if multiple topics
- Bullet points for ideas
- Highlight key insights
- Easy to scan and reference`,
  
  todo: `Format as a to-do list.
- Each task on its own line
- Use checkboxes or numbers
- Clear, actionable items
- Prioritize if order is implied`,
  
  message: `Format as a chat message.
- Keep it conversational
- Short paragraphs
- Friendly but clear
- Easy to read on mobile`
};

// Tone instructions
const TONE_INSTRUCTIONS = {
  professional: "Use professional, business-appropriate language. Avoid slang and casual expressions.",
  casual: "Use relaxed, everyday language. It's okay to be conversational.",
  friendly: "Use warm, approachable language. Be personable and engaging.",
  formal: "Use formal language. Proper grammar, no contractions, respectful tone.",
  concise: "Be extremely brief. Cut unnecessary words. Get to the point fast."
};

// Language-specific instructions
const LANGUAGE_INSTRUCTIONS = {
  en: "Output in English.",
  fa: "Output in Persian (Farsi). Use proper Persian script and grammar. Right-to-left text.",
  es: "Output in Spanish. Use proper Spanish grammar and expressions.",
  de: "Output in German. Use proper German grammar and formal/informal as appropriate.",
  fr: "Output in French. Use proper French grammar and expressions.",
  ar: "Output in Arabic. Use proper Arabic script and grammar. Right-to-left text.",
  tr: "Output in Turkish. Use proper Turkish grammar.",
  ru: "Output in Russian. Use proper Cyrillic script and grammar.",
  zh: "Output in Simplified Chinese. Use proper Chinese characters and grammar."
};

export async function formatText(rawText, preferences) {
  const { language, outputType, tone } = preferences;
  
  const systemPrompt = `You are a voice-to-text formatter. Convert spoken text into clean, formatted text.

LANGUAGE:
${LANGUAGE_INSTRUCTIONS[language] || LANGUAGE_INSTRUCTIONS.en}

OUTPUT FORMAT (${outputType}):
${OUTPUT_INSTRUCTIONS[outputType] || OUTPUT_INSTRUCTIONS.general}

TONE (${tone}):
${TONE_INSTRUCTIONS[tone] || TONE_INSTRUCTIONS.professional}

ALWAYS:
- Remove filler words (um, uh, like, you know, basically, actually)
- Fix grammar and punctuation
- Preserve the original meaning
- Keep it natural and readable

OUTPUT ONLY THE FORMATTED TEXT. No explanations. No meta-commentary.`;

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
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
