import React from "react";
import { useCart } from "./Contexts/CartContext";
import CartList from "./CartList";

function YourCart() {
  const { cart, cartAmount } = useCart();
  return (
    <div className="bg-white py-10 pt-7 rounded-md shadow-md">
      <h1 className="font-bold text-rose-600 text-2xl mx-7 mb-7">
        Your Cart ({cartAmount})
      </h1>
      <CartList />
    </div>
  );
}

export default YourCart;
