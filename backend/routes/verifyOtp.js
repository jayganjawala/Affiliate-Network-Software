const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

module.exports = (db) => {
  router.post("/verifyOtp", async (req, res) => {
    try {
      const { phone, otp } = req.body;

      // Validate inputs
      if (!phone || !/^\d{10}$/.test(phone) || !otp || !/^\d{6}$/.test(otp)) {
        return res.status(400).json({
          error: "Invalid phone number or OTP",
        });
      }

      console.log("Verifying OTP for phone:", phone, "OTP:", otp);

      // Step 1: Check OTP
      const result = await db.query(
        "SELECT * FROM softwareuser WHERE phone = ? AND otp = ?",
        [phone, otp],
      );
      const rows = Array.isArray(result[0]) ? result[0] : result;
      if (!rows || rows.length === 0) {
        return res.status(401).json({ error: "Invalid OTP" });
      }

      const user = rows[0];
      const name = user.fullName || "User";

      // Step 2: Generate JWT token
      const token = jwt.sign({ phone: phone }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Step 3: Update token and clear OTP
      await db.query(
        `UPDATE softwareuser 
         SET token = ?, otp = NULL, updatedAt = NOW()
         WHERE phone = ?`,
        [token, phone],
      );

      console.log("Login successful for phone:", phone);

      res.status(200).json({
        message: "Login successful",
        token: token,
        name: name,
      });
    } catch (err) {
      console.error("Verify OTP error:", err);
      res.status(500).json({
        error: "Server error",
        details: err.message,
      });
    }
  });

  return router;
};
