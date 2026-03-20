const express = require("express");
const router = express.Router();

module.exports = (db) => {

  // POST /api/contactus
  router.post("/contactus", async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;

      // Validation
      if (!name || !email || !phone || !message) {
        return res.status(400).json({
          success: false,
          error: "All fields are required",
        });
      }

      if (!/^\d{10}$/.test(phone)) {
        return res.status(400).json({
          success: false,
          error: "Phone must be a valid 10 digit number",
        });
      }

      const query = `
        INSERT INTO contactus
        (name, email, phone, message, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, NOW(), NOW())
      `;

      await db.query(query, [name, email, phone, message]);

      res.status(201).json({
        success: true,
        message: "Contact message submitted successfully",
      });

    } catch (err) {
      console.error("ContactUs API Error:", err);
      res.status(500).json({
        success: false,
        error: "Database error",
      });
    }
  });

  return router;
};