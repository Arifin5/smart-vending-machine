import React from "react";

import AdminPage from "./AdminPage";

import DashboardPage from "./DashboardPage";

import TransactionPage from "./TransactionPage";

function AdminPanel() {
  const [menu, setMenu] = React.useState("dashboard");

  const isMobile = window.innerWidth < 768;

  // ======================
  // PROTECT ADMIN
  // ======================

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  // ======================
  // LOGOUT
  // ======================

  const logout = () => {
    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  return (
    <div
      style={{
        display: "flex",

        flexDirection: isMobile ? "column" : "row",

        minHeight: "100vh",

        background: "#020617",

        color: "white",
      }}
    >
      {/* SIDEBAR */}

      <div
        style={{
          width: isMobile ? "100%" : 280,

          background: "#0f172a",

          padding: 25,

          borderRight: isMobile ? "none" : "1px solid #1e293b",
        }}
      >
        <h1
          style={{
            marginBottom: 30,

            fontSize: isMobile ? 28 : 34,
          }}
        >
          VENDING CMS
        </h1>

        {/* DASHBOARD */}

        <SidebarBtn
          title="Dashboard"
          active={menu === "dashboard"}
          onClick={() => setMenu("dashboard")}
        />

        {/* PRODUCTS */}

        <SidebarBtn
          title="Products"
          active={menu === "products"}
          onClick={() => setMenu("products")}
        />

        {/* TRANSACTIONS */}

        <SidebarBtn
          title="Transactions"
          active={menu === "transactions"}
          onClick={() => setMenu("transactions")}
        />

        {/* LOGOUT */}

        <button
          onClick={logout}
          style={{
            marginTop: 25,

            width: "100%",

            padding: 16,

            border: "none",

            borderRadius: 14,

            background: "#dc2626",

            color: "white",

            fontWeight: "bold",

            cursor: "pointer",

            fontSize: 15,
          }}
        >
          LOGOUT
        </button>
      </div>

      {/* CONTENT */}

      <div
        style={{
          flex: 1,

          overflow: "auto",
        }}
      >
        {menu === "dashboard" && <DashboardPage />}

        {menu === "products" && <AdminPage />}

        {menu === "transactions" && <TransactionPage />}
      </div>
    </div>
  );
}

// ======================
// SIDEBAR BUTTON
// ======================

function SidebarBtn({
  title,

  active,

  onClick,
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",

        padding: 16,

        marginBottom: 15,

        border: "none",

        borderRadius: 14,

        background: active ? "#2563eb" : "#1e293b",

        color: "white",

        textAlign: "left",

        fontSize: 15,

        fontWeight: "bold",

        cursor: "pointer",

        transition: "0.2s",
      }}
    >
      {title}
    </button>
  );
}

export default AdminPanel;
