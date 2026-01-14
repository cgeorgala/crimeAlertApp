require('dotenv').config();
process.title = 'crime_alert_backend';
const express = require('express');
// const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');
const pg = require('pg');

// Project configuration
const app = express();
const PORT = process.env.PORT || 8000;

//Configure to run frontend from localhost
const cors = require('cors');
app.use(cors());
// app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use('/api', require('./routes/index'));
app.use('/api/users', require('./routes/users'));
app.use('/api/incidents', require('./routes/incidents'));

// Swagger
// app.use(
//     '/api/api-docs',
//     swaggerUi.serve,
//     swaggerUi.setup(swaggerDocument)
// );

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`);
});