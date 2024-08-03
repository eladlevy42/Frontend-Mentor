import React, { useState } from "react";
import Modal from "./Modal";
import { useCart } from "../Contexts/CartContext";

function ConfirmOrderBtn() {
  const [isVisible, setVisible] = useState(false);
  const { cart, clearCart } = useCart();

  return (
    <>
      <Modal
        isVisible={isVisible}
        onClose={() => {
          setVisible(false);
        }}
      />
      <button
        onClick={() => {
          setVisible(true);
        }}
        className="bg-red w-8/12 my-2 py-3  sm:px-10 md:px-1  xl:px-3 mx-auto bg-red-500 rounded-full text-white transition duration-200 ease-in-out"
      >
        Confirm Order
      </button>
    </>
  );
}

export default ConfirmOrderBtn;
