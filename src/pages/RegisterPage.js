import React from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");

  const [password, setPassword] = React.useState("");

  const register = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.8:5001/auth/register",

        {
          email,

          password,
        },
      );

      alert("OTP dikirim ke email");

      localStorage.setItem("verifyEmail", email);

      navigate("/verify");
    } catch (error) {
      console.log(error);

      alert("Register gagal");
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h1>REGISTER</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button onClick={register} style={button}>
          REGISTER
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

export default RegisterPage;
