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
const { createPool } = require("mysql2/promise"); // Import createPool

app.use(cors());
app.use(express.json());

// Import your route handlers and middleware here
// Example:
// const userRoutes = require("./routes/userRoutes");
// app.use("/users", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const formattedLessons = [];

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

    // Process the results
    rows.forEach(async (row) => {
      // Assuming you want to fetch lesson data based on CourseID and set it to unitLessons
      // You need to execute another query here to retrieve the lesson data
      const courseId = row.CourseID;

      // Example: Execute a query to fetch lesson data based on courseId
      const [lessonRows, lessonFields] = await pool.query(
        "SELECT * FROM Courses",
        [courseId]
      );

      // Assuming you have lesson data, you can assign it to the unitLessons property
      row.unitLessons = lessonRows;

      console.log("Data from database:\n");
      //formating

      // Assuming `unitLessons` is an array of lessons
      const lessons = row.unitLessons.map((lesson) => ({
        title: `Course ${lesson.id}: ${lesson.title}`,
        description: lesson.about_description,
        link: lesson.link,
      }));
      
      
     
      console.log("Formatted Lessons:", formattedLessons);
      module.exports = formattedLessons;

       formattedLessons.push(...lessons);
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    // Handle any errors that occur during the connection or server setup
    console.error("Error:", error);
    process.exit(1);
  }
}
module.exports = formattedLessons;
// Call the main function to start the application
main();
