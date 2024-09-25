async function validateAndFetchUserInfo() {
  // Get user input
  const userGmail = document.querySelector("#Gmail").value.trim();
  const userPassword = document.querySelector("#Password").value.trim();

  // Check if input values are not empty
  if (userGmail === "" || userPassword === "") {
    alert("Please fill in all the fields.");
    return; // Stop execution if fields are empty
  }

  try {
    // Check if the Gmail exists
    const gmailResponse = await fetch(
      `http://localhost:5000/api/user/gmailExist?gmail=${encodeURIComponent(
        userGmail
      )}`
    );
    const gmailResult = await gmailResponse.json();

    if (gmailResult.status === "success" && gmailResult.gmailExists) {
      // If the Gmail exists, proceed to check the password
      const loginResponse = await fetch(
        `http://localhost:5000/api/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userGmail,
            password: userPassword,
          }),
        }
      );
      //Handle login response
      const loginResult = await loginResponse.json();

      if (loginResult.status === "success" && loginResult.loggedIn) {
        // Login successful
        const userIDResponse = await fetch(
          `http://localhost:5000/api/user/idByGmail?gmail=${encodeURIComponent(userGmail)}`);
        
        if (!userIDResponse.ok) {
          throw new Error("Failed to fetch user ID");
        }

        const userIDResult = await userIDResponse.json();
        const userID = userIDResult.userId;
        //set Cookie

        // Set a cookie for the selected image with expiration date (expires in 1 day)
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000);

        document.cookie = `userID= ${userID};  expires=${expirationDate.toUTCString()}; path=/`;

        window.location.href = "/School_Website/html/profile.html";
      } else {
        // Incorrect password
        alert("Incorrect password. Please try again.");
      }
    } else {
      // Gmail doesn't exist
      alert(
        "Gmail doesn't exist. Please check if you have entered the correct Gmail."
      );
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert(
      "An error occurred while checking the information. Please try again."
    );
  }
}

// Function to get the expiration time for the cookie (e.g., 1 hour from now)
function getCookieExpiration() {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 1 hour
  return expirationDate.toUTCString();
}

// Attach the function to the button click event
document
  .getElementById("loginButton")
  .addEventListener("click", validateAndFetchUserInfo);
