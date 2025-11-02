// backend/routes/users.js
import express from "express";
import bcrypt from "bcrypt";
import db from "../db.js";

const router = express.Router();

// ✅ Register a new user
router.post("/register", async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  // Basic validation
  if (!firstName || !lastName || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if username already exists
    const [existing] = await db
      .promise()
      .query("SELECT * FROM users WHERE username = ?", [username]);

    if (existing.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into database
    await db
      .promise()
      .query(
        "INSERT INTO users (first_name, last_name, username, password) VALUES (?, ?, ?, ?)",
        [firstName, lastName, username, hashedPassword]
      );

    res.status(201).json({ message: "Account created successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Login user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  try {
    const [rows] = await db
      .promise()
      .query("SELECT * FROM users WHERE username = ?", [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    // Optionally remove password before sending response
    delete user.password;

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
