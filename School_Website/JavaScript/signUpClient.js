function writeFile() {
    const textToFileSignUpUsername = document.getElementById("username").value;
    const textToFileSignUpGmail = document.getElementById("gmail").value;
    const textToFileSignUpPassword = document.getElementById("password").value;
   
    console.log("Username: "+textToFileSignUpUsername);
    console.log("Gmail: "+textToFileSignUpGmail);
    console.log("Password: "+textToFileSignUpPassword);
  
    // Create a JavaScript object with "data" as the key and the input string as the value
    var dataObjectUsername = { username: textToFileSignUpUsername };
    var dataObjectUserGmail = { userGmail: textToFileSignUpGmail };
    var dataObjecUserPasswordt = { userPassword: textToFileSignUpPassword };
    // Convert the JavaScript object to a JSON string
    var jsonObject = JSON.stringify(dataObjectUsername);
  
    console.log(jsonObject);
  
    fetch("http://127.0.0.1:5555/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: jsonObject,
    })
      .then((response) => response.text())
      .then((responseData) => {
        console.log("Response:", responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      /*  */
      var jsonObjectPass = JSON.stringify(dataObjecUserPasswordt);
  
    console.log(jsonObjectPass);
  
    fetch("http://127.0.0.1:5555/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: jsonObjectPass,
    })
      .then((response) => response.text())
      .then((responseData) => {
        console.log("Response:", responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      /*  */
      var jsonObjectGmail = JSON.stringify(dataObjectUserGmail);
  
      console.log(jsonObjectGmail);
    
      fetch("http://127.0.0.1:5555/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: jsonObjectGmail,
      })
        .then((response) => response.text())
        .then((responseData) => {
          console.log("Response:", responseData);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  
  }