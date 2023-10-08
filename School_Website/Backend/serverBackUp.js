const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const cors = require("cors");


const { createConnection } = require("./database");
const { createPool } = require("mysql2/promise");
/* 
const lessonManager = require("./lessonManager");

const HelpManager = require("./helpManager");
const TopicManager = require("./topicManager");
const SignUpManager = require("./signUpManager");
const CourseManager = require("./courseManager");
const LoginManager = require("./loginManager");
const UserManager = require("./userManager");
 */


const secretKey = 'your-secret-key';

app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

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

const courseFormattedArray = []; 

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
    });/* 

    console.log("\nCourses stored in courseFormattedArray array:\n", courseFormattedArray); */
  } catch (error) {
    console.error("Error:", error);
  } finally {
    if (connection) {
      // Release the connection back to the pool
      connection.release();
    }
  }
}

const arrayOfObjects = [
  { name: "John", age: 25 },
  { name: "Jane", age: 30 },
  { name: "Bob", age: 35 }
];

module.exports = arrayOfObjects;

module.exports.courseFormattedArray = courseFormattedArray; 
// Call the function to fetch and store courses in the array
storeCoursesInArray();

/* Lesson */

let lessonArray=[]; 

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
    /* console.log("\nLessons:\n");
    console.log(lessonArray); */
  } catch (error) {
    console.error("Error:", error);
  } finally {
    if (connection) {
      // Release the connection back to the pool
      connection.release();
    }
  }
}
module.exports.lessonArray= lessonArray;
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
   /*  console.log("\nUnits:\n");
    console.log(unitArray); */
  } catch (error) {
    console.error("Error:", error);
  } finally {
    if (connection) {
      // Release the connection back to the pool
      connection.release();
    }
  }
}
module.exports.unitArray= unitArray;
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
  /*   console.log("\nUsers:\n");
    console.log(userArray); */
  } catch (error) {
    console.error("Error:", error);
  } finally {
    if (connection) {
      // Release the connection back to the pool
      connection.release();
    }
  }
}
module.exports.userArray= userArray;
// Call the function to fetch and store users in the array
fetchUsers();


app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
      const connection = await pool.getConnection();
      
      // Hash and salt the password (You should use a proper password hashing library)
      const hashedPassword = hashPasswordFunction(password);

      // Insert the user data into the "User" table
      await connection.query(
          'INSERT INTO User (username, email, password) VALUES (?, ?, ?)',
          [username, email, hashedPassword]
      );

      connection.release();
      
      // Respond with a success message or redirect to the login page
      res.status(200).send('Registration successful');
  } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Registration failed');
  }
});
// Login route: Verify user credentials and generate a JWT
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await pool.getConnection();
    
    // Retrieve the user's data based on the provided email
    const [rows] = await connection.query(
      'SELECT * FROM User WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      // User not found
      connection.release();
      return res.status(401).send('Invalid credentials');
    }

    const user = rows[0];

    // Verify the password (You should use the same hashing function as used during registration)
    const passwordMatch = comparePasswordFunction(password, user.password);

    if (!passwordMatch) {
      // Incorrect password
      connection.release();
      return res.status(401).send('Invalid credentials');
    }

    // Generate a JWT containing user information
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

    connection.release();

    res.json({ token });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Login failed');
  }
});

// Protected route: Verify JWT before allowing access
app.get('/protected', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  // Verify the JWT's signature and decode its payload
  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Token is valid; you can access the user's data from `decoded`
    const userId = decoded.id;

    try {
      const connection = await pool.getConnection();

      // Retrieve the user's data based on the user ID
      const [rows] = await connection.query(
        'SELECT * FROM User WHERE id = ?',
        [userId]
      );

      if (rows.length === 0) {
        connection.release();
        return res.status(404).json({ message: 'User not found' });
      }

      const user = rows[0];

      connection.release();

      res.json({ message: 'Access granted', user });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error retrieving user data');
    }
  });
});


