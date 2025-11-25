import express from "express";
import db from "../db.js";

const router = express.Router();

// ----------------------------------------------------
// GET all users
// ----------------------------------------------------
router.get("/", (req, res) => {
  db.query("SELECT * FROM users ORDER BY username ASC", (err, rows) => { //data
    if (err) return res.status(500).json({ error: "Failed to fetch users" });
    res.json(rows);
  });
});

// ----------------------------------------------------
// CREATE user
// ----------------------------------------------------
router.post("/", (req, res) => {
  const { username, email, user_type } = req.body;

  if (!username || !email)
    return res.status(400).json({ error: "Username and email are required" });

  if (!["standard", "premium"].includes(user_type))
    return res.status(400).json({ error: "Invalid user_type" });

  db.query(
    "INSERT INTO users (username, email, user_type) VALUES (?, ?, ?)",
    [username, email, user_type],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY")
          return res.status(400).json({ error: "Username or email already exists" });

        return res.status(500).json({ error: "Failed to create user" });
      }

      res.json({
        user_id: result.insertId,
        username,
        email,
        user_type,
      });
    }
  );
});


// ----------------------------------------------------
// UPDATE user
// ----------------------------------------------------
router.put("/:id", (req, res) => {
  const { username, email, user_type } = req.body;

  if (user_type && !["standard", "premium"].includes(user_type))
    return res.status(400).json({ error: "Invalid user_type" });

  db.query(
    "UPDATE users SET username = ?, email = ?, user_type = ? WHERE user_id = ?",
    [username, email, user_type, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: "Failed to update user" });
      res.json({ message: "User updated" });
    }
  );
});

// ----------------------------------------------------
// DELETE user
// ----------------------------------------------------
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM users WHERE user_id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Failed to delete user" });
    res.json({ message: "User deleted" });
  });
});


export default router;
