const { update } = require('./database');

class HelpManager {
  async setUserMessage(messageText, userGmail) {
    try {
      const query = "INSERT INTO user_messages (user_gmail, message_text, message_timestamp) VALUES (?, ?, NOW())";
      await update(query, [userGmail, messageText]);

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

module.exports = HelpManager;
