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
 
      // might be useless??
      if (!userID) {
        alert('No user found. Please log in.');
        window.location.href = '/School_Website/html/login.html';
        return;
      }
  
      const response = await fetch(`http://localhost:5000/api/get/user/profile?userID=${encodeURIComponent(userID)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile information: ' + response.statusText);
    }

    // Process the response data (assuming it is in JSON format)
    const profileData = await response.json();
    console.log('Profile data:', profileData);

    const completed_courses = profileData.userInfo.cources_completed;
    const points_accumulated = profileData.userInfo.points_accumulated;
    const username = profileData.userInfo.username;
    const profile_icon = profileData.userInfo.profileIcon;
    const email = profileData.userInfo.email;
    const history_activities = profileData.userInfo.history_activities;
    
    console.log(completed_courses);
    console.log(points_accumulated);
    console.log(username);
    console.log(profile_icon);
    console.log(email);
    console.log(history_activities);
  
    document.getElementById('num_completedCourses').textContent = completed_courses;
    document.getElementById('num_points').textContent = points_accumulated;
    document.getElementById('username').placeholder = username;
    document.getElementById('user-email').placeholder = email;
    document.getElementById('user-profile-icon').src = profile_icon

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
  document.getElementById('logoutButton').addEventListener('click', function() {
    // Remove the stored token on logout
    localStorage.removeItem('token');
    // Redirect to login page
    window.location.href = '/School_Website/html/login.html';
  });
  
  // Theme settings
  const checkbox = document.getElementById("ThemeSettingsCheck");
  const themeUpdateBtn = document.querySelector("#theme_updated_btn");
  const body = document.body;
  
  checkbox.addEventListener("change", function() {
    if (checkbox.checked) {
      body.classList.remove("light-mode");
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
      body.classList.add("light-mode");
    }
  });
  
  themeUpdateBtn.addEventListener("click", function() {
    // Save theme settings to the server or local storage
  });
  
  document.getElementById('logoutButton').addEventListener('click', async function() {
    try {
      const response = await fetch('http://localhost:5000/api/user/logout', {
        method: 'POST',
        credentials: 'include' // Include credentials (cookies)
      });
  
      const result = await response.json();
      if (result.status === 'success') {
        window.location.href = '/School_Website/html/login.html';
      } else {
        alert('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred while logging out.');
    }
  });
  