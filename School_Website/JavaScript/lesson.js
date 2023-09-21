const lessonDataExport = {
    lessons: [
      {
        unit: "UNIT 1",
        unitTitle: "Introduction", 
        
        aboutUnit: "good description",
        
        uniquelessonTitles: {
          lesson1Title: "Course Overview",
          lesson2Title: "Getting Started",
          lesson3Title: "Importance of the Subject",
          lesson4Title: "Course Objectives",
        },
        lessonLink: {
          firstLink: "lesson1.html",
          secondLink: "lesson2.html",
          thirdLink: "lesson3.html",
          fourthLink:"lesson4.html",
        },
        notes:{
          lesson1Note: "example.pdf",
          lesson2Note: "",
          lesson3Note: "",
          lesson4Note: "",/* create files */
        },
      },
      {
        unit: "UNIT 2",
        unitTitle: "Cool Stuff",        
        
        aboutUnit: "good description",
        
        uniquelessonTitles: {
          lesson1Title: "Exploring Cool Concepts",
          lesson2Title: "Advanced Cool Techniques",
          lesson3Title: "Real-life Applications",
          lesson4Title: "Cool Case Studies",
        },
        lessonLink: {
          firstLink: "lesson1.html",
          secondLink: "lesson2.html",
          thirdLink: "lesson3.html",
          fourthLink:"lesson4.html",
        },
        notes:{
          lesson1Note: "",
          lesson2Note: "",
          lesson3Note: "",
          lesson4Note: "",/* create files */
        },
      },
      {
        unit: "UNIT 3",
        unitTitle: "Solving Equations & Inequalities",        
        
        aboutUnit: "good description",
        
        uniquelessonTitles: {
          lesson1Title: "Introduction to Equations",
          lesson2Title: "Solving Linear Equations",
          lesson3Title: "Inequalities and Their Solutions",
          lesson4Title: "Equations in Real-life Problems",
        },
        lessonLink: {
          firstLink: "lesson1.html",
          secondLink: "lesson2.html",
          thirdLink: "lesson3.html",
          fourthLink:"lesson4.html",
        },
        notes:{
          lesson1Note: "",
          lesson2Note: "",
          lesson3Note: "",
          lesson4Note: "",/* create files */
        },
      },
      {
        unit: "UNIT 4",
        unitTitle: "Advanced Topics in Math",        
        
        aboutUnit: "good description",
        
        uniquelessonTitles: {
          lesson1Title: "Complex Numbers",
          lesson2Title: "Trigonometry and Calculus",
          lesson3Title: "Vectors and Matrices",
          lesson4Title: "Advanced Problem Solving",
        },
        lessonLink: {
          firstLink: "lesson1.html",
          secondLink: "lesson2.html",
          thirdLink: "lesson3.html",
          fourthLink:"lesson4.html",
        },
        notes:{
          lesson1Note: "",
          lesson2Note: "",
          lesson3Note: "",
          lesson4Note: "",/* create files */
        },
      },
      {
        unit: "UNIT 5",
        unitTitle: "Statistics and Data Analysis",        
        
        aboutUnit: "good description",
        
        uniquelessonTitles: {
          lesson1Title: "Introduction to Statistics",
          lesson2Title: "Data Collection and Analysis",
          lesson3Title: "Probability and Distributions",
          lesson4Title: "Statistical Inference",
        },
        lessonLink: {
          firstLink: "lesson1.html",
          secondLink: "lesson2.html",
          thirdLink: "lesson3.html",
          fourthLink:"lesson4.html",
        },
        notes:{
          lesson1Note: "",
          lesson2Note: "",
          lesson3Note: "",
          lesson4Note: "",/* create files */
        },
      },
      {
        unit: "UNIT 6",
        unitTitle: "Geometry and Geometric Figures",        
        
        aboutUnit: "good description",
       
        uniquelessonTitles: {
          lesson1Title: "Basic Geometric Shapes",
          lesson2Title: "Euclidean Geometry",
          lesson3Title: "Geometry in the Real World",
          lesson4Title: "Non-Euclidean Geometry",
        },
        lessonLink: {
          firstLink: "lesson1.html",
          secondLink: "lesson2.html",
          thirdLink: "lesson3.html",
          fourthLink:"lesson4.html",
        },
        notes:{
          lesson1Note: "",
          lesson2Note: "",
          lesson3Note: "",
          lesson4Note: "",/* create files */
        },
      },
      {
        unit: "UNIT 7",
        unitTitle: "Algebraic Structures and Abstract Algebra",
        
        aboutUnit: "good description",
        
        uniquelessonTitles: {
          lesson1Title: "Groups and Rings",
          lesson2Title: "Fields and Vector Spaces",
          lesson3Title: "Applications of Abstract Algebra",
          lesson4Title: "Algebraic Structures in Cryptography",
        },
        lessonLink: {
          firstLink: "lesson1.html",
          secondLink: "lesson2.html",
          thirdLink: "lesson3.html",
          fourthLink:"lesson4.html",
        },
        notes:{
          lesson1Note: "",
          lesson2Note: "",
          lesson3Note: "",
          lesson4Note: "",/* create files */
        },
      },
      {
        unit: "UNIT 8",
        unitTitle: "Systems of Equations",
        
        aboutUnit: "good description",
        
        uniquelessonTitles: {
          lesson1Title: "Introduction to Systems of Equations",
          lesson2Title: "Solving Linear Systems",
          lesson3Title: "Non-Linear Systems and Applications",
          lesson4Title: "Matrix Methods for Solving Systems",
        },
        lessonLink: {
          firstLink: "lesson1.html",
          secondLink: "lesson2.html",
          thirdLink: "lesson3.html",
          fourthLink:"lesson4.html",
        },
        notes:{
          lesson1Note: "",
          lesson2Note: "",
          lesson3Note: "",
          lesson4Note: "",/* create files */
        },
      },
    ],
  };
  /* Sidebar handlebars */
  
document.addEventListener("DOMContentLoaded", () => {
    const lessonList = document.getElementById("lessonList");
    const unitTitleElement = document.querySelector(".sub_sub-heading");
    const mainHeading = document.querySelector(".main_heading");

    // Initialize with the first unit
    displayUnit(lessonDataExport.lessons[0]);

   
    function displayUnit(unit) {
        unitTitleElement.textContent = unit.unitTitle;

        // Clear the lesson list
        lessonList.innerHTML = '';

        for (const key in unit.uniquelessonTitles) {
            if (unit.uniquelessonTitles.hasOwnProperty(key)) {
                const lessonTitle = unit.uniquelessonTitles[key];
                if (lessonTitle) {
                    const listItem = document.createElement("li");
                    listItem.classList.add("sidebar_lessonBox");

                    const lessonLink = document.createElement("a");
                    lessonLink.href = unit.lessonLink[key];
                    lessonLink.textContent = lessonTitle;

                    listItem.appendChild(lessonLink);
                    lessonList.appendChild(listItem);
                }
            }
        }
    }
});
/* Download notes button */
const myObjectData = {
    name: "example.txt",
    content: "This is the content of the file."//add a file
};

// Function to handle file download
function downloadFile() {
    // Creating the Blob from the object's data
    const blob = new Blob([myObjectData.content], { type: "text/plain" });
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    // Create a download link
    const a = document.createElement("a");
    a.href = url;
    a.download = myObjectData.name;
    // initiate  download
    a.click();
    // Release the URL object
    URL.revokeObjectURL(url);
}

// Add a click event listener to the button
const downloadButton = document.getElementById("downloadButton");
downloadButton.addEventListener("click", downloadFile);
/* To go to the next unit */
let currentUnitIndex = 0; // Initialize with the first unit

// Function to display the lesson for the current unit
function displayCurrentUnit() {
    const currentUnit = lessonDataExport.lessons[currentUnitIndex];
    const unitTitleElement = document.querySelector(".sub_sub-heading");
    const lessonList = document.getElementById("lessonList");

    unitTitleElement.textContent = currentUnit.unitTitle;

    // Clear the lesson list
    lessonList.innerHTML = '';

    for (const key in currentUnit.uniquelessonTitles) {
        if (currentUnit.uniquelessonTitles.hasOwnProperty(key)) {
            const lessonTitle = currentUnit.uniquelessonTitles[key];
            if (lessonTitle) {
                const listItem = document.createElement("li");
                listItem.classList.add("sidebar_lessonBox");

                const lessonLink = document.createElement("a");
                lessonLink.href = currentUnit.lessonLink[key];
                lessonLink.textContent = lessonTitle;

                listItem.appendChild(lessonLink);
                lessonList.appendChild(listItem);
            }
        }
    }
}

// Function to handle "Next Lesson" button click
function goToNextUnit() {
    currentUnitIndex++; // Move to the next unit

    // Check if we've reached the end of the units
    if (currentUnitIndex >= lessonDataExport.lessons.length) {
        currentUnitIndex = 0; // If at the end, loop back to the first unit
    }

    displayCurrentUnit(); // Display the lesson for the current unit
}

// Add click event listeners to the button
const nextLessonButton = document.getElementById("nextLessonButton");
nextLessonButton.addEventListener("click", goToNextUnit);

// Initialize with the first unit
displayCurrentUnit();

/* Button to go to previous lesson */

// Function to display the lesson for the current unit
function displayCurrentUnit() {
    const currentUnit = lessonDataExport.lessons[currentUnitIndex];
    const unitTitleElement = document.querySelector(".sub_sub-heading");
    const lessonList = document.getElementById("lessonList");

    
    // Clear the lesson list
    lessonList.innerHTML = '';

    for (const key in currentUnit.uniquelessonTitles) {
        if (currentUnit.uniquelessonTitles.hasOwnProperty(key)) {
            const lessonTitle = currentUnit.uniquelessonTitles[key];
            if (lessonTitle) {
                const listItem = document.createElement("li");
                listItem.classList.add("sidebar_lessonBox");

                const lessonLink = document.createElement("a");
                lessonLink.href = currentUnit.lessonLink[key];
                lessonLink.textContent = lessonTitle;

                listItem.appendChild(lessonLink);
                lessonList.appendChild(listItem);
            }
        }
    }
}

// Function to handle "Next Lesson" button click
function goToNextUnit() {
    currentUnitIndex++; // Move to the next unit

    // Check if we've reached the end of the units
    if (currentUnitIndex >= lessonDataExport.lessons.length) {
        currentUnitIndex = 0; // If at the end, loop back to the first unit
    }

    displayCurrentUnit(); // Display the lesson for the current unit
}

// Function to handle "Previous Lesson" button click
function goToPreviousUnit() {
    currentUnitIndex--; // Move to the previous unit

    // Check if we've reached the beginning of the units
    if (currentUnitIndex < 0) {
        currentUnitIndex = lessonDataExport.lessons.length - 1; // If at the beginning, loop to the last unit
    }

    displayCurrentUnit(); // Display the lesson for the current unit
}

// Add click event listeners to the buttons
const previousLessonButton = document.getElementById("previousLessonButton");
previousLessonButton.addEventListener("click", goToPreviousUnit);

// Initialize with the first unit
displayCurrentUnit();

/*  */
// Function to display the lesson for the current unit, including the main_heading div
function displayCurrentUnit() {
    const currentUnit = lessonDataExport.lessons[currentUnitIndex];
    const unitTitleElement = document.querySelector(".sub_sub-heading");
    const lessonList = document.getElementById("lessonList");
    const mainHeading = document.querySelector(".main_heading");

    // Update the main_heading div with unit and title information
    mainHeading.innerHTML = `<h2>${currentUnit.unit}</h2><p>${currentUnit.unitTitle}</p>`;

    unitTitleElement.textContent = currentUnit.unitTitle;

    // Clear the lesson list
    lessonList.innerHTML = '';

    for (const key in currentUnit.uniquelessonTitles) {
        if (currentUnit.uniquelessonTitles.hasOwnProperty(key)) {
            const lessonTitle = currentUnit.uniquelessonTitles[key];
            if (lessonTitle) {
                const listItem = document.createElement("li");
                listItem.classList.add("sidebar_lessonBox");

                const lessonLink = document.createElement("a");
                lessonLink.href = currentUnit.lessonLink[key];
                lessonLink.textContent = lessonTitle;

                listItem.appendChild(lessonLink);
                lessonList.appendChild(listItem);
            }
        }
    }
}


