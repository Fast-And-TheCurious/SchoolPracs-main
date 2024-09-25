const { select } = require("./database");

class CourseManager {
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
} 

module.exports = CourseManager;
