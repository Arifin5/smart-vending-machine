const express = require("express");

const router = express.Router();

const db = require("../db");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

// ======================
// EMAIL CONFIG
// ======================

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS,
  },
});

// ======================
// REGISTER
// ======================

router.post(
  "/register",

  async (
    req,

    res,
  ) => {
    try {
      const {
        email,

        password,
      } = req.body;

      // ======================
      // CHECK EMAIL
      // ======================

      db.query(
        `
        SELECT *

        FROM admins

        WHERE email=?
        `,

        [email],

        async (
          err,

          result,
        ) => {
          if (err) {
            console.log(err);

            return res.status(500).send(err);
          }

          if (result.length > 0) {
            return res.json({
              success: false,

              message: "Email sudah terdaftar",
            });
          }

          // ======================
          // HASH PASSWORD
          // ======================

          const hashed = await bcrypt.hash(password, 10);

          // ======================
          // OTP
          // ======================

          const otp = String(Math.floor(100000 + Math.random() * 900000));

          console.log("OTP:", otp);

          // ======================
          // SAVE ADMIN
          // ======================

          db.query(
            `
            INSERT INTO admins
            (
              email,
              password,
              otp_code
            )

            VALUES (?, ?, ?)
            `,

            [email, hashed, otp],
          );

          // ======================
          // SEND EMAIL
          // ======================

          await transporter.sendMail({
            from: `"Vending Machine" <${process.env.EMAIL_USER}>`,

            to: email,

            subject: "Kode OTP Vending Machine",

            html: `

              <div
                style="
                  font-family:Arial;
                  padding:20px;
                "
              >

                <h2>
                  Verifikasi Admin
                </h2>

                <p>
                  Kode OTP anda:
                </p>

                <h1
                  style="
                    letter-spacing:5px;
                    color:#2563eb;
                  "
                >
                  ${otp}
                </h1>

                <p>
                  Jangan bagikan kode ini.
                </p>

              </div>
            `,
          });

          console.log("OTP BERHASIL DIKIRIM");

          res.json({
            success: true,

            message: "OTP dikirim",
          });
        },
      );
    } catch (error) {
      console.log(error);

      res.status(500).send(error);
    }
  },
);

// ======================
// VERIFY OTP
// ======================

router.post(
  "/verify",

  (
    req,

    res,
  ) => {
    const {
      email,

      otp,
    } = req.body;

    db.query(
      `
      SELECT *

      FROM admins

      WHERE email=?
      `,

      [email],

      (
        err,

        result,
      ) => {
        if (err) {
          console.log(err);

          return res.status(500).send(err);
        }

        if (result.length === 0) {
          return res.json({
            success: false,

            message: "Email tidak ditemukan",
          });
        }

        const admin = result[0];

        console.log("DB OTP:", admin.otp_code);

        console.log("INPUT OTP:", otp);

        // ======================
        // OTP CHECK
        // ======================

        if (String(admin.otp_code).trim() !== String(otp).trim()) {
          return res.json({
            success: false,

            message: "OTP salah",
          });
        }

        // ======================
        // VERIFIED
        // ======================

        db.query(
          `
          UPDATE admins

          SET is_verified=true

          WHERE email=?
          `,

          [email],
        );

        res.json({
          success: true,

          message: "Verifikasi berhasil",
        });
      },
    );
  },
);

// ======================
// LOGIN
// ======================

router.post(
  "/login",

  async (
    req,

    res,
  ) => {
    const {
      email,

      password,
    } = req.body;

    db.query(
      `
      SELECT *

      FROM admins

      WHERE email=?
      `,

      [email],

      async (
        err,

        result,
      ) => {
        if (err) {
          console.log(err);

          return res.status(500).send(err);
        }

        if (result.length === 0) {
          return res.json({
            success: false,

            message: "Email tidak ditemukan",
          });
        }

        const admin = result[0];

        // ======================
        // VERIFIED?
        // ======================

        if (!admin.is_verified) {
          return res.json({
            success: false,

            message: "Email belum diverifikasi",
          });
        }

        // ======================
        // PASSWORD CHECK
        // ======================

        const valid = await bcrypt.compare(
          password,

          admin.password,
        );

        if (!valid) {
          return res.json({
            success: false,

            message: "Password salah",
          });
        }

        // ======================
        // JWT TOKEN
        // ======================

        const token = jwt.sign(
          {
            id: admin.id,

            email: admin.email,
          },

          process.env.JWT_SECRET,

          {
            expiresIn: "7d",
          },
        );

        res.json({
          success: true,

          token,
        });
      },
    );
  },
);

module.exports = router;
