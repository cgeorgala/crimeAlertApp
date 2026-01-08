'use strict';

const fs = require('fs');
const path = require('path');

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

// Adding new incident
const postIncidentQuery = `
  INSERT INTO incidents (
    usr_id, title, incident_type, incident_date, severity,
    address, latitude, longitude, verify_status, description)
  VALUES(
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10 )
    RETURNING id
`;

function setIncidentDefaults(body)
{
  if (!body.incident_date)
  {
    body.incident_date = new Date();
  }
  if (!body.severity)
  {
    body.severity = 'Not Applicable';
  }
  body.verify_status = 'Unverified';
  return body;
}

function postNewIncident(req, callback) 
{
  console.log(req.body);
  req.body = setIncidentDefaults(req.body);
  db_pool.query(postIncidentQuery, 
    [
      req.user.id, 
      req.body.title,
      req.body.incident_type,
      req.body.incident_date,
      req.body.severity,
      req.body.address,
      req.body.latitude,
      req.body.longitude,
      req.body.verify_status,
      req.body.description
    ], 
    (err, result) => {
      console.log(err, result);
      if (err) {
        return callback(err, null);
      }
      else{
        return callback(null, result);
      }
  });
}

// Edit incident
const updateIncidentQuery = `
  UPDATE incidents 
  SET 
    title= $1, 
    incident_type= $2, 
    incident_date= $3, 
    severity= $4,
    address= $5, 
    latitude= $6,
    longitude= $7, 
    description= $8,
    date_modified = NOW()
  WHERE id = $9
    AND usr_id = $10
    RETURNING *
`;

function editIncident(req, callback)
{
  let verif_status = 'Unverified';
  let date_modified = new Date();
  db_pool.query(updateIncidentQuery, 
    [
      req.body.title,
      req.body.incident_type,
      req.body.incident_date,
      req.body.severity,
      req.body.address,
      req.body.latitude,
      req.body.longitude,
      req.body.description,
      req.body.id,   // incident id
      req.user.id    // authenticated user id
    ], 
    (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
}

// Validate incident
const validateIncidentQuery = `
  UPDATE incidents 
  SET 
    verify_status= $1, 
    date_modified = NOW()
  WHERE id = $2
    RETURNING *
`;

function validateIncident(req,callback)
{
  const {id, verify_status} = req.body;
  const userRole = req.user.role; //from auth middleware
  const validStatus = ['Verified-official', 'Verified-Unofficial', 'Unverified'];
  
  if (userRole !== 'police')
  {
    return callback(new Error('Unauthorized: only police can make validations'), null);
  }
  
  if (!validStatus.includes(verify_status))
  {
    return callback(new Error('Invalid verification status'), null);
  }

  db_pool.query(validateIncidentQuery,
    [
      verify_status,
      id
    ],
    (err,result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.rowCount === 0)
    {
      return callback(new Error('Incident not found or already verified'), null);
    }
    return callback(null, result);
  });
}

function buildIncidentFilters(query, values)
{
  let conditions = [];

  if (query.severity){
    values.push(query.severity);
    conditions.push(`severity = $${values.length}`);
  }

  if (query.verify_status){
    values.push(query.verify_status);
    conditions.push(`verify_status = $${values.length}`);
  }

  if (query.from){
    values.push(query.from);
    conditions.push(`incident_date >= $${values.length}`);
  }

  if (query.to){
    values.push(query.to);
    conditions.push(`incident_date <= $${values.length}`);
  }

  return conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
}

//Get incidents by user to be shown in user's dashboard
const getIncidentsByUserQuery = `
  SELECT
    id,
    usr_id,
    title, 
    incident_type, 
    incident_date, 
    severity,
    address, 
    latitude,
    longitude, 
    description,
    date_created,
    date_modified
  FROM incidents
  WHERE usr_id = $1
  ORDER BY date_created DESC
  LIMIT $2 OFFSET $3
`;

const countIncidentsQuery = `
  SELECT COUNT(*) FROM incidents WHERE usr_id = $1
`;

function getIncidentsByUser(req,callback)
{
  const userId= req.user.id; //from auth middleware

  //Pagination
  let page = parseInt(req.query.page, 10) || 1;
  let limit = parseInt(req.query.limit, 10) || 10;

  //Validate received values
  if (isNaN(page) || page <1){
    page = 1;
  }
  if (isNaN(limit) || limit <1 || limit >50){
    limit = 10;
  }

  const offset = (page -1) * limit;

  db_pool.query(countIncidentsQuery,
    [userId],
    (err,countResult) => {
    if (err) {
      return callback(err, null);
    }

    //Nested callback for data
    const total = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(total / limit);
  
    db_pool.query(getIncidentsByUserQuery,
      [userId, limit, offset],
      (err,result) => {
          if (err) {
            return callback(err, null);
          }
          return callback(null, {
            page,
            limit,
            total,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
            incidents: result.rows
          });
        }
      );
    }
  );
}

const getAllIncidentsQuery = `
  SELECT *
  FROM incidents
`;

const countAllIncidentsQuery = `
  SELECT COUNT(*)
  FROM incidents
`;

function getAllIncidents(req,callback)
{
  let values = [];

  //Pagination
  let page = parseInt(req.query.page, 10) || 1;
  let limit = parseInt(req.query.limit, 10) || 10;

  //Validate received values
  if (isNaN(page) || page <1){
    page = 1;
  }
  if (isNaN(limit) || limit <1 || limit >50){
    limit = 10;
  }

  const offset = (page -1) * limit;

  const filters = buildIncidentFilters(req.query, values);

  //Count query
  db_pool.query(
    `${countAllIncidentsQuery}${filters}`,
    values,
    (err,countResult) => {
    if (err) {
      return callback(err, null);
    }

    //Nested callback for data
    const total = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(total / limit);
  
    db_pool.query(
      `${getAllIncidentsQuery} ${where}
      ORDER BY incident_date DESC
      LIMIT $${values.length +1}
      OFFSET $${values.length +2}`,
      [...values, limit, offset],
      (err,result) => {
          if (err) {
            return callback(err, null);
          }
          return callback(null, {
            page,
            limit,
            total,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
            incidents: result.rows
          });
        }
      );
    }
  );
}

const getMapIncidentQuery = `
SELECT 
  id, 
  title, 
  incident_type,
  severity,
  latitude,
  longitude,
  verify_status
FROM incidents
`;

function getMapIncidents(req,callback)
{
  const {north, south, east, west} = req.query;

  if (!north || !south || !east || !west)
  {
    return callback(new Error('Map bounds are required'))
  }

  let values = [south, north, west, east];
  let whereClause = `
  WHERE latitude BETWEEN $1 AND $2
    AND longitude BETWEEN $3 AND $4
  `;
 
  // Apply extra filters (severity, verify_status)
  const extraValues = [];
  const extraFilters = buildIncidentFilters(req.query, extraValues);

  if (extraFilters)
  {
    whereClause += ` AND ${extraFilters.replace('WHERE', '')}`;
    values = values.concat(extraValues);
  }
  db_pool.query(
   `${getMapIncidentsQuery} ${whereClause}`,
   values,
   (err,result) => {
       if (err) {
         return callback(err, null);
       }
       return callback(null, result.rows);
   });
}

module.exports = {
  postNewIncident,
  editIncident,
  validateIncident,
  getIncidentsByUser,
  getAllIncidents,
  getMapIncidents
}