// JavaScript data object
var data = { "name": "Bob" ,
"surname": "Builder"};

// Compile the Handlebars template
var source = document.getElementById("template").innerHTML;
var template = Handlebars.compile(source);

// Render the template with the data
var html = template(data);

// Insert the HTML into the page
document.getElementById("output").innerHTML = html;
//comment