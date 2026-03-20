const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET /api/software-product-services
  router.get("/software-product-services", async (req, res) => {
    try {
      const query = `
        SELECT 
          id,
          category,
          name,
          description,
          price,
          status,
          createdAt,
          updatedAt
        FROM services
        WHERE status = 'Active'
        ORDER BY id ASC
      `;

      const rows = await db.query(query);

      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No active software product services found",
        });
      }

      res.status(200).json({
        success: true,
        total: rows.length,
        services: rows,
      });
    } catch (err) {
      console.error("Software Product Service API Error:", err);
      res.status(500).json({
        success: false,
        error: "Database error",
      });
    }
  });

  return router;
};
