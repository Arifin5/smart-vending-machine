import React from "react";

import axios from "axios";

import { FaMoneyBillWave, FaBoxOpen, FaShoppingCart } from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function DashboardPage() {
  // ======================
  // STATE
  // ======================

  const [dashboard, setDashboard] = React.useState({
    totalSales: 0,

    totalTransactions: 0,

    totalProducts: 0,

    salesData: [],

    bestSeller: [],

    lowSeller: [],
  });

  // ======================
  // LOAD DASHBOARD
  // ======================

  React.useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await axios.get("https://smart-vending-machine-production.up.railway.app/dashboard");

      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ======================
  // UI
  // ======================

  return (
    <div
      style={{
        background: "#020617",

        minHeight: "100vh",

        color: "white",

        padding: 40,
      }}
    >
      {/* HEADER */}

      <div
        style={{
          marginBottom: 40,
        }}
      >
        <h1
          style={{
            fontSize: 42,

            marginBottom: 10,
          }}
        >
          SALES DASHBOARD
        </h1>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          Smart Vending Machine Analytics
        </p>
      </div>

      {/* SUMMARY CARD */}

      <div
        style={{
          display: "grid",

          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",

          gap: 25,

          marginBottom: 40,
        }}
      >
        {/* SALES */}

        <div style={cardStyle}>
          <div>
            <p style={labelStyle}>TOTAL SALES (1 BULAN)</p>

            <h2>Rp {dashboard.totalSales}</h2>
          </div>

          <FaMoneyBillWave size={50} />
        </div>

        {/* TRANSACTION */}

        <div style={cardStyle}>
          <div>
            <p style={labelStyle}>TRANSAKSI</p>

            <h2>{dashboard.totalTransactions}</h2>
          </div>

          <FaShoppingCart size={50} />
        </div>

        {/* PRODUCTS */}

        <div style={cardStyle}>
          <div>
            <p style={labelStyle}>TOTAL PRODUK</p>

            <h2>{dashboard.totalProducts}</h2>
          </div>

          <FaBoxOpen size={50} />
        </div>
      </div>

      {/* BEST & LOW SELLER */}

      <div
        style={{
          display: "grid",

          gridTemplateColumns: "repeat(auto-fit,minmax(350px,1fr))",

          gap: 25,

          marginBottom: 40,
        }}
      >
        {/* BEST SELLER */}

        <div
          style={{
            background: "#1e293b",

            padding: 30,

            borderRadius: 25,

            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          }}
        >
          <h2
            style={{
              marginBottom: 25,
            }}
          >
            🔥 Produk Terlaris
          </h2>

          {dashboard.bestSeller?.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",

                justifyContent: "space-between",

                marginBottom: 15,

                background: "#0f172a",

                padding: "12px 15px",

                borderRadius: 12,
              }}
            >
              <span>{item.product_name}</span>

              <strong>{item.totalSold}</strong>
            </div>
          ))}
        </div>

        {/* LOW SELLER */}

        <div
          style={{
            background: "#1e293b",

            padding: 30,

            borderRadius: 25,

            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          }}
        >
          <h2
            style={{
              marginBottom: 25,
            }}
          >
            📉 Kurang Diminati
          </h2>

          {dashboard.lowSeller?.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",

                justifyContent: "space-between",

                marginBottom: 15,

                background: "#0f172a",

                padding: "12px 15px",

                borderRadius: 12,
              }}
            >
              <span>{item.product_name}</span>

              <strong>{item.totalSold}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* SALES CHART */}

      <div
        style={{
          background: "#1e293b",

          padding: 30,

          borderRadius: 25,

          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        <h2
          style={{
            marginBottom: 30,
          }}
        >
          Sales Analytics (1 Bulan)
        </h2>

        <div
          style={{
            width: "100%",
            height: 400,
          }}
        >
          <ResponsiveContainer>
            <BarChart data={dashboard.salesData}>
              <XAxis dataKey="name" stroke="#fff" />

              <YAxis stroke="#fff" />

              <Tooltip />

              <Bar dataKey="sales" fill="#3b82f6" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ======================
// STYLES
// ======================

const cardStyle = {
  background: "linear-gradient(145deg,#1e293b,#0f172a)",

  padding: 30,

  borderRadius: 25,

  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",

  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
};

const labelStyle = {
  color: "#94a3b8",

  marginBottom: 10,

  fontSize: 14,
};

export default DashboardPage;
