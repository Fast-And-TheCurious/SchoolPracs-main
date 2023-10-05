// Import the setFormattedLessonsCallback function from server.js
var setFormattedLessonsCallback  = require('../Backend/server.js'); // Use the correct relative path

// Define a function to handle formattedLessons when it's ready
function handleFormattedLessons(formattedLessons) {
  console.log('Formatted Lessons in course.js:', formattedLessons);

  // You can now work with formattedLessons here
}

// Set the callback to handle formattedLessons
setFormattedLessonsCallback(handleFormattedLessons);
