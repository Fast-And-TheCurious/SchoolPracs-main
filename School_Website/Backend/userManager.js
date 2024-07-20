const { select, update } = require("./database");
// motes for me"
/* 
rows = the array of rows returned by the SQL query
*/
class userManager {
  async updateProfile(newUserName, newProfileIcon, newEmail, userID) {
    try {
      const query = `UPDATE bryantmDB.Users SET username = ?, profileIcon = ?, email = ?  WHERE (UserID = ?)`;
      await update(query, [newUserName, newProfileIcon, newEmail, userID]);
      return "Update profile operation successful";
    } catch (error) {
      return error;
    }
  } 

  async getUserID(email) {
    try {
      const query = `SELECT id FROM bryantmDB.Users where email = ?`;
      const [result] = await select(query, [email]);
      return result;
    } catch (error) {
      return error;
    }
  }

  async getUserIdByGmail(gmail) {
    try {
      const query = "SELECT id FROM bryantmDB.users WHERE email = ? LIMIT 1;";
      const result = await select(query, [gmail]);
  
      if (result.length > 0) {
        return result[0].id;
      } else {
        return null; // User not found
      }
    } catch (error) {
      console.error("Error getting user ID by Gmail:", error);
      throw error;
    }
  }
  
  async getUserEmail(userID) {
    try {
      const query = `SELECT email FROM bryantmDB.Users WHERE id = ?`;
      const [result] = await select(query, [userID]);
      return result ? result.email : null; // Return the email address or null if not found
    } catch (error) {
      return error;
    }
  }

  async getUsername(userID) {
    try {
      const query = `SELECT username FROM bryantmDB.Users where UserID = ?`;
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
      const query = `SELECT count(*) FROM bryantmDB.Users where username = ? AND email = ?`;
      const [result] = await select(query, [username, email]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  async getUserProfile(userID) {
    try {
      const query = `SELECT username, profileIcon FROM bryantmDB.Users where id = ?;`;
      const [result] = await select(query, [userID]);
      return result;
    } catch (error) {
      return error;
    }
  }
  /* Update the column names here to match database */
  async getUserProfileIcon(userID) {
    try {
      const query = `SELECT profileIcon FROM bryantmDB.Users WHERE id = ?`;
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
      const query = `SELECT count(*) as count FROM bryantmDB.Users WHERE email = ? AND password = ?`;
      const [result] = await select(query, [email, password]);
      return result.count === 1;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }
  

async createAccount(username, email, password, profileIcon) {
  try {
      // Note the order of values: username, email, password, profileIcon
      const query = `INSERT INTO bryantmDB.Users (username, profileIcon, email, password) VALUES (?, ?, ?, ?);`;
      await update(query, [username, profileIcon, email, password]);

      return { success: true, message: 'Account created successfully' };
  } catch (error) {
      console.error('Error creating account:', error);
      return { success: false, message: 'Failed to create account' };
  }
}

  async doesUsernameExist(username) {
    try {
      const query = `SELECT count(*) FROM bryantmDB.Users where username = ?;`;
      const [result] = await select(query, [username]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }

  async doesGmailExist(gmail) {
    try {
      const query = `SELECT count(*) FROM bryantmDB.Users where email = ?;`;
      const [result] = await select(query, [gmail]);
      return result["count(*)"] == 1;
    } catch (error) {
      return error;
    }
  }
async doesPasswordMatch(userId, password) {
  try {
    const query = `SELECT COUNT(*) AS count FROM bryantmDB.Users WHERE id = ? AND password = ?`;
    const [result] = await select(query, [userId, password]);

    return result.count === 1;
  } catch (error) {
    console.error("Error checking password match:", error);
    throw error;
  }
}
async  addVerificationCodeDetails(userEmail, codeGenerated, codeCreatedAt, codeExpiresAt) {
  try {
      const query = ` UPDATE bryantmDB.Users
      SET verification_code = ?, verification_code_created_at = ?, verification_code_expires_at = ?
      WHERE email = ?;`;
      await update(query, [codeGenerated, codeCreatedAt, codeExpiresAt,userEmail]);

      return { success: true, message: 'Verification code added successfully' };
  } catch (error) {
      console.error('Error adding verification code:', error);
      return { success: false, message: 'Failed to add verification code' };
  }
}
async deleteVerificationCodeDetails(userEmail) {
  try {
    const query = `
      UPDATE bryantmDB.Users
      SET verification_code = NULL, verification_code_created_at = NULL, verification_code_expires_at = NULL
      WHERE email = ?;
    `;
    await update(query, [userEmail]);

    return { success: true, message: 'Verification code details deleted successfully' };
  } catch (error) {
    console.error('Error deleting verification code details:', error);
    return { success: false, message: 'Failed to delete verification code details' };
  }
}

async getVerificationCodeDetails(userEmail) {
  try {
    const query = `SELECT verification_code
                   FROM bryantmDB.Users
                   WHERE email = ?`;
    const [result] = await select(query, [userEmail]);

    return { success: true, verificationCode: result.verification_code, message: 'Verification code details retrieved successfully' };
  } catch (error) {
    console.error('Error getting verification code details:', error);
    return { success: false, message: 'Failed to get verification code details' };
  }
}
async resetUserPassword(password,email){
  try{
    const query = `UPDATE bryantmdb.users SET password = ? WHERE email = ?`;
    console.log('Executing SQL query:', query);

    await update(query, [password, email]);
    return { success: true, message: 'Password updated successfully' };
  }catch(error){
    console.error('Error updating user password:', error);
    return {success: false, message:'Failed to update user password'};
  }
}

async getUserCompletedCourses(email){
  // get by user gmail
  try {
    const query = `
        SELECT cources_completed FROM  bryantmdb.users
        WHERE email = ?
    `;
    const [rows] = await db.execute(query, [email]);
    if (rows.length > 0) {
      return rows[0].courses_completed;
  } else {
      return null;
  }
} catch (error) {
    console.error('Error fetching completed courses:', error);
    throw error;
}
}

async getUserPoints(email){ // get column in database
  // getBy user gmail
  try{
    const query = `SELECT points_accumulated FROM bryantmdb.users WHERE email= ?`;
    const[rows] = await db.execute(query, [email]);
    if (rows.length > 0) {
      return rows[0].points;
  } else {
      return null;
  }
  
  }catch(error){
    console.error('Error fetching user points:', error);
    throw error;
  }
}

}


module.exports = userManager;
