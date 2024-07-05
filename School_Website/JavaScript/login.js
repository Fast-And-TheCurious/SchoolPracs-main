/* 1	user1	user1@example.com	password1 */
async function validateAndFetchUserInfo() {
  // Get user input
  const userGmail = document.querySelector("#Gmail").value.trim();
  const userPassword = document.querySelector("#Password").value.trim();

  // Check if input values are not empty
  if (userGmail === '' || userPassword === '') {
    alert("Please fill in all the fields.");
    return; // Stop execution if fields are empty
  }

  try {
    // Check if the Gmail exists
    const gmailResponse = await fetch(`http://localhost:5000/api/user/gmailExist?gmail=${encodeURIComponent(userGmail)}`);
    const gmailResult = await gmailResponse.json();

    if (gmailResult.status === 'success' && gmailResult.gmailExists) {
      // If the Gmail exists, proceed to check the password
      const loginResponse = await fetch(`http://localhost:5000/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userGmail,
          password: userPassword
        })
      });
      const loginResult = await loginResponse.json();

      if (loginResult.status === 'success' && loginResult.loggedIn) {
        // Login successful
        window.location.href = "/School_Website/html/course.html";
      } else {
        // Incorrect password
        alert("Incorrect password. Please try again.");
      }
    } else {
      // Gmail doesn't exist
      alert("Gmail doesn't exist. Please check if you have entered the correct Gmail.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred while checking the information. Please try again.");
  }
}


// Attach the function to the button click event
document.getElementById("loginButton").addEventListener("click", validateAndFetchUserInfo);
