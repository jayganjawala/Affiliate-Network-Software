const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET /api/mydeployments?phone=9876543210
  router.get("/mydeployments", async (req, res) => {
    try {
      const { phone } = req.query;

      // Validate phone
      if (!phone || !/^\d{10}$/.test(phone)) {
        return res.status(400).json({
          success: false,
          error: "Valid 10-digit phone number is required",
        });
      }

      const query = `
      SELECT 
        u.prefix,
        u.fullName,
        u.phone,
        d.id AS deploymentId,
        d.name,
        d.description,
        d.price,
        d.duration,
        d.status,
        u.depStartDate,
        u.depEndDate
      FROM softwareuser u
      LEFT JOIN softwaredeployment d 
        ON u.deploymentId = d.id
      WHERE u.phone = ?
      LIMIT 1
    `;

      const rows = await db.query(query, [phone]);

      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
      }

      const data = rows[0];

      const response = {
        userName: data.prefix
          ? `${data.prefix} ${data.fullName}`
          : data.fullName,
        phone: data.phone,
        deployment: data.deploymentId
          ? {
              id: data.deploymentId,
              name: data.name,
              description: data.description,
              price: data.price,
              duration: data.duration,
              status: data.status,
              startDate: data.depStartDate,
              endDate: data.depEndDate,
            }
          : null,
      };

      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (err) {
      console.error("MyDeployments API Error:", err);
      res.status(500).json({
        success: false,
        error: "Database error",
      });
    }
  });
  return router;
};
