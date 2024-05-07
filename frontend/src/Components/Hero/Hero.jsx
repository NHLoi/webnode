import React from "react";
import "./Hero.css";
import hero_image from "../Asset/hero_image.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>Nệm Kim Nga</h2>
        <div>
          <p>Giấc Ngủ Ngon</p>
          <p>Cho Mọi Nhà</p>
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
};

export default Hero;
