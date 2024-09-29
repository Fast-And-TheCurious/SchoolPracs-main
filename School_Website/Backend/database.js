const mysql = require("mysql2");
// MySQL infomation 
const connection = mysql.createConnection({
  host: "localhost", 
  user: "root",  
  password: "CtMBgwiukcXGdKCRlfj8T6",
  database: "bryantmdb",
});
module.exports = connection;

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

function update(query, values) {
  return new Promise((resolve, reject) => {
    console.log('Executing query:', query, 'with values:', values);
    
    connection.query(query, values, function (err, results) {
      if (err) {
        console.error('Error executing query:', err);
        reject(err);
      } else {
        console.log('Query executed successfully.');
        resolve(results);
      }
    });
  });
}

function select(query, values) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error("Error with receiving data:", err);
        reject(err);
      } else {
        console.log("Received the data!");
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

module.exports = { createConnection, update, select, endConnection };