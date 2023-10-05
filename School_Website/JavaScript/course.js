/* var setFormattedLessonsCallback  = require('../Backend/server.js');

function handleFormattedLessons(formattedLessons) {
  console.log('Formatted Lessons in course.js:', formattedLessons);

}
setFormattedLessonsCallback(handleFormattedLessons);
 */
// School_Website\JavaScript\course.js

// Import the formattedLessons array from server.js
const formattedLessons = require('../Backend/server');

// Now you can use the `formattedLessons` array in this file
console.log("IN THE COURSE FILE");
console.log(formattedLessons); // You can access and use it here