const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",

  user: "root",

  password: "",

  database: "vending_machine",
});

db.connect((err) => {
  if (err) {
    console.log("Database Error");

    return;
  }

  console.log("MySQL Connected");
});

module.exports = db;
