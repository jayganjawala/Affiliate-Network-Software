const express = require("express");
const router = express.Router();

module.exports = (db) => {

  // GET /api/software-deployments
  router.get("/software-deployments", async (req, res) => {
    try {

      const query = `
        SELECT 
          id,
          name,
          description,
          price,
          duration,
          status,
          createdAt,
          updatedAt
        FROM softwaredeployment
        WHERE status = 'Active'
        ORDER BY id ASC
      `;

      const rows = await db.query(query);

      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No deployment plans found"
        });
      }

      res.status(200).json({
        success: true,
        total: rows.length,
        deployments: rows
      });

    } catch (err) {
      console.error("Software Deployment API Error:", err);
      res.status(500).json({
        success: false,
        error: "Database error"
      });
    }
  });

  return router;
};