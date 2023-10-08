const { select, update } = require("./database");

class unitManager{
    async getUnits(){
        try{
            const query = "SELECT * FROM bryantmDB.Unit"
            const [result] = await select(query);
            return result;
        }catch(error){
            return error;
        }
    }
}
/* const unitArray = [];

async function fetchUnits() {
  let connection;
  try {
    connection = await pool.getConnection();

    const [rows, fields] = await connection.query("SELECT * FROM Unit");

    unitArray.push(...rows);

    console.log("\nUnits:\n");
    console.log(unitArray);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports.unitArray= unitArray;
fetchUnits(); */
module.exports = unitManager;