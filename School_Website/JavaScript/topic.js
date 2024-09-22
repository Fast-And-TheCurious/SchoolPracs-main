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
let flattenedArray = [];
document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const courseIDFetched = urlParams.get("course");

  const courseIDNumber = courseIDFetched.match(/\d+/)[0]; // This finds the digits in the string
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
      unitLink: unit.title.toLowerCase().replace(/\s/g, "") + ".html",
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
 // array to use data, not operate on for main content
  const contentArray = {
    lessonContent: flattenedArray,
  };
  console.log(contentArray);

  if (!courseIDNumber) {
    console.error("No course ID provided.");
    return;
  } else {

    console.log("Course ID:", courseIDNumber);
    // all the stuff happens here 
    let indexOfCourseToUse = -1;

    console.log("index 0 course ID: ",contentArray.lessonContent[0].courseID);

    for (let i = 0; i <contentArray.lessonContent.length; i++) {
      if(contentArray.lessonContent[i].courseID === parseInt(courseIDNumber, 10)){ // I wasn't sure if I was comparing a number to a number so I'm just making sure my conveting to an int
        indexOfCourseToUse = i;
        console.log(`Match found at index ${i}:`, contentArray.lessonContent[i]); // match found :)
        break;       
     }else{
      console.log("No unit found matching courseID.");
     }
    }
    console.log("indexOfCourseToUse",indexOfCourseToUse);
       
    const data = {  
      lessons: [], 
    };
    console.log("data array length", contentArray.lessonContent.length);
    // 0 1 2 3 4 
    for(let i = indexOfCourseToUse; i<indexOfCourseToUse+3 && i < contentArray.lessonContent.length; i++){
      data.lessons.push(contentArray.lessonContent[i]);
    }
    console.log("Array to use for page content:", data);



  }
});
