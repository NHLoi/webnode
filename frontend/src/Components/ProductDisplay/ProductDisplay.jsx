import React from "react";
import "./ProductDisplay.css";
import star_icon from "../Asset/star_icon.png";
import star_dull_icon from "../Asset/star_dull_icon.png";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  //sửa
  // Kiểm tra xem product có tồn tại không trước khi truy cập các thuộc tính của nó
  if (!product) {
    return <div>Loading...</div>; // hoặc trả về một phần tử UI khác tùy thuộc vào trường hợp cụ thể
  }
  //sửa
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
        </div>
        <div className="productdisplay-right-price">
          <div className="productdisplay-right-price-old">
            {product.old_price} VNĐ
          </div>
          <div className="productdisplay-right-price-new">
            {product.new_price} VNĐ
          </div>
        </div>
        <div className="productdisplay-right-description">Mô tả</div>
        <div className="productdisplay-right-size">
          <h1>Chọn Size</h1>
          <div className="productdisplay-right-sizes">
            <div>1M</div>
            <div>1M2</div>
            <div>1M4</div>
            <div>1M6</div>
            <div>1M8</div>
          </div>
        </div>
        <button
          onClick={() => {
            addToCart(product.id);
          }}
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default ProductDisplay;
