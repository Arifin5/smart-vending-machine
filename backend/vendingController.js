const { SerialPort } = require("serialport");

const db = require("./db");

// ======================
// SERIAL PORT
// ======================

const port = new SerialPort({
  path: "/dev/ttyS1",

  baudRate: 115200,
});

// ======================
// OPEN SERIAL
// ======================

port.on("open", () => {
  console.log("SERIAL CONNECTED");
});

// ======================
// READ RESPONSE
// ======================

port.on("data", (data) => {
  console.log("RECEIVED:", data.toString());

  console.log("HEX:", data.toString("hex"));
});

// ======================
// ERROR SERIAL
// ======================

port.on("error", (err) => {
  console.log("SERIAL ERROR:", err.message);
});

// ======================
// DISPENSE PRODUCT
// ======================

const dispenseProduct = (slotCode, io) => {
  const command = `${slotCode}\n`;

  console.log("SEND:", command);

  port.write(command, (err) => {
    if (err) {
      console.log(err);

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

      if (io) {
        io.emit("motorError", {
          slot: slotCode,
          error: err.message,
        });
      }

      return;
    }

    console.log("MOTOR COMMAND SENT:", command);
  });
};

module.exports = {
  dispenseProduct,
};
