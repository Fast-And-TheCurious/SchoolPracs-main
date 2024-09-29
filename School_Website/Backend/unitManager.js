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
/*   async getUnitsByCourse(courseID, unitID) {
    try {
      const query = `
        SELECT * FROM bryantmdb.unit
        WHERE course_id = (SELECT id FROM bryantmd.courses WHERE id = ?)
          AND id = ?;
      `;
  
      const [result] = await select(query, [courseID, unitID]);
      return { success: true, unitsByCourse: result, message: 'Unit by course details retrieved successfully' };
    } catch (error) {
      console.error("An error occurred while fetching units by course:", error);
      return { error: "An error occurred while processing the request", statusCode: 500 };
    }
  } */ // check used, currently not
  
}

module.exports = unitManager;