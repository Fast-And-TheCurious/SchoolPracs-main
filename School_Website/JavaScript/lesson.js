function getCookie(name) {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName.trim() === name) {
        return cookieValue;
      }
    }
    return null;
  }
  
  async function getUnits() {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/units");
      const unitsData = await response.json();
      if (unitsData.error) {
        console.error("Error fetching units:", unitsData.error);
        document.getElementById('gif-container').classList.remove('hidden'); // note to add: the add and remove just "adds" and "removes" the "hidden" class form the div with the id of #gif-container 
        return [];
      } else {
        document.getElementById('gif-container').classList.add('hidden');
        return unitsData;
      }
    } catch (error) {
      console.error("An error occurred while fetching units:", error);
      document.getElementById('gif-container').classList.remove('hidden'); 
      return [];
    }
  }
  
  async function getLessons() {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/lessons");
      const lessonsData = await response.json();
      if (lessonsData.error) {
        console.error("Error fetching lessons:", lessonsData.error);
        return [];      
      } else {
        return lessonsData;
      }
    } catch (error) {
      console.error("An error occurred while fetching lessons:", error);
      return [];
    }
  }


  let userID;
  let lesson_Title="";
  let watched;
let unitID;
let lessonID;
async function fetchLessonID(lesson_Title) {
  const colonIndex = lesson_Title.indexOf(':');
// substring from the character after the colon
  const title = lesson_Title.substring(colonIndex + 3).trim();
  try {
    const response = await fetch(`http://localhost:5000/api/getLessonIdByLessonTitle?lesson_Title=${encodeURIComponent(title)}`);
            
      if (!response.ok) {
          throw new Error('Failed to fetch lesson ID');
      }
      
      const data = await response.json();
      if (data.success) {
          const lessonID = data.lessons.length > 0 ? data.lessons[0].id : null; // Assuming lessons is an array and contains the ID
          return lessonID; // Return the lesson ID to use later
      } else {
          console.error('Error fetching lesson ID:', data.error);
          return null; // Handle the error appropriately
      }
  } catch (error) {
      console.error('Error fetching lesson ID:', error);
      return null; // Handle the error appropriately
  }
}
  const lessonsContent = {
    lessons: [],
  }
  const lessonDataExport = {
    lessons: [],
  };

  document.addEventListener("DOMContentLoaded", async function () {

    userID = getCookie("userID");
    const courseIDFetched = getCookie("courseID");

    const courseID = parseInt(courseIDFetched, 10);
    const backButton = document.getElementById('backToUnitsButton');
    backButton.href = `/School_Website/html/topic.html?course=${courseID}`;

    if (Number.isInteger(courseID)) { // can remove later, not needed after finished
      console.log("The course ID is a valid integer:", courseID);
    } else {
      console.error("The course ID is not a valid integer:", courseIDFetched);
    }
   
    if (!courseID) {
        console.error("No valid course ID fetched.");
    } //add logic?

    if (!userID) {
      alert("No user found. Please log in.");
      window.location.href = "/School_Website/html/login.html";
      return;
    }
  
    const units = await getUnits();
    const lessons = await getLessons();
  
    const unitsArray = units || [];
    const lessonsArray = lessons || [];
  
  // Push values into the object array called "lessonDataExport"
  unitsArray.forEach((unit) => {
    lessonsContent.lessons.push({
      id: unit.id,
      courseID: unit.courseID,
      unit: `Unit ${unit.id}`,
      unitTitle: unit.title,
      note: unit.notes,
      aboutUnit: unit.aboutUnit,
      unitlessonContent: lessonsArray
        .filter((lesson) => lesson.unitID === unit.id)
        .map((lesson) => ({
          lessonTitle: lesson.title,
          lessonLink: lesson.link,
          youTubeVideo: lesson.video, 
        })),
    });
  });

  let startIndexOfLessonsToUse= -1;
  let endIndex = -1;
  
  for(let i =0; i< lessonsContent.lessons.length; i++){
    if(lessonsContent.lessons[i].courseID === courseID){
        startIndexOfLessonsToUse=i;  
        break; 
    }else{
        console.log("No lesson found to match unit in the course.");
    }
  }
  for(let j = lessonsContent.lessons.length-1; j>=0; j--){
    if(lessonsContent.lessons[j].courseID === courseID){
       endIndex=j;   
       break;
    }
   }

  for(let i = startIndexOfLessonsToUse; i<endIndex+1 && i < lessonsContent.lessons.length; i++){
    lessonDataExport.lessons.push(lessonsContent.lessons[i]);
  }

  let currentUnitIndex = 0;
  let currentLessonIndex = 0;

  function populateSidebar(unitIndex) {
    const sidebar = document.querySelector(".sidebar ul");
    sidebar.innerHTML = "";

    const mainHeading = document.querySelector(".main_heading");
    mainHeading.innerHTML = `<p>${lessonDataExport.lessons[unitIndex].unit}: ${lessonDataExport.lessons[unitIndex].unitTitle}</p>`;

    const unitlessonContent =
      lessonDataExport.lessons[unitIndex].unitlessonContent;
    for (const lesson of unitlessonContent) {
      const listItem = document.createElement("li");
      listItem.classList.add("sidebar_lessonBox");
        // Creates a link for each lesson
      listItem.innerHTML = `<a href="${lesson.lessonLink}">${lesson.lessonTitle}</a>`;
      // Append the list item to the sidebar
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
    // Update the lessonTitle variable
    lesson_Title =lessonDataExport.lessons[currentUnitIndex].unit+": "+lessonDataExport.lessons[currentUnitIndex].unitlessonContent[currentLessonIndex].lessonTitle;
    
    unitID = lessonDataExport.lessons[currentUnitIndex].id;

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
  var watched=0;   
  function onNextLessonClick() {
    if (
      currentLessonIndex <
      lessonDataExport.lessons[currentUnitIndex].unitlessonContent.length - 1
    ) {
      currentLessonIndex++;
      updateVideo();
      watched=0;
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

  });  

  
  async function updateLessonCompleted() { 
    watched=watched+1;  
    // Find the index of the colon
    lessonID = await fetchLessonID(lesson_Title);

  if(watched>1){
    alert("Video has been watched.");
  } else{
    fetch('http://localhost:5000/api/updateActivtiesHistory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: lesson_Title,
        userID: userID,
      })
    })
    .then(response => response.json())
    .then(data=> {
      console.log('Activity history updated:', data);
    })
    .catch(error => {
      console.error('Error, cant update activity history:', error);
    });
    fetch('http://localhost:5000/api/updateLessonCompleted', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userID: userID,      
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Lesson updated:', data);
      })
      .catch(error => {
        console.error('Error, cant update lesson completed number:', error);
      }); 
    }   
  }

