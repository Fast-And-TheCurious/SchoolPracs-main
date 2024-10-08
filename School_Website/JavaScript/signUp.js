// Check if fields have values
async function validateAndSubmit() {
  // Get input values
  const username = document.getElementById("username").value;
  const gmail = document.getElementById("gmail").value;
  const password = document.getElementById("password").value;

  const usernameMinLength = 3;
  const usernameMaxLength = 20;
  const gmailMinLength = 6; 
  const gmailMaxLength = 30;

  // Check if input values are not empty
  if (username.trim() === '' || gmail.trim() === '' || password.trim() === '') {
    alert("Please fill in all the fields.");
  } else {
    // Check password strength
    const passwordStrengthResult = checkPasswordStrength(password);

    if (passwordStrengthResult !== "Password is strong!") {
      alert(passwordStrengthResult);
      return; // Stop execution if password is not strong
    }

  // Check username length
  if (username.length < usernameMinLength || username.length > usernameMaxLength) {
    alert(`Username must be between ${usernameMinLength} and ${usernameMaxLength} characters long.`);
    return; // Stop execution
  }

  // Check Gmail length
  if (gmail.length < gmailMinLength || gmail.length > gmailMaxLength) {
    alert(`Gmail must be between ${gmailMinLength} and ${gmailMaxLength} characters long.`);
    return; // Stop execution
  }
    try {
      // Check if the username exists on the server
      const usernameResponse = await fetch(`http://localhost:5000/api/user/usernameExist?username=${encodeURIComponent(username)}`);
      const usernameResult = await usernameResponse.json();

      // Check if the Gmail exists on the server
      const gmailResponse = await fetch(`http://localhost:5000/api/user/gmailExist?gmail=${encodeURIComponent(gmail)}`);
      const gmailResult = await gmailResponse.json();

      if (usernameResult.status === 'success' && usernameResult.usernameExists) {
        alert("Username already exists. Please choose a different username.");
      } else if (gmailResult.status === 'success' && gmailResult.gmailExists) {
        alert("Gmail address already exists. Please use a different Gmail address.");
      } else {

        // Set a cookie for the user information with an expiration date (expires in 1 day)
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + (1 * 24 * 60 * 60 * 1000));

        document.cookie = `username=${username}; expires=${expirationDate.toUTCString()}`;
        document.cookie = `gmail=${gmail}; expires=${expirationDate.toUTCString()}`;
        document.cookie = `password=${password}; expires=${expirationDate.toUTCString()}`;

        // Redirect to the new HTML page
        window.location.href = "/School_Website/html/imageSelection.html";
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while checking the information. Please try again.");
    }
  }
}

// Attach the function to the button click event
document.getElementById("signUpButton").addEventListener("click", validateAndSubmit);

function checkPasswordStrength(password) {
  // Check if password is at least 6 characters long
  if (password.length < 6 ) {
    return "Password should be at least 6 characters long.";
  }
  if(password.length>20){
    return "Password can only be 20 characters long."
  }
  // Check if password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return "Password should contain at least one uppercase letter.";
  }

  // Check if password contains at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password should contain at least one special character.";
  }

  // Check if password contains at least one number
  if (!/\d/.test(password)) {
    return "Password should contain at least one number.";
  }

  // If password passes all criteria
  return "Password is strong!";
}
