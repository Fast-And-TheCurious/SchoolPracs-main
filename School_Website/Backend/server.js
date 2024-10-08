const express = require("express"); // Framework for building web applications
const app = express(); 
const session = require("express-session");  // Middleware for session management
const PORT = process.env.PORT || 5000; // Port for the server
const cors = require("cors"); // Middleware for enabling CORS
const cookieParser = require('cookie-parser'); // Middleware for parsing cookies
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const dotenv = require('dotenv'); // Module to load environment variables
dotenv.config();
const path = require('path');  // Module for handling file paths
const { createConnection } = require("./database"); // Database connection manager
const unitManager = require("./unitManager"); // Manager for units
const lessonManager = require("./lessonManager"); // Manager for lessons
const helpManager = require("./helpManager"); // Manager for help messages
const courseManager = require("./courseManager");  // Manager for courses
const userManager = require("./userManager"); // Manager for users
const imageManager = require('./imageManager'); // Manager for images
const blogManager = require('./blogManager'); // Manager for blogs
const { sendPasswordResetEmail } = require('./gmailService'); // Service for sending password reset emails
const { initiatePasswordReset } = require('./gmailManager'); // Manager for initiating password resets
// const { sendAdminResponse } = require('./gmailManager');
const gmailManager = require ("./gmailManager"); // Manager for Gmail-related functionalities
const secretKey = process.env.JWT_SECRET; 
if (!secretKey) {
  console.error('Secret key for JWT is not defined');
  process.exit(1); // Stop process with an error
}
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://127.0.0.1:5502', // Adjust to your frontend URL
  credentials: true // Allow credentials (cookies, authorization headers)
}));
app.use(express.json());
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET || secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Note: Set 'secure: true' if using HTTPS
}));
// Serve static files from the 'School_Website' folder
app.use(express.static(path.join(__dirname, 'School_Website')));
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
// Connect to the database
async function connectToDatabase() {
  try {
    await createConnection();
    console.log("Connection established");
  } catch (error) {
    // Handle the error appropriately
    console.error("Error connecting to the database:", error);
  }
}

connectToDatabase();

//api end-points
// Endpoint to send admin response email
app.post('/api/sendResponse', async (req, res) => {
  const { userEmail, subject, message } = req.body;

  if (!userEmail || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Email, subject, and message are required.' });
  }

  const result = await gmailManager.sendAdminResponse(userEmail, subject, message);
  res.json(result);
});


// Login route
app.post('/api/user/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userManagerInstance = new userManager();
    const loggedIn = await userManagerInstance.userLogin(email, password);
    if (loggedIn) {
      req.session.user = { email }; // Save user info in the session
      res.json({ status: 'success', loggedIn: true });
    } else {
      res.json({ status: 'fail', loggedIn: false });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// API endpoint to initiate the password reset process

app.post('/api/user/resetPassword', async (req, res) => {
  const { email } = req.body;

  try {
      // Call the function from your Gmail manager to initiate the password reset process
      const result = await initiatePasswordReset(email);

      if (result.success) {
                   // Respond with success message
          res.status(200).json({ status: 'success', message: result.message });
      } else {
          // Respond with error message
          res.status(400).json({ status: 'error', message: result.message });
      }
  } catch (error) {
      console.error(error);
      // Respond with a generic error message
      res.status(500).json({ status: 'error', message: 'An error occurred' });
  }
});

/* Getting Images for Profile Picture Selection*/

// API endpoint to get all images
app.get("/api/images", async (req, res) => {
  try {
    const images = await imageManager.getAllImages();
    res.json(images);
  } catch (error) {
    console.error("Error retrieving images:", error);
    res.status(500).send("Internal Server Error");
  }
});

/* User */
app.get("/api/getVerificationCodeDetails", async (req, res) => {
  const { email } = req.query;
  try {
    const user = new userManager();
    const verificationCodeDetails = await user.getVerificationCodeDetails(email);
    
    if (verificationCodeDetails.success) {
      res.json(verificationCodeDetails);
    } else {
      res.status(500).json(verificationCodeDetails); // Use appropriate status code
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});
//Reset user password in database
app.post("/api/passwordReset", async (req, res) => {
  const {password, email} = req.body;
  try{
    const user = new userManager();
    const reserPassword = await user.resetUserPassword(password, email);

    if (reserPassword) {
      res.status(200).json({ status: "success", message: "Password Reser successful" });
    } else {
      res.status(401).json({ status: "error", message: "Unable to reset password" });
    }
  }catch(error){
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});
/* User Login */
app.get("/api/user/login", async (req, res) => {
  const { email, password } = req.query;

  try {
    const user = new userManager();
    const isLoggedIn = await user.userLogin(email, password);

    if (isLoggedIn) {
      res.status(200).json({ status: "success", message: "Login successful" });
    } else {
      res.status(401).json({ status: "error", message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

/* Get User Email by Username */
app.get("/api/user/getGmail", async (req, res) => {
  const { username } = req.query;

  try {
    const user = new userManager();
    const email = await user.getUserEmail(username);

    if (email) {
      res.status(200).json({ status: "success", email });
    } else {
      res.status(404).json({ status: "not found", message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

// Check if Gmail Exist
app.get("/api/user/gmailExist", async (req, res) => {
  const { gmail } = req.query;

  try {
    const user = new userManager();
    const gmailExists = await user.doesGmailExist(gmail);

    res.status(200).json({ status: "success", gmailExists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

// Check If Username Exists
app.get("/api/user/usernameExist", async (req, res) => {
  const { username } = req.query;

  try {
    const user = new userManager();
    const usernameExists = await user.doesUsernameExist(username);

    res.status(200).json({ status: "success", usernameExists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

/* Get Username by User ID */
app.get("/api/user/username", async (req, res) => {
  const { userID } = req.query;

  try {
    const user = new userManager();
    const username = await user.getUsername(userID);

    if (username) {
      res.status(200).json({ status: "success", username });
    } else {
      res.status(404).json({ status: "not found", message: "Username not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

/* Get User ID by Username */
app.get("/api/user/userID", async (req, res) => {
  const { email } = req.query;

  try {
    const user = new userManager();
    const userID = await user.getUserID(email);

    if (userID) {
      res.status(200).json({ status: "success", userID });
    } else {
      res.status(404).json({ status: "not found", message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

// API endpoint to get user ID by Gmail
app.get("/api/user/idByGmail", async (req, res) => {
  const { gmail } = req.query;

  try {
    // Ensure the required parameter is provided
    if (!gmail) {
      res.status(400).json({ status: "error", message: "Missing Gmail parameter" });
      return;
    }

    // Perform the user ID retrieval logic
    const user = new userManager();
    const userId = await user.getUserIdByGmail(gmail);
    console.log("userID: "+ userId);
    if (userId) {
      res.status(200).json({ status: "success", userId });
    } else {
      res.status(404).json({ status: "error", message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

// API endpoint to check if the entered password matches the one in the database
/* app.get("/api/user/passwordMatch", async (req, res) => {
  const { userId, password } = req.query;

  try {
    const user = new userManager();
    const passwordMatch = await user.doesPasswordMatch(userId, password);

    res.status(200).json({ status: "success", passwordMatch });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});
 */

/* Get User Profile Icon */
app.get("/api/user/profileIcon", async (req, res) => {
  const { userID } = req.query;

  try {
    const user = new userManager();
    const profileIcon = await user.getUserProfileIcon(userID);

    if (profileIcon.error) {
      res.status(404).json({ status: "not found", message: profileIcon.error });
    } else {
      res.status(200).json({ status: "success", profileIcon });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

/* Update User Profile */
app.post("/api/update/user/profile", async (req, res) => {
  const { userID, newUsername, newProfileIcon } = req.body;

  try {
    const user = new userManager();
    await user.updateProfile(userID, newUsername, newProfileIcon);

    res.status(200).json({ status: "success", message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

// Get user profile info
app.get('/api/get/user/profile', async (req, res) => {
 const { userID } = req.query;
 try{
  const user = new userManager();
  const userInfo = await user.getUserProfile(userID);
  if(userInfo.error){
    res.status(404).json({ status: "not found", message: userInfo.error });
  } else {
    res.status(200).json({ status: "success", userInfo });
  }

 }catch(error){
  console.error(error);
  res.status(500).json({status: "error", message: "An error occurred"});
 }
});



/* Create User Account */

app.post("/api/user/create", async (req, res) => {
  const { username, email, password, profileIcon } = req.body;

  try {
      // Ensure the required fields are provided
      if (!username || !password || !email || !profileIcon) {
          res.status(400).json({ status: "error", message: "Missing required fields" });
          return;
      }
      // Perform the user creation logic
      const user = new userManager();
      await user.createAccount(username,email, password, profileIcon);

      res.status(201).json({ status: "success", message: "User created successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

//Update User Profile Data 

/* User Deletion: */

//Courses

//endpoints for courseManager
app.get("/api/courses", async (req, res) => {
  try {
    const manager = new courseManager();
    const courses = await manager.getCourses();

    if (courses.error) {
      res.status(courses.statusCode).json({ error: courses.error });
    } else {
      // Send the courses data as a successful response
      res.status(200).json(courses);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

//Lessons
//endpoint for getting lessons
app.get("/api/lessons", async (req, res) => {
  try {
    const manager = new lessonManager();
    const lessons = await manager.getAllLessons();

    if (lessons.error) {
     res.status(lessons.statusCode).json({ error: lessons.error });
    } else {
      res.status(200).json(lessons);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//Units api-endpoints
app.get("/api/units", async (req, res) => {
  try {
    const manager = new unitManager();
    const units = await manager.getUnits();

    if (units.error) {
      res.status(500).json({ error: "An error occurred while processing the request" });
    } else {
      res.status(200).json(units);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

/* app.get("/api/unitsByCourse", async (res,req)=>{
  try{
    const manager = new unitManager();
    const unitsByCourse = await manager.getUnitsByCourse();
    if (unitsByCourse.error) {
      res.status(500).json({ error: "An error occurred while processing the request" });
    } else {
      res.status(200).json(unitsByCourse);
    }
  }catch(error){
    console.error(error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
}); */

// Lessons by Course
/* app.get("/api/lessons/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const manager = new courseManager();
    const lessons = await manager.getLessonsByCourse(courseId);

    if (lessons.error) {
      res.status(lessons.statusCode).json(lessons);
    } else {
      res.status(200).json(lessons);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
}); */

// Units by Course
app.get("/api/units/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const manager = new courseManager();
    const units = await manager.getUnitsByCourse(courseId);

    if (units.error) {
      res.status(units.statusCode).json(units);
    } else {
      res.status(200).json(units);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

// API endpoints for helpManager
app.post('/api/userMessages', async (req, res) => {
  const { message, user_gmail } = req.body;

  if (!message || !user_gmail) {
    return res.status(400).json({ error: 'Message and user_gmail are required' });
  }

  const manager = new helpManager(); // Note the class name is capitalized (HelpManager)

  const result = await manager.setUserMessage(message, user_gmail);

  if (result.error) {
    res.status(result.statusCode || 500).json({ error: result.error });
  } else {
    res.status(200).json({ message: 'User message inserted successfully' });
  }
});

app.post("/api/updateLessonCompleted", async (req, res)=>{
const {userID} = req.body;
console.log("Received userID:", userID); // Log the received userID
try{
  const lesson = new lessonManager();
  await lesson.updateLessonsCompleted(userID);

  res.status(200).json({ status: "success", message: "Profile updated successfully" });
}catch(error){
  console.error(error);
  res.status(500).json({ status: "error", message: "An error occurred" });
}
});

app.post("/api/updateActivtiesHistory", async (req, res)=>{ 
const{content, userID} = req.body;
try{
  const user = new userManager();
  await user.updateHistoryActivities(content, userID);
  res.status(200).json({ status: "success", message: "Activities updated successfully "});
}catch(error){
  console.error(error);
  res.status(500).json({ status: "error", message: "An error occurred" });
}
});
app.get('/api/userLessonActivity', async (req, res) => {
  const userID = req.query.userID; // Get userID from query parameters

  if (!userID) {
      return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const manager = new lessonManager();
      const result = await manager.getUserLessonActivity(userID);
      // Check if lessons are defined and have data
      if(result.error) {

        res.status(result.statusCode || 500).json({ error: result.error });
      } else {
        res.status(200).json({ messages: result });
      }
  } catch (error) {
      console.error('Error fetching lesson activity:', error);
      res.status(500).json({ error: 'Something went wrong' });
  }
});

// admin api-endpoints

app.get('/api/messages', async (req, res) => {

  const manager = new helpManager(); 
  const result = await manager.getMessages();
    // Check if the response contains an error
    if (result.error) {
      res.status(result.statusCode || 500).json({ error: result.error });
    } else {
      res.status(200).json({ messages: result });
    }
});

// blog api endpoint

app.get('/api/articles', async (req, res) => {
  const manager = new blogManager();
  const result = await manager.getArticleInformation();
  if (result.error) {
    res.status(result.statusCode || 500).json({ error: result.error });
  } else {
    res.status(200).json({ messages: result });
  }
});

app.get('/api/getLessonIdByLessonTitle', async (req, res) => {
  const lessonTitle = req.query.lesson_Title;
  const manager = new lessonManager();

  try {
    const result = await manager.getLessonIdByLessonTitle(lessonTitle);
    res.status(200).json(result); // Return the entire result to keep the structure
  } catch (error) {
    console.error('Error in getLessonIdByLessonTitle:', error);
    res.status(500).json({ success: false, error: 'An error occurred while fetching lesson ID' });
  }
});
