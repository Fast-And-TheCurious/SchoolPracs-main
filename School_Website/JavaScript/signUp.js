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
// signup.js
//change code

signUpButton.addEventListener("click", function () {
  const server = "http://127.0.0.1:5000/api/user/createAccount";
  const requestBody = {
    gmail: userGmail.value,
    password: userPassword.value,
    username: userUsername.value,
  };

  fetch(server, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        console.log("Account created successfully");
        // Redirect or perform other actions after successful registration
      } else {
        console.error("Error creating an account.");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
