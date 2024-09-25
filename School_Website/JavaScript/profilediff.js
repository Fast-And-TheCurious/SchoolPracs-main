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
let userID;
async function getUserLessonActivity(userID){
  try{
    const response = await fetch(`http://127.0.0.1:5000/api/userLessonActivity?userID=${encodeURIComponent(userID)}`);
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error || 'Something went wrong');
  }
  const lessonAcivity = await response.json(); 
  return lessonAcivity;
  }catch (error) {
        console.error('Error fetching lesson activity:', error);
    }
}
document.addEventListener('DOMContentLoaded', async function () {
    try {
       userID= getCookie("userID");
      console.log("userID: ",userID);
      
     if (!userID) {
        alert('No user found. Please log in.');
        window.location.href = '/School_Website/html/login.html';
        return;
      }
    
    
      const response = await fetch(`http://localhost:5000/api/get/user/profile?userID=${encodeURIComponent(userID)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile information: ' + response.statusText);
    }

    const profileData = await response.json();

    const completed_courses = profileData.userInfo.cources_completed;
    const completed_lessons = profileData.userInfo.lessons_completed;
    const points_accumulated = profileData.userInfo.points_accumulated;
    const username = profileData.userInfo.username;
    const profile_icon = profileData.userInfo.profileIcon;
    const email = profileData.userInfo.email;
    const history_activities = profileData.userInfo.history_activities;
    
    document.getElementById('num_completedCourses').textContent = completed_courses;
    document.getElementById('num_lessons').innerText = completed_lessons;
    document.getElementById('num_points').textContent = points_accumulated;
    document.getElementById('username').placeholder = username;
    document.getElementById('user-email').placeholder = email;
    document.getElementById('user-profile-icon').src = profile_icon
    document.getElementById('user-history').innerText = history_activities;
    
    let lessonActivityRespone = await getUserLessonActivity(userID);
    const lessonActivity = lessonActivityRespone.messages.lessons;

    // Prepare data for the chart
    const labels = [];
const dataPoints = [];

// Loop through each activity in the lessonActivity array
for (let i = 0; i < lessonActivity.length; i++) {
  const activity = lessonActivity[i];

  // Convert the completed_at timestamp to a Date object
  const completionDate = new Date(activity.completed_at);
  
  // Format the Date object to a locale time string and add it to labels
  labels.push(completionDate.toLocaleTimeString());

  // Add the lesson_id to dataPoints
  dataPoints.push(activity.lesson_id);
}
// Create the chart
const ctx = document.getElementById('lessonActivityChart').getContext('2d');
const lessonActivityChart = new Chart(ctx, {
    type: 'line', 
    data: {
        labels: labels,
        datasets: [{
            label: 'Lessons Completed',
            data: dataPoints,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time of Completion'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Lesson ID'
                },
                beginAtZero: true
            }
        }
    }
});

    } catch (error) {
      console.error('Error fetching profile:', error);
      alert('An error occurred while fetching the profile information.');
    }
  }); 
  
  // Logout functionality
 
  document.getElementById('logoutButton').addEventListener('click', async function() {
    // Update the stored cookie on logout to be past date so it goes bye bye
    document.cookie = "userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alert("cookie updated to past date.");
    window.location.href = "/School_Website/html/index.html";
  });
  