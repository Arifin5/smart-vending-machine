require("dotenv").config();

const express = require("express");

const cors = require("cors");

const http = require("http");

const { Server } = require("socket.io");

// ======================
// ROUTES
// ======================

const paymentRoute = require("./routes/payment");

const productRoute = require("./routes/products");

const dashboardRoute = require("./routes/dashboard");

const midtransCallback = require("./routes/midtransCallback");

const testMotorRoute = require("./routes/testMotor");

const transactionRoute = require("./routes/transactions");

const authRoute = require("./routes/auth");

// ======================
// APP
// ======================

const app = express();

// ======================
// HTTP SERVER
// ======================

const server = http.createServer(app);

// ======================
// SOCKET.IO
// ======================

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.set("io", io);

// ======================
// MIDDLEWARE
// ======================

app.use(cors());

app.use(express.json());

// ======================
// ROUTES
// ======================

app.use("/payment", paymentRoute);

app.use("/products", productRoute);

app.use("/dashboard", dashboardRoute);

app.use("/midtrans-callback", midtransCallback);

app.use("/test-motor", testMotorRoute);

app.use("/transactions", transactionRoute);

app.use("/auth", authRoute);

// ======================
// SOCKET CONNECTION
// ======================

io.on(
  "connection",

  (socket) => {
    console.log("SOCKET CONNECTED");
  },
);

// ======================
// SERVER
// ======================

server.listen(
  5001,

  "0.0.0.0",

  () => {
    console.log("SERVER RUNNING");
  },
);
