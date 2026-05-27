const express = require("express");

const router = express.Router();

const db = require("../db");

router.get("/", async (req, res) => {
  try {
    // ======================
    // TOTAL SALES
    // ======================

    db.query(
      `
      SELECT
      SUM(total) AS totalSales

      FROM transactions

      WHERE status='paid'
      `,

      (err, salesResult) => {
        if (err) {
          console.log(err);

          return;
        }

        // ======================
        // TOTAL TRANSACTIONS
        // ======================

        db.query(
          `
          SELECT
          COUNT(*) AS totalTransactions

          FROM transactions

          WHERE status='paid'
          `,

          (err, transactionResult) => {
            if (err) {
              console.log(err);

              return;
            }

            // ======================
            // TOTAL PRODUCTS
            // ======================

            db.query(
              `
              SELECT
              COUNT(*) AS totalProducts

              FROM products
              `,

              (err, productResult) => {
                if (err) {
                  console.log(err);

                  return;
                }

                // ======================
                // SALES DATA (CHART)
                // ======================

                db.query(
                  `
                  SELECT

                  product_name AS name,

                  SUM(total) AS sales

                  FROM transactions

                  WHERE status='paid'

                  GROUP BY product_name
                  `,

                  (err, salesData) => {
                    if (err) {
                      console.log(err);

                      return;
                    }

                    // ======================
                    // BEST SELLER
                    // ======================

                    db.query(
                      `
                      SELECT

                      product_name,

                      SUM(quantity) AS totalSold

                      FROM transactions

                      WHERE status='paid'

                      GROUP BY product_name

                      ORDER BY totalSold DESC

                      LIMIT 5
                      `,

                      (err, bestSeller) => {
                        if (err) {
                          console.log(err);

                          return;
                        }

                        // ======================
                        // LOW SELLER
                        // ======================

                        db.query(
                          `
                          SELECT

                          product_name,

                          SUM(quantity) AS totalSold

                          FROM transactions

                          WHERE status='paid'

                          GROUP BY product_name

                          ORDER BY totalSold ASC

                          LIMIT 5
                          `,

                          (err, lowSeller) => {
                            if (err) {
                              console.log(err);

                              return;
                            }

                            // ======================
                            // RESPONSE
                            // ======================

                            res.json({
                              totalSales: Number(
                                salesResult[0].totalSales || 0,
                              ),

                              totalTransactions: Number(
                                transactionResult[0].totalTransactions || 0,
                              ),

                              totalProducts: Number(
                                productResult[0].totalProducts || 0,
                              ),

                              salesData,

                              bestSeller,

                              lowSeller,
                            });
                          },
                        );
                      },
                    );
                  },
                );
              },
            );
          },
        );
      },
    );
  } catch (error) {
    console.log(error);

    res.status(500).send(error);
  }
});

module.exports = router;
