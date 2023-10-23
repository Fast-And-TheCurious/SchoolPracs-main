// Define the courses
const courses = [
    {
      id: 1,
      name: "Course",
      title: "Algebra",
      link: "math-course.html",
      about_description: "This is a comprehensive mathematics course covering various topics from algebra to calculus.",
    },
    {
      id: 2,
      name: "Course",
      title: "Logs",
      link: "physics-course.html",
      about_description: "Explore the principles of physics through hands-on experiments and engaging lessons.",
    },
    {
      id: 3,
      name: "Course",
      title: "Computer Science Course",
      link: "cs-course.html",
      about_description: "Learn programming, algorithms, and data structures in this computer science course.",
    }
  ];
  
  // Define the units
  const units = [
    {
      id: 1,
      name: "Unit 1",
      title: "Introduction to Cool Concepts",
      about: "Learn the fundamental concepts of coolness in this introductory unit.",
      unitDescription: "This unit provides an overview of the course and its objectives.",
      masteryPoints: "100",
      courseID: 1,
    },
    {
      id: 2,
      name: "Unit 2",
      title: "Exploring Cool Techniques",
      about: "Dive deeper into the world of coolness in this unit.",
      unitDescription: "Explore advanced cool techniques and their applications.",
      masteryPoints: "150",
      courseID: 1,
    },
    {
      id: 3,
      name: "Unit 3",
      title: "Equations and Problem Solving",
      about: "Master problem-solving skills with equations in this unit.",
      unitDescription: "Learn about equations and their real-life applications.",
      masteryPoints: "200",
      courseID: 1,
    },
    // Add more units as needed
  ];
  
  // Define the lessons
  const lessons = [
    {
      id: 1,
      title: "Course Overview",
      link: "lessonpage.html",
      video: "https://www.youtube.com/embed/Nko_X2CU10I?si=OSPZ39ZyLBD5OiNI",
      unitID: 1,
      unitPracticeLink: null,
      unitPracticeTitle: "Practice",
      courseID: 1,
    },
    {
      id: 2,
      title: "Getting Started",
      link: "lesson2.html",
      video: "https://www.youtube.com/embed/JdqL89ZZwFw?si=04Q_OL3gQWiZ5A6v",
      unitID: 1,
      unitPracticeLink: null,
      unitPracticeTitle: "Practice",
      courseID: 1,
    },
    {
      id: 3,
      title: "Importance of the Subject",
      link: "lesson3.html",
      video: "https://www.youtube.com/embed/Nko_X2CU10I?si=OSPZ39ZyLBD5OiNI",
      unitID: 1,
      unitPracticeLink: null,
      unitPracticeTitle: "Practice",
      courseID: 1,
    },
  ];
  

  const formattedData = [];

// Iterate through units to create the desired format
units.forEach(unit => {
  const formattedUnit = {
    unit: `UNIT ${unit.id}`,
    title: unit.title,
    description: unit.about,
    unitLink: unit.link,
    worksheet: "example.txt", // Replace with the actual worksheet link
    unitDescription: unit.unitDescription,
    masteryPoints: unit.masteryPoints,
    unitLessons: [],
  };

  // Find lessons associated with this unit
  const unitLessons = lessons.filter(lesson => lesson.unitID === unit.id);

  // Iterate through unit lessons and add them to the formatted unit
  unitLessons.forEach(lesson => {
    const formattedLesson = {
      lessonTitle: lesson.title,
      lessonLink: lesson.link,
      unitPracticeTitle: lesson.unitPracticeTitle,
      unitPracticeLink: lesson.unitPracticeLink || "", // Replace with the actual practice link
      lessonDescriptions: lesson.video,
    };

    formattedUnit.unitLessons.push(formattedLesson);
  });

  formattedData.push(formattedUnit);
});

/* console.log(formattedData);
 */