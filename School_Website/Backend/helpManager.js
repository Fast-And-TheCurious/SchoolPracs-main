const { select, update } = require("./database");






class helpManager {
  async getMessages() {
    try {
      const query = "SELECT * FROM  bryantmDB.userMessages"; 
      const result = await select(query);

      if (!result || result.length === 0) {
        return { error: "No messages found", statusCode: 404 };
      }
      return result;
    } catch (error) {
      console.error("An error occurred while fetching messages:", error);
      return {
        error: "An error occurred while processing the request",
        statusCode: 500,
      };
    }
  }
  async setUserMessage(userId, messageText) {
    try {
      const query = "INSERT INTO bryantmDB.userMessages (user_id, message_text, message_timestamp) VALUES (?, ?, NOW())"; 
      await update(query, [userId, messageText]);

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