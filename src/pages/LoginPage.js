import React from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");

  const [password, setPassword] = React.useState("");

  const login = async () => {
    try {
      const response = await axios.post(
        "https://smart-vending-machine-production.up.railway.app/auth/login",

        {
          email,

          password,
        },
      );

      if (response.data.success) {
        localStorage.setItem(
          "token",

          response.data.token,
        );

        navigate("/admin");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h1>ADMIN LOGIN</h1>

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

        <button onClick={login} style={button}>
          LOGIN
        </button>

        <button onClick={() => navigate("/register")} style={registerBtn}>
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

  marginBottom: 15,
};

const registerBtn = {
  width: "100%",

  padding: 16,

  border: "none",

  borderRadius: 12,

  background: "#334155",

  color: "white",

  fontWeight: "bold",
};

export default LoginPage;
