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
console.log("efefe",data);
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
// Assuming formattedCourses is your 2D array
const flattenedArray = formattedCourses.flat();
console.log("flattednedArray",flattenedArray );
// Function to populate the lesson sidebar with data

  // Function to populate the lesson sidebar with data
  function populateLessonSidebar(unitData) {
    const lessonSidebarHtml = lessonSidebarTemplate({
      showAllUnits: false,
      unitInfo: unitData,
      uniqueUnitCount: unitData.length,
    });
    document.getElementById('lesson-sidebar').innerHTML = lessonSidebarHtml;
  }

  const lessonSidebarTemplate = Handlebars.compile(document.getElementById('lesson-sidebar-template').innerHTML);

  // Call the function to populate the sidebar with your flattened array
  populateLessonSidebar(flattenedArray);

// Define a function to populate the main content area with unit details
function populateMainContent(unitData) {
  const titleTemplate = Handlebars.compile(document.getElementById('title-template').innerHTML);

  // Render the unit's title and details in the main content area
  const mainContent = titleTemplate(unitData);
  document.getElementById('title-container').innerHTML = mainContent;
}

// Event delegation to handle unit clicks in the sidebar
document.getElementById('lesson-sidebar').addEventListener('click', function(event) {
  const unitId = event.target.getAttribute('data-unit-id');

  if (unitId) {
    // Find the selected unit from the flattened array
    const selectedUnit = flattenedArray.find((unit) => unit.unit === unitId);

    // Display the unit details in the main content area
    populateMainContent(selectedUnit);
  }
});
// Compile Handlebars templates
const titleTemplate = Handlebars.compile(document.getElementById('title-template').innerHTML);
const unitDescriptionTemplate = Handlebars.compile(document.getElementById('unit-description-template').innerHTML);

// Function to display unit details
function displayUnitDetails(selectedUnit) {
    const titleHtml = titleTemplate(selectedUnit);
    const unitDescriptionHtml = unitDescriptionTemplate(selectedUnit);

    document.getElementById('title-container').innerHTML = titleHtml;
    document.getElementById('unit-description').innerHTML = unitDescriptionHtml;

    // Generate and display unit lessons
    const lessonsContainer = document.getElementById('unit-lessons');
    lessonsContainer.innerHTML = ''; // Clear previous content

    selectedUnit.unitLessons.forEach((lesson) => {
        const lessonHtml = generateLessonHtml(lesson);
        lessonsContainer.innerHTML += lessonHtml;
    });
}

// Function to generate HTML for a lesson
function generateLessonHtml(lesson) {
    return `
        <div class="unit_display_box">
            <a href="${lesson.lessonLink}" class="main_heading">${lesson.unit}:${lesson.lessonTitle}</a>
            <p>${lesson.lessonDescriptions}</p>
            <ul class="unit_lesson_links">
                <div class="lesson_columns">
                    <div class="sub_sub-heading">
                        <li><a href="${lesson.unitPracticeLink}">${lesson.unitPracticeTitle}</a></li>
                    </div>
                </div>
                <div>
                    <div class="sub_heading">Practice</div>
                    <p>Here you can practice what you've learned in this lesson.</p>
                    <ul>
                        <li><a href="${lesson.unitPracticeLink}">${lesson.unitPracticeTitle}</a></li>
                    </ul>
                </div>
            </ul>
        </div>
    `;
}

// Event delegation to handle unit clicks
document.getElementById('lesson-sidebar').addEventListener('click', function(event) {
    const unitId = event.target.getAttribute('data-unit-id');

    if (unitId) {
        // Find the selected unit from the flattened array
        const selectedUnit = flattenedArray.find((unit) => unit.unit === unitId);

        // Display the unit details
        displayUnitDetails(selectedUnit);
    }
});
document.addEventListener('DOMContentLoaded', function() {
  // Your entire JavaScript code goes here
  // ...

  // Ensure your code is placed here, including Handlebars template compilation and event listeners
});
/* 
// Function to populate the lesson sidebar with data
function populateLessonSidebar(data) {
  const lessonSidebarTemplate = Handlebars.compile(document.getElementById('lesson-sidebar-template').innerHTML);
  const lessonSidebarHtml = lessonSidebarTemplate(data);
  document.getElementById('lesson-sidebar').innerHTML = lessonSidebarHtml;
}

// Function to update the content based on the selected unit
function updateContent(unit) {
  const selectedUnit = flattenedArray.find((data) => data.unit === unit);
  const titleTemplate = Handlebars.compile(document.getElementById('title-template').innerHTML);
  const unitDescriptionTemplate = Handlebars.compile(document.getElementById('unit-description-template').innerHTML);
  const lessonTemplate = Handlebars.compile(document.getElementById('lesson-template').innerHTML);

  if (selectedUnit) {
    const titleHtml = titleTemplate(selectedUnit);
    const unitDescriptionHtml = unitDescriptionTemplate(selectedUnit);
    const lessonHtml = lessonTemplate(selectedUnit);

    document.getElementById('title-container').innerHTML = titleHtml;
    document.getElementById('lesson-container').innerHTML = unitDescriptionHtml + lessonHtml;
  }
}

// Call this function after rendering the content
function attachEventListeners() {
  document.querySelectorAll(".sidebar_lessonBox").forEach((item) => {
    item.addEventListener("click", (event) => {
      const unit = event.querySelector(".sub_sub-heading").textContent;
      updateContent(unit);
    });
  });

  document.querySelector(".main_heading").addEventListener("click", () => {
    updateContent("All Units: Total Mastery Points");
  });
}

// Initial population of the lesson sidebar
populateLessonSidebar({ showAllUnits: true, unitInfo: flattenedArray, uniqueUnitCount: flattenedArray.length });

// Call this function after rendering the content
attachEventListeners(); */



/* console.log("FormattedCourses: ",formattedCourses);
console.log("Stuff test: ", formattedCourses[0][0].title);

// Define a function to calculate the total mastery points
function calculateTotalMasteryPoints(formattedCourses) {
  const totalMasteryPoints = formattedCourses.reduce((total, course) => {
    return total + course.reduce((unitTotal, unit) => {
      return unitTotal + parseFloat(unit.masteryPoints.replace(/,/g, ""));
    }, 0);
  }, 0);

  return totalMasteryPoints.toLocaleString();
}
// Define a function to calculate the number of unique units
function calculateUniqueUnits(formattedCourses) {
  const uniqueUnits = new Set();

  formattedCourses.forEach((course) => {
    course.forEach((unit) => {
      uniqueUnits.add(unit.unit);
    });
  });

  return uniqueUnits.size;
}
// Calculate the total mastery points
const totalMasteryPoints = calculateTotalMasteryPoints(formattedCourses);
console.log(`Total Mastery Points: ${totalMasteryPoints}`);
const uniqueUnitCount = calculateUniqueUnits(formattedCourses);
console.log(`Number of Unique Units: ${uniqueUnitCount}`); 

// Compile Handlebars templates
const titleTemplate = Handlebars.compile(document.getElementById('title-template').innerHTML);
const unitDescriptionTemplate = Handlebars.compile(document.getElementById('unit-description-template').innerHTML);
const lessonTemplate = Handlebars.compile(document.getElementById('lesson-template').innerHTML);

// Function to populate the lesson sidebar with data
function populateLessonSidebar(courseData) {
  const lessonSidebarHtml = lessonSidebarTemplate(courseData);
  document.getElementById('lesson-sidebar').innerHTML = lessonSidebarHtml;
}
// Function to update the content based on the selected unit
function updateContent(unitIndex) {
  // Assuming that formattedCourses[unitIndex] contains the data for the selected unit
  const selectedUnitData = formattedCourses[unitIndex];

  // Update the lesson sidebar and other sections with the selected unit's data
  populateLessonSidebar({ showAllUnits: false, unitInfo: selectedUnitData });

  // You can update other sections using similar logic
}

const lessonSidebarTemplate = Handlebars.compile(document.getElementById('lesson-sidebar-template').innerHTML);

// Function to populate the lesson sidebar with data for all units
function populateAllUnitsSidebar() {
  const lessonSidebarHtml = formattedCourses.map((unitData, unitIndex) => {
    return lessonSidebarTemplate({
      showAllUnits: false, // Assuming you want to display individual units
      unitInfo: unitData,
    });
  }).join('');

  document.getElementById('lesson-sidebar').innerHTML = lessonSidebarHtml;
}

// Call the function to populate the sidebar with all units
populateAllUnitsSidebar();

// Attach event listeners to handle unit clicks
function attachEventListeners() {
  document.querySelectorAll('.sidebar_lessonBox').forEach((item, index) => {
    item.addEventListener('click', () => {
      updateContent(index);
    });
  });
}

// Call functions to populate the initial content and attach event listeners
populateAllUnitsSidebar();
attachEventListeners(); */
});
 
