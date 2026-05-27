import React from "react";

import ProductCard from "../components/ProductCard";

import Cart from "../components/Cart";

import { getProducts } from "../services/product";

import { createPayment } from "../services/payment";

import socket from "../socket";

function CustomerPage() {
  const [products, setProducts] = React.useState([]);

  const [cart, setCart] = React.useState([]);

  const [loading, setLoading] = React.useState(false);

  const [paymentOpen, setPaymentOpen] = React.useState(false);

  const [pendingPopup, setPendingPopup] = React.useState(false);

  const [successPopup, setSuccessPopup] = React.useState(false);

  const [activeTab, setActiveTab] = React.useState("all");

  // ======================
  // RESPONSIVE
  // ======================

  const isMobile = window.innerWidth < 768;

  const isTablet = window.innerWidth < 1200;

  // ======================
  // LOAD PRODUCTS
  // ======================

  React.useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ======================
  // SOCKET
  // ======================

  React.useEffect(() => {
    socket.on(
      "stockUpdated",

      () => {
        loadProducts();
      },
    );

    return () => {
      socket.off("stockUpdated");
    };
  }, []);

  // ======================
  // ADD CART
  // ======================

  const addToCart = (product) => {
    if (product.stock <= 0) {
      return;
    }

    setCart([...cart, product]);
  };

  // ======================
  // REMOVE CART
  // ======================

  const removeCart = (index) => {
    const updated = [...cart];

    updated.splice(index, 1);

    setCart(updated);
  };

  // ======================
  // CHECKOUT
  // ======================

  const checkout = async () => {
    if (paymentOpen) {
      alert("Payment masih berjalan");

      return;
    }

    if (cart.length === 0) {
      alert("Keranjang kosong");

      return;
    }

    try {
      setLoading(true);

      setPaymentOpen(true);

      setPendingPopup(true);

      const total = cart.reduce(
        (sum, item) => sum + Number(item.price),

        0,
      );

      const payment = await createPayment(cart, total);

      window.snap.pay(
        payment.token,

        {
          onSuccess: function () {
            setLoading(false);

            setPaymentOpen(false);

            setPendingPopup(false);

            setSuccessPopup(true);

            setCart([]);

            loadProducts();

            setTimeout(
              () => {
                setSuccessPopup(false);
              },

              3000,
            );
          },

          onError: function () {
            alert("Payment gagal");

            setLoading(false);

            setPaymentOpen(false);

            setPendingPopup(false);
          },

          onClose: function () {
            setLoading(false);

            setPaymentOpen(false);

            setPendingPopup(false);
          },
        },
      );
    } catch (error) {
      console.log(error);

      alert("Payment Error");

      setLoading(false);

      setPaymentOpen(false);

      setPendingPopup(false);
    }
  };

  // ======================
  // FILTER
  // ======================

  const drinks = products.filter((item) => item.category === "drink");

  const foods = products.filter((item) => item.category === "food");

  let filteredProducts = products;

  if (activeTab === "drink") {
    filteredProducts = drinks;
  }

  if (activeTab === "food") {
    filteredProducts = foods;
  }

  // ======================
  // STYLES
  // ======================

  const tabBtn = {
    padding: isMobile ? "14px 20px" : "18px 35px",

    border: "none",

    borderRadius: 18,

    background: "#1e293b",

    color: "white",

    cursor: "pointer",

    fontWeight: "bold",

    fontSize: isMobile ? 16 : 20,
  };

  const activeBtn = {
    ...tabBtn,

    background: "#2563eb",
  };

  const overlayStyle = {
    position: "fixed",

    top: 0,

    left: 0,

    width: "100%",

    height: "100%",

    background: "rgba(0,0,0,0.7)",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    zIndex: 99999,
  };

  const popupStyle = {
    background: "#1e293b",

    padding: isMobile ? "40px 30px" : "70px 90px",

    borderRadius: 35,

    textAlign: "center",

    minWidth: isMobile ? "90%" : 500,
  };

  return (
    <div
      style={{
        background: "#020617",

        minHeight: "100dvh",

        color: "white",

        display: "flex",

        justifyContent: "center",

        padding: isMobile ? 15 : isTablet ? 25 : 40,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1700,
        }}
      >
        {/* HEADER */}

        <div
          style={{
            display: "flex",

            flexDirection: isMobile ? "column" : "row",

            justifyContent: "space-between",

            alignItems: "center",

            gap: 20,

            marginBottom: 35,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: isMobile ? 30 : isTablet ? 42 : 54,

                margin: 0,
              }}
            >
              SMART VENDING MACHINE
            </h1>

            <p
              style={{
                color: "#94a3b8",

                fontSize: isMobile ? 15 : 20,
              }}
            >
              Modern Touchscreen Vending System
            </p>
          </div>

          <div
            style={{
              background: "#1e293b",

              padding: isMobile ? "10px 16px" : "16px 24px",

              borderRadius: 18,

              fontWeight: "bold",

              fontSize: isMobile ? 18 : 24,
            }}
          >
            🛒 {cart.length}
          </div>
        </div>

        {/* TAB */}

        <div
          style={{
            display: "flex",

            flexDirection: isMobile ? "column" : "row",

            gap: 15,

            marginBottom: 35,
          }}
        >
          <button
            onClick={() => setActiveTab("all")}
            style={activeTab === "all" ? activeBtn : tabBtn}
          >
            ALL
          </button>

          <button
            onClick={() => setActiveTab("drink")}
            style={activeTab === "drink" ? activeBtn : tabBtn}
          >
            MINUMAN
          </button>

          <button
            onClick={() => setActiveTab("food")}
            style={activeTab === "food" ? activeBtn : tabBtn}
          >
            MAKANAN
          </button>
        </div>

        {/* PRODUCTS */}

        <div
          style={{
            display: "grid",

            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
                ? "repeat(2,1fr)"
                : "repeat(auto-fit,minmax(280px,1fr))",

            gap: 20,
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>

        {/* CART */}

        <Cart
          cart={cart}
          checkout={checkout}
          loading={loading}
          removeCart={removeCart}
        />
      </div>

      {/* PENDING */}

      {pendingPopup && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <h1
              style={{
                fontSize: isMobile ? 50 : 80,
              }}
            >
              💳
            </h1>

            <h2
              style={{
                fontSize: isMobile ? 28 : 42,
              }}
            >
              Menunggu Pembayaran
            </h2>
          </div>
        </div>
      )}

      {/* SUCCESS */}

      {successPopup && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <h1
              style={{
                fontSize: isMobile ? 50 : 80,
              }}
            >
              ✅
            </h1>

            <h2
              style={{
                fontSize: isMobile ? 28 : 42,
              }}
            >
              Pembayaran Berhasil
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerPage;
