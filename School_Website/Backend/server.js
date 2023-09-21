const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

const { createConnection } = require("./database");

app.use(cors());

app.use(express.json());

async function connectToDatabase() {
    try {
      await createConnection();
      console.log("Connection established");
    } catch (error) {
      // Handle the error appropriately
      console.error("Error connecting to the database:", error);
    }
  }
  
  // Call the connectToDatabase function
  connectToDatabase();

  

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));