const { select, update } = require("./database");

class userManager {
  async updateProfile(newUserName, newProfileIcon, newEmail, userID) {
    try {
      const query = `UPDATE bryantmDB.User SET username = ?, profileIcon = ?, email = ?  WHERE (UserID = ?)`;
      await update(query, [newUserName, newProfileIcon, newEmail, userID]);
      return "Update profile operation successful";
    } catch (error) {
      return error;
    }
  } 

  async getUserID(email) {
    try {
      const query = `SELECT id FROM bryantmDB.User where email = ?`;
      const [result] = await select(query, [email]);
      return result;
    } catch (error) {
      return error;
    }
  }
  async getUserEmail(userID) {
    try {
      const query = `SELECT email FROM bryantmDB.User WHERE id = ?`;
      const [result] = await select(query, [userID]);
      return result ? result.email : null; // Return the email address or null if not found
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
      const query = `SELECT username, profileIcon FROM bryantmDB.User where id = ?;`;
      const [result] = await select(query, [userID]);
      return result;
    } catch (error) {
      return error;
    }
  }
  /* Update the column names here to match database */
  async getUserProfileIcon(userID) {
    try {
      const query = `SELECT profileIcon FROM bryantmDB.User WHERE id = ?`;
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
  async userLogin(email, password) {
    try {
      const query = `SELECT count(*) FROM bryantmDB.User where email = ? AND password = ?`;
      const [result] = await select(query, [email, password]);
      return result["count(*)"] == 1;//ask
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
