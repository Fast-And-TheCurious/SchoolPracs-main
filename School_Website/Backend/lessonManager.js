const connection = require('./database'); // Import the database connection

// Function to retrieve data from the database
function getLessonData(callback) {
  connection.query('SELECT * FROM lessons', (error, results) => {
    if (error) {
      console.error('Error retrieving data from the database: ' + error.message);
      return callback(error);
    }
    callback(null, results);
  });
}
// Function to structure data into the desired format
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

// Usage: Retrieve data and format it into the desired object
getLessonData((error, results) => {
  if (error) {
    return;
  }
  const lessonData = formatData(results);
  console.log(JSON.stringify(lessonData, null, 2));
});
