import React from "react";
import AddToCartLogo from "../Svgs/AddToCartLogo";
import { useCart } from "../Contexts/CartContext";
import CircleBtn from "./CircleBtn";

function AddToCartBtn({ item, isAdded }) {
  const { addItem, getItemAmount, removeOneItem } = useCart();

  if (!isAdded) {
    return (
      <button
        onClick={() => addItem(item)}
        className="relative bottom-4 mx-auto font-bold flex items-center justify-center w-4/6 sm:w-5/6  h-12 bg-white border-2 border-rose-500 border-opacity-50 rounded-full hover:text-rose-500 text-xs transition duration-200 ease-in-out px-2 "
      >
        <AddToCartLogo />
        <span className="px-2 sm:block md:hidden lg:block">Add To Cart</span>
      </button>
    );
  } else {
    return (
      <div className="bg-red relative bottom-4 mx-auto font-bold flex items-center justify-between w-4/6 sm:w-5/6 md:w-5/6 lg:w-4/6 h-12 bg-red-500 px-2 rounded-full">
        <CircleBtn
          func={() => removeOneItem(item)}
          symbol={
            <svg
              className="fill-current text-white group-hover:fill-red p-1"
              viewBox="0 0 10 2"
            >
              <path d="M0 .375h10v1.25H0V.375Z" />
            </svg>
          }
        />
        <div className="text-white">{getItemAmount(item)}</div>
        <CircleBtn
          func={() => addItem(item)}
          symbol={
            <svg
              className="fill-white group-hover:fill-red p-1"
              viewBox="0 0 10 10"
            >
              <path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" />
            </svg>
          }
        />
      </div>
    );
  }
}

export default AddToCartBtn;
