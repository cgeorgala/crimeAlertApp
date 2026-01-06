const express = require('express');
const router = express.Router();
const db = require('../controllers/usersController');
const authToken = require('../middleware/authMiddleware');

//Register handling
router.post('/addUser',(req,res)=>
{
    console.log(`Register new user!`); 
    db.postNewUser(req,
        (err,data) => {
            if (err) {
                return res.json({ "Failed to add new user, with error" : err.detail });
            }
            else {
                console.log(data);
                return res.json( {"success": data} );
            }
    });
});

//Login handling
router.post('/loginUser',(req,res)=>
{
    console.log(`Login user attempt!`);
    // res.render('login');
    db.getPassByUsername(req,
        (err,data) => {
            if (err) {
                console.log(`Failed to login, with error:`, err.detail);
                return res.status(500).json({
                    message: "Server error", 
                    error: err.detail});
            }
            if (data.status == 200)
            {
                const {token, user} = data;
                console.log('Login user: ', user);
                return res.json({token, user});
            }
            else
            {
                return res.status(data.status).json({message: data.message });
            }
    });
});

//Logout handling
router.get('/logoutUser',(req,res)=>
{
    console.log(`Logout user!`);
    return res.json({message: "Logout user from crimeAlertApp!"});
    // TODO: Remember to delete the token in frontend, i.e. localStorage.removeItem('token');
});

//Modify handling
router.put('/modifyUserInfo', authToken, (req,res)=>
{
    console.log(`Modify User Info!`);
    db.modifyUserInfo(req,
        (err,data) => {
            if (err) {
                console.log(`Failed to modify user info, with server error:`, err.message);
                return res.status(500).json({
                    message: `Failed to modify user info: ${err.detail || err.message}`
                    });
            }
            if (data.rowCount === 0)
            {
              return res.status(404).json({message: "ModifyUserInfo: user not found or inactive"});
            }
            console.log(`Modify user info success`);
            return res.json( {"success": data} );
    });
});

//Delete handling. This is actually a soft delete, so that incidents created by that user are not affected.
router.delete('/deleteUser', authToken, (req,res)=>
{
    console.log(`Delete user!`);
    db.deleteUser(req,
        (err,data) => {
            if (err) {
                console.log(`Delete user failed, with server error:`, err.message);
                return res.status(500).json({
                    message: `Delete user failed, with server error: $(err.detail || err.message)` 
                    });
            }
            else
            {
                console.log(`Delete user success`);
                return res.json(data);
            }
    });
});

module.exports  = router;