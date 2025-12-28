// Configuration settings
export const config = {
  // Pricing
  PAYMENT_AMOUNT: 5,        // USDT price
  MESSAGE_LIMIT: 200,       // Messages per payment (not unlimited!)
  FREE_USES: 3,             // Free trial messages
  
  // VIP users - free unlimited access
  // Add Telegram user IDs OR usernames (without @)
  VIP_USERS: [
    
  ],
  
  // USDT TRC20 settings
  USDT_CONTRACT: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
  
  // From environment
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
  OPENAI_KEY: process.env.OPENAI_KEY,
  TRON_WALLET: process.env.TRON_WALLET,
  PORT: process.env.PORT || 3000
};
