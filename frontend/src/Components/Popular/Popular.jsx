import React, { useEffect, useState } from "react";
import "./Popular.css";
import Item from "../Item/Item";

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/popularinwomen")
      .then((response) => response.json())
      .then((data) => setPopularProducts(data));
  }, []);
  return (
    <div className="popular">
      <h1>Hàng Bán Chạy</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => {
          console.log(popularProducts);

          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
