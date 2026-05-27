import React from "react";

function Cart({
  cart,

  checkout,

  loading,

  removeCart,
}) {
  const isMobile = window.innerWidth < 768;

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),

    0,
  );

  return (
    <div
      style={{
        background: "#1e293b",

        padding: isMobile ? 20 : 30,

        borderRadius: 25,

        marginTop: 35,
      }}
    >
      <h2
        style={{
          fontSize: isMobile ? 24 : 34,
        }}
      >
        🛒 Keranjang
      </h2>

      {cart.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",

            justifyContent: "space-between",

            alignItems: "center",

            padding: "15px 0",

            borderBottom: "1px solid #334155",
          }}
        >
          <div>
            <h3>{item.name}</h3>

            <p>Rp {item.price}</p>
          </div>

          <button
            onClick={() => removeCart(index)}
            style={{
              background: "#dc2626",

              border: "none",

              color: "white",

              padding: "10px 15px",

              borderRadius: 12,
            }}
          >
            Hapus
          </button>
        </div>
      ))}

      <h2
        style={{
          marginTop: 25,
        }}
      >
        Total: Rp {total}
      </h2>

      <button
        onClick={checkout}
        disabled={loading}
        style={{
          width: "100%",

          marginTop: 25,

          padding: isMobile ? 16 : 22,

          border: "none",

          borderRadius: 18,

          background: "#2563eb",

          color: "white",

          fontWeight: "bold",

          fontSize: isMobile ? 18 : 24,
        }}
      >
        {loading ? "Loading..." : "💳 BAYAR QRIS"}
      </button>
    </div>
  );
}

export default Cart;
