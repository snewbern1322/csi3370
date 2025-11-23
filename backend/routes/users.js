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

// ----------------------------------------------------
// MOCK LOGIN
// ----------------------------------------------------
router.post("/login", async (req, res) => {
  const { user_id } = req.body;

  if (!user_id)
    return res.status(400).json({ message: "user_id is required" });

  try {
    const [rows] = await db
      .promise()
      .query("SELECT * FROM users WHERE user_id = ?", [user_id]);

    if (rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "Logged in", user: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
