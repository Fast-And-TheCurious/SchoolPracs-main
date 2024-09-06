function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
    return null;
  }
  document.addEventListener('DOMContentLoaded', async function () {
  const userID= getCookie("userID");
  console.log("userID: ",userID);

 if (!userID) {
    alert('No user found. Please log in.');
   ;
    return;
  }
});