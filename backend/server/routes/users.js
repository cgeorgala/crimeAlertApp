const express = require('express');
const router = express.Router();
const db = require('../controllers/usersController');

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
router.put('/modifyUserInfo',(req,res)=>
{
    console.log(`Modify User Info!`);
    //TODO: Coding
});

//Delete handling
router.get('/deleteUser',(req,res)=>
{
    console.log(`Delete user!`);
    //TODO: Coding
});

module.exports  = router;