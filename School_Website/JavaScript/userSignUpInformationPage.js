document.addEventListener('DOMContentLoaded', function () {
    // Function to get cookie value by name
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
    const selectedImageCookie = document.cookie.split('; ').find(row => row.startsWith('selectedImage='));
    const selectedImage = selectedImageCookie ? selectedImageCookie.split('=')[1] : null;

    // Set src attribute of the image element
    if (imageDisplay && selectedImage) {
        imageDisplay.src = selectedImage;
    }

    // Display information from cookies    
    document.getElementById("usernameDisplay").innerText = getCookie("username") || "N/A";
    document.getElementById("gmailDisplay").innerText = getCookie("gmail") || "N/A";
    document.getElementById("passwordDisplay").innerText = getCookie("password") || "N/A";

    async function addUserToDataBase() {
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

                if (response.ok) {
                    console.log('User added successfully!');
                    //Handle success                  
                      // Redirect to another page after successful user addition
                      /* Redirect to new page doesn't work */
                     window.location.href = "/School_Website/html/course.html";
                } else {
                    console.error('Failed to add user:', response.statusText);
                    // Handle  failure
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
