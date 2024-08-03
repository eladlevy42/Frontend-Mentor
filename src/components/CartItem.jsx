import React from "react";
import Xmark from "./Svgs/Xmark";
import { useCart } from "./Contexts/CartContext";

function CartItem({ item }) {
  const { removeItem } = useCart();
  return (
    <div className="m-7 pb-8 border-b-2 border-rose-100">
      <h1 className="font-bold">{item.name}</h1>
      <div className="flex justify-between">
        <div>
          <span className="text-red font-bold m-2">{`${item.amount}x `}</span>
          <span className="text-rose-400 m-2">{`@$${item.price.toFixed(
            2
          )} `}</span>
          <span className="font-bold text-rose-500 m-2">{`$${item.totalPrice.toFixed(
            2
          )}`}</span>
        </div>
        <button
          onClick={() => removeItem(item.id)}
          className="group rounded-full border-rose-300 border-2 p-1 hover:border-rose-500"
        >
          <Xmark />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
