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
      return [];
    } else {
      return unitsData;
    }
  } catch (error) {
    console.error("An error occurred while fetching units:", error);
    document.getElementById('errorGif').src.style.display = 'none'; /* See if works */
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

const lessonDataExport = {
  lessons: [],
};
let userID;
document.addEventListener("DOMContentLoaded", async function () {
 
  userID = getCookie("userID");
  console.log("userID: ", userID);

  // might be useless??
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
    lessonDataExport.lessons.push({
      id: unit.id,
      unit: `UNIT ${unit.id}`,
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
 
  console.log(lessonDataExport);

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
    if (
      currentLessonIndex <
      lessonDataExport.lessons[currentUnitIndex].unitlessonContent.length - 1
    ) {
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
});

var watched=0;   

/*  */
    // do I put the number completed lessons in another table or in the user table like it currently is?
    // then I'll need this:
      //const lessonId = lessonDataExport.lessons[currentUnitIndex].unitlessonContent[currentLessonIndex].id;
      // to get the user id, I need it to put the value the right place in table
/*  */      
       /*   const userIDResponse = await fetch(`http://localhost:5000/api/user/idByGmail?gmail=${encodeURIComponent(userGmail)}`); //userGmail isn't defined 
            if (!userIDResponse.ok) {
        throw new Error("Failed to fetch user ID");
      }
      const userIDResult = await userIDResponse.json();
      const userId = userIDResult.userId;
 */
  async function updateLessonCompleted() { 
    watched=watched+1;  
  console.log("watched.");

  if(watched>1){
    alert("Video has been watched.");
  } else{
    console.log("userID used in updateLessonCompleted: ", userID);
    fetch('http://localhost:5000/api/updateLessonCompleted', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userID,
        
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

