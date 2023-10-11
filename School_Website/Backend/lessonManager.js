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

/* Lesson */const { select } = require("./database");

class lessonManager {
  async getLessons() {
    try {
      const query = "SELECT * FROM Lesson";
      const result = await select(query);

      if (!result || result.length === 0) {
        return { error: "No lessons found", statusCode: 404 };
      }
      return result;
    } catch (error) {
      console.error("An error occurred while fetching lessons:", error);
      return { error: "An error occurred while processing the request", statusCode: 500 };
    }
  }
}

module.exports = lessonManager;



/* let lessonArray=[]; 

async function fetchLessons() {
  let connection;
  try {
    connection = await pool.getConnection();

    const [rows, fields] = await connection.query("SELECT * FROM Lesson");

    lessonArray = rows;

    console.log("\nLessons:\n");
    console.log(lessonArray);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports.lessonArray= lessonArray;
fetchLessons(); */