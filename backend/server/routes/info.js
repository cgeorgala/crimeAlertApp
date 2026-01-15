const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController');


//Static information pages

router.get('/organization',(req,res)=>
{
    console.log(`Fetch organization info`); 
    infoController.getOrganization(req, (err,data) => {
        if (err) {
            return res.status(500).json({ 
                message: 'Αποτυχία ανάκτησης πληροφοριών οργανισμού'});
        }
        return res.json(data);
    });
});

router.get('/termsOfUse',(req,res)=>
{
    console.log(`Fetch terms of use`); 
    infoController.getTermsOfUse(req, (err,data) => {
        if (err) {
            return res.status(500).json({ message: 'Αποτυχία ανάκτησης των όρων χρήσης της εφαρμογής'});
        }
        return res.json(data);
    });
});

router.get('/privacyPolicy',(req,res)=>
{
    console.log(`Fetch privacy policy`); 
    infoController.getPrivacyPolicy(req, (err,data) => {
        if (err) {
            return res.status(500).json({ message: 'Αποτυχία ανάκτησης της πολιτικής απορρήτου'});
        }
        return res.json(data);
    });
});

// Contact form
router.post('/contact',(req,res)=>
{
    console.log(`Contact form submission`);
    infoController.submitContactForm(req, (err, result) => {
        if (err) {
            console.error('Contact form error:', err.message);
            return res.status(400).json({ message: err.message});
        }
        return res.json({message: 'Το μήνυμά σας στάλθηκε επιτυχώς'});
    });
});

module.exports = router;