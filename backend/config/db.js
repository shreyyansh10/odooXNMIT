const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,       // ecofinds
  host: process.env.DB_HOST,       // localhost
  database: process.env.DB_NAME,   // ecofinds_db
  password: process.env.DB_PASSWORD, // ecopass
  port: process.env.DB_PORT,       // 5432
});

pool.connect()
  .then(() => console.log("✅ DB connected successfully"))
  .catch(err => console.error("❌ DB connection error:", err));

module.exports = pool;
