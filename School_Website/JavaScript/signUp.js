/* document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));  
  });
 */
 
/* methods:
 does email entered exist in database
 does username already exist
 */
// signup.js
//change code

// Check if fields have values
function validateAndSubmit() {
  // Get input values
  const username = document.getElementById("username").value;
  const gmail = document.getElementById("gmail").value;
  const password = document.getElementById("password").value;

  // Check if input values are not empty
  if (username.trim() === '' || gmail.trim() === '' || password.trim() === '') {
      alert("Please fill in all the fields.");
  } else {
      // Perform the signup action 
      alert(`Signup successful!\nUsername: ${username}\nGmail: ${gmail}\nPassword: ${password}`);
 
      // Set a cookie for the user information with expiration date (expires in 1 days)
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1);
      
      document.cookie = `username=${username}; expires=${expirationDate.toUTCString()}`;
      document.cookie = `gmail=${gmail}; expires=${expirationDate.toUTCString()}`;
      document.cookie = `password=${password}; expires=${expirationDate.toUTCString()}`;
      
    
          // Redirect to the new HTML page     
      window.location.href = "/School_Website/html/imageSelection.html";
  }
}

// Attach the function to the button click event
document.getElementById("signUpButton").addEventListener("click", validateAndSubmit);

/* signUpButton.addEventListener("click", function () {
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
 */