// In the course.js file
/* const formattedLessons = require('../Backend/server');

console.log(`In course.js FILE: ${formattedLessons}`); 

document.addEventListener('DOMContentLoaded', function () {
  fetch('/api/courses') 
    .then((response) => response.json())
    .then((data) => {
      renderCourses(data); 
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

function renderCourses(formattedLessons) {
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
 */

const arrayOfObjects = require('../Backend/server');

console.log(arrayOfObjects);



/* console.log("IN COURSE FILE"+courseFormattedArray); */
const { courseFormattedArray } = require('../Backend/server'); // Adjust the relative path as needed

// Check if courseFormattedArray is populated
if (courseFormattedArray.length === 0) {
  console.log('courseFormattedArray is empty or not yet populated.');
} else {
  // Iterate through and print the contents
  courseFormattedArray.forEach((course) => {
    console.log("\nCourse file\n");
    console.log(course.id, course.name, course.title, course.about_description);
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