/* Responsible for managing the password reset process, generating verification codes, and interacting with the database. */
const { generateVerificationCode, sendVerificationEmail } = require('./gmailService');
const userManager_ = require('./userManager'); // Import your userManager module
// Instantiate an object of the userManager class
const userManager = new userManager_();

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

        // Get the current date
        const currentDate = new Date();

        // Set the expiration date (expires in 2 minutes)
        const expirationDate = new Date(currentDate.getTime() + 2 * 60 * 1000);

        // Format the dates as strings for database insertion
        const codeCreatedAt = currentDate.toISOString().slice(0, 19).replace('T', ' '); // Format: YYYY-MM-DD HH:MM:SS
        const codeExpiresAt = expirationDate.toISOString().slice(0, 19).replace('T', ' ');

        // Add verification code details to the database
        const result = await userManager.addVerificationCodeDetails(userEmail,verificationCode, codeCreatedAt, codeExpiresAt);

        if (result.success) {
            console.log('Verification code details added successfully!');

            // Delete verification code details after a certain time period (2.2 minutes)
            setTimeout(async () => {
                const deleteResult = await userManager.deleteVerificationCodeDetails(userEmail);
                console.log('Verification code details deleted after expiration:', deleteResult.message);
            }, 2.2 * 60 * 1000);

            return { success: true, message: 'Password reset initiated successfully' };
        } else {
            console.error('Failed to add verification code details:', result.message);
            return { success: false, message: 'Failed to initiate password reset.' };
        }

    } catch (error) {
        console.error(error);
        return { success: false, message: 'Failed to initiate password reset. Check your email for the verification code.' };
    }
}

module.exports = {
    initiatePasswordReset,
};
