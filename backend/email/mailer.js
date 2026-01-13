process.title = 'email_server';

const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '.env')
});

const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5000;

//Configure to run frontend from localhost
const cors = require('cors');
app.use(cors());

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

app.get('/', (req,res) =>
{
    console.log(`Nodemailer is up and running!`);
    res.send(`Nodemailer is running on port ${PORT}`);
}
);

app.listen(PORT, () => 
    console.log(`Nodemailer is running on port ${PORT}`)
);

module.exports = transporter;