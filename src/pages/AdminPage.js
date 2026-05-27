import React from "react";

import axios from "axios";

import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

function AdminPage() {
  // ======================
  // STATE
  // ======================

  const [products, setProducts] = React.useState([]);

  const [editingId, setEditingId] = React.useState(null);

  const [form, setForm] = React.useState({
    name: "",

    price: "",

    stock: "",

    category: "drink",

    image: "",

    slot_code: "",
  });

  // ======================
  // LOAD PRODUCTS
  // ======================

  React.useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const response = await axios.get("https://smart-vending-machine-production.up.railway.app/products");

    setProducts(response.data);
  };

  // ======================
  // HANDLE INPUT
  // ======================

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  // ======================
  // ADD PRODUCT
  // ======================

  const addProduct = async () => {
    if (!form.name || !form.price || !form.stock || !form.slot_code) {
      alert("Lengkapi data");

      return;
    }

    await axios.post(
      "http://192.168.1.8:5001/products",

      form,
    );

    setForm({
      name: "",

      price: "",

      stock: "",

      category: "drink",

      image: "",

      slot_code: "",
    });

    loadProducts();
  };

  // ======================
  // DELETE PRODUCT
  // ======================

  const deleteProduct = async (id) => {
    if (!window.confirm("Hapus produk?")) return;

    await axios.delete(`http://192.168.1.8:5001/products/${id}`);

    loadProducts();
  };

  // ======================
  // EDIT PRODUCT
  // ======================

  const editProduct = (product) => {
    setEditingId(product.id);

    setForm({
      name: product.name,

      price: product.price,

      stock: product.stock,

      category: product.category,

      image: product.image,

      slot_code: product.slot_code,
    });
  };

  // ======================
  // UPDATE PRODUCT
  // ======================

  const updateProduct = async () => {
    await axios.put(
      `http://192.168.1.8:5001/products/${editingId}`,

      form,
    );

    setEditingId(null);

    setForm({
      name: "",

      price: "",

      stock: "",

      category: "drink",

      image: "",

      slot_code: "",
    });

    loadProducts();
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
          ADMIN DASHBOARD
        </h1>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          Smart Vending Machine Control Panel
        </p>
      </div>

      {/* FORM */}

      <div
        style={{
          background: "#1e293b",

          padding: 30,

          borderRadius: 25,

          marginBottom: 40,

          display: "grid",

          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",

          gap: 20,

          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Nama Produk"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="number"
          name="price"
          placeholder="Harga"
          value={form.price}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="image"
          placeholder="URL Gambar"
          value={form.image}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="slot_code"
          placeholder="Slot Code (A1)"
          value={form.slot_code}
          onChange={handleChange}
          style={inputStyle}
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="drink">Minuman</option>

          <option value="food">Makanan</option>
        </select>

        {/* BUTTON */}

        {editingId ? (
          <button onClick={updateProduct} style={buttonStyle}>
            <FaEdit /> UPDATE
          </button>
        ) : (
          <button onClick={addProduct} style={buttonStyle}>
            <FaPlus /> TAMBAH
          </button>
        )}
      </div>

      {/* PRODUCT LIST */}

      <div
        style={{
          display: "grid",

          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",

          gap: 25,
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: "#1e293b",

              borderRadius: 25,

              overflow: "hidden",

              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",

                height: 220,

                objectFit: "cover",
              }}
            />

            <div
              style={{
                padding: 20,
              }}
            >
              <h2>{product.name}</h2>

              <p>Rp {product.price}</p>

              <p>Stock: {product.stock}</p>

              <p>Category: {product.category}</p>

              <p>Slot: {product.slot_code}</p>

              {/* BUTTON */}

              <div
                style={{
                  display: "flex",

                  gap: 10,

                  marginTop: 20,
                }}
              >
                <button onClick={() => editProduct(product)} style={editBtn}>
                  <FaEdit />
                </button>

                <button
                  onClick={() => deleteProduct(product.id)}
                  style={deleteBtn}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ======================
// STYLES
// ======================

const inputStyle = {
  padding: 15,

  borderRadius: 12,

  border: "none",

  background: "#0f172a",

  color: "white",

  fontSize: 16,
};

const buttonStyle = {
  padding: 15,

  borderRadius: 12,

  border: "none",

  background: "#2563eb",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer",

  fontSize: 16,
};

const editBtn = {
  flex: 1,

  padding: 12,

  border: "none",

  borderRadius: 10,

  background: "#f59e0b",

  color: "white",

  cursor: "pointer",

  fontSize: 18,
};

const deleteBtn = {
  flex: 1,

  padding: 12,

  border: "none",

  borderRadius: 10,

  background: "#dc2626",

  color: "white",

  cursor: "pointer",

  fontSize: 18,
};

export default AdminPage;
