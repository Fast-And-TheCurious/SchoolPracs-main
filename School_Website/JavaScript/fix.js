/* const lessonData = {
  lessons: [
    {
      unit: "UNIT 1",
      title: "Introduction",
      description: "good description",
      unitLink: "lesson1.html",
      worksheet: "example.txt",
      unitDescription:
        "This unit covers a wide range of topics related to the course. You will gain a comprehensive understanding of the subject matter.",
      masteryPoints: "1,500",
      unitLessons: [
        {
          lessonTitle: "Course Overview",
          lessonLink: "lessonpage.html",
          unitPracticeTitle: "Lesson 1 Practice",
          unitPracticeLink: "practice1.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/Nko_X2CU10I?si=OSPZ39ZyLBD5OiNI",
        },
        {
          lessonTitle: "Getting Started",
          lessonLink: "lesson2.html",
          unitPracticeTitle: "Lesson 2 Practice",
          unitPracticeLink: "practice2.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
        {
          lessonTitle: "Importance of the Subject",
          lessonLink: "lesson3.html",
          unitPracticeTitle: "Lesson 3 Practice",
          unitPracticeLink: "practice3.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/Nko_X2CU10I?si=OSPZ39ZyLBD5OiNI",
        },
        {
          lessonTitle: "Course Objectives",
          lessonLink: "lesson4.html",
          unitPracticeTitle: "Lesson 4 Practice",
          unitPracticeLink: "practice4.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
      ],
    },
    {
      unit: "UNIT 2",
      title: "Cool Stuff",
      description: "good description",
      unitLink: "lesson1.html",
      worksheet: "example.txt",
      unitDescription:
        "This unit covers a wide range of topics related to the course. You will gain a comprehensive understanding of the subject matter.",
      masteryPoints: "1,140",
      unitLessons: [
        {
          lessonTitle: "Exploring Cool Concepts",
          lessonLink: "lesson1.html",
          unitPracticeTitle: "Lesson 1 Practice",
          unitPracticeLink: "practice1.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/Nko_X2CU10I?si=OSPZ39ZyLBD5OiNI",
        },
        {
          lessonTitle: "Advanced Cool Techniques",
          lessonLink: "lesson2.html",
          unitPracticeTitle: "Lesson 2 Practice",
          unitPracticeLink: "practice2.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
        {
          lessonTitle: "Real-life Applications",
          lessonLink: "lesson3.html",
          unitPracticeTitle: "Lesson 3 Practice",
          unitPracticeLink: "practice3.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/Nko_X2CU10I?si=OSPZ39ZyLBD5OiNI",
        },
        {
          lessonTitle: "Cool Case Studies",
          lessonLink: "lesson4.html",
          unitPracticeTitle: "Lesson 4 Practice",
          unitPracticeLink: "practice4.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
      ],
    },
    {
      unit: "UNIT 3",
      title: "Solving Equations & Inequalities",
      description: "good description",
      unitLink: "lesson1.html",
      worksheet: "example.txt",
      unitDescription:
        "This unit covers a wide range of topics related to the course. You will gain a comprehensive understanding of the subject matter.",
      masteryPoints: "2,100",
      unitLessons: [
        {
          lessonTitle: "Introduction to Equations",
          lessonLink: "lessonpage.html",
          unitPracticeTitle: "Lesson 1 Practice",
          unitPracticeLink: "practice1.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/Nko_X2CU10I?si=OSPZ39ZyLBD5OiNI",
        },
        {
          lessonTitle: "Solving Linear Equations",
          lessonLink: "lesson2.html",
          unitPracticeTitle: "Lesson 2 Practice",
          unitPracticeLink: "practice2.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
        {
          lessonTitle: "Inequalities and Their Solutions",
          lessonLink: "lesson3.html",
          unitPracticeTitle: "Lesson 3 Practice",
          unitPracticeLink: "practice3.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/Nko_X2CU10I?si=OSPZ39ZyLBD5OiNI",
        },
        {
          lessonTitle: "Equations in Real-life Problems",
          lessonLink: "lesson4.html",
          unitPracticeTitle: "Lesson 4 Practice",
          unitPracticeLink: "practice4.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
      ],
    },
    {
      unit: "UNIT 4",
      title: "Advanced Topics in Math",
      description: "good description",
      worksheet: "example.txt",
      unitDescription:
        "This unit covers a wide range of topics related to the course. You will gain a comprehensive understanding of the subject matter.",
      masteryPoints: "400",
      unitLessons: [
        {
          lessonTitle: "Complex Numbers",
          lessonLink: "lessonpage.html",
          unitPracticeTitle: "Lesson 1 Practice",
          unitPracticeLink: "practice1.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/Nko_X2CU10I?si=OSPZ39ZyLBD5OiNI",
        },
        {
          lessonTitle: "Trigonometry and Calculus",
          lessonLink: "lesson2.html",
          unitPracticeTitle: "Lesson 2 Practice",
          unitPracticeLink: "practice2.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
        {
          lessonTitle: "Vectors and Matrices",
          lessonLink: "lesson3.html",
          unitPracticeTitle: "Lesson 3 Practice",
          unitPracticeLink: "practice3.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/Nko_X2CU10I?si=OSPZ39ZyLBD5OiNI",
        },
        {
          lessonTitle: "Advanced Problem Solving",
          lessonLink: "lesson4.html",
          unitPracticeTitle: "Lesson 4 Practice",
          unitPracticeLink: "practice4.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
      ],
    },
    {
      unit: "UNIT 5",
      title: "Statistics and Data Analysis",
      unitDescription: "good description",
      worksheet: "example.txt",
      unitDescription:
        "This unit covers a wide range of topics related to the course. You will gain a comprehensive understanding of the subject matter.",
      masteryPoints: "1,100",
      unitLessons: [
        {
          lessonTitle: "Introduction to Statistics",
          lessonLink: "lessonpage.html",
          unitPracticeTitle: "Lesson 1 Practice",
          unitPracticeLink: "practice1.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/Nko_X2CU10I?si=OSPZ39ZyLBD5OiNI",
        },
        {
          lessonTitle: "Data Collection and Analysis",
          lessonLink: "lesson2.html",
          unitPracticeTitle: "Lesson 2 Practice",
          unitPracticeLink: "practice2.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
        {
          lessonTitle: "Probability and Distributions",
          lessonLink: "lesson3.html",
          unitPracticeTitle: "Lesson 3 Practice",
          unitPracticeLink: "practice3.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/Nko_X2CU10I?si=OSPZ39ZyLBD5OiNI",
        },
        {
          lessonTitle: "Statistical Inference",
          lessonLink: "lesson4.html",
          unitPracticeTitle: "Lesson 4 Practice",
          unitPracticeLink: "practice4.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
      ],
    },
    {
      unit: "UNIT 6",
      title: "Geometry and Geometric Figures",
      unitDescription: "good description",
      worksheet: "example.txt",
      unitDescription:
        "This unit covers a wide range of topics related to the course. You will gain a comprehensive understanding of the subject matter.",
      masteryPoints: "1,100",
      unitLessons: [
        {
          lessonTitle: "Basic Geometric Shapes",
          lessonLink: "lessonpage.html",
          unitPracticeTitle: "Lesson 1 Practice",
          unitPracticeLink: "practice1.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/Nko_X2CU10I?si=OSPZ39ZyLBD5OiNI",
        },
        {
          lessonTitle: "Euclidean Geometry",
          lessonLink: "lesson2.html",
          unitPracticeTitle: "Lesson 2 Practice",
          unitPracticeLink: "practice2.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
        {
          lessonTitle: "Geometry in the Real World",
          lessonLink: "lesson3.html",
          unitPracticeTitle: "Lesson 3 Practice",
          unitPracticeLink: "practice3.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/Nko_X2CU10I?si=OSPZ39ZyLBD5OiNI",
        },
        {
          lessonTitle: "Non-Euclidean Geometry",
          lessonLink: "lesson4.html",
          unitPracticeTitle: "Lesson 4 Practice",
          unitPracticeLink: "practice4.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
      ],
    },
    {
      unit: "UNIT 7",
      title: "Algebraic Structures and Abstract Algebra",
      unitDescription: "good description",
      worksheet: "example.txt",
      unitDescription:
        "This unit covers a wide range of topics related to the course. You will gain a comprehensive understanding of the subject matter.",
      masteryPoints: "1,100",
      unitLessons: [
        {
          lessonTitle: "Groups and Rings",
          lessonLink: "lessonpage.html",
          unitPracticeTitle: "Lesson 1 Practice",
          unitPracticeLink: "practice1.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/Nko_X2CU10I?si=OSPZ39ZyLBD5OiNI",
        },
        {
          lessonTitle: "Fields and Vector Spaces",
          lessonLink: "lesson2.html",
          unitPracticeTitle: "Lesson 2 Practice",
          unitPracticeLink: "practice2.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
        {
          lessonTitle: "Applications of Abstract Algebra",
          lessonLink: "lesson3.html",
          unitPracticeTitle: "Lesson 3 Practice",
          unitPracticeLink: "practice3.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/Nko_X2CU10I?si=OSPZ39ZyLBD5OiNI",
        },
        {
          lessonTitle: "Algebraic Structures in Cryptography",
          lessonLink: "lesson4.html",
          unitPracticeTitle: "Lesson 4 Practice",
          unitPracticeLink: "practice4.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
      ],
    },
    {
      unit: "UNIT 8",
      title: "Systems of Equations",
      unitDescription: "good description",
      worksheet: "example.txt",
      unitDescription:
        "This unit covers a wide range of topics related to the course. You will gain a comprehensive understanding of the subject matter.",
      masteryPoints: "1,100",
      unitLessons: [
        {
          lessonTitle: "Introduction to Systems of Equations",
          lessonLink: "lessonpage.html",
          unitPracticeTitle: "Lesson 1 Practice",
          unitPracticeLink: "practice1.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/Nko_X2CU10I?si=OSPZ39ZyLBD5OiNI",
        },
        {
          lessonTitle: "Solving Linear Systems",
          lessonLink: "lesson2.html",
          unitPracticeTitle: "Lesson 2 Practice",
          unitPracticeLink: "practice2.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
        {
          lessonTitle: "Non-Linear Systems and Applications",
          lessonLink: "lesson3.html",
          unitPracticeTitle: "Lesson 3 Practice",
          unitPracticeLink: "practice3.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/Nko_X2CU10I?si=OSPZ39ZyLBD5OiNI",
        },
        {
          lessonTitle: "Matrix Methods for Solving Systems",
          lessonLink: "lesson4.html",
          unitPracticeTitle: "Lesson 4 Practice",
          unitPracticeLink: "practice4.html",
          lessonDescriptions:
            "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
        },
      ],
    },
  ],
};
 */




  /*const lessonData = {
  lessons: [
    {
      unit: "UNIT 1",
      title: "NiceName",
      description: "This lesson provides an overview of the course.",
      unitLink: "lesson1.html",
      unitLessons: {
        uniquelessonTitles: {
          lesson1Title: "Course Overview",
          lesson2Title: "Getting Started",
          lesson3Title: "Importance of the Subject",
          lesson4Title: "Course Objectives",
        },
        lessonLink: {
          lessonLink1: "lesson1.html",
          lessonLink2: "lesson2.html",
          lessonink3: "lesson3.html",
          lessonLink4: "lesson4.html",
        },
        unitPracticeTitles: {
          unitPracticeTitle1: "PracticeStuff",
          unitPracticeTitle2: "notherPraciceStuff",
        },
        unitPracticeLinks: {
          practiceLink1: "",
          practiceLink2: "",
          practiceLink3: "",
          practiceLink4: "",
        },
        lessonDescriptions: {
          lesson1: "Description for Lesson 1",
          lesson2: "Description for Lesson 2",
          lesson3: "Description for Lesson 3",
          lesson4: "Description for Lesson 4",
        },        
      },
      worksheet: "worksheet.txt",
      
      unitDescription:
        "This unit covers a wide range of topics related to the course. You will gain a comprehensive understanding of the subject matter.",
      masteryPoints: "1,500",
    },
    {
      unit: "UNIT 2",
      title: "Cool stuff",
      description: "This lesson provides an overview of the course.",
      unitLink: "lesson1.html",
      unitLessons: {
        uniquelessonTitles: {
          lesson1Title: "Exploring Cool Concepts",
          lesson2Title: "Advanced Cool Techniques",
          lesson3Title: "Real-life Applications",
          lesson4Title: "Cool Case Studies",
        },
        unitPracticeTitles: {
          unitPracticeTitle1: "PracticeStuff",
          unitPracticeTitle2: "notherPraciceStuff",
        },
        unitPracticeLinks: {
          practiceLink1: "",
          practiceLink2: "",
          practiceLink3: "",
          practiceLink4: "",
        },
        lessonLink: {
          lessonLink1: "lesson1.html",
          lessonLink2: "lesson2.html",
          lessonink3: "lesson3.html",
          lessonLink4: "lesson4.html",
        },

        lessonDescriptions: {
          lesson1: "Description for Lesson 1",
          lesson2: "Description for Lesson 2",
          lesson3: "Description for Lesson 3",
          lesson4: "Description for Lesson 4",
        },        
      },
      worksheet: "worksheet.txt",
      
      unitDescription:
        "This unit covers a wide range of topics related to the course. You will gain a comprehensive understanding of the subject matter.",
      masteryPoints: "1,140",
    },
    {
      unit: "UNIT 3",
      title: "Solving Equations & Inequalities",
      description: "This lesson provides an overview of the course.",
      unitLink: "lesson1.html",
      unitLessons: {
        uniquelessonTitles: {
          lesson1Title: "Introduction to Equations",
          lesson2Title: "Solving Linear Equations",
          lesson3Title: "Inequalities and Their Solutions",
          lesson4Title: "Equations in Real-life Problems",
        },
        unitPracticeTitles: {
          unitPracticeTitle1: "PracticeStuff",
          unitPracticeTitle2: "notherPraciceStuff",
        },
        unitPracticeLinks: {
          practiceLink1: "",
          practiceLink2: "",
          practiceLink3: "",
          practiceLink4: "",
        },
        lessonLink: {
          lessonLink1: "lesson1.html",
          lessonLink2: "lesson2.html",
          lessonink3: "lesson3.html",
          lessonLink4: "lesson4.html",
        },
        lessonDescriptions: {
          lesson1: "Description for Lesson 1",
          lesson2: "Description for Lesson 2",
          lesson3: "Description for Lesson 3",
          lesson4: "Description for Lesson 4",
        },        
      },
      worksheet: "worksheet.txt",
      
      unitDescription:
        "This unit covers a wide range of topics related to the course. You will gain a comprehensive understanding of the subject matter.",
      masteryPoints: "2,100",
    },
    {
      unit: "UNIT 4",
      title: "Introduction",
      description: "This lesson provides an overview of the course.",
      unitLink: "lesson1.html",
      unitLessons: {
        uniquelessonTitles: {
          lesson1Title: "Complex Numbers",
          lesson2Title: "Trigonometry and Calculus",
          lesson3Title: "Vectors and Matrices",
          lesson4Title: "Advanced Problem Solving",
        },
        unitPracticeTitles: {
          unitPracticeTitle1: "PracticeStuff",
          unitPracticeTitle2: "notherPraciceStuff",
        },
        unitPracticeLinks: {
          practiceLink1: "",
          practiceLink2: "",
          practiceLink3: "",
          practiceLink4: "",
        },
        lessonLink: {
          lessonLink1: "lesson1.html",
          lessonLink2: "lesson2.html",
          lessonink3: "lesson3.html",
          lessonLink4: "lesson4.html",
        },
        lessonDescriptions: {
          lesson1: "Description for Lesson 1",
          lesson2: "Description for Lesson 2",
          lesson3: "Description for Lesson 3",
          lesson4: "Description for Lesson 4",
        },       
      },
      worksheet: "worksheet.txt",
      
      unitDescription:
        "This unit covers a wide range of topics related to the course. You will gain a comprehensive understanding of the subject matter.",
      masteryPoints: "400",
    },
    {
      unit: "UNIT 5",
      title: "Introduction",
      unitLescription: "This lesson provides an overview of the course.",
      unitLessons: {
        uniquelessonTitles: {
          lesson1Title: "Introduction to Statistics",
          lesson2Title: "Data Collection and Analysis",
          lesson3Title: "Probability and Distributions",
          lesson4Title: "Statistical Inference",
        },
        unitPracticeTitles: {
          unitPracticeTitle1: "PracticeStuff",
          unitPracticeTitle2: "notherPraciceStuff",
        },
        unitPracticeLinks: {
          practiceLink1: "",
          practiceLink2: "",
          practiceLink3: "",
          practiceLink4: "",
        },
        lessonLink: {
          lessonLink1: "lesson1.html",
          lessonLink2: "lesson2.html",
          lessonink3: "lesson3.html",
          lessonLink4: "lesson4.html",
        },
        lessonDescriptions: {
          lesson1: "Description for Lesson 1",
          lesson2: "Description for Lesson 2",
          lesson3: "Description for Lesson 3",
          lesson4: "Description for Lesson 4",
        },        
      },
      worksheet: "worksheet.txt",
      
      unitDescription:
        "This unit covers a wide range of topics related to the course. You will gain a comprehensive understanding of the subject matter.",
      masteryPoints: "1,100",
    },
    {
      unit: "UNIT 6",
      title: "Introduction",
      description: "This lesson provides an overview of the course.",
      unitLink: "lesson1.html",
      unitLessons: {
        uniquelessonTitles: {
          lesson1Title: "Basic Geometric Shapes",
          lesson2Title: "Euclidean Geometry",
          lesson3Title: "Geometry in the Real World",
          lesson4Title: "Non-Euclidean Geometry",
        },
        unitPracticeTitles: {
          unitPracticeTitle1: "PracticeStuff",
          unitPracticeTitle2: "notherPraciceStuff",
        },
        unitPracticeLinks: {
          practiceLink1: "",
          practiceLink2: "",
          practiceLink3: "",
          practiceLink4: "",
        },
        lessonLink: {
          lessonLink1: "lesson1.html",
          lessonLink2: "lesson2.html",
          lessonink3: "lesson3.html",
          lessonLink4: "lesson4.html",
        },
        lessonDescriptions: {
          lesson1: "Description for Lesson 1",
          lesson2: "Description for Lesson 2",
          lesson3: "Description for Lesson 3",
          lesson4: "Description for Lesson 4",
        },        
      },
      worksheet: "worksheet.txt",
      
      unitDescription:
        "This unit covers a wide range of topics related to the course. You will gain a comprehensive understanding of the subject matter.",
      masteryPoints: "1,100",
    },
    {
      unit: "UNIT 7",
      title: "Introduction",
      description: "This lesson provides an overview of the course.",
      unitLink: "lesson1.html",
      unitLessons: {
        uniquelessonTitles: {
          lesson1Title: "Groups and Rings",
          lesson2Title: "Fields and Vector Spaces",
          lesson3Title: "Applications of Abstract Algebra",
          lesson4Title: "Algebraic Structures in Cryptography",
        },
        unitPracticeTitles: {
          unitPracticeTitle1: "PracticeStuff",
          unitPracticeTitle2: "notherPraciceStuff",
        },
        unitPracticeLinks: {
          practiceLink1: "",
          practiceLink2: "",
          practiceLink3: "",
          practiceLink4: "",
        },
        lessonLink: {
          lessonLink1: "lesson1.html",
          lessonLink2: "lesson2.html",
          lessonink3: "lesson3.html",
          lessonLink4: "lesson4.html",
        },
        lessonDescriptions: {
          lesson1: "Description for Lesson 1",
          lesson2: "Description for Lesson 2",
          lesson3: "Description for Lesson 3",
          lesson4: "Description for Lesson 4",
        },        
      },
      worksheet: "worksheet.txt",
      
      unitDescription:
        "This unit covers a wide range of topics related to the course. You will gain a comprehensive understanding of the subject matter.",
      masteryPoints: "1,100",
    },
    {
      unit: "UNIT 8",
      title: "Introduction",
      description: "This lesson provides an overview of the course.",
      unitLink: "lesson1.html",
      unitLessons: {
        uniquelessonTitles: {
          lesson1Title: "Introduction to Systems of Equations",
          lesson2Title: "Solving Linear Systems",
          lesson3Title: "Non-Linear Systems and Applications",
          lesson4Title: "Matrix Methods for Solving Systems",
        },
        unitPracticeTitles: {
          unitPracticeTitle1: "PracticeStuff",
          unitPracticeTitle2: "notherPraciceStuff",
        },
        unitPracticeLinks: {
          practiceLink1: "",
          practiceLink2: "",
          practiceLink3: "",
          practiceLink4: "",
        },
        lessonLink: {
          lessonLink1: "lesson1.html",
          lessonLink2: "lesson2.html",
          lessonink3: "lesson3.html",
          lessonLink4: "lesson4.html",
        },
        lessonDescriptions: {
          lesson1: "Description for Lesson 1",
          lesson2: "Description for Lesson 2",
          lesson3: "Description for Lesson 3",
          lesson4: "Description for Lesson 4",
        },        
      },
      worksheet: "worksheet.txt",
      
      unitDescription:
        "This unit covers a wide range of topics related to the course. You will gain a comprehensive understanding of the subject matter.",
      masteryPoints: "1,100",
    },
  ]
};


// Calculate total mastery points of all units
const totalMasteryPoints = lessonData.lessons
  .reduce((total, lesson) => {
    return total + parseFloat(lesson.masteryPoints.replace(/,/g, ""));
  }, 0)
  .toLocaleString();

// Calculate  number of unique units
const uniqueUnits = [
  ...new Set(lessonData.lessons.map((lesson) => lesson.unit)),
];
const numUnits = uniqueUnits.length;

const unitInformation = {
  unitInfo: [{ title: "Title", numUnits: numUnits }],
};

// Function change title dynamically
function changeTitle(newTitle) {
  unitInformation.unitInfo[0].title = newTitle;
  // Update the rendered HTML to reflect the new title
  const updatedLessonSidebarHtml = lessonSidebarTemplate(unitInformation);
  document.getElementById("lesson-sidebar").innerHTML =
    updatedLessonSidebarHtml;
}

//Showing units and total mastery points or individual unit mastery points
let showAllUnits = true;

// Get the Handlebars template for the lesson sidebar
const lessonSidebarTemplateSource = document.getElementById(
  "lesson-sidebar-template"
).innerHTML;
const lessonSidebarTemplate = Handlebars.compile(lessonSidebarTemplateSource);

// object combining unitInformation, lessons, and numUnits
const dataToRender = {
  unitInfo: unitInformation.unitInfo,
  lessons: lessonData.lessons,
  numUnits: numUnits,
  showAllUnits: showAllUnits,
  totalMasteryPoints: totalMasteryPoints,
};

// Render sidebar with combined data and insert it into the page
const lessonSidebarHtml = lessonSidebarTemplate(dataToRender);

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
  
  const lessonHtml = lessonTemplate(lessonData);
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
  
      const selectedLesson = lessonData.lessons.find(
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
          info: selectedLesson.unitLessons.uniquelessonTitles.lesson1Title,
        },
        {
          title: "Lesson 2",
          info: selectedLesson.unitLessons.uniquelessonTitles.lesson2Title,
        },
        {
          title: "Lesson 3",
          info: selectedLesson.unitLessons.uniquelessonTitles.lesson3Title,
        },
        {
          title: "Lesson 4",
          info: selectedLesson.unitLessons.uniquelessonTitles.lesson4Title,
        },
        {
          title: "Worksheets",
          info: "Practice what you have learnt",
        },
      ];
  
      const boxesHtml = titlesAndInfo
        .map(
          (item) => `
        <div class="info-box"><a href=""> 
          <h2>${item.title}</h2>
          <p>${item.info}</p>
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
  
  
  const dt = document.getElementById("worksheetDownloadButton");
  dt.href = "School_Website\pdfs\test.pdf";
  dt.download = "test";
*/

const arrayOfObjects = [
  { name: "John", age: 25 },
  { name: "Jane", age: 30 },
  { name: "Bob", age: 35 }
];

module.exports = arrayOfObjects;