const express = require("express");

const router = express.Router();

const db = require("../db");

const { dispenseProduct } = require("../vendingController");

// ======================
// MIDTRANS CALLBACK
// ======================

router.post(
  "/",

  async (req, res) => {
    try {
      console.log(req.body);

      const status = req.body.transaction_status;

      const orderId = req.body.order_id;

      // ======================
      // PAYMENT SUCCESS
      // ======================

      if (status === "settlement") {
        console.log("PAYMENT SUCCESS");

        // ======================
        // UPDATE TRANSACTION
        // ======================

        db.query(
          `
          UPDATE transactions

          SET status='paid'

          WHERE order_id=?
          `,

          [orderId],
        );

        // ======================
        // GET TRANSACTION
        // ======================

        db.query(
          `
          SELECT

          transactions.*,

          products.slot_code

          FROM transactions

          JOIN products

          ON transactions.product_id =
          products.id

          WHERE order_id=?
          `,

          [orderId],

          (err, results) => {
            if (err) {
              console.log(err);

              return;
            }

            // ======================
            // DISPENSE PRODUCT
            // ======================

            results.forEach((item) => {
              // kurangi stok

              db.query(
                `
                  UPDATE products

                  SET stock =
                  stock - 1

                  WHERE id=?
                  `,

                [item.product_id],
              );

              // motor jalan

              dispenseProduct(item.slot_code);
            });
          },
        );
      }

      res.status(200).send("OK");
    } catch (error) {
      console.log(error);

      res.status(500).send(error);
    }
  },
);

module.exports = router;
