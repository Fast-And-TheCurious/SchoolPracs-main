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
  const urlParams = new URLSearchParams(window.location.search);
  const courseID = urlParams.get('course');

  if (!courseID) {
    console.error("No course ID provided.");
    return;
  }else{
    console.log("Course ID:", courseID);
  }

  // Fetch data for the specific course
  const courses = await getCourses();
  const units = await getUnits();
  const lessons = await getLessons();

  if (!courses || !units || !lessons) {
    console.error("Failed to fetch data.");
    return;
  }

  
function formatLesson(lesson) {
  return {
    lessonTitle: lesson.title,
    lessonLink: lesson.link,
    unitPracticeTitle: `Lesson ${lesson.id} Practice`,
    unitPracticeLink: `practice${lesson.id}.html`,
    lessonDescriptions: lesson.video,
  };
}

function formatUnit(unit) {
  const unitLessons = lessons.filter((lesson) => lesson.unitID === unit.id);
  return {
    unitID: unit.id,
    unit: unit.name,
    courseID: unit.courseID,
    title: unit.title,
    description: unit.about,
    unitLink: unit.title.toLowerCase().replace(/\s/g, '') + '.html',
    worksheet: `example.txt`,
    unitDescription: unit.unitDescription,
    masteryPoints: unit.masteryPoints,
    unitLessons: unitLessons.map(formatLesson),
  };
}

const formattedCourses = courses.map((course) => {
  const courseUnits = units.filter((unit) => unit.courseID === course.id);
  return courseUnits.map(formatUnit);
});

flattenedArray = formattedCourses.flat();
/* console.log("flattenedArray: ", flattenedArray); */
const data = {
  lessons: flattenedArray, 
};
console.log("data array: ", data);
});