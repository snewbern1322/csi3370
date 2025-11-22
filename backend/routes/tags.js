import express from "express";  
import db from "../db.js";      

const router = express.Router(); 

// --------------------
// Get all tags
// --------------------
router.get("/", (req, res) => {
  db.query("SELECT * FROM tags ORDER BY name ASC", (err, rows) => {
    if (err) return res.status(500).json({ error: "Failed to fetch tags" });
    res.json(rows);
  });
});

// --------------------
// Create one new tag
// --------------------
router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === "") return res.status(400).json({ error: "Tag name required" });

  db.query("INSERT INTO tags (name) VALUES (?)", [name], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") return res.status(400).json({ error: "Tag already exists" });
      return res.status(500).json({ error: "Failed to create tag" });
    }
    res.json({ id: result.insertId, name });
  });
});

// --------------------
// Get tags applied to a specific song
// --------------------
router.get("/song/:songId", (req, res) => {
  const { songId } = req.params;
  const sql = `
    SELECT t.id, t.name
    FROM tags t
    JOIN song_tags st ON t.id = st.tag_id
    WHERE st.song_id = ?
  `;
  db.query(sql, [songId], (err, rows) => {
    if (err) return res.status(500).json({ error: "Failed to fetch song tags" });
    res.json(rows);
  });
});

// --------------------
// Update tags for a specific song
// --------------------
router.put("/song/:songId", (req, res) => { 
  const { songId } = req.params; 
  const { tagIds } = req.body; // Array of tag IDs

  // Ensure tagIds is an array
  if (!Array.isArray(tagIds)) return res.status(400).json({ error: "tagIds must be an array" });

  // Convert to numbers to avoid NULL issues
  const songIdNum = Number(songId);
  const tagIdsNum = tagIds.map(id => Number(id));

  // Delete old tags first
  db.query("DELETE FROM song_tags WHERE song_id = ?", [songIdNum], (err) => {
    if (err) return res.status(500).json({ error: "Failed to clear existing tags" });

    // If no tags to add, just return
    if (tagIdsNum.length === 0) return res.json({ message: "Tags cleared" });

    // Build multi-row INSERT statement
    const placeholders = tagIdsNum.map(() => "(?, ?)").join(", ");
    const values = [];
    tagIdsNum.forEach(tagId => {
      values.push(songIdNum, tagId);
    });

    const sql = `INSERT INTO song_tags (song_id, tag_id) VALUES ${placeholders}`;
    db.query(sql, values, (err2) => {
      if (err2) return res.status(500).json({ error: "Failed to add new tags" });
      res.json({ message: "Tags updated successfully" });
    });
  });
});

export default router;
