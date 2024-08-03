import axios from "axios";
import React, { useEffect, useState } from "react";
import Item from "./Item";

function ItemList() {
  const [items, setItems] = useState([]);

  async function getItems() {
    try {
      const { data } = await axios.get("http://localhost:8001/items");
      setItems(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 justify-items-center">
      {items.map((item) => {
        return <Item key={item.name} item={item} />;
      })}
    </div>
  );
}

export default ItemList;
