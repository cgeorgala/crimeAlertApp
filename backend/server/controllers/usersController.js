'use strict';

const fs = require('fs');
const path = require('path');

//For authentication
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // after login in every API request

const { Pool } = require('pg');
const { db }  = require('../config/db-config.js');

// Getting password from db-pass.txt file
// This file should be gitignored and chmod chmod protected
const DB_PASS_FILEPATH = path.resolve(path.join(__dirname, './../config/db-pass.txt'));
const PG_PASSWORD = fs.readFileSync(DB_PASS_FILEPATH, 'utf8').trim();


// Creating a thread pool for querying the database with
const db_pool = new Pool({
  host: db.host,
  user: db.user,
  database: db.database,
  password: PG_PASSWORD,
  // max number of clients in the pool
  max: 20,
});

// TODO: Maybe check first if  user already exists
// const postUsrQuery = `
//   IF NOT EXISTS (SELECT * FROM users WHERE username=$5)
//   BEGIN
//     INSERT INTO users (
//       first_name, last_name, 
//       email, username, password,
//       role, address )
//     VALUES(
//       $1, $2, $3, $4, $5, $6, $7
//     )
//   END
// `;

// POST in users table, to register new user
const postUsrQuery = `
  INSERT INTO users (
    first_name, last_name, 
    email, username, password, role,
    address, area, zip_code )
  VALUES(
    $1, $2, $3, $4, $5, $6, $7, $8, $9 )
  RETURNING 
    id, first_name, last_name, 
    email, username, role,
    address, area, zip_code
  `;

async function postNewUser(req, callback) 
{
  try{
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10); //Protect from brute-force attacks. Used in register and login
    const result = await db_pool.query(postUsrQuery, [
      req.body.first_name, 
      req.body.last_name, 
      req.body.email, 
      req.body.username, 
      hashedPassword, 
      'citizen', 
      req.body.address,
      req.body.area || null, //optional
      req.body.zip_code || null  //optional
    ]);
      console.log("postNewUser in DB result=", result);
      return callback(null, result.rows[0]);
  }
  catch(err){
    console.log("postNewUser error=", err);
    return callback(err, null);
  }
}

// Get password by username, to login
const getPassQuery = `
  SELECT
   id, first_name, last_name, email, username, password, role, address, zip_code, area
  FROM users
  WHERE username = $1 AND is_active = true
`;

async function getPassByUsername(req, callback)
{
  try{
    //console.log(req.body.username, req.body.password); //TODO:delete the password printing
    const {username, password} = req.body;

    if (!username || !password) //TODO: test this
    {
      return callback({message: "Username and password are required", status: 400}, null);
    }

    const result = await db_pool.query(getPassQuery, [username]); 
    if (result.rows.length === 0)
    {
        console.log(`User doesn't exist`);
        return callback(null, {status:404, message:"User does not exist"});
    }
    
    const user = result.rows[0];

    //Compare hashed password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
    {
        console.log(`Wrong password`);
        return callback(null, {status:401, message: "Wrong password"});
    }

    console.log(`Password is correct`);

    //Authentication token
    const token = jwt.sign(
      {id: user.id, username: user.username, role: user.role}, 
      process.env.JWT_SECRET, 
      {expiresIn:'1h'}
    );

    delete user.password;

    return callback(null, {
      status:200,
      token,
      user:{
        id: user.id, 
        username: user.username, 
        email:user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        address:user.address,
        zip_code:user.zip_code,
        area:user.area,
     } 
    })
    //TODO: Token send to frontend, then saved i.e in localStorage and each time user requests protected endpoints, frontend sends the token.
    // Then backend receives the token and is evaluated. If valid --> user is authenticated, otherwise user is unauthorized
  }
  catch (err)
  {
      console.error("Login Error: ",err)
      return callback(err, null);
  }
}

const updateUserQuery = `
  UPDATE users
  SET
    first_name = $1,
    last_name = $2,
    email = $3,
    address = $4,
    area = $5,
    zip_code = $6
  WHERE id = $7 AND is_active = true
  RETURNING id, username, email, first_name, last_name, role, address, area, zip_code, is_active
`;

async function modifyUserInfo(req, callback)
{
  try{
    const userId = req.user.id;
    console.log("modifyUserInfo for userId:", userId);

    const result = await db_pool.query(updateUserQuery, [
      req.body.first_name, 
      req.body.last_name, 
      req.body.email, 
      req.body.address,
      req.body.area || null,
      req.body.zip_code || null,
      userId
    ]);

    if (result.rowCount === 0)
    {
      return callback(new Error("User not found"), null);
    }

    return callback(null, result.rows[0]);

  }
  catch (err)
  {
    return callback(err, null)
  }
}

const deleteUserQuery = `
  UPDATE users
  SET is_active = false
  WHERE id = $1 AND is_active = true
  RETURNING id
`;

async function deleteUser(req, callback)
{
  try{
    const userId = req.user.id;
    const result = await db_pool.query(deleteUserQuery, [userId]);

    if (result.rowCount === 0)
    {
      return callback(new Error("User not found to delete"), null);
    }

    return callback(null, {success: true});

  }
  catch (err)
  {
    return callback(err, null);
  }
}

module.exports = {
  postNewUser,
  getPassByUsername,
  modifyUserInfo,
  deleteUser
}