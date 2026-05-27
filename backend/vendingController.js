const { SerialPort } = require("serialport");

const db = require("./db");

// ======================
// SERIAL PORT
// ======================

const port = new SerialPort({
  path: "/dev/tty.usbserial",

  baudRate: 9600,
});

// ======================
// OPEN SERIAL
// ======================

port.on(
  "open",

  () => {
    console.log("SERIAL CONNECTED");
  },
);

// ======================
// ERROR SERIAL
// ======================

port.on(
  "error",

  (err) => {
    console.log("SERIAL ERROR:", err.message);
  },
);

// ======================
// DISPENSE PRODUCT
// ======================

const dispenseProduct = (slotCode, io) => {
  const command = `DISPENSE:${slotCode}\n`;

  port.write(
    command,

    (err) => {
      if (err) {
        console.log(err);

        // ======================
        // LOG ERROR
        // ======================

        db.query(
          `
          INSERT INTO motor_logs
          (
            slot_code,
            status,
            error_message
          )

          VALUES (?, ?, ?)
          `,

          [slotCode, "error", err.message],
        );

        // ======================
        // SOCKET ERROR
        // ======================

        io.emit(
          "motorError",

          {
            slot: slotCode,

            error: err.message,
          },
        );

        return;
      }

      console.log("MOTOR BERJALAN:", command);
    },
  );
};

module.exports = {
  dispenseProduct,
};
