/* document.addEventListener('DOMContentLoaded', function () {
  fetch('http://localhost:5000/getAll')
  .then(response => response.json())
  .then(data => loadHTMLTable(data['data']));  
});
 */
const loginButton = document.querySelector("#loginButton");
const userEmail = document.querySelector("#Gmail");
const userPassword = document.querySelector("#Password");

// add hiding and viewing of function later
/* togglePasswordView.addEventListener("click", function () {
    let nextView = togglePasswordView.innerHTML == "Open" ? "Close" : "Open";
    togglePasswordView.innerHTML = nextView;
    passwordInput.type = nextView == "Open" ? "text" : "password";
  });
  
  toggleInputView.addEventListener("click", function () {
    let nextView = toggleInputView.innerHTML == "Open" ? "Close" : "Open";
    toggleInputView.innerHTML = nextView;
    inputInput.type = nextView == "Open" ? "text" : "password";
  }); */

  loginButton.addEventListener("click", function () {

    const server = "http://127.0.0.1:5000/api/user/login";
    const query = `?email=${userEmail.value}&password=${userPassword.value}`;
  
    fetch(server + query)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (!data) {
          const loginError = document.getElementById("LoginError");
          loginError.style.visibility = "visible";
        } else {
          
          // After a successful login, set the session cookie
          setSessionCookie(data.sessionToken);
          getUserID();

        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
  
  // Function to set the session cookie
  function setSessionCookie(sessionToken) {   
    const expiryDate = new Date(0);  
    document.cookie = `sessionToken=${sessionToken}; expires=${expiryDate.toUTCString()}; path=/`;
  }
  
  async function getUserID(callback) {
    const server = "http://127.0.0.1:5000/api/user/userID";
    const query = `?email=${userEmail.value}`;
  
    try {
      const response = await fetch(server + query);
      const data = await response.json();
      if (data.status === "success") {
        // User ID fetched successfully, handle here
        const userIDd= data.userID;
        if (callback) {
          callback(userIDd);
          console.log(callback);
          //direct to user profile or course page
          
        }
      } else {
        console.error("User ID not found.");
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  