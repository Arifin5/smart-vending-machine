export const createPayment = async (
  cart,

  total,
) => {
  const response = await fetch(
    "http://192.168.1.8:5001/payment",

    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        cart,

        total,
      }),
    },
  );

  return response.json();
};
