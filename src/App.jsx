import React from "react";
import ItemList from "./components/ItemList";
import YourCart from "./components/YourCart";

export default function App() {
  return (
    <div className="grid grid-cols-1 bg-rose-50 sm:grid-cols-1 md:grid-cols-10 lg:grid-cols-10 xl:grid-cols-10 2xl:grid-cols-10">
      <div id="left" className="m-7 col-span-10 md:col-span-7">
        <h1 className="text-3xl font-bold my-5">Desserts</h1>
        <ItemList />
      </div>
      <div id="right" className="mx-7 my-10 col-span-10 md:col-span-3">
        <YourCart />
      </div>
    </div>
  );
}
