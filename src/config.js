// Voxly Configuration

export const config = {
  // Pricing
  PAYMENT_AMOUNT: 5,
  MESSAGE_LIMIT: 200,
  FREE_USES: 3,
  
  // VIP users - free unlimited access
  VIP_USERS: [
    42656267,
  ],
  
  // Processing modes
  // direct: Raw transcription only, zero AI
  // light: Clean up filler words and grammar only
  // enhanced: Format into specific output type (email, notes, etc.)
  // ai_chat: Ask AI a question and get an answer
  PROCESSING_MODES: ['direct', 'light', 'enhanced', 'ai_chat'],
  
  // Output types for ENHANCED mode only
  OUTPUT_TYPES: ['email', 'summary', 'notes', 'todo', 'message', 'general'],
  
  // Tones - only used for EMAIL output type
  TONES: ['professional', 'casual', 'friendly', 'formal'],
  
  // Default preferences
  DEFAULTS: {
    language: 'en',
    processingMode: 'enhanced',
    outputType: 'general',
    tone: 'professional'
  },
  
  // AI Model
  AI_MODEL: "gpt-4.1-nano",
  
  // USDT TRC20 settings
  USDT_CONTRACT: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
  
  // From environment
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
  OPENAI_KEY: process.env.OPENAI_KEY,
  TRON_WALLET: process.env.TRON_WALLET,
  PORT: process.env.PORT || 3000
};
