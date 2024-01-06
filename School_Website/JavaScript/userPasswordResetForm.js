document.getElementById("resetButton").addEventListener("click", async function () {
    const verificationCode = document.getElementById("verificationCode").value;
    const newPassword= document.getElementById("newPassword").value;
    const confirmPassword= document.getElementById("confirmPassword").value;

    //Get verification code generated through a cookie
    const verificationCodeGenrated = getCookie("verificationCode");
    // check if the verifcation code entered is the same as the one gmailed to the user
    if(verificationCode===verificationCodeGenrated){
        if(newPassword ===confirmPassword){
            /* Now you need to chnage the users password in the database */
            }else{
                alert("The new password doesn't match the confirmation password");
            }
    }else{
        alert("The verification Code entered doesn't match the code you recieved. Please check if you entered it correctly");
    }
});