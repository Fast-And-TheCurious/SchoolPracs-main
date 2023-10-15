document.addEventListener('DOMContentLoaded', function () {
    // Get the Handlebars template
    const courseTemplateSource = document.getElementById('course-template').innerHTML;
    const courseTemplate = Handlebars.compile(courseTemplateSource);

    const coursesData = [
        {
            title: "Course 1: Algebra Fundamentals",
            description: "In this course, you will build a solid foundation in algebraic concepts and techniques...",
            link: "lesson.html"
        },
        {
            title: "Course 2: Geometry Mastery",
            description: "Take your geometry skills to the next level with this comprehensive course. From angles...",
            link: "lesson.html"
        },
        {
            title: "Course 3: Logs",
            description: "Take your geometry skills to the next level with this comprehensive course. From angles...",
            link: "lesson.html"
        }
    ];

    // Get the container where courses will be inserted
    const coursesContainer = document.getElementById('courses-container');

    coursesData.forEach(function (course) {
        // Render each course and insert it into the container
        const courseHtml = courseTemplate(course);
        coursesContainer.innerHTML += courseHtml;
    });
});