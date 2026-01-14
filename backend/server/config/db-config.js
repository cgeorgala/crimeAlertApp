const path = require('path');
const dotenv = require('dotenv');
dotenv.config({
    path: path.resolve(__dirname, '../.env')
});

const isDocker = process.env.RUNNING_IN_DOCKER === 'true';
const dbHost = isDocker ? "db" : "localhost";

module.exports = {
    db: {
        host: dbHost,
        user: process.env.POSTGRES_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT) || 5432,
    }
}
