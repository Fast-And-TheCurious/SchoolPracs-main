const { select, update } = require("./database");

class userHelpManager {
  async userMessage(userMessage, userId) {
    try {
      const query = `UPDATE bryantmDB.Message SET userMessage = '?'WHERE user_id = ?;`;
      await update(query, [userMessage, userId]);
      return "Added user message success";
    } catch (error) {
      return error;
    }
  }
}

module.exports = userHelpManager;
