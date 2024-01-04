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
      const userIDResponse = await fetch(`http://localhost:5000/api/user/idByGmail?gmail=${encodeURIComponent(userGmail)}`);
      const userIDResult = await userIDResponse.json();
      
      if (userIDResult.status === 'success' && userIDResult.userId) {
        // Now, check if the entered password matches the one in the database
        const passwordMatchResponse = await fetch(`http://localhost:5000/api/user/passwordMatch?userId=${userIDResult.userId}&password=${encodeURIComponent(userPassword)}`);
        const passwordMatchResult = await passwordMatchResponse.json();

        if (passwordMatchResult.status === 'success' && passwordMatchResult.passwordMatch) {
          // Password match, procced with login of user
          
          /* console.log("Login successful!");
          console.log("userIDResult",userIDResult);
          console.log("UserID:",userIDResult.userId); */

          // Redirect to the course page
          window.location.href = "/School_Website/html/course.html";
                  

        } else {
          alert("Incorrect password. Please try again.");
        }
      } else {
        alert("User not found. Please check your credentials.");
      }
    } else {
      alert("Gmail doesn't exist. Please check if you have entered the correct gmail.");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while checking the information. Please try again.");
  }
}

// Attach the function to the button click event
document.getElementById("loginButton").addEventListener("click", validateAndFetchUserInfo);
