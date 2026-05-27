const express = require("express");

const router = express.Router();

const midtransClient = require("midtrans-client");

const db = require("../db");

// ======================
// MIDTRANS CONFIG
// ======================

const snap = new midtransClient.Snap({
  isProduction: false,

  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

// ======================
// CREATE PAYMENT
// ======================

router.post(
  "/",

  async (req, res) => {
    try {
      const { cart, total } = req.body;

      if (!cart || cart.length === 0) {
        return res.status(400).json({
          message: "Cart kosong",
        });
      }

      if (total <= 0) {
        return res.status(400).json({
          message: "Total tidak valid",
        });
      }

      const orderId = "VM-" + Date.now();

      // ======================
      // MIDTRANS PARAMETER
      // ======================

      const parameter = {
        transaction_details: {
          order_id: orderId,

          gross_amount: total,
        },

        enabled_payments: ["gopay"],

        item_details: cart.map((item) => ({
          id: item.id,

          price: item.price,

          quantity: 1,

          name: item.name,
        })),

        callbacks: {
          finish: "http://localhost:3000",
        },

        notification_url:
          "https://0fe3-114-124-247-246.ngrok-free.app",
      };

      // ======================
      // CREATE TRANSACTION
      // ======================

      const transaction = await snap.createTransaction(parameter);

      // ======================
      // SAVE PENDING TRANSACTION
      // ======================

      for (const item of cart) {
        db.query(
          `
          INSERT INTO transactions
(
  order_id,
  product_id,
  product_name,
  quantity,
  total,
  status
)

           VALUES (?, ?, ?, ?, ?, ?)
    `,

          [orderId, item.id, item.name, 1, item.price, "pending"],
        );
      }

      // ======================
      // RESPONSE
      // ======================

      res.json({
        success: true,

        token: transaction.token,

        redirect_url: transaction.redirect_url,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json(error);
    }
  },
);

module.exports = router;
