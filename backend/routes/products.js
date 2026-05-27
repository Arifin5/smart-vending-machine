const express = require("express");

const router = express.Router();

const db = require("../db");

// ======================
// GET PRODUCTS
// ======================

router.get(
  "/",

  (req, res) => {
    db.query(
      `
      SELECT *

      FROM products
      `,

      (err, result) => {
        if (err) {
          console.log(err);

          return;
        }

        res.json(result);
      },
    );
  },
);

// ======================
// ADD PRODUCT
// ======================

router.post(
  "/",

  (req, res) => {
    const {
      name,

      price,

      stock,

      category,

      image,

      slot_code,
    } = req.body;

    db.query(
      `
      INSERT INTO products
      (
        name,
        price,
        stock,
        category,
        image,
        slot_code
      )

      VALUES (?, ?, ?, ?, ?, ?)
      `,

      [name, price, stock, category, image, slot_code],

      (err, result) => {
        if (err) {
          console.log(err);

          return;
        }

        res.json(result);
      },
    );
  },
);

// ======================
// UPDATE PRODUCT
// ======================

router.put(
  "/:id",

  (req, res) => {
    const {
      name,

      price,

      stock,

      category,

      image,

      slot_code,
    } = req.body;

    db.query(
      `
      UPDATE products

      SET

      name=?,

      price=?,

      stock=?,

      category=?,

      image=?,

      slot_code=?

      WHERE id=?
      `,

      [name, price, stock, category, image, slot_code, req.params.id],

      (err, result) => {
        if (err) {
          console.log(err);

          return;
        }

        res.json(result);
      },
    );
  },
);

// ======================
// DELETE PRODUCT
// ======================

router.delete(
  "/:id",

  (req, res) => {
    db.query(
      `
      DELETE FROM products

      WHERE id=?
      `,

      [req.params.id],

      (err, result) => {
        if (err) {
          console.log(err);

          return;
        }

        res.json(result);
      },
    );
  },
);

module.exports = router;
