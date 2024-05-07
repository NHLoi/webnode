import React from "react";
import "./Breadcrum.css";
import arrow_icon from "../Asset/breadcrum_arrow.png";

const Breadcrum = (props) => {
  const { product } = props;
  //sửa
  if (!product) {
    return null; // Trả về null nếu product không tồn tại
  }
  //sửa
  return (
    <div className="breadcrum">
      HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" />{" "}
      {product.category} <img src={arrow_icon} alt="" /> {product.name}
    </div>
  );
};

export default Breadcrum;
