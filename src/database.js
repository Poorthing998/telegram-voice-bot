// Voxly Database - User management and preferences
// For production, replace with Redis or MongoDB

const users = {};

export function getUser(chatId) {
  if (!users[chatId]) {
    users[chatId] = {
      // Usage tracking
      usageCount: 0,
      messagesRemaining: 0,
      isPaid: false,
      totalPaid: 0,
      
      // Preferences
      language: null,        // null means not set yet (show welcome)
      outputType: null,
      tone: null,
      setupComplete: false,
      
      // Conversation state for setup flow
      awaitingSetup: null    // 'language', 'output', 'tone', or null
    };
  }
  return users[chatId];
}

// Save user preferences
export function setUserPreference(chatId, key, value) {
  const user = getUser(chatId);
  user[key] = value;
  return user;
}

// Check if user has completed initial setup
export function isSetupComplete(chatId) {
  const user = getUser(chatId);
  return user.language && user.outputType && user.tone && user.setupComplete;
}

// Mark setup as complete
export function completeSetup(chatId) {
  const user = getUser(chatId);
  user.setupComplete = true;
  user.awaitingSetup = null;
  return user;
}

// Get user preferences for AI prompt
export function getUserPreferences(chatId) {
  const user = getUser(chatId);
  return {
    language: user.language || 'en',
    outputType: user.outputType || 'general',
    tone: user.tone || 'professional'
  };
}

// Payment functions
export function addMessages(chatId, amount) {
  const user = getUser(chatId);
  user.messagesRemaining += amount;
  user.isPaid = true;
  user.totalPaid += amount;
  return user;
}

export function useMessage(chatId) {
  const user = getUser(chatId);
  user.usageCount++;
  if (user.isPaid && user.messagesRemaining > 0) {
    user.messagesRemaining--;
  }
  return user;
}

// VIP check
export function isVIP(userId, username, vipList) {
  return vipList.some(vip => {
    if (typeof vip === "number") return vip === userId;
    if (typeof vip === "string" && username) {
      return vip.toLowerCase() === username.toLowerCase();
    }
    return false;
  });
}

// Can use bot check
export function canUseBot(chatId, freeLimit, userId = null, username = null, vipList = []) {
  if (isVIP(userId, username, vipList)) {
    return { allowed: true, remaining: Infinity, isVIP: true };
  }
  
  const user = getUser(chatId);
  
  if (user.isPaid && user.messagesRemaining > 0) {
    return { allowed: true, remaining: user.messagesRemaining };
  }
  
  if (user.usageCount < freeLimit) {
    return { allowed: true, remaining: freeLimit - user.usageCount, isTrial: true };
  }
  
  return { allowed: false, remaining: 0 };
}
