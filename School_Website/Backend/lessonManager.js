/* const connection = require('./database'); 
function getLessonData(callback) {
  connection.query('SELECT * FROM lessons', (error, results) => {
    if (error) {
      console.error('Error retrieving data from the database: ' + error.message);
      return callback(error);
    }
    callback(null, results);
  });
}
function formatData(results) {
  const lessonData = {
    lessons: results.map((row) => ({
      id: row.id,
      unit: row.unit,
      unitTitle: row.unitTitle,
      note: row.note,
      aboutUnit: row.aboutUnit,
      unitlessonContent: {
        uniquelessonTitles: {
          lesson1Title: row.lesson1Title,
          lesson2Title: row.lesson2Title,
          lesson3Title: row.lesson3Title,
          lesson4Title: row.lesson4Title,
        },
        lessonLink: {
          firstLink: row.firstLink,
          secondLink: row.secondLink,
          thirdLink: row.thirdLink,
          fourthLink: row.fourthLink,
        },
        youTubeVideos: {
          lesson1Video: row.lesson1Video,
          lesson2Video: row.lesson2Video,
          lesson3Video: row.lesson3Video,
          lesson4Video: row.lsson4Video,
        },
      },
    })),
  };
  return lessonData;
}

getLessonData((error, results) => {
  if (error) {
    return;
  }
  const lessonData = formatData(results);
  console.log(JSON.stringify(lessonData, null, 2));
}); */

/* Lesson */
const { select } = require("./database");

class lessonManager {
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
  async getAllLessons() {
    try {
      const query = "SELECT * FROM Lesson"; 
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


module.exports = lessonManager;



