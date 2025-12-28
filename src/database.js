// Simple in-memory database
// For production, replace with Redis or MongoDB

const users = {};

export function getUser(chatId) {
  if (!users[chatId]) {
    users[chatId] = {
      usageCount: 0,
      messagesRemaining: 0,
      isPaid: false,
      totalPaid: 0
    };
  }
  return users[chatId];
}

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

// Check if user is VIP
export function isVIP(userId, username, vipList) {
  return vipList.some(vip => {
    if (typeof vip === "number") {
      return vip === userId;
    }
    if (typeof vip === "string" && username) {
      return vip.toLowerCase() === username.toLowerCase();
    }
    return false;
  });
}

export function canUseBot(chatId, freeLimit, userId = null, username = null, vipList = []) {
  // Check VIP status first
  if (isVIP(userId, username, vipList)) {
    return { allowed: true, remaining: Infinity, isVIP: true };
  }
  
  const user = getUser(chatId);
  
  // Paid user with remaining messages
  if (user.isPaid && user.messagesRemaining > 0) {
    return { allowed: true, remaining: user.messagesRemaining };
  }
  
  // Free trial
  if (user.usageCount < freeLimit) {
    return { allowed: true, remaining: freeLimit - user.usageCount, isTrial: true };
  }
  
  return { allowed: false, remaining: 0 };
}
