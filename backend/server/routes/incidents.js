const express = require('express');
const router  = express.Router();
const db = require('../controllers/incidentsController');
const authToken = require('../middleware/authMiddleware');

const fetch = require("node-fetch");
const { email }  = require('../config/mail-conf.json');

// Create new incident, add it in incidents table
// Protected code so that only logged in users can create incidents
router.post('/addIncident',authToken, (req,res) =>
{
    console.log(`Create new incident, for authenticated user: `, req.user);
    
    db.postNewIncident(req,
        (err, result) => {
            if (err) {
                console.log("addIncident: error");
                return res.status(400).json({ message: `Failed to add new incident: ${err.detail || err.message || 'Unknown error'}`});
            }
            else {
                console.log("addIncident: success");
                if (result && result.rowCount > 0) {
                    return res.status(200).json(result.rows[0]);
                }
                else {
                    return res.status(400).json({ message: "Add new incident failed" });
                }
            }
        }); 
});

router.put('/modifyIncident', authToken, (req, res) => {
    console.log(`Modify incident handling, for authenticated user: `, req.user);
    db.editIncident(req,
        (err, result) => {
            if (err) {
                console.log("modifyIncident: error");
                return res.status(400).json({ message: `Failed to modify incident: ${err.detail || err.message || 'Unknown error'}`});
            }
            if (result.rowCount === 0) {
                return res.status(403).json({ message: "Incident for modification not found or you are not authorized" });
            }
            console.log("modifyIncident: success");
            return res.status(200).json(result.rows[0]);
        });
});

router.put('/validateIncident', authToken, (req, res) => {
    console.log(`Validate incident handling`);
    db.validateIncident(req,
        (err, result) => {
            if (err) {
                console.log("validateIncident: error", err.message || err.detail);
                return res.status(400).json({ message: `Failed to validate incident: ${err.message}`});
            }
            if (result.rowCount === 0) {
                return res.status(404).json({ message: "Incident for validation not found or not authorized" });
            }
            console.log("validateIncident: success");
            return res.status(200).json(result.rows[0]);
        });
});

router.get('/myIncidents', authToken, (req, res) => {
    console.log(`Fetch incidents for user:`, req.user.id);
    db.getIncidentsByUser(req,
        (err, result) => {
            if (err) {
                console.log("getIncidentsByUser: error", err.message || err.detail);
                return res.status(500).json({ message: `Failed to fetch incidents by user: ${err.message}`});
            }

            console.log("getIncidentsByUser: success");
            return res.json(result);
    });
});

router.get('/searchIncident', (req, res) => {
    console.log(`Search Incident`);
});

router.get('/showIncident', (req, res) => {
    console.log(`Show Incident`);
});


module.exports  = router;