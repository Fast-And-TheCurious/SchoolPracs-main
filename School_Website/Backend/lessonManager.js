/* Lesson */
const { select } = require("./database");

class lessonManager {
  async getCourses() {
    try {
      const query = "SELECT * FROM courses";
      const result = await select(query);

      if (!result || result.length === 0) {
        return { error: "No courses found", statusCode: 404 };
      }
      return result;
    } catch (error) {
      console.error("An error occurred while fetching courses:", error);
      return { error: "An error occurred while processing the request", statusCode: 500 };
    }
  }
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
  
  async getLessonsByCourse(courseId) {
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
  }

  async getUnitsByCourse(courseId) {
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
  }
  /* IMPORTANT */
  async getLessonsByUnit(unitID){
    try{
      const query = `SELECT * FROM bryantmdb.lessons 
      WHERE unitID LIKE (SELECT id FROM bryantmDB.Unit WHERE id LIKE ?) `;
      const [result] = await select(query, [unitID]);
      return { success: true, unitsByCourse: result, message: 'Lessons by unit details retrieved successfully' };
    }catch(error){
      console.error("An error occurred while fetching lessons by units:", error);
      return { error: "An error occurred while processing the request", statusCode: 500 };
    }
  }
  async updateLessonsCompleted(){
  try{
    const query = `UPDATE users SET lessons_completed = lessons_completed+1 WHERE id = ?`; 
    await update(query, [userID]);
    if (result.affectedRows > 0) {
      return "Update user lessons completed successful";
    } else {
      return "No rows affected, user ID may not exist.";
    }
  }catch(error){    
    return `Error updating user lessons completed: ${error.message}`;

  }
  }
}

module.exports = lessonManager;



