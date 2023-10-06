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




/*
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
/
    const [rows, fields] = await pool.query("SELECT * FROM Courses");

    const lessonPromises = [];

    rows.forEach(async (row) => {
      const courseId = row.CourseID;

      lessonPromises.push(
        pool.query("SELECT * FROM Courses", [courseId])
      );
    });

    const lessonResults = await Promise.all(lessonPromises);

    lessonResults.forEach(([lessonRows, lessonFields], index) => {
      const row = rows[index];
      row.unitLessons = lessonRows;

      const lessons = row.unitLessons.map((lesson) => ({
        title: `Course ${lesson.id}: ${lesson.title}`,
        description: lesson.about_description,
        link: lesson.link,
      }));

      courseFormattedArray.push(...lessons);
    });

    console.log("Formatted Lessons:", formattedLessons);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}
main(); */


const pool = createPool({
  host: "102.130.115.69",
  user: "bryantm",
  password: "Reddam2021@1",
  database: "bryantmDB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/* Course */

const courseFormattedArray = []; // Initialize the array to store course data

async function storeCoursesInArray() {
  let connection;
  try {
    // Get a connection from the pool
    connection = await pool.getConnection();

    // Execute a SELECT query to fetch all rows from the "Courses" table
    const [rows, fields] = await connection.query("SELECT * FROM Courses");

    // Iterate through the rows and store each course in the courseFormattedArray array
    rows.forEach((course) => {
      courseFormattedArray.push({
        id: course.id,
        name: course.name,
        title: course.title,
        about_description: course.about_description,
      });
    });

    // Log the course data to the console
    console.log("\nCourses stored in courseFormattedArray array:\n", courseFormattedArray);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    if (connection) {
      // Release the connection back to the pool
      connection.release();
    }
  }
}

// Call the function to fetch and store courses in the array
storeCoursesInArray();

/* Lesson */

let lessonArray; // Declare the variable to store the lesson data

async function fetchLessons() {
  let connection;
  try {
    // Get a connection from the pool
    connection = await pool.getConnection();

    // Execute a SELECT query to fetch all rows from the "Lesson" table
    const [rows, fields] = await connection.query("SELECT * FROM Lesson");

    // Assign the lesson data to the lessonArray variable
    lessonArray = rows;

    // Log the lesson data to the console
    console.log("\nLessons:\n");
    console.log(lessonArray);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    if (connection) {
      // Release the connection back to the pool
      connection.release();
    }
  }
}

// Call the function to fetch lessons and populate lessonArray
fetchLessons();

const unitArray = []; // Initialize the array to store unit data

async function fetchUnits() {
  let connection;
  try {
    // Get a connection from the pool
    connection = await pool.getConnection();

    // Execute a SELECT query to fetch all rows from the "Unit" table
    const [rows, fields] = await connection.query("SELECT * FROM Unit");

    // Store the unit data in the unitArray
    unitArray.push(...rows);

    // Log the unit data to the console
    console.log("\nUnits:\n");
    console.log(unitArray);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    if (connection) {
      // Release the connection back to the pool
      connection.release();
    }
  }
}

// Call the function to fetch and store units in the array
fetchUnits();

/* User */

const userArray = []; // Initialize the array to store user data

async function fetchUsers() {
  let connection;
  try {
    // Get a connection from the pool
    connection = await pool.getConnection();

    // Execute a SELECT query to fetch all rows from the "User" table
    const [rows, fields] = await connection.query("SELECT * FROM User");

    // Store the user data in the userArray
    userArray.push(...rows);

    // Log the user data to the console
    console.log("\nUsers:\n");
    console.log(userArray);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    if (connection) {
      // Release the connection back to the pool
      connection.release();
    }
  }
}

// Call the function to fetch and store users in the array
fetchUsers();