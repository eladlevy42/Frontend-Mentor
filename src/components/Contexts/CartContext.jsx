import axios from "axios";
import React, { useState, createContext, useContext, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartAmount, setCartAmount] = useState(0);

  async function getCartAmount() {
    let count = 0;
    cart.forEach((item) => {
      count += item.amount;
    });
    setCartAmount(count);
  }
  async function getItems() {
    try {
      const { data } = await axios.get("http://localhost:8001/cart");
      setCart(data);
    } catch (err) {
      console.log(err);
    }
  }

  const addItem = async (item) => {
    const cartIndex = cart.findIndex((cartItem) => {
      return cartItem.name == item.name;
    });

    if (cartIndex == -1) {
      let newItem = {
        name: item.name,
        image: item.image,
        categpry: item.category,
        price: item.price,
        totalPrice: item.price,
        amount: 1,
      };

      try {
        const { data } = await axios.post(
          "http://localhost:8001/cart",
          newItem
        );
        newItem = data;

        setCart((prevItems) => [...prevItems, newItem]);
      } catch (err) {
        console.log(err);
      }
    } else {
      const newItem = cart[cartIndex];
      newItem.amount = parseInt(newItem.amount) + 1;
      newItem.totalPrice += newItem.price;
      const newCart = cart;
      newCart[cartIndex] = newItem;
      setCart(newCart);
      try {
        await axios.put(`http://localhost:8001/cart/${newItem.id}`, newItem);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const removeItem = async (itemId) => {
    setCart((prevItems) => prevItems.filter((item) => item.id !== itemId));
    try {
      await axios.delete(`http://localhost:8001/cart/${itemId}`);
    } catch (err) {
      console.log(err);
    }
  };
  const removeOneItem = async (item) => {
    const cartIndex = cart.findIndex((cartItem) => cartItem.name === item.name);
    if (cartIndex !== -1) {
      const newItem = { ...cart[cartIndex] };
      if (newItem.amount > 1) {
        newItem.amount = parseInt(newItem.amount) - 1;
        newItem.totalPrice -= newItem.price;
        const newCart = [...cart];
        newCart[cartIndex] = newItem;
        setCart(newCart);
        try {
          await axios.put(`http://localhost:8001/cart/${newItem.id}`, newItem);
        } catch (err) {
          console.log(err);
        }
      } else {
        const newCart = cart.filter((_, index) => index !== cartIndex);
        setCart(newCart);
        try {
          await axios.delete(`http://localhost:8001/cart/${newItem.id}`);
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      console.log("Item not found in cart");
    }
  };

  const clearCart = async () => {
    try {
      //couldnt find another way withoud sending multiple http requests.
      //i hate json server
      cart.forEach((item) => {
        removeItem(item.id);
      });
      setCart([]);
    } catch (err) {
      console.log("Error clearing cart:", err);
    }
  };

  function getTotalPrice() {
    let count = 0;
    cart.forEach((item) => {
      count += item.totalPrice;
    });
    return count.toFixed(2);
  }
  function isInCart(item) {
    if (
      cart.findIndex((cartItem) => {
        return item.name == cartItem.name;
      }) == -1
    ) {
      return false;
    }
    return true;
  }
  function getItemAmount(item) {
    for (let cartItem of cart) {
      if (cartItem.name === item.name) {
        return cartItem.amount;
      }
    }
    return 0;
  }
  useEffect(() => {
    getItems();
    getCartAmount();
  }, [cart]);
  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        cartAmount,
        getTotalPrice,
        isInCart,
        getItemAmount,
        removeOneItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
