const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = (db) => {
  /**
   * ✅ Create Checkout Session
   */
  router.post("/service/create-checkout-session", async (req, res) => {
    try {
      const { serviceId, price, phone } = req.body;

      const users = await db.query(
        "SELECT id, fullName, email, employeeId FROM users WHERE phone = ? LIMIT 1",
        [phone],
      );

      if (!users.length) {
        return res.status(404).json({ error: "User not found" });
      }

      const user = users[0];

      // Get service
      const services = await db.query(
        "SELECT id, name FROM services WHERE id = ? LIMIT 1",
        [serviceId],
      );

      if (!services.length) {
        return res.status(404).json({ error: "Service not found" });
      }

      const service = services[0];

      // Create Stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card", "upi"],
        customer_email: user.email,

        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: service.name,
              },
              unit_amount: price * 100,
            },
            quantity: 1,
          },
        ],

        mode: "payment",

        success_url: `${process.env.CLIENT_URL}/service-confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/services`,

        metadata: {
          userId: user.id,
          serviceId: service.id,
          phone: phone,
          employeeId: user.employeeId,
        },
      });

      res.json({ url: session.url });
    } catch (err) {
      console.error("Stripe session error:", err);
      res.status(500).json({ error: "Stripe error" });
    }
  });

  /**
   * ✅ Verify Payment & Insert into payments table
   */
  router.get("/service/verify-payment/:sessionId", async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.retrieve(
        req.params.sessionId,
        { expand: ["line_items"] },
      );

      if (session.payment_status !== "paid") {
        return res.json({
          success: false,
          message: "Payment not completed",
        });
      }

      const transactionId = session.payment_intent;
      const userId = session.metadata.userId;
      const employeeId = session.metadata.employeeId;
      const serviceId = session.metadata.serviceId;
      const amount = session.amount_total / 100;

      const existing = await db.query(
        "SELECT id FROM payments WHERE transactionId = ? LIMIT 1",
        [transactionId],
      );

      if (existing.length === 0) {
        await db.query(
          `
          INSERT INTO payments
          (userId,employeeId, serviceId, paymentMethod, totalAmount, paidAmount, status, transactionId, paymentDate, createdAt, updatedAt)
          VALUES (?,?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())
          `,
          [
            userId,
            employeeId,
            serviceId,
            "Stripe",
            amount,
            amount,
            "Success",
            transactionId,
          ],
        );
        // ✅ Update user status to "Client"
        await db.query(
          "UPDATE users SET status = 'Client', updatedAt = NOW() WHERE id = ?",
          [userId],
        );
      }

      res.json({
        success: true,
        session,
      });
    } catch (err) {
      console.error("Verify error:", err);
      res.status(500).json({
        success: false,
        message: "Verification failed",
      });
    }
  });

  return router;
};
