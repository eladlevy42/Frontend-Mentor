import React, { useEffect, useState } from "react";
import AddToCartBtn from "./ui/AddToCartBtn";
import { useCart } from "./Contexts/CartContext";

function Item({ item }) {
  const { isInCart, cart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  useEffect(() => {
    setIsAdded(isInCart(item));
  }, [cart]);
  return (
    <div className="flex flex-col max-w-fit m-0">
      <div className="flex flex-col md:justify-center  m-0 ">
        <img src={item.image.desktop} className=" w-64  rounded-md" alt="" />
        <AddToCartBtn item={item} isAdded={isAdded} />
      </div>{" "}
      <p className=" text-rose-300 ">{item.category}</p>
      <p className="font-bold">{item.name}</p>
      <p className="font-bold text-red">${item.price}</p>
    </div>
  );
}

export default Item;
