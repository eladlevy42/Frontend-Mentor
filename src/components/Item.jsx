import React, { useEffect, useState } from "react";
import AddToCartBtn from "./ui/AddToCartBtn";
import { useCart } from "./Contexts/CartContext";

function Item({ item }) {
  const { isInCart, cart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [imageSrc, setImageSrc] = useState(item.image.desktop);

  useEffect(() => {
    setIsAdded(isInCart(item));
  }, [cart]);

  useEffect(() => {
    const updateImageSrc = () => {
      if (window.innerWidth >= 1024) {
        setImageSrc(item.image.desktop);
      } else if (window.innerWidth >= 768) {
        setImageSrc(item.image.tablet);
      } else {
        setImageSrc(item.image.mobile);
      }
    };

    updateImageSrc(); // Initial check
    window.addEventListener("resize", updateImageSrc);

    return () => {
      window.removeEventListener("resize", updateImageSrc);
    };
  }, [item.image]);

  return (
    <div className="flex flex-col max-w-fit m-0">
      <div className="flex flex-col md:justify-center sm:items-center m-0">
        <img
          src={imageSrc}
          className={`w-64 rounded-md ${isAdded ? "border-red border-2" : ""}`}
          alt={item.name}
        />
        <AddToCartBtn item={item} isAdded={isAdded} />
      </div>
      <p className="text-rose-300">{item.category}</p>
      <p className="font-bold">{item.name}</p>
      <p className="font-bold text-red">${item.price}</p>
    </div>
  );
}

export default Item;
