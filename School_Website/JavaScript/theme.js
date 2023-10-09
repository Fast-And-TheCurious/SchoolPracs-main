document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("ThemeSettingsCheck");
    const body = document.body;
  
    // Function to toggle the theme
    function toggleTheme() {
      if (checkbox.checked) {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
      } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
      }
    }
  
    // Add an event listener to the checkbox
    checkbox.addEventListener("change", toggleTheme);
  });

  
  