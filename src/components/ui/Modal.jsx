import React from "react";
import { useCart } from "../Contexts/CartContext";
import OrderConfirmed from "../Svgs/OrderConfirmed";

function Modal({ isVisible, onClose }) {
  const { cart, getTotalPrice, clearCart } = useCart();
  if (!isVisible) return null;

  function newOrder() {
    onClose();
    clearCart();
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-end md:items-center justify-center z-50"
    >
      <div
        className="relative bg-white p-6 md:p-10 rounded-t-lg md:rounded-lg shadow-lg w-full md:w-10/12 lg:w-8/12 xl:w-6/12 h-10/12 md:h-auto overflow-y-auto"
        onClick={(ev) => ev.stopPropagation()}
      >
        <div className="flex flex-col justify-center mt-4">
          <OrderConfirmed />
          <h1 className="font-bold text-2xl md:text-3xl my-2">
            Order Confirmed
          </h1>
          <h2 className="text-rose-300 font-bold">
            We hope you enjoy your food!
          </h2>
          <div className="bg-rose-100 my-7 py-3 flex flex-col justify-center align-middle rounded-md">
            {cart.map((item) => (
              <div key={item.name} className="flex px-7 pt-7 items-center">
                <img
                  src={item.image.thumbnail}
                  alt={item.name}
                  className="w-14 h-14 rounded-md"
                />
                <div className="ml-4 flex justify-between w-full">
                  <div>
                    <h1 className="m-2">{item.name}</h1>
                    <span className="text-red font-bold m-2">{`${item.amount}x `}</span>
                    <span className="text-rose-400 m-2">{`@$${item.price.toFixed(
                      2
                    )} `}</span>
                  </div>
                  <span className="font-bold text-rose-500 mx-2 mt-2">{`$${item.totalPrice.toFixed(
                    2
                  )}`}</span>
                </div>
              </div>
            ))}
            <div className="flex justify-between m-10 mb-6">
              <span className="text-rose-500">Order Total</span>
              <span className="font-bold text-2xl">{`$${getTotalPrice()}`}</span>
            </div>
          </div>
          <button
            onClick={newOrder}
            className="w-full sm:w-auto py-3 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 mx-auto bg-red-500 rounded-full bg-rose-600 text-white transition duration-200 ease-in-out"
          >
            Start New Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
