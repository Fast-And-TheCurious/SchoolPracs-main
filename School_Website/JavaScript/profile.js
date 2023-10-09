document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));  
  });
  
  const userNumCompletedCourses = document.querySelector("#num_completedCourses");
  const userNumPoints = document.querySelector("#num_points");
  const checkbox = document.getElementById("ThemeSettingsCheck");
  const themeUpdateBtn = document.querySelector("#theme_updated_btn");
  const logout = document.querySelector("#logout_button");
  const username = document.querySelector("#username");
  const userEmail = document.querySelector("#user-email");
  const historyContent = document.getElementById("history_content");
/* 
What I needed to do: 

updated theme 
logout user btn
get user ID
get user email
get user username
get user history
get user num completed courses
get user points

*/
async function getUserID() {
    const server = "http://127.0.0.1:5000/api/user/userID";
    const query = `?gmail=${userGmail.value}`;  
    return fetch(server + query)
      .then((response) => {
        if (response.ok) {
          return response.json(); 
        } else {
          throw new Error('Failed to fetch user ID');
        }
      })
      .catch((error) => {
        console.error(error);
        throw error; // Rethrow the error to be handled by the caller
      });
  }
  
// Usage example:
const userGmail = document.getElementById('userGmail'); // Replace with the actual element
getUserID()
  .then((userID) => {
    if (userID !== null) {
      console.log(`User's ID: ${userID}`);
      // Do something with the user's ID, such as storing it in a variable or using it in your application
    } else {
      console.log('User not found or error occurred.');
      // Handle the case where the user is not found or an error occurred
    }
  })
  .catch((error) => {
    console.error(error);
    // Handle errors gracefully
  });



  async function getUsername(userID) {
    try {
      const server = "http://127.0.0.1:5000/api/user/username";
      const query = `?userID=${userID}`;
      const response = await fetch(server + query);
  
      if (response.ok) {
        const data = await response.json();
        return data.username; // Assuming the server sends the username in the response
      } else if (response.status === 404) {
        return null; // User not found
      } else {
        throw new Error('Failed to fetch username');
      }
    } catch (error) {
      console.error(error);
      return null; // Handle errors gracefully
    }
  }
  
  // Usage example:
const userID = userID; // Replace with the actual userID
getUsername(userID)
  .then((username) => {
    if (username !== null) {
      console.log(`User's username: ${username}`);
      // Do something with the username
    } else {
      console.log('User not found or error occurred.');
      // Handle the case where the user is not found or an error occurred
    }
  })
  .catch((error) => {
    console.error(error);
    // Handle errors gracefully
  });
async function getUserPoints(){

}
async function getUserCompletedCourses(){

}
async function getUserHistory(){

}
async function getUserEmail(userID) {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/user/gmail?username=${userID}`);
      if (response.ok) {
        const data = await response.json();
        return data.email; // Assuming the server sends the email in the response
      } else if (response.status === 404) {
        return null; 
      } else {
        throw new Error('Failed to fetch user email');
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }











  let systemNumber = 0; // Initial value

  // Function to update the value and the content of the span
  function updateValue() {
      systemNumber++; // Update the value (for example, increment by 1)
      document.getElementById("system-number").textContent = systemNumber; // Update the content
  }

  // Call the updateValue function to update the value and content
  updateValue();

 
  const body = document.body;

  checkbox.addEventListener("change", function() {
      if (checkbox.checked) {
          body.classList.remove("light-mode");
          body.classList.add("dark-mode");
      } else {
          body.classList.remove("dark-mode");
          body.classList.add("light-mode");
      }
  });
  


  const newContent = `
  <li>Updated Function 1</li>
  <li>Updated Function 2</li>
  <li>Updated Function 3</li>
`;

// Select the ul element by its id


// Change the content of the ul element
historyContent.innerHTML = newContent;