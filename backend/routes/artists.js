// backend/routes/artists.js

import express from "express";  // import Express to create router
import db from "../db.js";      // import MySQL database connection

const router = express.Router();  // create router for artist-related endpoints

// -------------------------------
// GET all artists
// -------------------------------
router.get("/", (req, res) => {
  const query = `
    SELECT artist_id, artist_name
    FROM artists
    ORDER BY artist_name
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching artists:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results); // send array of artists to frontend
  });
});

export default router;  // export router
