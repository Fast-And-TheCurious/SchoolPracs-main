document
  .getElementById("resetButton")
  .addEventListener("click", async function () {

    //Get values of fields filled in
    const verificationCode = document.getElementById("verificationCode").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    //Get verification code generated
    try {
      // Get the user's email from the cookie
      const gmail = getCookieValue("userEmail");
      const verification_code_response = await fetch(`http://localhost:5000/api/getVerificationCodeDetails?email=${encodeURIComponent(gmail)}`);
      const verification_code_result = await verification_code_response.json();

      // Compare the verification codes
      if (
        verification_code_result.success &&
        verification_code_result.verificationCode === verificationCode) {

        console.log("Verification codes match");
        // Continue with the password reset logic
        if (newPassword === confirmPassword) {
         console.log("Passwords match");
         const passwordRespone = await fetch(`http://localhost:5000/api/passwordReset?password=${encodeURIComponent(newPassword)}`);
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
