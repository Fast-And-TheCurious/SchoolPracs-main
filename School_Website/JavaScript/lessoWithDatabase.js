
  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
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
  async function getVideoId(videoLink){
    let index = videoLink.lastIndexOf("/");
    let videoId = videoLink.substring(index, index+10);
  }
  



  const lessonDataExport = {
    lessons: []
  };
  
  document.addEventListener('DOMContentLoaded', async function() {
    const userID= getCookie("userID");
    console.log("userID: ",userID);

    // might be useless??
    if (!userID) {
      alert('No user found. Please log in.');
      window.location.href = '/School_Website/html/login.html';
      return;
    }

    const units = await getUnits();
    const lessons = await getLessons();
  
    const unitsArray = units || [];
    const lessonsArray = lessons || [];
  
    unitsArray.forEach(unit => {
      lessonDataExport.lessons.push({
        id: unit.id,
        unit: `UNIT ${unit.id}`,
        unitTitle: unit.title,
        note: unit.notes,
        aboutUnit: unit.aboutUnit,
        unitlessonContent: lessonsArray
          .filter(lesson => lesson.unitID === unit.id)
          .map(lesson => ({
            lessonTitle: lesson.title,
            lessonLink: lesson.link,

            youTubeVideo: lesson.video
          }))
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

  });
   // 2. This code loads the IFrame Player API code asynchronously.
   var tag = document.createElement('script');

   tag.src = "https://www.youtube.com/iframe_api";
   var firstScriptTag = document.getElementsByTagName('script')[0];
   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
 
   // 3. This function creates an <iframe> (and YouTube player)
   //    after the API code downloads.
   var player;
   function onYouTubeIframeAPIReady() {
     player = new YT.Player('player', {
       height: '100%',
       width: '1200rem',
       videoId: 'M7lc1UVf-VE',
       playerVars: {
         'playsinline': 1
       },
       events: {
         'onReady': onPlayerReady,
         'onStateChange': onPlayerStateChange
       }
     });
   }
 
   // 4. The API will call this function when the video player is ready.
   function onPlayerReady(event) {
     event.target.playVideo();
   }
 
   // 5. The API calls this function when the player's state changes.
   //    The function indicates that when playing a video (state=1),
   //    the player should play for six seconds and then stop.
   var done = false;
   var watched = 0;
   function onPlayerStateChange(event) {
     if (event.data == YT.PlayerState.PLAYING && !done) {
       setTimeout(stopVideo, 2000);
       done = true;         
     }
   }
   
   function stopVideo() {
     player.stopVideo();
     watched =1;
     console.log("watched: "+ watched);
   }
   console.log("watched: "+ watched);
/*   function updateLessonCompleted() {
    if (videoWatched) {
      const userId = 'USER_ID'; // Replace with the actual user ID
      //const lessonId = lessonDataExport.lessons[currentUnitIndex].unitlessonContent[currentLessonIndex].id;

      fetch('http://loclhost:5000/api/update-lesson-completed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          // lessonId: lessonId
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Lesson updated:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }
 */
  