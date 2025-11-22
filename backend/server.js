// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";
import userRoutes from "./routes/users.js";
import songsRoute from "./routes/songs.js";
import artistsRoute from "./routes/artists.js";
import tagsRoute from "./routes/tags.js";


dotenv.config();
const app = express();

// ----- Middleware -----
app.use(cors());
app.use(express.json());

// ----- Test DB connection -----
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log(`Connected to MySQL database: ${process.env.DB_NAME} ✅`);
  }
});

// ----- Pass db to routes if needed -----
app.use((req, res, next) => {
  req.db = db;
  next();
});

// ----- Routes -----
app.use("/api/users", userRoutes);
app.use("/api/songs", songsRoute);
app.use("/api/artists", artistsRoute);
app.use("/api/tags", tagsRoute);


// ----- Test route -----
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ----- Start server -----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
