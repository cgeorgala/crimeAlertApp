const path = require('path');
const dotenv = require('dotenv');
dotenv.config({
    path: path.resolve(__dirname, '../.env')
});

module.exports = {
    db: {
        host: process.env.DB_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT) || 5432,
    }
}
