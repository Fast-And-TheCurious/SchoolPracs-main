/* Lesson */
const { select, update } = require("./database");

class lessonManager {
  async getAllLessons() {
    try {
      const query = "SELECT * FROM lessons"; 
      const result = await select(query);
  
      if (!result || result.length === 0) {
        return { error: "No lessons found", statusCode: 404 };
      }
  
      return result;
    } catch (error) {
      console.error("An error occurred while fetching all the lessons:", error);
      return { error: "An error occurred while processing the request", statusCode: 500 };
    }
  }
  
/*   async getLessonsByCourse(courseId) {
    try {
      const query = "SELECT * FROM lessons WHERE courseId = ?";
      const result = await select(query, [courseId]);

      if (!result || result.length === 0) {
        return { error: "No lessons found for this course", statusCode: 404 };
      }
      return result;
    } catch (error) {
      console.error("An error occurred while fetching lessons:", error);
      return { error: "An error occurred while processing the request", statusCode: 500 };
    }
  } */

 /*  async getUnitsByCourse(courseId) {
    try {
      const query = "SELECT * FROM unit WHERE courseId = ?";
      const result = await select(query, [courseId]);

      if (!result || result.length === 0) {
        return { error: "No units found for this course", statusCode: 404 };
      }
      return result;
    } catch (error) {
      console.error("An error occurred while fetching units:", error);
      return { error: "An error occurred while processing the request", statusCode: 500 };
    }
  } */

  /* IMPORTANT */
/*   async getLessonsByUnit(unitID){
    try{
      const query = `SELECT * FROM bryantmdb.lessons 
      WHERE unitID LIKE (SELECT id FROM bryantmDB.Unit WHERE id LIKE ?) `;
      const [result] = await select(query, [unitID]);
      return { success: true, unitsByCourse: result, message: 'Lessons by unit details retrieved successfully' };
    }catch(error){
      console.error("An error occurred while fetching lessons by units:", error);
      return { error: "An error occurred while processing the request", statusCode: 500 };
    }
  } */
  async updateLessonsCompleted(userID){
  try{
    const query = `UPDATE users SET lessons_completed = lessons_completed+1 WHERE id = ?`; 
    console.log("Executing query:", query, "with userID:", userID);
    const result = await update(query, [userID]);

    return "Update user lessons completed successful";
  } catch (error) {
    console.error("Error updating lessons completed:", error);
    return error;
  }
  }
  async getUserLessonActivity(userID) {
    try {
      console.log(`Executing query: SELECT * FROM lessons_completed WHERE user_id = ${userID} ORDER BY completed_at`);

      const query =   'SELECT lesson_id, completed_at FROM bryantmdb.lessons_completed WHERE user_id = ? ORDER BY completed_at';
      const result = await select(query, [userID]);
      return { success: true, lessons: result, message: 'User lesson activity retrieved successfully' };
  } catch (error) {
      console.error('Error fetching lessons data:', error);
      throw error; // Rethrow the error for the API to handle
  }
  }
}

module.exports = lessonManager;



