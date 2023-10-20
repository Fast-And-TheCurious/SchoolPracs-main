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
let flattenedArray = [];

document.addEventListener('DOMContentLoaded', async function() {

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

// Assuming formattedCourses is your 2D array
flattenedArray = formattedCourses.flat();
console.log("flattenedArray: ", flattenedArray);
// Now you have the data in the desired format stored in 'flattenedArray'
const data = {
  lessons: flattenedArray, 
};

console.log("dataArray: ", data);
 
function calculateTotalMasteryPoints(data) {
  const totalMasteryPoints = data.lessons.reduce((total, lesson) => {
    return total + parseFloat(lesson.masteryPoints.replace(/,/g, ""));
  }, 0);

  return totalMasteryPoints.toLocaleString();
}

const totalMasteryPoints = calculateTotalMasteryPoints(data);
console.log(`Total Mastery Points: ${totalMasteryPoints}`);

function calculateUniqueUnits(data) {
  const uniqueUnits = new Set();

  // Iterate through the lessons and add the unit name to the Set
  data.lessons.forEach((lesson) => {
    uniqueUnits.add(lesson.unit);
  });
    return uniqueUnits.size;
}

const uniqueUnitCount = calculateUniqueUnits(data);/*  */
console.log(`Number of Unique Units: ${uniqueUnitCount}`);

const unitInformation = {
  unitInfo: [{ title: "Title", uniqueUnitCount: uniqueUnitCount }],
};
// Function to change title dynamically
function changeTitle(newTitle) {
  // Update the title in the data object
  data.lessons[0].title = newTitle;  
  // Update the rendered HTML to reflect the new title
  const updatedLessonSidebarHtml = lessonSidebarTemplate({
    unitInfo: data.lessons[0],
    showAllUnits: showAllUnits,
  });

  document.getElementById("lesson-sidebar").innerHTML =
    updatedLessonSidebarHtml;
}
let showAllUnits = true;
// Get the Handlebars template for the lesson sidebar
const lessonSidebarTemplateSource = document.getElementById(
  "lesson-sidebar-template"
).innerHTML;

// Compile the template with data
const lessonSidebarTemplate = Handlebars.compile(lessonSidebarTemplateSource);

// Render the template with data
const updatedLessonSidebarHtml = lessonSidebarTemplate({
  unitInfo: data.lessons,
  showAllUnits: showAllUnits,
});

// Update the rendered HTML in the "lesson-sidebar" element
document.getElementById("lesson-sidebar").innerHTML = updatedLessonSidebarHtml;

// Render sidebar with combined data and insert it into the page
const lessonSidebarHtml = lessonSidebarTemplate({
  unitInfo: unitInformation.unitInfo,
  lessons: data.lessons,
  numUnits: uniqueUnitCount,
  showAllUnits: showAllUnits,
  totalMasteryPoints: totalMasteryPoints,
});

document.getElementById("lesson-sidebar").innerHTML = lessonSidebarHtml;

const titleData = {
  unit: "All Units: Total Mastery Points",
  title: totalMasteryPoints,
};

const titleTemplateSource = document.getElementById("title-template").innerHTML;
const titleTemplate = Handlebars.compile(titleTemplateSource);


const titleHtml = titleTemplate(titleData);
document.getElementById("title-container").innerHTML = titleHtml;

const unitDescriptionSource = document.getElementById(
  "unit-description-template"
).innerHTML;
const unitDescriptionTemplate = Handlebars.compile(unitDescriptionSource);

const lessonTemplate = Handlebars.compile(
  document.getElementById("lesson-template").innerHTML
);

const lessonHtml = lessonTemplate(data);
document.getElementById("lesson-container").innerHTML = lessonHtml;


function updateContent(unit) {
  if (unit === "Title" || unit === "All Units: Total Mastery Points") {
    showAllUnits = true;

    const titleData = {
      unit: "All Units: Total Mastery Points",
      title: totalMasteryPoints,
    };

    const titleHtml = titleTemplate(titleData);
    document.getElementById("title-container").innerHTML = titleHtml;

    const unitDescriptionHtml = unitDescriptionTemplate({
      unitDescription: "",
    });
    document.getElementById("lesson-container").innerHTML = unitDescriptionHtml;
  } else {
    showAllUnits = false;

    const selectedLesson = data.lessons.find(
      (lesson) => lesson.unit === unit
    );

    const titleData = {
      unit: selectedLesson.unit,
      title: selectedLesson.title,
      masteryPoints: "Mastery points: " + selectedLesson.masteryPoints,
    };

    const titleHtml = titleTemplate(titleData);
    document.getElementById("title-container").innerHTML = titleHtml;

    const titlesAndInfo = [
      {
        title: "Lesson 1",
        info: selectedLesson.unitLessons[0].lessonTitle,
      },
      {
        title: "Lesson 2",
        info: selectedLesson.unitLessons[1].lessonTitle,
      },
      {
        title: "Lesson 3",
        info: selectedLesson.unitLessons[2].lessonTitle,
      },
      {
        title: "Lesson 4",
        info: selectedLesson.unitLessons[3].lessonTitle,
      },
      {
        title: "Worksheets",
        info: "Practice what you have learned",
      },
    ];

    const boxesHtml = titlesAndInfo
      .map(
        (item) => `
      <div class="info-box"><a href="${item.info.lessonLink}">
        <h2>${item.title}</h2>
        <p>${item.info.lessonTitle}</p>
        </a>
      </div>
    `
      )
      .join("");

    const aboutHtml = `
      <div class="about-section">
        <h2>About</h2>
        <p>${selectedLesson.unitDescription}</p>
      </div>
    `;

    const lessonContainerHtml = `
      <div class="lesson-content">
        ${aboutHtml}
        <div class="boxes-container">
          ${boxesHtml}
        </div>
      </div>
    `;

    document.getElementById("lesson-container").innerHTML = lessonContainerHtml;

    const contentArea2 = document.getElementById("content_area2");
    if (contentArea2) {
      contentArea2.scrollIntoView({ behavior: "smooth" });
    }
  }
}
function attachEventListeners() {
  document.querySelectorAll(".sidebar_lessonBox").forEach((item) => {
    item.addEventListener("click", (event) => {
      const unit =
        event.currentTarget.querySelector(".sub_sub-heading").textContent;
      updateContent(unit);
    });
  });

  document.querySelector(".main_heading").addEventListener("click", () => {
    updateContent("All Units: Total Mastery Points");
  });
}

// Call this function after rendering the content
attachEventListeners();

document.querySelector(".main_heading").addEventListener("click", () => {
  updateContent("All Units: Total Mastery Points");
});

document.querySelectorAll(".sidebar_lessonBox").forEach((item) => {
  item.addEventListener("click", (event) => {
    const unit =
      event.currentTarget.querySelector(".sub_sub-heading").textContent;
    updateContent(unit);
  });
});
// Function to update the worksheet download button based on the selected unit
function updateWorksheetDownloadButton(unit) {
  // Find the lesson object corresponding to the selected unit
  const selectedLesson = lessonData.lessons.find((lesson) => lesson.unit === unit);

  const dt = document.getElementById("worksheetDownloadButton");

  if (selectedLesson && selectedLesson.worksheet) {
    // Set the href and download attributes based on the worksheet information
    dt.href = `/School_Website/pdfs/${selectedLesson.worksheet}`;
    dt.download = `${selectedLesson.worksheet}`;
    // Enable the download button
    dt.removeAttribute("disabled");
  } else {
    // Disable the download button if the worksheet is not found
    dt.setAttribute("disabled", "true");
  }
}

// Event listener for clicking on a unit in the sidebar
document.querySelectorAll(".sidebar_lessonBox").forEach((item) => {
  item.addEventListener("click", (event) => {
    const unit = event.currentTarget.querySelector(".sub_sub-heading").textContent;
    updateContent(unit);
    updateWorksheetDownloadButton(unit); // Update the worksheet download button
  });
});



});
 
