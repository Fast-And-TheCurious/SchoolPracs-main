document.getElementById("submitButton").addEventListener("click", async function () {
  const userEmail = document.getElementById("email").value;
   // Set a cookie with the user's email
   document.cookie = `userEmail=${userEmail}; expires=${getCookieExpiration()}; path=/`;

// Check if the user entered a valid Gmail address
/* Need to check if the email entered exists in the database */
if (!isValidEmail(userEmail)) {
    alert("Please enter a valid Gmail address.");
    return; // Stop the function execution if the email is not valid
}
  try {
    // Make fetch request to server to check if gmail exist in the database
    const emailExistRespone = await fetch(`http://localhost:5000/api/user/gmailExist?gmail=${encodeURIComponent(userEmail)}`);
    const emailExistResult = await emailExistRespone.json();
    // Login to check if email exists
    if(emailExistResult.status ==='success' && emailExistResult.gmailExists){
      //Success continue to run code
     
      // Make fetch request to server to initiate the password reset process
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
    }else{
      alert("Enter a valid gmail.");// change error message
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
// Function to get the expiration time for the cookie (e.g., 1 hour from now)
function getCookieExpiration() {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 1 hour
  return expirationDate.toUTCString();
}