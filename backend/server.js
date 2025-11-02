import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import db from "./db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Test connection
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log(`Connected to MySQL database: ${process.env.DB_NAME} ✅`);
  }
});

// ----- Pass db to user routes via middleware -----
app.use((req, res, next) => {
  req.db = db; // attach db to request
  next();
});

// ✅ Use user routes
app.use("/api/users", userRoutes);

// ✅ Example route to test
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
