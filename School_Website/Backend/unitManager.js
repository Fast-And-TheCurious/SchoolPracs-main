const { select } = require("./database");

class unitManager {
  async getUnits() {
    try {
      const query = "SELECT * FROM Unit"; 
      const result = await select(query);

      if (!result || result.length === 0) {
        return { error: "No units found", statusCode: 404 };
      }
      return result;
    } catch (error) {
      console.error("An error occurred while fetching units:", error);
      return { error: "An error occurred while processing the request", statusCode: 500 };
    }
  }
}

module.exports = unitManager;

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