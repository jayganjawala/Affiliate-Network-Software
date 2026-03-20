const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Check user availability by phone number
  router.get("/users/check/:phone", async (req, res) => {
    const { phone } = req.params;
    try {
      const query = `SELECT * FROM users WHERE phone = ? LIMIT 1`;
      const rows = await db.query(query, [phone]);

      if (rows.length > 0) {
        return res.status(200).json({
          success: true,
          available: false,
          user: rows[0], // return user details if found
        });
      } else {
        return res.status(200).json({
          success: true,
          available: true,
          message: "Phone number is available for new entry",
        });
      }
    } catch (err) {
      console.error("User availability check error:", err);
      res.status(500).json({
        success: false,
        error: "Database error",
      });
    }
  });

  // Add new user
  router.post("/users", async (req, res) => {
    const { prefix, fullName, phone, email } = req.body;

    if (!prefix || !fullName || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: "Please provide prefix, fullName, phone, and email",
      });
    }

    try {
      // First check if user already exists
      const checkQuery = `SELECT * FROM users WHERE phone = ? LIMIT 1`;
      const checkResult = await db.query(checkQuery, [phone]);

      if (checkResult.length > 0) {
        return res.status(409).json({
          success: false,
          message: "User with this phone number already exists",
        });
      }

      const query = `
  INSERT INTO users 
  (employeeId, prefix, fullName, phone, email, status, source)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`;

      const insertResult = await db.query(query, [
        13,
        prefix,
        fullName,
        phone,
        email,
        "Lead",
        "Website",
      ]);

      res.status(201).json({
        success: true,
        user: {
          id: insertResult.insertId,
          ...req.body,
        },
      });
    } catch (err) {
      console.error("Add user API error:", err);
      res.status(500).json({
        success: false,
        error: "Database error",
      });
    }
  });

  return router;
};
