#!/usr/bin/env node
const mysql = require("mysql2");

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


// Perform a SELECT query to fetch CourseID, Title, and Description
connection.query("SELECT CourseID, Title, Description FROM Course", (err, results) => {
  if (err) {
    console.error("Error executing query:", err);
    return;
  }
  
  
  // Process the results
  results.forEach((row) => {/* Make a for loop that works with the specific unit and course unit, adds the lesson data needed for the object that handlebars uses */
    row.unitLessons = "Hello";
    console.log("Data from database");
    let id = row.CourseID;
    console.log(`CourseID: ${row.CourseID}, Title: ${row.Title}, Description: ${row.Description}`);
  });
  console.log(results);

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




module.exports = {update, select};
});