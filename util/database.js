const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "dbms-project",
  password: "arvind007",
});

module.exports = pool.promise();
