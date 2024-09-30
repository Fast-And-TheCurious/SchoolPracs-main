const { select } = require("./database");
class unitManager {
  async getUnits() {  /* this mught be redundant due to the the getUnitByCourse === check  */
    try {
      const query = "SELECT * FROM unit"; 
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