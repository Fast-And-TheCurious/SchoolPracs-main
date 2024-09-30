let articleInfo = []; // hold articles fetched from the API
document.addEventListener('DOMContentLoaded', async function () {
  try {
     // Fetch articles from the API
    const response = await fetch('http://127.0.0.1:5000/api/articles');
    // check if good
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    let articles;
  // Normalize articles into an array
    if (Array.isArray(result.messages)) {
      articles = result.messages; //  array, use it directly
    } else {
      articles = [result.messages]; // not array, wrap it in an array
    }
    articleInfo = articles;
       // Gets blog content container
       const blogContent = document.querySelector('.blog-content');

       // Compile Handlebars template
       const templateSource = document.getElementById('blog-template').innerHTML;
       const template = Handlebars.compile(templateSource);
   
       // Custom date format helper
       Handlebars.registerHelper('formatDate', function (dateString) {
         const options = { year: 'numeric', month: 'long', day: 'numeric' };
         return new Date(dateString).toLocaleDateString(undefined, options);
       });
   
       // Insert the compiled HTML into the DOM
       blogContent.innerHTML = template(articles);
       document.getElementById("search-button").addEventListener("click", search);
       
       function search() {
         let searchResponeIndex = -1; // Variable tracks inddex
         const searchValue = document.getElementById('search-box-input').value.toLowerCase();
         for(let i = 0; i<articleInfo.length; i++){
           if(((articleInfo[i].Title).toLowerCase()).includes(searchValue)){
             searchResponeIndex=i;            
             break;
           }
         }        
          // Checks a valid index was found
       if (searchResponeIndex >= 0) {
         // Update the DOM with search result
         document.getElementById('authorResult').innerText = articleInfo[searchResponeIndex].Author;
         document.getElementById('dateResult').innerText = articleInfo[searchResponeIndex].DateReleased;
         document.getElementById('titleResult').innerText = articleInfo[searchResponeIndex].Title;
         document.getElementById('pictureResult').src = articleInfo[searchResponeIndex].ImageURL;
         document.querySelector('.searchResultContainer').style.display = 'flex';
         document.querySelector('.ristrict').style.display = 'block';
          // Get the "Read More" button
          const readMoreButton = document.getElementById('resultRead');
     
          readMoreButton.setAttribute('data-modal-id', 'modal-1');
          readMoreButton.setAttribute('data-content', articleInfo[searchResponeIndex].Content); // Assuming `Content` is the property with the article's full content
          // On "Read More" button click, open the modal, displays associated content + shows modal.
          readMoreButton.onclick = function() {
           const modalId = this.getAttribute('data-modal-id');
           const modal = document.getElementById(modalId);
           const content = this.getAttribute('data-content');
            const modalText = modal.querySelector('.modal-text');
            modalText.innerText = content; 
           modal.style.display = 'block';
         };
     // Get the close button inside the modal
     const closeButton = document.querySelector('.close');
     
     if (closeButton) {
      // Closes modal when the close button clicked.
         closeButton.addEventListener('click', function() {
             const modalId = this.getAttribute('data-modal-id');
             const modal = document.getElementById(modalId);
             modal.style.display = 'none'; 
         });
     }
 
     // Close the modal when clicking outside of it
     window.addEventListener('click', function(event) {
       const modal = document.getElementById('modal-1'); 
         if (modal && event.target === modal) {
             modal.style.display = 'none'; 
         }
     });
       } else {
         // No match found, makes result empty with messagew
         document.querySelector('.searchResultContainer').style.display = 'flex';
         document.getElementById('authorResult').innerText = 'No result found';
         document.getElementById('dateResult').innerText = '';
         document.getElementById('titleResult').innerText = '';
         document.getElementById('pictureResult').src = '';
         document.querySelector('.ristrict').style.display = 'none';
       }
       } 
  } catch (error) {
    console.error('An error occurred:', error);
  }
});

