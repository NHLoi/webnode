import React, { useContext, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Asset/cart_cross_icon.png";

export const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);

  const [invoice, setInvoice] = useState(null);

  const generateInvoice = () => {
    const items = all_product.filter((product) => cartItems[product.id] > 0);
    const invoiceContent = items.map((item) => ({
      name: item.name,
      quantity: cartItems[item.id],
      price: item.new_price * cartItems[item.id],
    }));
    setInvoice(invoiceContent);
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Sản Phẩm</p>
        <p>Tên sản phẩm</p>
        <p>Giá</p>
        <p>Số lượng</p>
        <p>Tổng cộng</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              {" "}
              {/* Thêm key vào đây */}
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>{e.new_price} VNĐ</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>{e.new_price * cartItems[e.id]} VNĐ</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Giỏ hàng</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Số tiền</p>
              <p>{getTotalCartAmount()} VNĐ</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Giảm giá</p>
              <p>Chưa thiết kế mã giảm</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Tổng thanh toán</h3>
              <h3>{getTotalCartAmount()} VNĐ</h3>
            </div>
          </div>
          <button onClick={generateInvoice}>Thanh Toán</button>
        </div>
      </div>
      {invoice && (
        <div className="invoice">
          <h2>Hóa Đơn</h2>
          {invoice.map((item, index) => (
            <div key={index}>
              <p>
                {item.name} - Số lượng: {item.quantity} - Thành tiền:{" "}
                {item.price} VNĐ
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartItems;
