import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";
const ListProduct = () => {
  const [allproduct, setAllProduct] = useState([]);
  const fetchInfo = async () => {
    await fetch("http://localhost:8080/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllProduct(data);
      });
  };
  useEffect(() => {
    fetchInfo();
  }, []);
  const remove_product = async (id) => {
    await fetch("http://localhost:8080/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };

  return (
    <div className="list-product">
      <h1>Danh Sách Sản Phẩm</h1>
      <div className="listproduct-format-main">
        <p>Sản phẩm</p>
        <p>Tên</p>
        <p>Giá cũ</p>
        <p>Giá mới</p>
        <p>Loại sản phẩm</p>
        <p>Xóa</p>
      </div>
      <div className="listproduct-allproduct">
        <hr />
        {allproduct.map((product, id) => {
          return (
            <>
              <div
                key={id}
                className="listproduct-format-main listproduct-format"
              >
                <img
                  className="listproduct-product-icon"
                  src={product.image}
                  alt=""
                />
                <p>{product.name}</p>
                <p>{product.old_price} VNĐ</p>
                <p>{product.new_price} VNĐ</p>
                <p>{product.category}</p>
                <img
                  onClick={() => {
                    remove_product(product.id);
                  }}
                  className="listproduct-remove-icon"
                  src={cross_icon}
                  alt=""
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
