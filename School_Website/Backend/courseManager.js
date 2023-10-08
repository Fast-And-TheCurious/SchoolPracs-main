const { select, update } = require("./database");

class courseManager {
  async getCourses() {
    try {
      const query = "SELECT * FROM bryantmDB.Courses";
      const [result] = await select(query);
      return result;
    } catch (error) {
      return error;
    }


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
  }
}

module.exports = courseManager;
