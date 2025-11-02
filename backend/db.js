// backend/db.js
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// ✅ Create MySQL connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// ✅ Test connection
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log(`Connected to MySQL database: ${process.env.DB_NAME} ✅`);
  }
});

export default db;
