process.title = 'email_server';

const nodemailer = require('nodemailer');

console.log("Email host:", process.env.EMAIL_HOST);
console.log("Email port:", process.env.EMAIL_USER);
console.log("Email user:", process.env.EMAIL_PORT);

// Create transporter object
let transporter = nodemailer.createTransport(
{
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify()
.then(() => console.log("Mail server is ready"))
.catch(err => console.error("Mail error: ", err));

/**  TEST sending of email **
(async () => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_USER,
    subject: "CrimeAlertApp test",
    text: "Gmail SMTP works"
  });
})();
*/

module.exports = transporter;