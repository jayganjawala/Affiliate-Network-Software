const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = (db) => {
  // Create Stripe Checkout Session
  router.post("/create-checkout-session", async (req, res) => {
    try {
      const { price, plan, duration, deploymentId, phone } = req.body;

      const userResult = await db.query(
        "SELECT id, fullName, email FROM softwareuser WHERE phone = ?",
        [phone],
      );

      if (!userResult.length) {
        return res.status(404).json({ error: "User not found" });
      }

      const user = userResult[0];
      const userId = user.id;
      const userName = user.fullName;
      const userEmail = user.email;

      const session = await stripe.checkout.sessions.create({
        // payment_method_types: ["card"],
        payment_method_types: ["card", "upi"],
        customer_email: userEmail,
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: `${plan} Plan (${duration})`,
              },
              unit_amount: price * 100,
            },
            quantity: 1,
          },
        ],

        mode: "payment",

        success_url: `${process.env.CLIENT_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/checkout`,

        metadata: {
          userId,
          deploymentId,
          duration,
          plan,
          userName, // fullName from DB
          userEmail, // email from DB
        },
      });

      res.json({ url: session.url });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error: "Stripe session creation failed",
      });
    }
  });

  router.get("/verify-payment/:sessionId", async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.retrieve(
        req.params.sessionId,
      );

      let paymentStatus = "Rejected";

      if (session.payment_status === "paid") {
        paymentStatus = "Successfull";
        let deploymentId = session.metadata.deploymentId;
        const userId = session.metadata.userId;
        const duration = session.metadata.duration;
        const transactionId = session.payment_intent;

        // If deploymentId is null, fetch first active deployment
        if (!deploymentId) {
          const [deployment] = await db.query(`
          SELECT id 
          FROM softwaredeployment
          WHERE status = 'Active'
          ORDER BY id ASC
          LIMIT 1
        `);

          if (!deployment || !deployment.id) {
            return res
              .status(400)
              .json({ success: false, message: "No active deployment found" });
          }

          deploymentId = deployment.id;
        }

        const startDate = new Date();
        const endDate = new Date();

        if (duration.includes("Month")) {
          const months = parseInt(duration);
          endDate.setMonth(endDate.getMonth() + months);
        }

        if (duration.includes("Year")) {
          const years = parseInt(duration);
          endDate.setFullYear(endDate.getFullYear() + years);
        }

        // ✅ Check if this transaction already exists
        const existing = await db.query(
          "SELECT id FROM softwarepayment WHERE transactionId = ? LIMIT 1",
          [transactionId],
        );

        if (existing.length === 0) {
          // Insert payment
          await db.query(
            `
          INSERT INTO softwarepayment
          (userId, deploymentId, paymentMethod, totalAmount, paidAmount, status, transactionId, paymentDate, createdAt, updatedAt)
          VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())
          `,
            [
              userId,
              deploymentId,
              "stripe",
              session.amount_total / 100,
              session.amount_total / 100,
              "Successfull",
              transactionId,
            ],
          );

          // Update user deployment
          await db.query(
            `
          UPDATE softwareuser
          SET deploymentId = ?, depStartDate = ?, depEndDate = ?
          WHERE id = ?
          `,
            [deploymentId, startDate, endDate, userId],
          );
        } else {
          console.log(
            "Payment already recorded, skipping insert:",
            transactionId,
          );
        }
      }

      res.json(session);
    } catch (error) {
      console.error("Verify Payment Error:", error);

      res.status(500).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  });
  return router;
};
