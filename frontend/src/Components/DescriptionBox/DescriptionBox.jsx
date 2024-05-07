import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Mô tả</div>
        <div className="descriptionbox-nav-box fade">Bình luận</div>
      </div>
      <div className="descriptionbox-escription">
        <p>Mô tả</p>
      </div>
    </div>
  );
};

export default DescriptionBox;
