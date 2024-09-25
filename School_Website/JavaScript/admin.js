// Example data (need to fetch from backend)
const messageData = {
    messages: [
      { sender: 'User1', timeSent: '2024-09-25 12:45', message: 'This is the full message from User1, and it goes beyond the 80-character limit.' },
      { sender: 'User2', timeSent: '2024-09-25 13:00', message: 'This is the full message from User2, not too long but important.' },
      { sender: 'User3', timeSent: '2024-09-25 13:15', message: 'Here is the detailed message from User3 with all the context.' }
    ]
  };
  
  // Register Handlebars helper to create message snippet
  Handlebars.registerHelper('snippet', function (message) {
    return message.length > 80 ? message.substring(0, 80) + '...' : message;
  });
  
  // Compile Handlebars template and render the messages
  const source = document.getElementById('messages-container').innerHTML;
  const template = Handlebars.compile(source);
  const html = template(messageData);
  document.getElementById('messages-container').innerHTML = html;
  
  // Add event listener for each message link
  document.querySelectorAll('.message-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
  
      const messageId = this.dataset.id; // Get the index of the clicked message
       // Fetch the relevant message details
      const message = messageData.messages[messageId];
  
      // Populate the detail section with the full message and info
      document.getElementById('detail-sender').textContent = message.sender;
      document.getElementById('detail-time').textContent = message.timeSent;
      
      // Show the message detail section
      document.getElementById('message-details').style.display = 'block';
    });
  });
  
  // Handle admin response form submission
  document.getElementById('admin-response-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const response = document.getElementById('admin-response').value;
    
    if (response.trim() === '') {
      alert('Please write a response before submitting.');
      return;
    }
    
    // Handle response (this is just a mockup)
    alert('Admin response submitted: ' + response);
    
    // Clear the response textarea after submission
    document.getElementById('admin-response').value = '';
  });
  