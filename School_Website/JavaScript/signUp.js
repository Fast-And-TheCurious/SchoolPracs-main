document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));  
  });

const signUpButton = document.querySelector("#signUpButton");
const userGmail = document.querySelector("#gmail");
const userPassword = document.querySelector("#password");
const userUsername = document.querySelector("#username");

/* methods:
 does email entered exist in database
 does username already exist
 */

 const server = "http://127.0.0.1:5000/api/user/email";