const express = require("express");
const router = express.Router();

module.exports = (db) => {

  // GET /api/myprofile?phone=9876543210
  router.get("/myprofile", async (req, res) => {
    try {
      const { phone } = req.query;

      if (!phone || !/^\d{10}$/.test(phone)) {
        return res.status(400).json({
          success: false,
          error: "Valid 10-digit phone number is required (example: 9876543210)",
        });
      }

      const query = `
        SELECT 
          prefix,
          fullName,
          phone,
          email
        FROM softwareuser
        WHERE phone = ?
        LIMIT 1
      `;

      const rows = await db.query(query, [phone]);

      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: "User not found with this phone number",
        });
      }

      const data = rows[0];

      const profile = {
        userName: data.prefix
          ? `${data.prefix} ${data.fullName}`
          : data.fullName,
        phone: data.phone,
        email: data.email
      };

      res.status(200).json({
        success: true,
        profile,
      });

    } catch (err) {
      console.error("MyProfile API Error:", err);
      res.status(500).json({
        success: false,
        error: "Database error",
      });
    }
  });

  return router;
};