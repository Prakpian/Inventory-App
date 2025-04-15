const { Pool } = require("pg");

module.exports = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_BASE,
  password: process.env.DB_PASS,
  port: parseInt(process.env.DB_PORT),
});
