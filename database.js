// Voxly Database - User management and preferences

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
      language: null,
      processingMode: null,   // 'direct', 'light', 'enhanced', or 'ai_chat'
      outputType: null,
      tone: null,
      setupComplete: false,
      
      // Conversation state
      awaitingSetup: null
    };
  }
  return users[chatId];
}

export function setUserPreference(chatId, key, value) {
  const user = getUser(chatId);
  user[key] = value;
  return user;
}

export function isSetupComplete(chatId) {
  const user = getUser(chatId);
  
  // For direct/light/ai_chat mode, we don't need output type and tone
  if (user.processingMode === 'direct' || user.processingMode === 'light' || user.processingMode === 'ai_chat') {
    return user.language && user.processingMode && user.setupComplete;
  }
  
  // For enhanced mode with email, we need tone
  if (user.processingMode === 'enhanced' && user.outputType === 'email') {
    return user.language && user.processingMode && user.outputType && user.tone && user.setupComplete;
  }
  
  // For enhanced mode with other output types, no tone needed
  if (user.processingMode === 'enhanced') {
    return user.language && user.processingMode && user.outputType && user.setupComplete;
  }
  
  return user.language && user.processingMode && user.setupComplete;
}

export function completeSetup(chatId) {
  const user = getUser(chatId);
  user.setupComplete = true;
  user.awaitingSetup = null;
  return user;
}

export function getUserPreferences(chatId) {
  const user = getUser(chatId);
  return {
    language: user.language || 'en',
    processingMode: user.processingMode || 'enhanced',
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

export function isVIP(userId, username, vipList) {
  return vipList.some(vip => {
    if (typeof vip === "number") return vip === userId;
    if (typeof vip === "string" && username) {
      return vip.toLowerCase() === username.toLowerCase();
    }
    return false;
  });
}

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
