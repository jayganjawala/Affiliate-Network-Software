const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/logout", async (req, res) => {
    try {
      const { phone } = req.body;

      // Validate phone
      if (!phone || !/^\d{10}$/.test(phone)) {
        return res.status(400).json({
          error: "Invalid phone number",
        });
      }

      // Remove token from user
      const result = await db.query(
        `UPDATE softwareuser
         SET token = NULL, updatedAt = NOW()
         WHERE phone = ? AND token IS NOT NULL`,
        [phone],
      );

      if (result.affectedRows === 0) {
        return res.status(200).json({
          message: "Already logged out",
        });
      }

      console.log("Logout successful for phone:", phone);

      res.status(200).json({
        message: "Logged out successfully",
      });
    } catch (err) {
      console.error("Logout error:", err);
      res.status(500).json({
        error: "Server error",
      });
    }
  });

  return router;
};
