/*  Responsible for managing the password reset process, generating verification codes, and interacting with the database. */
const { generateVerificationCode, sendVerificationEmail } = require('./gmailService');


// Function to initiate the password reset process
async function initiatePasswordReset(userEmail) {
    try {
         // Check if the userEmail is empty
        if (!userEmail) {
            return { success: false, message: 'Please enter a valid email address.' };
        }
        // Generate a verification code
        const verificationCode = generateVerificationCode();

        console.log(`Verification code for ${userEmail}: ${verificationCode}`);
 
        // Send an email with the verification code
        await sendVerificationEmail(userEmail, verificationCode);
        // TODO: Implement logic to send an email with the verification code
        // Return the verification code for the frontend to handle
        return { success: true,  message: 'Password reset initiated successfully' };

    } catch (error) {
        console.error(error);
        return { success: false, message: 'Failed to initiate password reset. Check your email for the verification code.' };
    }
}
module.exports = {
    initiatePasswordReset,
};