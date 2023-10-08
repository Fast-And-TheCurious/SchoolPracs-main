const { select, update } = require("./database");

class postManager{
      //naming convension for uploading files to firebase
  async total(userID) {
    try {
      const query = `SELECT count(*) FROM bryantmDB.Post where UserID = ?;`;
      const [result] = await select(query, [userID]);
      return result["count(*)"];
    } catch (error) {
      return error;
    }
  }

}