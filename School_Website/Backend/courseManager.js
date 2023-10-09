const { select } = require("./database");
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
      connection.release();
    }
  }
}

module.exports.courseFormattedArray = courseFormattedArray; 
storeCoursesInArray(); */

class courseManager {
  async getCourses() {
    try {
      const query = "SELECT * FROM bryantmDB.Courses";
      const result = await select(query);
      if (!result || result.length === 0) {
        return { error: "No courses found", statusCode: 404 };
      }
      return result;
    } catch (error) {
      console.error("An error occurred while fetching courses:", error);
      return {
        error: "An error occurred while processing the request",
        statusCode: 500,
      };
    }
  }
}

module.exports = courseManager;
