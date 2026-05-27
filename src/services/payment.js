export const createPayment = async (
  cart,

  total,
) => {
  const response = await fetch(
    "https://smart-vending-machine-production.up.railway.app/payment",

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
