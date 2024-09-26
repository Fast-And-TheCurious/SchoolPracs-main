// Example data (need to fetch from backend)
async function fetchMessages() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/messages');

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'Something went wrong');
        }

        const messages = await response.json(); 
     
        return messages;
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

let messageData = {
    messages: []
};

document.addEventListener("DOMContentLoaded", async function () {
   const messages=  await fetchMessages();

   for(let i =0; i<messages.messages.length;i++){
    messageData.messages.push(messages.messages[i]);
   }
   console.log("messageData",messageData)
    document.getElementById('unreadMessages').textContent = messages.messages.length;
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
            // 2024-07-03T05:06:08.000Z
            // 01234567891111111111
            //           0123456789
            // Populate the detail section with the full message and info
            document.getElementById('detail-sender').textContent = message.user_gmail;
            document.getElementById('detail-time').textContent = message.message_timestamp.substring(0,10)+"\t"+message.message_timestamp.substring(11,16);
            document.getElementById('user-message').value = message.message_text; 
            // Show the message detail section
            document.getElementById('message-details').style.display = 'block';
        });
    });
    // Handle admin response form submission
document.getElementById('admin-response-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    console.log('Form submitted'); // Debug log

    const userEmail = document.getElementById('user-email').value; 
    const subject = 'Reply to your message'; 
    const message = document.getElementById('admin-response').value;

    if (message.trim() === '') {
        alert('Please write a response before submitting.');
        return;
    }
     // Send the email response
     try {
        const response = await fetch('/api/sendResponse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userEmail, subject, message }),
        });

        const result = await response.json();
        
        console.log(result); // Debug log to see the response

        if (result.success) {
            alert('Response email sent successfully!');
        } else {
            alert('Failed to send response email: ' + result.message);
        }

        // Clear the response textarea after submission
        document.getElementById('admin-response').value = '';
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while sending the email.');
    }
  
   
});


});

// Register Handlebars helper to create message snippet
Handlebars.registerHelper('snippet', function (message) {
    return message.length > 80 ? message.substring(0, 80) + '...' : message;
});
Handlebars.registerHelper('formatTimestamp', function(timestamp) {
    if (timestamp) {
        return timestamp.substring(0, 10) + " " + timestamp.substring(11, 16); // Changed \t to space
    }
    return ''; 
});


