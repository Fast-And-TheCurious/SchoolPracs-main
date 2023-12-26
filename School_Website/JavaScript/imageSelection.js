const imageUrls = [];

async function fetchImages() {
  try {
    const response = await fetch("http://localhost:5000/api/images");

    if (!response.ok) {
      throw new Error(`Failed to fetch images. Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not in JSON format");
    }

    const images = await response.json();
    console.log("Fetched images:", images);

    images.forEach(image => {
      if (image.url) {
        imageUrls.push(image.url);
      }
    });

    console.log("Stored image URLs:", imageUrls);
    // Use the imageUrls array as needed in your client-side logic
  } catch (error) {
    console.error("Error fetching images:", error.message);
  }
}

// Call the function to fetch images
fetchImages();
// Assuming you have a container element with the ID "imageContainer"
const imageContainer = document.getElementById("imageContainer");

// Fetch images from the server
async function fetchImages() {
  try {
    const response = await fetch("http://localhost:5000/api/images");
    const fetchedData = await response.json();

    // Loop through the fetched images and create image elements
    fetchedData.forEach(item => {
      const imgElement = document.createElement("img");
      imgElement.className = "image-item";
      imgElement.src = item.image;
      imgElement.alt = "Image";
      imageContainer.appendChild(imgElement);
    });

    // JavaScript code to handle image selection
    imageContainer.addEventListener("click", function (event) {
      const clickedImage = event.target;

      // Deselect all images
      const allImages = document.querySelectorAll(".image-item");
      allImages.forEach(image => image.classList.remove("selected"));

      // Select the clicked image
      clickedImage.classList.add("selected");
    });

   

  } catch (error) {
    console.error("Error fetching images:", error);
  }
}
 // Function to handle button click
 function submitSelection() {
  const selectedImage = document.querySelector(".image-item.selected");
  
  // Check if a user has selected an image
  if (selectedImage) {
    // Image selected
    alert("Image Selected!"); 
  //set Cookie

   // Set a cookie for the selected image with expiration date (expires in 1 day)
   const expirationDate = new Date();
   expirationDate.setTime(expirationDate.getTime() + (1 * 60 * 60 * 1000));
   
   document.cookie = `selectedImage=${selectedImage.src}; expires=${expirationDate.toUTCString()}`;

    //Redirect user to continue sign up process
    window.location.href = "/School_Website/html/userSignUpInformationPage.html";
   
  } else {
    // No image selected
    alert("No image selected. Please select an image.");
  }
}
// Call the function to fetch and display images
fetchImages();

