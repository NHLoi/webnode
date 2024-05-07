import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import navProfile from "../../assets/anhthe.png";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>Nệm Kim Nga</p>
      </div>
      <img src={navProfile} className="nav-profile" alt="" />
    </div>
  );
};

export default Navbar;
