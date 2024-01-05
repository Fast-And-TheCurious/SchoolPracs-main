const nodemailer = require('nodemailer');

// Function to generate a random verification code
function generateVerificationCode(length = 6) {
  const characters = '0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
  }
  return code;
}

// Function to send an email with the verification code
async function sendVerificationEmail(userEmail, verificationCode) {
  try {
      // Create a Nodemailer transporter using SMTP
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'MathGeniusMinds@gmail.com',  
              pass: 'zime bvso rrco dfjg',  
          },
      });

      // Define the email options
      const mailOptions = {
          from: 'MathGeniusMinds@gmail.com',  
          to: userEmail,
          subject: 'Password Reset Verification Code',
          text: `Your verification code is: ${verificationCode}`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      console.log(`Verification code email sent to ${userEmail}`);
  } catch (error) {
      console.error('Error sending email:', error);
      throw error;
  }
}

module.exports = {
  generateVerificationCode,
  sendVerificationEmail,
};
