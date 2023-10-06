// In the course.js file
const formattedLessons = require('../Backend/server');

console.log(`In course.js FILE: ${formattedLessons}`); 

document.addEventListener('DOMContentLoaded', function () {
  // Make an HTTP GET request to the server to fetch data
  fetch('/api/courses') // Replace with the actual API endpoint on your server
    .then((response) => response.json())
    .then((data) => {
      // 'data' contains the response from the server
      renderCourses(data); // Call a function to render the courses
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

function renderCourses(formattedLessons) {
  // Now you can use 'formattedLessons' to render the courses as needed
  const courseTemplateSource = document.getElementById('course-template').innerHTML;
  const courseTemplate = Handlebars.compile(courseTemplateSource);

  const coursesContainer = document.getElementById('courses-container');

  formattedLessons.forEach(function (course) {
    const courseHtml = courseTemplate(course);

    const courseElement = document.createElement('div');
    courseElement.classList.add('styling-box');
    courseElement.innerHTML = courseHtml;

    coursesContainer.appendChild(courseElement);
  });
}







/* 
const coursesData = [
  {
      title: "Course 1: Algebra Fundamentals",
      description: "In this course, you will build a solid foundation in algebraic concepts and techniques...",
      link: "topic.html"
  },
  {
      title: "Course 2: Geometry Mastery",
      description: "Take your geometry skills to the next level with this comprehensive course. From angles...",
      link: "course2.html"
  },
  {
    title: "Course 3: Logs",
    description: "Take your geometry skills to the next level with this comprehensive course. From angles...",
    link: "course2.html"
}
]; 

document.addEventListener('DOMContentLoaded', function () {
  
  const courseTemplateSource = document.getElementById('course-template').innerHTML;
  const courseTemplate = Handlebars.compile(courseTemplateSource);

  const coursesContainer = document.getElementById('courses-container');

  coursesData.forEach(function (course) {
      const courseHtml = courseTemplate(course);
      coursesContainer.innerHTML += courseHtml;
  });
}); 
 */