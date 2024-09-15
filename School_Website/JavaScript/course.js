document.addEventListener('DOMContentLoaded', function() {
  getCourses(); 
});

const urlParams = new URLSearchParams(window.location.search);

const courseName = urlParams.get('course');

function getCourses() {
  fetch("http://127.0.0.1:5000/api/courses")
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error("Error fetching courses:", data.error);
      } else {
        const coursesData = data.map((course) => ({
          id: `id: ${course.id}`,
          title: `Course ${course.id}: ${course.title}`,
          description: course.about_description,
          link: `topic.html?course=${course.id}`, // Pass courseID as a URL param
        }));

        console.log("Formatted Courses:", coursesData);

        const source = document.getElementById("course-template").innerHTML;
        const template = Handlebars.compile(source);

        const coursesContainer = document.getElementById("courses-container");

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
