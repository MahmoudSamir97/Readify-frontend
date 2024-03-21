import axios from "axios";
import React from "react";

const BACKEND_URL = "http://localhost:4000";

function PayButton({ cartItems }) {
  const handleCheckout = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/stripe/create-checkout-session`,
        {
          cartItems,
          userId: "65eb54a619af94c1bf635889",
        }
      );
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <button className="btn btn-primary mt-5" onClick={() => handleCheckout()}>
        Checkout
      </button>
    </>
  );
}

export default PayButton;
