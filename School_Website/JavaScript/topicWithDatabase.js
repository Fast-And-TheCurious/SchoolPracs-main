 // Define functions to fetch data asynchronously
async function getCourses() {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/courses");
    const coursesData = await response.json();
    if (coursesData.error) {
      console.error("Error fetching courses:", coursesData.error);
    } else {
      return coursesData;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function getUnits() {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/units");
    const unitsData = await response.json();
    if (unitsData.error) {
      console.error("Error fetching units:", unitsData.error);
    } else {
      return unitsData;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function getLessons() {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/lessons");
    const lessonsData = await response.json();
    if (lessonsData.error) {
      console.error("Error fetching lessons:", lessonsData.error);
    } else {
      return lessonsData;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

document.addEventListener('DOMContentLoaded', async function() {
  const data = {
    lessons: [],
  };

  const courses = await getCourses();
  const units = await getUnits();
  const lessons = await getLessons();

  // Now you have the data, you can populate the arrays
  const coursesArray = courses || [];
  const unitsArray = units || [];
  const lessonsArray = lessons || [];

/*   console.log("Courses Array: ", coursesArray);
  console.log("Units Array: ", unitsArray);
  console.log("Lessons Array: ", lessonsArray); */

  // Define the courses, units, and lessons as provided

// Helper to format lessons
function formatLesson(lesson) {
  return {
    lessonTitle: lesson.title,
    lessonLink: lesson.link,
    unitPracticeTitle: `Lesson ${lesson.id} Practice`,
    unitPracticeLink: `practice${lesson.id}.html`,
    lessonDescriptions: lesson.video,
  };
}

// Helper to format units
function formatUnit(unit) {
  const unitLessons = lessons.filter((lesson) => lesson.unitID === unit.id);
  return {
    unit: `UNIT ${unit.id}`,
    title: unit.title,
    description: unit.about,
    unitLink: unit.title.toLowerCase().replace(/\s/g, '') + '.html',
    worksheet: `example.txt`,
    unitDescription: unit.unitDescription,
    masteryPoints: unit.masteryPoints,
    unitLessons: unitLessons.map(formatLesson),
  };
}

// Main code to format courses and their units
const formattedCourses = courses.map((course) => {
  const courseUnits = units.filter((unit) => unit.courseID === course.id);
  return courseUnits.map(formatUnit);
});


console.log(formattedCourses);

});
