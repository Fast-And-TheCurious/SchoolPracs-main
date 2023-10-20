//const { response, query } = require("express");

const lessonDataExport = {
  lessons: [
    {
      id: 1,
      unit: "UNIT 1",
      unitTitle: "Algebra foundations",
      note: "example.txt",
      aboutUnit: "good description",
      unitlessonContent: [
        {
          lessonTitle: "introduction",
          lessonLink: "lessonpage.html",
          youTubeVideo: "https://www.youtube.com/embed/YhZZZM8IK7c?si=7L7X-X7ikpjhLxYH",
        },
        {
          lessonTitle: "Algebra - How To Solve Equations Quickly!",
          lessonLink: "lesson2.html",
          youTubeVideo: "https://www.youtube.com/embed/Z-ZkmpQBIFo?si=VbFL4z-MmYD0qrFk",
        },
        {
          lessonTitle: "Importance of the Subject",
          lessonLink: "lesson3.html",
          youTubeVideo: "https://www.youtube.com/embed/YhZZZM8IK7c?si=7L7X-X7ikpjhLxYH",
        },
        {
          lessonTitle: "Course Objectives",
          lessonLink: "lesson4.html",
          youTubeVideo: "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
      ],
    },
    {
      id: 2,
      unit: "UNIT 2",
      unitTitle: "Solvin equations & inequalities",
      note: "example.txt",
      aboutUnit: "good description",
      unitlessonContent: [
        {
          lessonTitle: "introduction",
          lessonLink: "lesson1.html",
          youTubeVideo: "https://www.youtube.com/embed/YhZZZM8IK7c?si=7L7X-X7ikpjhLxYH",
        },
        {
          lessonTitle: "Advanced Cool Techniques",
          lessonLink: "lesson2.html",
          youTubeVideo: "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
        {
          lessonTitle: "Real-life Applications",
          lessonLink: "lesson3.html",
          youTubeVideo: "https://www.youtube.com/embed/YhZZZM8IK7c?si=7L7X-X7ikpjhLxYH",
        },
        {
          lessonTitle: "Cool Case Studies",
          lessonLink: "lesson4.html",
          youTubeVideo: "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
      ],
    },
    {
      id: 3,
      unit: "UNIT 3",
      unitTitle: "Solving Equations & Inequalities",
      note: "example.txt",
      aboutUnit: "good description",
      unitlessonContent: [
        {
          lessonTitle: "Introduction to Equations",
          lessonLink: "lessonpage.html",
          youTubeVideo: "https://www.youtube.com/embed/YhZZZM8IK7c?si=7L7X-X7ikpjhLxYH",
        },
        {
          lessonTitle: "Solving Linear Equations",
          lessonLink: "lesson2.html",
          youTubeVideo: "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
        {
          lessonTitle: "Inequalities and Their Solutions",
          lessonLink: "lesson3.html",
          youTubeVideo: "https://www.youtube.com/embed/YhZZZM8IK7c?si=7L7X-X7ikpjhLxYH",
        },
        {
          lessonTitle: "Equations in Real-life Problems",
          lessonLink: "lesson4.html",
          youTubeVideo: "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
      ],
    },
    {
      id: 4,
      unit: "UNIT 4",
      unitTitle: "Linear equations % grpahs",
      notes: "example.txt",
      aboutUnit: "good description",
      unitlessonContent: [
        {
          lessonTitle: "introduction",
          lessonLink: "lessonpage.html",
          youTubeVideo: "https://www.youtube.com/embed/YhZZZM8IK7c?si=7L7X-X7ikpjhLxYH",
        },
        {
          lessonTitle: "Trigonometry and Calculus",
          lessonLink: "lesson2.html",
          youTubeVideo: "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
        {
          lessonTitle: "Vectors and Matrices",
          lessonLink: "lesson3.html",
          youTubeVideo: "https://www.youtube.com/embed/YhZZZM8IK7c?si=7L7X-X7ikpjhLxYH",
        },
        {
          lessonTitle: "Advanced Problem Solving",
          lessonLink: "lesson4.html",
          youTubeVideo: "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
      ],
    },
    {
      id: 5,
      unit: "UNIT 5",
      unitTitle: "Solving equations",
      notes: "example.txt",
      aboutUnit: "good description",
      unitlessonContent: [
        {
          lessonTitle: "Introduction to equations",
          lessonLink: "lessonpage.html",
          youTubeVideo: "https://www.youtube.com/embed/YhZZZM8IK7c?si=7L7X-X7ikpjhLxYH",
        },
        {
          lessonTitle: "Data Collection and Analysis",
          lessonLink: "lesson2.html",
          youTubeVideo: "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
        {
          lessonTitle: "Probability and Distributions",
          lessonLink: "lesson3.html",
          youTubeVideo: "https://www.youtube.com/embed/YhZZZM8IK7c?si=7L7X-X7ikpjhLxYH",
        },
        {
          lessonTitle: "Statistical Inference",
          lessonLink: "lesson4.html",
          youTubeVideo: "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
      ],
    },
    {
      id: 6,
      unit: "UNIT 6",
      unitTitle: "Exponents % radicals",
      notes: "example.txt",
      aboutUnit: "good description",
      unitlessonContent: [
        {
          lessonTitle: "Introduction Exponents % radicals",
          lessonLink: "lessonpage.html",
          youTubeVideo: "https://www.youtube.com/embed/YhZZZM8IK7c?si=7L7X-X7ikpjhLxYH",
        },
        {
          lessonTitle: "Further understanding",
          lessonLink: "lesson2.html",
          youTubeVideo: "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
        {
          lessonTitle: "Geometry in the Real World",
          lessonLink: "lesson3.html",
          youTubeVideo: "https://www.youtube.com/embed/YhZZZM8IK7c?si=7L7X-X7ikpjhLxYH",
        },
        {
          lessonTitle: "Non-Euclidean Geometry",
          lessonLink: "lesson4.html",
          youTubeVideo: "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
      ],
    },
    {
      id: 7,
      unit: "UNIT 7",
      unitTitle: "Algebraic Structures and Abstract Algebra",
      notes: "example.txt",
      aboutUnit: "good description",
      unitlessonContent: [
        {
          lessonTitle: "Groups and Rings",
          lessonLink: "lessonpage.html",
          youTubeVideo: "https://www.youtube.com/embed/YhZZZM8IK7c?si=7L7X-X7ikpjhLxYH",
        },
        {
          lessonTitle: "Fields and Vector Spaces",
          lessonLink: "lesson2.html",
          youTubeVideo: "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
        {
          lessonTitle: "Applications of Abstract Algebra",
          lessonLink: "lesson3.html",
          youTubeVideo: "https://www.youtube.com/embed/YhZZZM8IK7c?si=7L7X-X7ikpjhLxYH",
        },
        {
          lessonTitle: "Algebraic Structures in Cryptography",
          lessonLink: "lesson4.html",
          youTubeVideo: "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
      ],
    },
    {
      id: 8,
      unit: "UNIT 8",
      unitTitle: "Systems of Equations",
      notes: "example.txt",
      aboutUnit: "good description",
      unitlessonContent: [
        {
            lessonTitle: "Introduction to Systems of Equations",
            lessonLink: "lessonpage.html",
            youTubeVideo: "https://www.youtube.com/embed/YhZZZM8IK7c?si=7L7X-X7ikpjhLxYH",
          },
          {
            lessonTitle: "Solving Linear Systems",
            lessonLink: "lesson2.html",
            youTubeVideo: "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
          },
          {
            lessonTitle: "Non-Linear Systems and Applications",
            lessonLink: "lesson3.html",
            youTubeVideo: "https://www.youtube.com/embed/YhZZZM8IK7c?si=7L7X-X7ikpjhLxYH",
          },
          {
            lessonTitle: "Matrix Methods for Solving Systems",
            lessonLink: "lesson4.html",
            youTubeVideo: "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
          },
        ],
      },
    ]  
};








let currentUnitIndex = 0;
let currentLessonIndex = 0;

function populateSidebar(unitIndex) {
  const sidebar = document.querySelector(".sidebar ul");
  sidebar.innerHTML = "";

  const mainHeading = document.querySelector(".main_heading");
  mainHeading.innerHTML = `<p>${lessonDataExport.lessons[unitIndex].unit}: ${lessonDataExport.lessons[unitIndex].unitTitle}</p>`;

  const unitlessonContent = lessonDataExport.lessons[unitIndex].unitlessonContent;
  for (const lesson of unitlessonContent) {
    const listItem = document.createElement("li");
    listItem.classList.add("sidebar_lessonBox");
    listItem.innerHTML = `<a href="${lesson.lessonLink}">${lesson.lessonTitle}</a>`;
    sidebar.appendChild(listItem);
  }
}

function updateVideo() {
  const youtubeVideo = document.getElementById("youtubeVideo");
  const lessonTitleElement = document.getElementById("lessonTitle"); 
  const sidebarLessons = document.querySelectorAll(".sidebar_lessonBox");

  sidebarLessons.forEach((lesson) => {
    lesson.classList.remove("active-lesson");
  });

  sidebarLessons[currentLessonIndex].classList.add("active-lesson");

  lessonTitleElement.textContent = lessonDataExport.lessons[currentUnitIndex].unitlessonContent[currentLessonIndex].lessonTitle;

  youtubeVideo.src = lessonDataExport.lessons[currentUnitIndex].unitlessonContent[currentLessonIndex].youTubeVideo;
}



populateSidebar(currentUnitIndex);
updateVideo();

function onNextUnitClick() {
  if (currentUnitIndex < lessonDataExport.lessons.length - 1) {
    currentUnitIndex++;
    currentLessonIndex = 0; // Reset lesson index to the first lesson
    populateSidebar(currentUnitIndex);
    updateVideo();
  }
}

function onPreviousUnitClick() {
  if (currentUnitIndex > 0) {
    currentUnitIndex--;
    currentLessonIndex = 0; // Reset lesson index to the first lesson
    populateSidebar(currentUnitIndex);
    updateVideo();
  }
}

const nextUnitButton = document.getElementById("nextUnitButton");
nextUnitButton.addEventListener("click", onNextUnitClick);

const previousUnitButton = document.getElementById("previousUnitButton");
previousUnitButton.addEventListener("click", onPreviousUnitClick);

function onNextLessonClick() {
  if (currentLessonIndex < lessonDataExport.lessons[currentUnitIndex].unitlessonContent.length - 1) {
    currentLessonIndex++;
    updateVideo();
  }
}

function onPreviousLessonClick() {
  if (currentLessonIndex > 0) {
    currentLessonIndex--;
    updateVideo();
  }
}

const nextLessonButton = document.getElementById("nextLessonButton");
nextLessonButton.addEventListener("click", onNextLessonClick);

const previousLessonButton = document.getElementById("previousLessonButton");
previousLessonButton.addEventListener("click", onPreviousLessonClick);
