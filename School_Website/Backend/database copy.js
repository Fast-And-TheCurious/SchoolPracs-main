#!/usr/bin/env node
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "102.130.115.69",
  user: "bryantm",
  password: "Reddam2021@1",
  database: "bryantmDB",
});

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

function endConnection() {
  connection.end((err) => {
    if (err) throw err;
    console.log("Disconnected from MySQL database!");
  });
}