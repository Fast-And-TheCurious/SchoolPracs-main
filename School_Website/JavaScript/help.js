document.addEventListener('DOMContentLoaded', function () {
  const submitButton = document.getElementById('submit');
  submitButton.addEventListener('click', async function (event) {
    event.preventDefault();

    const messageInput = document.getElementById('message');
    const message = messageInput.value;

    const gmailInput = document.getElementById('gmail');
    const userGmail = gmailInput.value;

    if (!message || !userGmail) {
      alert('Please enter both Gmail and a message before submitting.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/userMessages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ message, user_gmail: userGmail }), // Include user_gmail
      });

      if (response.status === 200) {
        alert('Message sent successfully.');
        messageInput.value = '';
        gmailInput.value = ''; // Clear Gmail input
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
