import axios from "axios";
import React from "react";

const BACKEND_URL = "http://localhost:4000";

function PayButton({ cartItems }) {
  console.log(cartItems);
  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.post(
        `${BACKEND_URL}/stripe/create-checkout-session`,
        {
          cartItems,
        },
        config
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
      <button className="btn mt-5  w-100  btn-danger " onClick={() => handleCheckout()}>
        Checkout
      </button>
    </>
  );
}

export default PayButton;
