const express = require("express");
const router = express.Router();
const twilio = require("twilio");
require("dotenv").config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = (db) => {
  router.post("/sendOtp", async (req, res) => {
    try {
      const { phone } = req.body;

      // Validate phone
      if (!phone || !/^[0-9]{10}$/.test(phone)) {
        return res.status(400).json({
          error: "Invalid phone number. Must be 10 digits.",
        });
      }

      const otp = 121212;
      // const otp = generateOtp(); // use in production

      // Check if phone exists
      const rows = await db.query(
        "SELECT id FROM softwareuser WHERE phone = ?",
        [phone],
      );

      if (rows.length > 0) {
        // Update OTP
        await db.query(
          "UPDATE softwareuser SET otp = ?, updatedAt = NOW() WHERE phone = ?",
          [otp, phone],
        );
      } else {
        // // Insert new user
        // await db.query(
        //   `INSERT INTO softwareuser
        //    (phone, otp, createdAt, updatedAt)
        //    VALUES (?, ?, NOW(), NOW())`,
        //   [phone, otp],
        // );

        return res.status(404).json({
          message: "Your mobile number is not registered",
        });

        // Validate required fields for new user
        // if (!prefix || !fullName || !email) {
        //   return res.status(400).json({
        //     error: "prefix, fullName and email are required for new users",
        //   });
        // }

        // // Insert new user
        // await db.query(
        //   `INSERT INTO softwareuser
        //   (prefix, fullName, email, phone, otp, createdAt, updatedAt)
        //   VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
        //   [prefix, fullName, email, phone, otp],
        // );
      }

      // Send OTP via Twilio
      await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+91${phone}`, // India format
      });

      console.log(`OTP for ${phone}: ${otp}`);

      res.status(200).json({
        message: "OTP sent successfully",
        phone: phone,
        otp: otp,
      });
    } catch (err) {
      console.error("Send OTP error:", err);
      res.status(500).json({
        error: "Server error",
      });
    }
  });

  return router;
};
