// get course details from database
//dummy content
/* const coursesData = [
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
]; */
const formattedLessons = require('./course.js'); 

console.log("Formatted Lessons in Another File:", formattedLessons);

/* document.addEventListener('DOMContentLoaded', function () {
  
  const courseTemplateSource = document.getElementById('course-template').innerHTML;
  const courseTemplate = Handlebars.compile(courseTemplateSource);

  const coursesContainer = document.getElementById('courses-container');

  coursesData.forEach(function (course) {
      const courseHtml = courseTemplate(course);
      coursesContainer.innerHTML += courseHtml;
  });
}); */
// Import Handlebars library
const Handlebars = require("handlebars");

// Import the formattedLessons array (assuming it's exported correctly in another file)
const formattedLessons = require('./course.js'); // Update the path accordingly

document.addEventListener('DOMContentLoaded', function () {
  const courseTemplateSource = document.getElementById('course-template').innerHTML;
  const courseTemplate = Handlebars.compile(courseTemplateSource);

  const coursesContainer = document.getElementById('courses-container');

  formattedLessons.forEach(function (lesson) { // Use formattedLessons instead of coursesData
    const lessonHtml = courseTemplate(lesson); // Use lesson instead of course
    coursesContainer.innerHTML += lessonHtml;
  });
});
