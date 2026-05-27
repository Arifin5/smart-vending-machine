const BASE_URL = "http://192.168.1.8:5001/products";

export const getProducts = async () => {
  const response = await fetch(BASE_URL);

  return response.json();
};

export const addProduct = async (product) => {
  const response = await fetch(
    BASE_URL,

    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(product),
    },
  );

  return response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(
    `${BASE_URL}/${id}`,

    {
      method: "DELETE",
    },
  );

  return response.json();
};

export const updateProduct = async (id, product) => {
  const response = await fetch(
    `${BASE_URL}/${id}`,

    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(product),
    },
  );

  return response.json();
};
