/* const lessonManager = require("./lessonManger"); */
/* const UserManager = require("./userManager");
const HelpManager = require("./helpManager");
const TopicManager = require("./topicManager");
const SignUpManager = require("./signUpManager");
const CourseManager = require("./courseManager");
const LoginManager = require("./loginManager");
 */
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const { createPool } = require("mysql2/promise");

app.use(cors());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const formattedLessons = [];
module.exports = formattedLessons;
async function main() {
  try {
    const pool = createPool({
      host: "102.130.115.69",
      user: "bryantm",
      password: "Reddam2021@1",
      database: "bryantmDB",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Perform a SELECT query to fetch CourseID, Title, and Description
    const [rows, fields] = await pool.query("SELECT * FROM Course");

    // Create an array to store the promises for fetching lesson data
    const lessonPromises = [];

    rows.forEach(async (row) => {
      const courseId = row.CourseID;

      // Push the promise for fetching lesson data into the array
      lessonPromises.push(
        pool.query("SELECT * FROM Courses", [courseId])
      );
    });

    // Wait for all the lesson queries to finish
    const lessonResults = await Promise.all(lessonPromises);

    lessonResults.forEach(([lessonRows, lessonFields], index) => {
      const row = rows[index];
      row.unitLessons = lessonRows;

      const lessons = row.unitLessons.map((lesson) => ({
        title: `Course ${lesson.id}: ${lesson.title}`,
        description: lesson.about_description,
        link: lesson.link,
      }));

      formattedLessons.push(...lessons);
    });

    // Log formattedLessons once it's populated
    console.log("Formatted Lessons:", formattedLessons);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

// Call the main function to start the application
main();
