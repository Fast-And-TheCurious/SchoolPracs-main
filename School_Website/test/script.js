document.addEventListener('DOMContentLoaded', function () {
    const courses = [
        { id: 1, name: 'Math 101' },
        { id: 2, name: 'History 202' },
        { id: 3, name: 'Science 303' },
        { id: 4, name: 'English 404' },
    ];

    const courseTemplateSource = document.getElementById('course-template').innerHTML;
    const courseTemplate = Handlebars.compile(courseTemplateSource);
    const coursesList = document.getElementById('courses-list');

    courses.forEach((course) => {
        const courseHtml = courseTemplate(course);
        coursesList.innerHTML += courseHtml;
    });

    const submitButton = document.getElementById('submit-button');
    const selectedCourses = [];

    coursesList.addEventListener('change', function (event) {
        if (event.target.classList.contains('course-checkbox')) {
            const courseId = parseInt(event.target.id);
            if (event.target.checked) {
                selectedCourses.push(courseId);
            } else {
                const index = selectedCourses.indexOf(courseId);
                if (index !== -1) {
                    selectedCourses.splice(index, 1);
                }
            }
        }
    });

    submitButton.addEventListener('click', function () {
        alert(`Selected Courses: ${selectedCourses.join(', ')}`);
    });
});
