const { generateVerificationCode, sendVerificationEmail } = require('./gmailService');


// Function to initiate the password reset process
async function initiatePasswordReset(userEmail) {
    try {
        // Generate a verification code
        const verificationCode = generateVerificationCode();

        // TODO: Implement logic to store the verification code in your database
        // For simplicity, we'll just print it to the console in this example
        console.log(`Verification code for ${userEmail}: ${verificationCode}`);
 
        // Send an email with the verification code
        await sendVerificationEmail(userEmail, verificationCode);

        // TODO: Implement logic to send an email with the verification code
        // You can use a library like Nodemailer for this purpose

        // Return success message
        return { success: true, message: 'Password reset initiated successfully' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Failed to initiate password reset. Check your email for the verification code.' };
    }
}

module.exports = {
    initiatePasswordReset,
};