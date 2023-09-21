// get course details from database
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
  // Get the Handlebars template
  const courseTemplateSource = document.getElementById('course-template').innerHTML;
  const courseTemplate = Handlebars.compile(courseTemplateSource);

  // Get the container where courses will be inserted
  const coursesContainer = document.getElementById('courses-container');

  // Render each course and insert it into the container
  coursesData.forEach(function (course) {
      const courseHtml = courseTemplate(course);
      coursesContainer.innerHTML += courseHtml;
  });
});

