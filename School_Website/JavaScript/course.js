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
/* const { courseFormattedArray } = require('../Backend/server'); // Adjust the relative path as needed

if (courseFormattedArray.length === 0) {
  console.log('courseFormattedArray is empty or not yet populated.');
} else {
  courseFormattedArray.forEach((course) => {
    console.log("\nCourse file\n");
    console.log(course.id, course.name, course.title, course.about_description);
  });
}
 */

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
// Function to fetch courses
function getCourses() {
  fetch("/api/courses")
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error("Error fetching courses:", data.error);
      } else {
        // Courses retrieved successfully, handle here
        const courses = data;
        //  Place to do with something with the courses
        console.log("Courses:", courses);
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

// Function to fetch lessons by course
function getLessonsByCourse(courseId) {
  fetch(`/api/lessons/${courseId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error("Error fetching lessons:", data.error);
      } else {
        // Lessons retrieved successfully, handle here
        const lessons = data;
        // Place to do with something with the lessons
        console.log("Lessons:", lessons);
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

// Function fetch units by course
function getUnitsByCourse(courseId) {
  fetch(`/api/units/${courseId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error("Error fetching units:", data.error);
      } else {
        // Units retrieved successfully, handle here
        const units = data;
        //  Place to do with something with the units
        console.log("Units:", units);
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}
