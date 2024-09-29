const { update } = require("./database");

class signUpManager{
    async addUser(newUserName,newPassword, newProfileIcon, newEmail, userID){
        try{
            const query ='INSERT INTO bryantmDB.Users ()';
            await update(query, [newUserName,newPassword, newProfileIcon, newEmail, userID]);

            return "User successfully added";
        }catch(error){
            console.error("An error occurred while setting user message:", error);
            return{
                error: "An error with adding a user to the database",
                statusCode: 500,
            };
        }
    }
}
module.exports = signUpManager;