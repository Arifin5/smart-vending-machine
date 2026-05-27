const express = require("express");

const router = express.Router();

const { dispenseProduct } = require("../vendingController");

// ======================
// TEST MOTOR
// ======================

router.get(
  "/:slot",

  (req, res) => {
    const slot = req.params.slot;

    dispenseProduct(slot);

    res.send(
      `Motor ${slot}
      berjalan`,
    );
  },
);

module.exports = router;
