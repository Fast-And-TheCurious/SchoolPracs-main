const express = require("express");
const app = express();
//const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const cookieParser = require('cookie-parser');
//oim
app.use(cookieParser());

const { createConnection } = require("./database");
const unitManager = require("./unitManager")
const lessonManager = require("./lessonManager");
const helpManager = require("./helpManager");
const signUpManager = require("./signUpManager");
const loginManager = require("./loginManager");
const courseManager = require("./courseManager");
const userManager = require("./userManager"); 


//app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

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


// Check session middleware
/* app.use((req, res, next) => {
  const sessionToken = req.cookies.sessionToken;

  if (isValidSession(sessionToken)) {
    req.user = getUserBySession(sessionToken);
  } else {
    req.user = null;
  }

  next();
}); */
//api end-points

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

/* Check If Email Exists */
app.get("/api/user/email", async (req, res) => {
  const { email } = req.query;

  try {
    const user = new userManager();
    const emailExists = await user.doesEmailExist(email);

    res.status(200).json({ status: "success", emailExists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

/* Check If Username Exists */
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

/* Search Users */
app.get("/api/user/search", async (req, res) => {
  const { userID, searchUser } = req.query;

  try {
    const user = new userManager();
    const userList = await user.getListOfUsernames(userID, searchUser);

    res.status(200).json({ status: "success", userList });
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
app.post("/api/user/createAccount", async (req, res) => {
  const { username, password, emailAddress } = req.body;

  try {
    const user = new userManager();
    await user.createAccount(username, password, emailAddress);

    res.status(200).json({ status: "success", message: "Account created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});
//Update User Profile Data 
app.put("/api/user/updateProfile", (req, res) => {
  const { userID, newUsername, newProfileIcon } = req.body;

  let user = new userManager();

  user
    .updateProfile(newUsername, newProfileIcon, userID)
    .then((result) => {
      res.status(200).send({ message: "Profile updated successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred while updating profile");
    });
});
/* Change Password: */

app.put("/api/user/changePassword", (req, res) => {
  const { userID, newPassword } = req.body;

  let user = new userManager();

  user
    .changePassword(userID, newPassword)
    .then((result) => {
      res.status(200).send({ message: "Password changed successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred while changing password");
    });
});
/* User Deletion: */
app.delete("/api/user/deleteAccount", (req, res) => {
  const { userID } = req.body;

  let user = new userManager();

  user
    .deleteAccount(userID)
    .then((result) => {
      res.status(200).send({ message: "Account deleted successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred while deleting account");
    });
});

//Courses

//endpoints for courseManager
app.get("/api/courses", async (req, res) => {
  try {
    const manager = new courseManager();
    const courses = await manager.getCourses();

    if (courses.error) {
      // If there's an error, set the appropriate status code and send an error response
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
      // Send the units data as a successful response
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

// Get all help messages
app.get('/api/help/messages', async (req, res) => {
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
});
