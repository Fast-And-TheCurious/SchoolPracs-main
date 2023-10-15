document.addEventListener('DOMContentLoaded', function() {
  getCourses(); 
});

//  URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Get value of'course' parameter from URL
const courseName = urlParams.get('course');

// Now you can use 'courseName' variable to load specific course content
//see if works?

// Function to fetch courses
function getCourses() {
  fetch("http://127.0.0.1:5000/api/courses")
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error("Error fetching courses:", data.error);
      } else {
        // Courses retrieved successfully, handle here
        const coursesData = data.map((course) => ({
          title: `Course ${course.id}: ${course.title}`,
          description: course.about_description,
          link: course.link,
        }));

        // Now, the 'coursesData' array contains your formatted data
        console.log("Formatted Courses:", coursesData);

        // Get the Handlebars template from the script tag
        const source = document.getElementById("course-template").innerHTML;
        const template = Handlebars.compile(source);

        // Get the container where you want to insert the courses
        const coursesContainer = document.getElementById("courses-container");

        // Loop through the courses and insert them into the container
        coursesData.forEach((course) => {
          const html = template(course);
          const div = document.createElement("div");
          div.innerHTML = html;
          coursesContainer.appendChild(div);
        });
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}
