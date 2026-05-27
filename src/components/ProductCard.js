import React from "react";

function ProductCard({
  product,

  addToCart,
}) {
  const isMobile = window.innerWidth < 768;

  const isTablet = window.innerWidth < 1200;

  const soldOut = product.stock <= 0;

  return (
    <div
      style={{
        background: soldOut ? "#334155" : "#1e293b",

        borderRadius: 22,

        overflow: "hidden",

        opacity: soldOut ? 0.6 : 1,
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",

          height: isMobile ? 180 : isTablet ? 220 : 260,

          objectFit: "cover",
        }}
      />

      <div
        style={{
          padding: 20,
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? 18 : 24,
          }}
        >
          {product.name}
        </h2>

        <h3>Rp {product.price}</h3>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          Stock: {product.stock}
        </p>

        <button
          disabled={soldOut}
          onClick={() => addToCart(product)}
          style={{
            width: "100%",

            padding: isMobile ? 14 : 18,

            border: "none",

            borderRadius: 14,

            background: soldOut ? "#64748b" : "#2563eb",

            color: "white",

            fontWeight: "bold",

            fontSize: isMobile ? 16 : 20,
          }}
        >
          {soldOut ? "SOLD OUT" : "TAMBAH"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
