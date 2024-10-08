document.addEventListener('DOMContentLoaded', function () {
    // Function to get cookie value by name ==== check if this is really needed
    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName.trim() === name) {
                return cookieValue;
            }
        }
        return null;
    }

    // ImageDisplay element 
    const imageDisplay = document.getElementById("imageDisplay");

    // Read cookie for selectedImage
//Gets all cookies as a string
const cookiesString = document.cookie;

//Split the cookies string into an array of individual cookie strings
const cookiesArray = cookiesString.split('; ');

//Initialize a variable to hold the selectedImage cookie
let selectedImageCookie = null;

//Loop through each cookie string to find the one starting with 'selectedImage='
for (let i = 0; i < cookiesArray.length; i++) {
    const cookie = cookiesArray[i];
    if (cookie.startsWith('selectedImage=')) {
        selectedImageCookie = cookie;
        break; // Exit the loop once the desired cookie is found
    }
}

//Initialize a variable to hold the image value
let selectedImage = null;

//If the selectedImageCookie was found, split it to get the value part
if (selectedImageCookie) {
    const parts = selectedImageCookie.split('=');
    if (parts.length > 1) {
        selectedImage = parts[1]; // Assign the value part to selectedImage
    }
}

    // Set src attribute of the image element
    if (imageDisplay && selectedImage) {
        imageDisplay.src = selectedImage;
    }

    // Display information from cookies    
    document.getElementById("usernameDisplay").innerText = getCookie("username") || "N/A";
    document.getElementById("gmailDisplay").innerText = getCookie("gmail") || "N/A";
    document.getElementById("passwordDisplay").innerText = getCookie("password") || "N/A";

    async function addUserToDataBase() {

        event.preventDefault();
        const username = getCookie("username");
        const gmail = getCookie("gmail");
        const password = getCookie("password");

        if (username && gmail && password) {
            try {
                // Make a fetch request to the create API endpoint only when the button is clicked
                const response = await fetch("http://localhost:5000/api/user/create", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                        email: gmail,
                        profileIcon: selectedImage,
                    }),
                });
                 // Log response status and details
            console.log('Response Status:', response.status);
            const responseBody = await response.text();
            console.log('Response Body:', responseBody);
                if (response.ok) {
                    console.log('User added successfully!');                  
                      /* Redirect to new page doesn't work */
                 window.location.href = "/School_Website/html/index.html";
                } else {
                    // Handle faliure
                    console.error('Failed to add user:', response.statusText);
                    console.error('Detailed error message:', responseBody);
                }
            } catch (error) {
                console.error('Error:', error);
                // Handling errors
            }
        } else {
            console.error("Unable to get user information from cookies.");
        }
    }

    document.getElementById("confirm-btn").addEventListener("click", addUserToDataBase);
});
