import React from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function VerifyPage() {
  const navigate = useNavigate();

  const [otp, setOtp] = React.useState("");

  const verify = async () => {
    try {
      const email = localStorage.getItem("verifyEmail");

      const response = await axios.post(
        "https://smart-vending-machine-production.up.railway.app/auth/verify",

        {
          email,

          otp,
        },
      );

      if (response.data.success) {
        alert("Verifikasi berhasil");

        navigate("/login");
      } else {
        alert("OTP salah");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h1>VERIFY OTP</h1>

        <input
          type="text"
          placeholder="Masukkan OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          style={input}
        />

        <button onClick={verify} style={button}>
          VERIFY
        </button>
      </div>
    </div>
  );
}

const container = {
  background: "#020617",

  minHeight: "100vh",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",
};

const card = {
  background: "#1e293b",

  padding: 40,

  borderRadius: 20,

  width: 400,

  color: "white",
};

const input = {
  width: "100%",

  padding: 15,

  marginBottom: 20,

  border: "none",

  borderRadius: 12,
};

const button = {
  width: "100%",

  padding: 16,

  border: "none",

  borderRadius: 12,

  background: "#2563eb",

  color: "white",

  fontWeight: "bold",
};

export default VerifyPage;
