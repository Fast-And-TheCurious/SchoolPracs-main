document.addEventListener('DOMContentLoaded', function () {
  const submitButton = document.getElementById('submit');

  submitButton.addEventListener('click', async function (event) {
    event.preventDefault();

    const messageInput = document.getElementById('message');
    const message = messageInput.value;

    if (!message) {
      alert('Please enter a message before submitting.');
      return;
    }
    /* For Mr B to see conent of message sent:  */
     // console.log('Message to be sent to the database:', message);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/userMessages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', 
        },
        body: new URLSearchParams({ message }), 
      });

      if (response.status === 200) {
        alert('Message sent successfully.');
        messageInput.value = '';
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while sending the message.');
    }
  });
});
