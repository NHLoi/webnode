import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../Asset/logo.png";
import cart_icon from "../Asset/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Asset/nav_dropdown.png";
const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();
  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>Nệm Kim Nga</p>
      </div>
      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("Shop");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("nem");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/nem">
            Nệm
          </Link>
          {menu === "nem" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("giuong");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/giuong">
            Giường
          </Link>
          {menu === "giuong" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("drap");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/drap">
            Drap
          </Link>
          {menu === "drap" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
