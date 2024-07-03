document
  .getElementById("resetButton")
  .addEventListener("click", async function () {
    //Get values of fields filled in
    const verificationCode = document
      .getElementById("verificationCode")
      .value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document
      .getElementById("confirmPassword")
      .value.trim();

    //Get verification code generated
    try {
      // Get the user's email from the cookie
      const gmail = getCookieValue("userEmail");
      const verification_code_response = await fetch(
        `http://localhost:5000/api/getVerificationCodeDetails?email=${encodeURIComponent(
          gmail
        )}`
      );
      const verification_code_result = await verification_code_response.json();

      // Compare the verification codes
      if (
        verification_code_result.success && verification_code_result.verificationCode === verificationCode) {
        console.log("Verification codes match");
        // Continue with the password reset logic
        //check if the passwords enter in both fields are the same
        if (newPassword === confirmPassword) {
          console.log("newPassword:", newPassword);
          console.log("gmail:", gmail);

          console.log("Passwords match");
          if (checkPasswordStrength(newPassword)) {
            // check if password is strong
            console.log("newPassword going to table in database:"+newPassword);
            console.log("gmail used:"+gmail);
            
            const passwordRespone = await fetch(
              "http://localhost:5000/api/passwordReset",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ password: newPassword, email: gmail }),
              }
            );

            if (passwordRespone.ok) {
              console.log("Password reset successful");
              // Perform actions for a successful password reset
            } else {
              console.error(
                "Failed to reset password:",
                passwordResponse.statusText
              );
              // Handle failure, e.g., show an error message to the user
            }
          } else {
            alert("Password isn't strong");
          }
        } else {
          alert("The new password doesn't match the confirmation password");
        }
      } else {
        alert(
          "The verification Code entered doesn't match the code you recieved. Please check if you entered it correctly"
        );
      }
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred while getting the information. Please try again."
      );
    }
  });

//Function to get the value of a specific cookie
function getCookieValue(cookieName) {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${cookieName}=`)) {
      return cookie.substring(cookieName.length + 1);
    }
  }

  return null;
}
// Function to check password strength
function checkPasswordStrength(password) {
  const errors = [];

  // Check if password is at least 6 characters long
  if (password.length < 6) {
    errors.push("Password should be at least 6 characters long.");
  }

  // Check if password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push("Password should contain at least one uppercase letter.");
  }

  // Check if password contains at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password should contain at least one special character.");
  }

  // Check if password contains at least one number
  if (!/\d/.test(password)) {
    errors.push("Password should contain at least one number.");
  }

  return errors.length === 0 ? true : errors;
}
