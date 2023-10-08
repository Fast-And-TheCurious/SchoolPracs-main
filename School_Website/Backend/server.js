const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const cors = require("cors");


const { createConnection } = require("./database");

/* const lessonManager = require("./lessonManager");
const HelpManager = require("./helpManager");
const TopicManager = require("./topicManager");
const SignUpManager = require("./signUpManager");
const CourseManager = require("./courseManager");
const LoginManager = require("./loginManager");
*/

const userManager = require("./userManager"); 

app.use(bodyParser.json());

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

//All the api end-points
/* User */
app.get("/api/user/login", (req, res) => {
  const { username, password } = req.query;

  let user = new UserManager();

  user.userLogin(username, password).then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    }).catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});
app.get("/api/user/email", (req, res) => {
  const { email } = req.query;

  let user = new userManager();

  user
    .doesEmailExist(email)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/user/usernameExist", (req, res) => {
  const { username } = req.query;

  let user = new userManager();

  user
    .doesUsernameExist(username)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/user/username", (req, res) => {
  const { userID } = req.query;

  let user = new userManager();

  user
    .getUsername(userID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/user/userID", (req, res) => {
  const { username } = req.query;

  let user = new userManager();

  user
    .getUserID(username)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});
app.get("/api/user/search", (req, res) => {
  const { userID, searchUser } = req.query;

  let user = new userManager();

  user
    .getListOfUsernames(userID, searchUser)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/user/profile", (req, res) => {
  const { userID } = req.query;

  let user = new userManager();

  user
    .getUserProfile(userID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});

app.get("/api/user/profileIcon", (req, res) => {
  const { userID } = req.query;

  let user = new userManager();

  user
    .getUserProfileIcon(userID)
    .then((jsonifiedResult) => {
      res.status(200).send(jsonifiedResult);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred");
    });
});
app.post("/api/user/profile", (req, res) => {
  const userID = req.body.userID;
  const newUsername = req.body.newUsername;
  const newProfileIcon = req.body.newProfileIcon;
  let user = new userManager();
  user.updateProfile(
    userID,
    newUserName,
    newProfileIcon,
  );
  res.json({ message: "Data received and processed successfully" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));