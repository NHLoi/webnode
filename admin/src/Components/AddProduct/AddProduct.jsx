import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "giuong",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
    const maxSize = 10 * 1024; // 10KB in bytes
    const allowedTypes = ["image/webp", "image/png", "image/jpeg"];

    if (file) {
      if (file.size > maxSize) {
        alert("File size exceeds the limit of 10KB");
        e.target.value = null; // Clear the file input value
      } else if (!allowedTypes.includes(file.type)) {
        alert("Only webp, png, or jpg files are allowed");
        e.target.value = null; // Clear the file input value
      } else {
        setImage(file);
      }
    }
  };
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);
    await fetch("http://localhost:8080/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });
    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch("http://localhost:8080/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.success) {
            alert("Đã Thêm");
          } else {
            alert("Thất Bại");
          }
        });
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Tên Sản Phẩm</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Nhập vào"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Giá cũ</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="number"
            name="old_price"
            placeholder="Nhập"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Giá giảm</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="number"
            name="new_price"
            placeholder="Nhập"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Loại Sản Phẩm</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="nem">Nệm</option>
          <option value="giuong">Giường</option>
          <option value="drap">Drap</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumnail-img"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          accept=".webp, .png, .jpg"
          hidden
        />
      </div>
      <button
        onClick={() => {
          Add_Product();
        }}
        className="addproduct-btn"
      >
        Thêm
      </button>
    </div>
  );
};

export default AddProduct;
