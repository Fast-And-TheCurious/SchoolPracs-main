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

  if (!courseIDNumber) {
    console.error("No course ID provided.");
    return;
  } else {

    console.log("Course ID:", courseIDNumber);
    // all the stuff happens here 
    let indexOfCourseToUse = -1;

    for (let i = 0; i <contentArray.lessonContent.length; i++) {
      if(contentArray.lessonContent[i].courseID === parseInt(courseIDNumber, 10)){ // I wasn't sure if I was comparing a number to a number so I'm just making sure my conveting to an int
        indexOfCourseToUse = i;
        console.log(`Match found at index ${i}:`, contentArray.lessonContent[i]); // match found :)
        break;       
     }else{
      console.log("No unit found matching courseID."); // I have no idea why this line is still being run if the first if is true
     }
    }
    
    const data = {  
      lessons: [], 
    };
    
    for(let i = indexOfCourseToUse; i<indexOfCourseToUse+3 && i < contentArray.lessonContent.length; i++){
      data.lessons.push(contentArray.lessonContent[i]);
    }
    console.log("Array to use for page content:", data);

    function calculateTotalMasteryPoints(data) {
      const totalMasteryPoints = data.lessons.reduce((total, lesson) => {
        return total + parseFloat(lesson.masteryPoints.replace(/,/g, ""));
      }, 0);
    
      return totalMasteryPoints.toLocaleString();
    }
    
    const totalMasteryPoints = calculateTotalMasteryPoints(data);
    /* check not really needed */
    function calculateUniqueUnits(data) {
      const uniqueUnits = new Set();
    
      data.lessons.forEach((lesson) => {
        uniqueUnits.add(lesson.unit);
      });
        return uniqueUnits.size;
    }
    
    const uniqueUnitCount = calculateUniqueUnits(data);
    
    const unitInformation = {
      unitInfo: [{ title: "Title", uniqueUnitCount: uniqueUnitCount }],
    };
    // Function to change title dynamically
    function changeTitle(newTitle) {
      // Update the title in the data object
      data.lessons[0].title = newTitle;  
    
      const updatedLessonSidebarHtml = lessonSidebarTemplate({
        unitInfo: data.lessons[0],
        showAllUnits: showAllUnits,
      });
    
      document.getElementById("lesson-sidebar").innerHTML =
        updatedLessonSidebarHtml;
    }
    let showAllUnits = true;
    const lessonSidebarTemplateSource = document.getElementById(
      "lesson-sidebar-template"
    ).innerHTML;
    
    const lessonSidebarTemplate = Handlebars.compile(lessonSidebarTemplateSource);
    
    const updatedLessonSidebarHtml = lessonSidebarTemplate({
      unitInfo: data.lessons,
      showAllUnits: showAllUnits,
    });
    
    document.getElementById("lesson-sidebar").innerHTML = updatedLessonSidebarHtml;
    
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
            info: selectedLesson.unitLessons[0],
          },
          {
            title: "Lesson 2",
            info: selectedLesson.unitLessons[1],
          },
          {
            title: "Lesson 3",
            info: selectedLesson.unitLessons[2],
          },
          {
            title: "Lesson 4",
            info: selectedLesson.unitLessons[3],
          },
          {
            title: "Worksheets",
            identifier: "worksheets", // Unique identifier for worksheets
          },
        ];
        
        const boxesHtml = titlesAndInfo
      .map((item) => `
        <div class="info-box">
          <a href="${item.identifier === 'worksheets' ? `/School_Website/pdfs/${selectedLesson.worksheet}` : 'lesson.html'}">
            <h2>${item.title}</h2>
            <p>${item.title}</p>
          </a>
        </div>
      `)
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
    function updateWorksheetDownloadButton(unit) {
      const selectedLesson = lessonData.lessons.find((lesson) => lesson.unit === unit);
    
      const dt = document.getElementById("worksheetDownloadButton");
    
      if (selectedLesson && selectedLesson.worksheet) {
        dt.href = `/School_Website/pdfs/${selectedLesson.worksheet}`;
        dt.download = `${selectedLesson.worksheet}`;
        // Enable the download button
        dt.removeAttribute("disabled");
      } else {
        // Disable the download button if the worksheet is not found
        dt.setAttribute("disabled", "true");
      }
    }
    // Define a variable to store the currently selected unit (initialize it to "Worksheets")
    let selectedUnit = "Worksheets";
    
    // Function to update the "Download Worksheet" link based on the selected unit
    function updateDownloadLink() {
      const downloadLink = document.getElementById("worksheetDownloadButton");
    
      // Find the selected lesson based on the selected unit
      const selectedLesson = data.lessons.find((lesson) => lesson.unit === selectedUnit);
    
      if (selectedUnit === "Worksheets" && selectedLesson && selectedLesson.worksheet) {
        // If "Worksheets" is selected and a worksheet exists, set the link to download the worksheet
        downloadLink.href = `/School_Website/pdfs/${selectedLesson.worksheet}`;
        downloadLink.download = selectedLesson.worksheet;
        downloadLink.removeAttribute("disabled");
      } else {
        // In other cases, disable the link
        downloadLink.setAttribute("disabled", "true");
      }
    }
    
    // Attach event listeners to the units in the sidebar to update the selected unit
    document.querySelectorAll(".sidebar_lessonBox").forEach((item) => {
      item.addEventListener("click", (event) => {
        selectedUnit = event.currentTarget.querySelector(".sub_sub-heading").textContent;
    
        // Update the "Download Worksheet" link
        updateDownloadLink();
    
        // Call your existing function to update the content based on the selected unit
        updateContent(selectedUnit);
      });
    });
    
    // Initialize the "Download Worksheet" link
    updateDownloadLink();
    
    document.querySelectorAll(".sidebar_lessonBox").forEach((item) => {
      item.addEventListener("click", (event) => {
        const unit = event.currentTarget.querySelector(".sub_sub-heading").textContent;
        updateContent(unit);
        updateWorksheetDownloadButton(unit); // Update the worksheet download button
      });
    });
    

  }
});
