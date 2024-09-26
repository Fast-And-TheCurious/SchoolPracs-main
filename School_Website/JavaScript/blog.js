let articleInfo = [];
document.addEventListener('DOMContentLoaded', async function () {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/articles');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    let articles;

    if (Array.isArray(result.messages)) {
      articles = result.messages; // If array, use it directly
    } else {
      articles = [result.messages]; // If not array, wrap it in an array
    }
    // Optionally store articles in articleInfo
    articleInfo = articles;
       // Get the blog content container
       const blogContent = document.querySelector('.blog-content');

       // Check if blogContent exists before proceeding
       if (!blogContent) {
         throw new Error('Blog content container not found');
       }
   
       // Compile the Handlebars template
       const templateSource = document.getElementById('blog-template').innerHTML;
       const template = Handlebars.compile(templateSource);
   
       // Custom date format helper
       Handlebars.registerHelper('formatDate', function (dateString) {
         const options = { year: 'numeric', month: 'long', day: 'numeric' };
         return new Date(dateString).toLocaleDateString(undefined, options);
       });
   
       // Insert the compiled HTML into the DOM
       blogContent.innerHTML = template(articles);

  } catch (error) {
    console.error('An error occurred:', error);
  }
});

