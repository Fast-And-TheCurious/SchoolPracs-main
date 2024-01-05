document.getElementById("resetButton").addEventListener("click", async function () {
  const userEmail = document.getElementById("email").value;

  try {
      // Make a fetch request to your server to initiate the password reset process
      const response = await fetch("http://localhost:5000/api/user/resetPassword", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email: userEmail,
          }),
      });

      if (response.ok) {
          console.log('Password reset initiated successfully!');
          // Handle success, e.g., show a success message to the user
      } else {
          console.error('Failed to initiate password reset:', response.statusText);
          // Handle failure, e.g., show an error message to the user
      }
  } catch (error) {
      console.error('Error:', error);
      // Handle other errors, e.g., network issues
  }
});
