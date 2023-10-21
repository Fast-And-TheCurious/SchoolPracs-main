const { update } = require('./database');

class helpManager {
  async setUserMessage(messageText) {
    try {
      const query = "INSERT INTO bryantmDB.userMessages (message_text, message_timestamp) VALUES (?, NOW())";
      await update(query, [messageText]);
  
      return "User message inserted successfully";
    } catch (error) {
      console.error("An error occurred while setting user message:", error);
      return {
        error: "An error occurred while processing the request",
        statusCode: 500,
      };
    }
  }
  
}

module.exports = helpManager;
/* Add user id to help reply */