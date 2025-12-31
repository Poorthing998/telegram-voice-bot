// Voxly Configuration

export const config = {
  // Pricing
  PAYMENT_AMOUNT: 5,
  MESSAGE_LIMIT: 200,
  FREE_USES: 3,
  
  // VIP users - free unlimited access
  VIP_USERS: [
    42656267,  // Your user ID
  ],
  
  // Processing modes (how much AI touches the text)
  PROCESSING_MODES: ['direct', 'light', 'enhanced'],
  
  // Output types
  OUTPUT_TYPES: ['general', 'email', 'summary', 'notes', 'todo', 'message'],
  
  // Tones (only shown if user wants enhancement)
  TONES: ['professional', 'casual', 'friendly', 'formal', 'concise'],
  
  // Default preferences
  DEFAULTS: {
    language: 'en',
    processingMode: 'enhanced',  // direct, light, or enhanced
    outputType: 'general',
    tone: 'professional'
  },
  
  // AI Model - GPT-5 Nano (smallest/fastest in GPT-5 family)
  AI_MODEL: "gpt-5-nano",
  
  // USDT TRC20 settings
  USDT_CONTRACT: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
  
  // From environment
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
  OPENAI_KEY: process.env.OPENAI_KEY,
  TRON_WALLET: process.env.TRON_WALLET,
  PORT: process.env.PORT || 3000
};
