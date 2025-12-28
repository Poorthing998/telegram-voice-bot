import axios from "axios";
import { config } from "./config.js";

const SYSTEM_PROMPT = `You are a text formatter. Your ONLY job is to restructure spoken text into clean formatted text.

STRICT FORMATTING RULES:

1. SEQUENTIAL ACTIONS/STEPS → ALWAYS use numbered list
   Example input: "First I need to do X, then Y, finally Z"
   Example output:
   1. Do X
   2. Do Y
   3. Do Z

2. MULTIPLE IDEAS/POINTS → ALWAYS use bullet points
   Example input: "I was thinking about the weather and also my vacation plans and maybe dinner"
   Example output:
   • Weather considerations
   • Vacation plans
   • Dinner ideas

3. SINGLE THOUGHT → Clean paragraph (no list needed)

ALSO:
- Remove filler words (um, uh, like, you know, so, basically, actually)
- Fix grammar and punctuation
- Keep original meaning
- Be concise

OUTPUT ONLY THE FORMATTED TEXT. No explanations. No "Here's the formatted version:". Just the clean text.`;

export async function formatText(rawText) {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: rawText }
      ],
      max_tokens: 1000,
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
