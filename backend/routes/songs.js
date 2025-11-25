// backend/routes/songs.js

import express from "express";          // Import Express to create router
import db from "../db.js";              // Import database connection

const router = express.Router();        // Create a new router for song-related endpoints

// -------------------------------
// GET all songs with artist names
// -------------------------------
router.get("/", (req, res) => {
  // SQL query:
  // - s = songs table
  // - asg = artist_song (association table)
  // - a = artists table
  // - GROUP_CONCAT joins multiple artist names for a song into a comma-separated string
  const query = `
    SELECT 
      s.song_id AS id,
      s.title,
      s.album,
      s.duration,
      s.genre,
      GROUP_CONCAT(a.artist_name SEPARATOR ', ') AS artist
    FROM songs s
    LEFT JOIN artist_song asg ON s.song_id = asg.song_id
    LEFT JOIN artists a ON asg.artist_id = a.artist_id
    GROUP BY s.song_id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching songs:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

// -------------------------------
// UPDATE a song by ID
// -------------------------------
router.put("/:id", (req, res) => {
  const { id } = req.params;                           // Get song id from URL
  const { title, album, duration, genre, artistIds } = req.body;  // Updated fields & artist IDs

  // Update song details
  const updateSongQuery = `
    UPDATE songs
    SET title = ?, album = ?, duration = ?, genre = ?
    WHERE song_id = ?
  `;

  db.query(updateSongQuery, [title, album, duration, genre, id], (err) => {
    if (err) return res.status(500).json({ error: "Failed to update song" });

    // Update artist associations if provided
    if (artistIds && artistIds.length > 0) {
      // First delete existing associations
      db.query("DELETE FROM artist_song WHERE song_id = ?", [id], (err2) => {
        if (err2) return res.status(500).json({ error: "Failed to remove old artist associations" });

        // Insert new associations
        const artistValues = artistIds.map((aid) => [aid, id]);
        db.query("INSERT INTO artist_song (artist_id, song_id) VALUES ?", [artistValues], (err3) => {
          if (err3) return res.status(500).json({ error: "Failed to associate new artists" });
          res.json({ message: "Song and artists updated successfully" });
        });
      });
    } else {
      res.json({ message: "Song updated successfully" });
    }
  });
});

// -------------------------------
// DELETE a song by ID
// -------------------------------
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM songs WHERE song_id = ?";
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: "Failed to delete song" });
    res.json({ message: "Song deleted successfully" });
  });
});

// -------------------------------
// ADD a new song
// -------------------------------
router.post("/", (req, res) => {
  const { title, album, duration, genre, artistNames } = req.body; // artistNames = array of strings

  // Insert song first
  const insertSongQuery = `
    INSERT INTO songs (title, album, duration, genre)
    VALUES (?, ?, ?, ?)
  `;
  db.query(insertSongQuery, [title, album, duration, genre], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to add song" });

    const songId = result.insertId;

    if (!artistNames || artistNames.length === 0) {
      return res.json({ message: "Song added successfully", id: songId });
    }

    // Process artists
    const artistIds = [];

    // Use async/await style with Promise.all for multiple artists
    Promise.all(
      artistNames.map((name) => new Promise((resolve, reject) => {
        // Check if artist exists
        db.query("SELECT artist_id FROM artists WHERE artist_name = ?", [name], (err, rows) => {
          if (err) return reject(err);
          if (rows.length > 0) return resolve(rows[0].artist_id);

          // Artist doesn't exist → insert
          db.query("INSERT INTO artists (artist_name) VALUES (?)", [name], (err2, result2) => {
            if (err2) return reject(err2);
            resolve(result2.insertId);
          });
        });
      }))
    )
      .then((ids) => {
        // Bulk insert into artist_song
        const artistValues = ids.map((aid) => [aid, songId]);
        db.query("INSERT INTO artist_song (artist_id, song_id) VALUES ?", [artistValues], (err) => {
          if (err) return res.status(500).json({ error: "Failed to associate artists" });
          res.json({ message: "Song added successfully", id: songId });
        });
      })
      .catch((err) => res.status(500).json({ error: "Error processing artists" }));
  });
});


//---------------
//Add Tags
//---------------
router.post("/:songId/tags", (req, res) => {
  const { songId } = req.params;
  const { tagIds } = req.body; // array of tag IDs

  // Remove old tags, has to remove old ones to update it
  db.query(
    "DELETE FROM song_tags WHERE song_id = ?",
    [songId],
    (err) => {
      if (err) return res.status(500).json({ error: "Failed to clear old tags" });

      if (!tagIds || tagIds.length === 0) {
        return res.json({ message: "Tags updated (cleared)", songId });
      }

      const values = tagIds.map(tid => [songId, tid]);

      db.query(
        "INSERT INTO song_tags (song_id, tag_id) VALUES ?",
        [values],
        (err2) => {
          if (err2) return res.status(500).json({ error: "Failed to apply tags" });

          res.json({ message: "Tags updated", songId });
        }
      );
    }
  );
});

//---------------
//Edit Tag
//----------------
router.put("/:songId/tags/:tagId", (req, res) => {
  const { songId, tagId } = req.params;
  const { name } = req.body;

  if (!name || !name.trim()) return res.status(400).json({ error: "Tag name cannot be empty" });

  // Check if a tag with this name already exists
  db.query("SELECT id FROM tags WHERE name = ?", [name], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (rows.length > 0) {
      // Tag already exists → just update association
      const existingTagId = rows[0].id;
      db.query(
        "UPDATE song_tags SET tag_id = ? WHERE song_id = ? AND tag_id = ?",
        [existingTagId, songId, tagId],
        (err2) => {
          if (err2) return res.status(500).json({ error: "Failed to update tag" });
          res.json({ message: "Tag updated", newTagId: existingTagId });
        }
      );
    } else {
      // Tag doesn't exist → create new tag
      db.query("INSERT INTO tags (name) VALUES (?)", [name], (err2, result) => {
        if (err2) return res.status(500).json({ error: "Failed to create tag" });
        const newTagId = result.insertId;

        // Update song association
        db.query(
          "UPDATE song_tags SET tag_id = ? WHERE song_id = ? AND tag_id = ?",
          [newTagId, songId, tagId],
          (err3) => {
            if (err3) return res.status(500).json({ error: "Failed to update song tag" });
            res.json({ message: "Tag updated", newTagId });
          }
        );
      });
    }
  });
});

//----------------------
//Fetch Tags on a Song
//----------------------

router.get("/:songId/tags", (req, res) => {
  db.query(
    `
    SELECT t.id, t.name
    FROM tags t
    JOIN song_tags st ON t.id = st.tag_id
    WHERE st.song_id = ?
    `,
    [req.params.songId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Failed to fetch tags" });
      res.json(rows);
    }
  );
});

export default router;   // Export the router to be used in server.js