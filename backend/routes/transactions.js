const express = require("express");

const router = express.Router();

const db = require("../db");

// ======================
// GET TRANSACTIONS
// ======================

router.get(
  "/",

  (req, res) => {
    const {
      startDate,

      endDate,
    } = req.query;

    let sql = `
    SELECT *

    FROM transactions
    `;

    let params = [];

    // ======================
    // FILTER DATE
    // ======================

    if (startDate && endDate) {
      sql += `
      WHERE created_at
      BETWEEN ? AND ?
      `;

      params = [`${startDate} 00:00:00`, `${endDate} 23:59:59`];
    }

    sql += `
    ORDER BY created_at DESC
    `;

    db.query(
      sql,

      params,

      (
        err,

        result,
      ) => {
        if (err) {
          console.log(err);

          return res.status(500).send(err);
        }

        res.json(result);
      },
    );
  },
);

module.exports = router;
