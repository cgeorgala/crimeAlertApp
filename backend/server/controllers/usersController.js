'use strict';

const fs = require('fs');
const path = require('path');

//For authentication
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // after login in every API request

const { Pool } = require('pg');
const { db }  = require('../config/db-config.json');

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
    email, username, password,
    role, address )
  VALUES(
    $1, $2, $3, $4, $5, $6, $7 )
  RETURNING *
  `;

async function postNewUser(req, callback) 
{
  try{
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(req.body.password, 10); //Protect from brute-force attacks. Used in register and login
    const result = await db_pool.query(postUsrQuery, [
      req.body.first_name, 
      req.body.last_name, 
      req.body.email, 
      req.body.username, 
      hashedPassword, 
      req.body.role, 
      req.body.address
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
   id, first_name, last_name, email, username, password, role, address
  FROM users
  WHERE username = $1
`;

async function getPassByUsername(req, callback)
{
  try{
    console.log(req.body.username, req.body.password); //TODO:delete the password printing
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
        address:user.address
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

module.exports = {
  postNewUser,
  getPassByUsername
}