const express = require("express");
const router = express.Router();

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = (db) => {
  router.post("/register", async (req, res) => {
    try {
      const { prefix, fullName, email, phone } = req.body;

      // Validate required fields
      if (!prefix || !fullName || !email || !phone) {
        return res.status(400).json({
          error: "prefix, fullName, email, and phone are required",
        });
      }

      // Validate phone
      if (!/^[0-9]{10}$/.test(phone)) {
        return res.status(400).json({
          error: "Invalid phone number. Must be 10 digits.",
        });
      }

      // Check if user already exists
      const existingUser = await db.query(
        "SELECT id FROM softwareuser WHERE phone = ? OR email = ?",
        [phone, email],
      );

      if (existingUser.length > 0) {
        return res.status(409).json({
          error: "User with this phone or email already exists",
        });
      }

      //   const otp = generateOtp();
      const otp = 121212;

      // Insert new user
      await db.query(
        `INSERT INTO softwareuser 
         (prefix, fullName, email, phone, otp, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
        [prefix, fullName, email, phone, otp],
      );

      console.log(`OTP for ${phone}: ${otp}`);

      res.status(201).json({
        message: "User registered successfully. OTP sent.",
        phone: phone,
        otp: otp,
        name: fullName,
      });
    } catch (err) {
      console.error("Register user error:", err);
      res.status(500).json({
        error: "Server error",
      });
    }
  });

  return router;
};
