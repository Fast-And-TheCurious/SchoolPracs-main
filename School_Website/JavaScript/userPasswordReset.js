document.getElementById("submitButton").addEventListener("click", async function () {
  const userEmail = document.getElementById("email").value;
// Check if the user entered a valid Gmail address
if (!isValidEmail(userEmail)) {
    alert("Please enter a valid Gmail address.");
    return; // Stop the function execution if the email is not valid
}
  try {
      // Make a fetch request to your server to initiate the password reset process
      const response = await fetch("http://localhost:5000/api/user/resetPassword", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: userEmail}),
      });


      if (response.ok) {
        console.log('Password reset initiated successfully!');

        // Handle success. Showing a success message to the user
        alert("Check your email for the verification code!");
    
        // Redirect user to password reset form page
        window.location.href = "/School_Website/html/userPasswordResetForm.html";
      } else {
        console.error('Failed to initiate password reset:', response.statusText);
        // Handle failure, e.g., show an error message to the user
      }
  } catch (error) {
      console.error('Error:', error);
      // Handle other errors, e.g., network issues
  }
});
//doesn't really work
// Function to check if the entered email is a valid Gmail address
function isValidEmail(email) {
    // Regular expression for a simple validation of Gmail address
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    return emailRegex.test(email);
}
/* he isValidEmail function checks if the entered email is a valid Gmail address using a simple regular expression.
If the entered email is not valid, it displays an alert to the user.
If the email is valid, it proceeds with the password reset initiation logic. */