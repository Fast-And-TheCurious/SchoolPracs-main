document.addEventListener('DOMContentLoaded', function () {
  fetch('http://localhost:5000/getAll')
  .then(response => response.json())
  .then(data => loadHTMLTable(data['data']));  
});

const loginButton = document.querySelector("#loginButton");
const userGmail = document.querySelector("#Gmail");
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
    const query = `?gmail=${userGmail.value}&password=${userPassword.value}`;
  
    fetch(server + query)
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          const loginError = document.getElementById("LoginError");
          loginError.style.visibility = "visible";
        } else {
          getUserID();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
  
  async function getUserID() {
    const server = "http://127.0.0.1:5000/api/user/userID";
    const query = `?gmail=${userGmail.value}`;
  
    fetch(server + query)
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
      });
  }
