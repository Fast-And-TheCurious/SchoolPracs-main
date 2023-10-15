/*
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










document.addEventListener('DOMContentLoaded', function() {

  getCourses(); 
 /*  getAllUnits();
  getAllLessons(); */
  /* getLessonsByCourse(1);
  getUnitsByCourse(1); */
 // numCourses();
});

//  URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Get value of'course' parameter from URL
const courseName = urlParams.get('course');

// Now you can use 'courseName' variable to load specific course content
//see if works?
//display each course with their specific information
function numCourses() {
  try {
    const courseManager = new lessonManager();
    courseManager.getCourses()
      .then((courses) => {
        let numCourses = courses.length;
        console.log("Number of Courses: " + numCourses);
      })
      .catch((error) => {
        console.error('An error occurred counting num Courses:', error);
      });
  } catch (error) {
    console.error('An error occurred counting num Courses:', error);
  }
}
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
/* 
function getAllUnits() {
  fetch("http://127.0.0.1:5000/api/units")
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error("Error fetching units:", data.error);
      } else {

        const units = data;
        console.log("All Units:", units);
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}
// Function to fetch all lessons
function getAllLessons() {
  fetch("http://127.0.0.1:5000/api/lessons")
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error("Error fetching lessons:", data.error);
      } else {
        const lessons = data;
        console.log("Lessons:", lessons);
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}
// Function to fetch lessons by course
function getLessonsByCourse(courseId) {
  fetch(`http://127.0.0.1:5000/api/lessons/${courseId}`)
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
  fetch(`http://127.0.0.1:5000/api/units/${courseId}`)
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
 */