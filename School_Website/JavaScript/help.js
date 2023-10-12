const { response } = require("express");

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));  
  });
  
  const submitButton = document.querySelector("#submit");
  const userMessage = document.querySelector("#message");

  
  async function getUserID() {
    const server = "http://127.0.0.1:5000/api/user/userID";
    const query = `?email=${userGmail.value}`;
  
    fetch(server + query)
      .then((response) => response.json())
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  }

submitButton.addEventListener("click", function(){
    const server = "https://127.0.0.1:5000/api/user/help";
    const query = `?message=${userMessage}`;

    fetch(server+query)
    .then((response)=> response.jason())
    .then((data)=>{
        if(!data){
            console.log("NO data");
        }else{
            getUserID();
        }
    })
    .catch((error)=>{
        console.log(error);
    });
});