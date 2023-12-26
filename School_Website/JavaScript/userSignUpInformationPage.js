document.addEventListener('DOMContentLoaded', function() {
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
// Assuming you have a container element with the ID "imageDisplay"
const imageDisplay = document.getElementById("imageDisplay");

// Read the cookie for selectedImage
const selectedImageCookie = document.cookie.split('; ').find(row => row.startsWith('selectedImage='));
const selectedImage = selectedImageCookie ? selectedImageCookie.split('=')[1] : null;

// Set the src attribute of the image element
if (imageDisplay && selectedImage) {
  imageDisplay.src = selectedImage;
}


    // Display information from cookies
    
    document.getElementById("usernameDisplay").innerText = getCookie("username") || "N/A";
    document.getElementById("gmailDisplay").innerText = getCookie("gmail") || "N/A";
    document.getElementById("passwordDisplay").innerText = getCookie("password") || "N/A";
});