#!/usr/bin/env node
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "102.130.115.69",
  user: "bryantm",
  password: "Reddam2021@1",
  database: "bryantmDB",
});

function update(query) {
  connection.query(query, function (err) {
    if (err) throw err;
  });//delete,update,create,insert
}

function select(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) {
        console.error("Error with recieving data:", err);
        reject(err);
      } else {
        console.log("Recieved the data!");
        resolve(result);
      }
    });
  });
}

function createConnection() {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error("Error connecting to MySQL server:", err);
        reject(err);
      } else {
        console.log("Connected to MySQL server!");
        resolve();
      }
    });
  });
}
// Perform a SELECT query to fetch CourseID, Title, and Description
connection.query("SELECT CourseID, Title, Description FROM Course", (err, results) => {
  if (err) {
    console.error("Error executing query:", err);
    return;
  }

  // Process the results
  results.forEach((row) => {
    console.log("Data from database");
    console.log(`CourseID: ${row.CourseID}, Title: ${row.Title}, Description: ${row.Description}`);
  });


function select(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) {
        console.error("Error with recieving data:", err);
        reject(err);
      } else {
        console.log("Recieved the data!");
        resolve(result);
      }
    });
  });
}

function endConnection() {
  connection.end((err) => {
    if (err) throw err;
    console.log("Disconnected from MySQL database!");
  });
}

module.exports = {createConnection,update, select,endConnection};
});
