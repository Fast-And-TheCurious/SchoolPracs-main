const { select } = require("./database");

class topicManager {

}
module.exports =topicManager;
/* 
  async getLessonsByCourse(courseId) {
    try {
      const query = "SELECT * FROM Lesson WHERE courseId = ?";
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
      const query = "SELECT * FROM Unit WHERE courseId = ?";
      const result = await select(query, [courseId]);

      if (!result || result.length === 0) {
        return { error: "No units found for this course", statusCode: 404 };
      }
      return result;
    } catch (error) {
      console.error("An error occurred while fetching units:", error);
      return { error: "An error occurred while processing the request", statusCode: 500 };
    }
  }*/