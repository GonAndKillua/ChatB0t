const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "mahiadmin",
  database: "User",
});

module.exports = pool;
