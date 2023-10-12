
/* const courseFormattedArray = []; 

async function storeCoursesInArray() {
  let connection;
  try {
    connection = await pool.getConnection();

    const [rows, fields] = await connection.query("SELECT * FROM Courses");

   rows.forEach((course) => {
      courseFormattedArray.push({
        id: course.id,
        name: course.name,
        title: course.title,
        about_description: course.about_description,
      });
    });

    console.log("\nCourses stored in courseFormattedArray array:\n", courseFormattedArray);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    if (connection) {
      connection.release()
    }
  }
}

module.exports.courseFormattedArray = courseFormattedArray; 
storeCoursesInArray(); */
const { select } = require("./database");

class courseManager {
  async getCourses() {
    try {
      const query = "SELECT * FROM Courses";
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
  }
}

module.exports = courseManager;
