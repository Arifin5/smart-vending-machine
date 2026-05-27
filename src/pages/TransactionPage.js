import React from "react";

import axios from "axios";

function TransactionPage() {
  const [transactions, setTransactions] = React.useState([]);

  const [startDate, setStartDate] = React.useState("");

  const [endDate, setEndDate] = React.useState("");

  const isMobile = window.innerWidth < 768;

  // ======================
  // LOAD TRANSACTIONS
  // ======================

  React.useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async (
    customStartDate = startDate,

    customEndDate = endDate,
  ) => {
    try {
      let url = "https://smart-vending-machine-production.up.railway.app/transactions";

      // ======================
      // FILTER DATE
      // ======================

      if (customStartDate && customEndDate) {
        url += `?startDate=${customStartDate}&endDate=${customEndDate}`;
      }

      const response = await axios.get(url);

      console.log(response.data);

      setTransactions(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        background: "#020617",

        minHeight: "100vh",

        color: "white",

        padding: isMobile ? 15 : 30,
      }}
    >
      {/* TITLE */}

      <h1
        style={{
          marginBottom: 20,
        }}
      >
        TRANSACTIONS
      </h1>

      {/* FILTER */}

      <div
        style={{
          display: "flex",

          flexWrap: "wrap",

          gap: 15,

          marginBottom: 25,
        }}
      >
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={inputStyle}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={inputStyle}
        />

        {/* FILTER BUTTON */}

        <button
          onClick={() => loadTransactions(startDate, endDate)}
          style={filterBtn}
        >
          FILTER
        </button>

        {/* RESET BUTTON */}

        <button
          onClick={() => {
            setStartDate("");

            setEndDate("");

            loadTransactions("", "");
          }}
          style={resetBtn}
        >
          RESET
        </button>
      </div>

      {/* TOTAL */}

      <h3
        style={{
          marginBottom: 25,

          color: "#94a3b8",
        }}
      >
        Total: {transactions.length}
      </h3>

      {/* TABLE */}

      {transactions.length === 0 ? (
        <div
          style={{
            background: "#1e293b",

            padding: 30,

            borderRadius: 20,
          }}
        >
          Tidak ada transaksi
        </div>
      ) : (
        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",

              borderCollapse: "collapse",

              background: "#1e293b",

              borderRadius: 20,

              overflow: "hidden",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>ID</th>

                <th style={thStyle}>Product</th>

                <th style={thStyle}>Qty</th>

                <th style={thStyle}>Total</th>

                <th style={thStyle}>Status</th>

                <th style={thStyle}>Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((item) => (
                <tr key={item.id}>
                  <td style={tdStyle}>{item.id}</td>

                  <td style={tdStyle}>{item.product_name}</td>

                  <td style={tdStyle}>{item.quantity}</td>

                  <td style={tdStyle}>Rp {item.total}</td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        background:
                          item.status === "paid" ? "#16a34a" : "#f59e0b",

                        padding: "6px 12px",

                        borderRadius: 10,

                        fontSize: 13,

                        fontWeight: "bold",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    {item.created_at
                      ? new Date(item.created_at).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ======================
// STYLES
// ======================

const inputStyle = {
  padding: 12,

  border: "none",

  borderRadius: 12,

  background: "#1e293b",

  color: "white",

  minWidth: 180,
};

const filterBtn = {
  padding: "12px 20px",

  border: "none",

  borderRadius: 12,

  background: "#2563eb",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer",
};

const resetBtn = {
  padding: "12px 20px",

  border: "none",

  borderRadius: 12,

  background: "#dc2626",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer",
};

const thStyle = {
  padding: 16,

  background: "#2563eb",

  textAlign: "left",

  fontSize: 14,
};

const tdStyle = {
  padding: 16,

  borderBottom: "1px solid #334155",

  fontSize: 14,
};

export default TransactionPage;
