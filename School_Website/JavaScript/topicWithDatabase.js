
/* document.addEventListener('DOMContentLoaded', function() {

    getCourses(); 
    getAllUnits();
    getAllLessons(); 
    //getLessonsByCourse(1);
    //getUnitsByCourse(1); 
   // numCourses();
  }); 
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
function getCourses() {
    fetch("http://127.0.0.1:5000/api/courses")
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error fetching courses:", data.error);
        } else {
            console.log("All Courses: ",data);
        }
    })
    .catch((error)=>{
        console.log("An error occurred:",error)
    });
}
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
      console.log("All Lessons:", lessons);
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
 

const coursesData = [
    // ... Your course data here
  ];
  
  const unitsData = [
    // ... Your unit data here
  ];
  
  const lessonsData = [
    // ... Your lesson data here
  ];
  
  const data = {
    lessons: [],
  };
  
  // Group units by courseID
  const unitsByCourse = unitsData.reduce((result, unit) => {
    if (!result[unit.courseID]) {
      result[unit.courseID] = [];
    }
    result[unit.courseID].push(unit);
    return result;
  }, {});
  
  // Group lessons by unitID
  const lessonsByUnit = lessonsData.reduce((result, lesson) => {
    if (!result[lesson.unitID]) {
      result[lesson.unitID] = [];
    }
    result[lesson.unitID].push(lesson);
    return result;
  }, {});
  
  // Loop through courses and create the desired structure
  coursesData.forEach((course) => {
    const courseUnits = unitsByCourse[course.id] || [];
    const formattedUnits = courseUnits.map((unit) => {
      const unitLessons = lessonsByUnit[unit.id] || [];
      const formattedLessons = unitLessons.map((lesson) => ({
        lessonTitle: lesson.title,
        lessonLink: lesson.link,
        unitPracticeTitle: `Lesson ${lesson.id} Practice`,
        unitPracticeLink: `practice${lesson.id}.html`,
        lessonDescriptions: lesson.video,
      }));
  
      return {
        unit: `UNIT ${unit.id}`,
        title: unit.title,
        description: unit.unitDescription,
        unitLink: unit.link,
        worksheet: 'example.txt',
        unitDescription: unit.unitDescription,
        masteryPoints: unit.masteryPoints,
        unitLessons: formattedLessons,
      };
    });
  
    data.lessons.push(...formattedUnits);
  });
  
  console.log(data);
   */




  
  document.addEventListener('DOMContentLoaded', function() {
    const data = {
      lessons: [],      
    };  
    getCourses();
    getAllUnits();
    getAllLessons();
  
    function addUnitsToData(units) {
      data.lessons = units.map(unit => {
        return {
            unit: unit.name, 
            title: unit.title,
            description: unit.about,
            unitLink: unit.link,
            worksheet: unit.notes || null,
            unitDescription: unit.unitDescription,
            masteryPoints: unit.masteryPoints,
            unitLessons: [],
        };
      });
    }  
    function addLessonsToData(lessons) {
      lessons.forEach(lesson => {
        const unitIndex = data.lessons.findIndex(unit => unit.unit === lesson.unitID);
        
        if (unitIndex !== -1) {
          data.lessons[unitIndex].unitLessons.push({
            lessonTitle: lesson.title,
            lessonLink: lesson.link,
            unitPracticeTitle: lesson.unitPracticeTitle,
            unitPracticeLink: lesson.unitPracticeLink || null,
            lessonDescriptions: lesson.video,
          });
        }
      });  
      const flatData = data.lessons.map(unit => ({
        unit: unit.unit,
        title: unit.title,
        description: unit.description,
        unitLink: unit.unitLink,
        worksheet: unit.worksheet,
        unitDescription: unit.unitDescription,
        masteryPoints: unit.masteryPoints,
        unitLessons: unit.unitLessons,
      }));
      console.log("woowjwo: ",flatData);
    }
  
    function getCourses() {
      fetch("http://127.0.0.1:5000/api/courses")
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            console.error("Error fetching courses:", data.error);
          } else {
            // Add courses to the data object (if needed)
            // data.courses = data; // Example, replace 'courses' with the correct key
          
            console.log("All Courses: ",data);
        }
        })
        .catch(error => {
          console.log("An error occurred:", error);
        });
    }
  
    function getAllUnits() {
      fetch("http://127.0.0.1:5000/api/units")
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            console.error("Error fetching units:", data.error);
          } else {
            addUnitsToData(data);
            console.log("All Units: ",data);
          }
        })
        .catch(error => {
          console.error("An error occurred:", error);
        });
    }
  
    function getAllLessons() {
      fetch("http://127.0.0.1:5000/api/lessons")
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            console.error("Error fetching lessons:", data.error);
          } else {
            addLessonsToData(data);
            console.log("All Lessons:", data);
          }
        })
        .catch(error => {
          console.error("An error occurred:", error);
        });
    }
  });