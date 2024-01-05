const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const { createConnection } = require("./database");
const unitManager = require("./unitManager")
const lessonManager = require("./lessonManager");
const helpManager = require("./helpManager");
const signUpManager = require("./signUpManager");
const loginManager = require("./loginManager");
const courseManager = require("./courseManager");
const userManager = require("./userManager"); 
const topicManager = require("./topicManager");
const imageManager = require('./imageManager');

// Import email and password reset logic modules
const { sendPasswordResetEmail } = require('./gmailService');
const { initiatePasswordReset } = require('./gmailManager');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

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
// API endpoint to initiate the password reset process
app.post('/api/user/resetPassword', async (req, res) => {
  const { email } = req.body;

  try {
      // Call the function from your Gmail manager to initiate the password reset process
      const result = await initiatePasswordReset(email);

      if (result.success) {
          res.status(200).json({ status: 'success', message: result.message });
      } else {
          res.status(400).json({ status: 'error', message: result.message });
      }
  } catch (error) {
      console.error(error);
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

// See if need to delete?
app.post("/api/signup", (req, res) => {
  const { username, gmail, password } = req.body;

  // Perform the signup action (validate, store in the database, etc.)

  // Set cookies
  res.cookie('username', username);
  res.cookie('gmail', gmail);
  res.cookie('password', password);

  // Send a response, or redirect to another page if needed
  res.status(200).json({ message: "Signup successful" });
});

/* User */

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
app.get("/api/user/passwordMatch", async (req, res) => {
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
/* Get User Profile */
app.get("/api/user/profile", async (req, res) => {
  const { userID } = req.query;

  try {
    const user = new userManager();
    const userProfile = await user.getUserProfile(userID);

    if (userProfile) {
      res.status(200).json({ status: "success", userProfile });
    } else {
      res.status(404).json({ status: "not found", message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

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
app.post("/api/user/profile", async (req, res) => {
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

/* Change Password: */

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

//Units
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

// Lessons by Course
app.get("/api/lessons/:courseId", async (req, res) => {
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
});

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

/* app.get('/api/help/messages', async (req, res) => {
  try {
    const messages = await helpManager.getAllMessages();
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred');
  }
});

// Get help message by ID
app.get('/api/help/messages/:message_id', async (req, res) => {
  const { message_id } = req.params;
  try {
    const message = await helpManager.getMessageById(message_id);
    if (!message) {
      res.status(404).send('Message not found');
    } else {
      res.status(200).json(message);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred');
  }
});

// Create a new help message
app.post('/api/help/messages', async (req, res) => {
  const { user_id, message_text } = req.body;
  try {
    const newMessage = await helpManager.createMessage(user_id, message_text);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred');
  }
});

// Update help message by ID
app.put('/api/help/messages/:message_id', async (req, res) => {
  const { message_id } = req.params;
  const { message_text } = req.body;
  try {
    const updatedMessage = await helpManager.updateMessage(message_id, message_text);
    if (!updatedMessage) {
      res.status(404).send('Message not found');
    } else {
      res.status(200).json(updatedMessage);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred');
  }
});

// Delete help message by ID
app.delete('/api/help/messages/:message_id', async (req, res) => {
  const { message_id } = req.params;
  try {
    const deletedMessage = await helpManager.deleteMessage(message_id);
    if (!deletedMessage) {
      res.status(404).send('Message not found');
    } else {
      res.status(200).json(deletedMessage);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred');
  }
}); */
