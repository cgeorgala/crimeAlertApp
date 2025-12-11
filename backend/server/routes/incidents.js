const express = require('express');
const router  = express.Router();
const db = require('../controllers/incidentsController');
const authToken = require('../middleware/authMiddleware');

// OProtected code so that only logged in users can create incidents
router.post('/addIncident',authToken, (req,res) =>
{
    console.log(`Authenticated username: `, req.user.username); 
    res.json({message: "Incident added successfully!"});
});
module.exports  = router;