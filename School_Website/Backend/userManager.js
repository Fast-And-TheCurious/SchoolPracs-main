const { select, update } = require("./database");

class userManager {
  async updateProfile(newUserName, newProfileIcon, userID) {
    try {
      const query = `UPDATE bryantmDB.User SET username = ?, profileIcon = ?  WHERE (UserID = ?)`;
      await update(query, [newUserName, newProfileIcon, userID]);
      return "Update profile operation successful";
    } catch (error) {
      return error;
    }
  }

  async getUserID(username) {
    try {
      const query = `SELECT UserID FROM bryantmDB.User where username = ?`;
      const [result] = await select(query, [username]);
      return result;
    } catch (error) {
      return error;
    }
  }
  async getUserEmail(userID) {
    try {
      const query = `SELECT gmail FROM bryantmDB.User WHERE userID = ?`;
      const [result] = await select(query, [userID]);
      return result ? result.gmail : null; // Return the Gmail address or null if not found
    } catch (error) {
      return error;
    }
  }

  async getUsername(userID) {
    try {
      const query = `SELECT username FROM bryantmDB.User where UserID = ?`;
      const [result] = await select(query, [userID]);
      return result;
    } catch (error) {
      return error;
    }
  }
  //Checking if the email address is the user's email
  //This is used to allow user to login if they forgot their password
  async doUserEmailMatch(username, email) {
    try {
      const query = `SELECT count(*) FROM bryantmDB.User where username = ? AND email = ?`;
      const [result] = await select(query, [username, email]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  async getUserProfile(userID) {
    try {
      const query = `SELECT username,profileIcon, FROM bryantmDB.User where UserID = ?;`;
      const [result] = await select(query, [userID]);
      return result;
    } catch (error) {
      return error;
    }
  }
  async getUserProfileIcon(userID) {
    try {
      const query = `SELECT profileIcon FROM bryantmDB.User WHERE UserID = ?`;
      const [result] = await select(query, [userID]);

      if (result && result.length > 0) {
        // Return profile icon if found
        return result[0].profileIcon;
      } else {
        return {
          error: "User's profile icon not found",
          statusCode: 404,
        };
      }
    } catch (error) {
      console.error("An error occurred:", error);
      return "An error occurred while processing the request.";
    }
  }
  //Check if the user's login credential is correct
  async userLogin(gmail, password) {
    try {
      const query = `SELECT count(*) FROM bryantmDB.User where username = ? AND password = ?`;
      const [result] = await select(query, [gmail, password]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  async createAccount(username, password, profileIcon, email) {
    try {
      const query = `INSERT INTO bryantmDB.User (username, password, profileIcon, email) VALUES (?, ?, ?, ?);`;
      //change the insert to wokr for your database
      await update(query, [username, password, profileIcon, email]);
    } catch (error) {
      return error;
    }
  }

  async doesUsernameExist(username) {
    try {
      const query = `SELECT count(*) FROM bryantmDB.User where username = ?;`;
      const [result] = await select(query, [username]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  async doesEmailExist(email) {
    try {
      const query = `SELECT count(*) FROM bryantmDB.User where email = ?;`;
      const [result] = await select(query, [email]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }
}
module.exports = userManager;
