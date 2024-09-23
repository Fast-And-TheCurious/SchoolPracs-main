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

document.addEventListener('DOMContentLoaded', async function () {
    try {
      const userID= getCookie("userID");
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
    
     // Sample data for lessons and tests completed
     const lessonData = [10, 15, 20, 25, 30]; // Replace with your actual data
     const testData = [5, 10, 8, 12, 15]; // Replace with your actual data

     // Get the canvas element
     const ctx = document.getElementById('lineChart').getContext('2d');

     // Create a line chart
     const lineChart = new Chart(ctx, {
         type: 'line',
         data: {
             labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'], // Replace with appropriate labels
             datasets: [
                 {
                     label: 'Lessons Completed',
                     borderColor: 'blue',
                     data: lessonData,
                 },
                 {
                     label: 'Tests Completed',
                     borderColor: 'green',
                     data: testData,
                 },
             ],
         },
         options: {
             responsive: true,
             maintainAspectRatio: false,
         },
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
  