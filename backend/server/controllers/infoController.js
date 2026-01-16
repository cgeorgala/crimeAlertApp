'use strict';

const nodemailer = require('nodemailer');

// Organization Information
const organizationInfo = {
    name: "Crime Alert App",
    description: "Μια πλατφόρμα για αναφορά και παρακολούθηση εγκληματικών συμβάντων στην περιοχή σας",
    mission: "Ενίσχυση της ασφάλειας μέσω έγκαιρης ενημέρωσης.",
    address: "Αθήνα, Ελλάδα",
    contactEmail: "crime.alert.hua@gmail.com"
};

const termsOfUse = `
Καλώς ήρθατε στο Crime Alert App. Χρησιμοποιώντας την πλατφόρμα μας, συμφωνείτε με τους όρους και τις προϋποθέσεις χρήσης:
1. Η εφαρμογή παρέχεται μόνο για ενημερωτικούς σκοπούς.
2. Οι χρήστες οφείλουν να παρέχουν αληθή στοιχεία κατά την αναφορά περιστατικών.
3. Απαγορεύεται η κατάχρηση ή ψευδής αναφορά περιστατικών.
4. Οι πληροφορίες είναι ευθύνη του χρήστη.
`;

const privacyPolicy = `
Η προστασία των προσωπικών σας δεδομένων είναι σημαντική για εμάς. 
Συλλέγουμε μόνο τα απαραίτητα στοιχεία για την παροχή των υπηρεσιών μας. 
Δεν θα κοινοποιήσουμε τα δεδομένα σας σε τρίτους χωρίς τη συγκατάθεσή σας. 
Τα δεδομένα σας χρησιμοποιούνται μόνο για:
- Αναφορά και παρακολούθηση περιστατικών.
- Επικοινωνία με την ομάδα υποστήριξης.
- Βελτίωση της εφαρμογής.
`;

function getOrganization(req, callback){
    return callback(null, organizationInfo);
}

function getTermsOfUse(req, callback){
    return callback(null, termsOfUse);
}

function getPrivacyPolicy(req, callback){
    return callback(null, privacyPolicy);
}

async function submitContactForm(req, callback){
    const {name, surname, email, phone, subject, message} = req.body;

    if (!name || !surname || !email || !phone || !subject || !message){
        return callback({message: "Όλα τα πεδία είναι υποχρεωτικά"});
    }

    try{
        const transporter = nodemailer.createTransport({
          service: process.env.EMAIL_SERVICE,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }  
        });

        const emailOptions = {
            from: `"Crime Alert App" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `[CrimeAlert Επικοινωνία] ${subject}`,
            text: `Όνομα: ${name} \nΕπώνυμο: ${surname} \nEmail: ${email} \nΤηλέφωνο: ${phone}\n\nΜήνυμα:\n${message}`
        }

        await transporter.sendMail(emailOptions);

        return callback(null, {
            message:  "Το μήνυμά σας εστάλη με επιτυχία!"
        });
    }
    catch(err)
    {
        console.error("Error sending contact email:", err);
        return callback(err, null);
    }
}
module.exports = {
    getOrganization,
    getTermsOfUse,
    getPrivacyPolicy,
    submitContactForm
}