import React from "react";
import "./Footer.css";
import instagram_icon from "../Asset/instagram_icon.png";
import pintester_icon from "../Asset/pintester_icon.png";
import whatsapp_icon from "../Asset/whatsapp_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <hr />
      <ul className="footer-links">
        <li>
          Nệm Khim Nga
          <hr />
          ĐC: Bình Chánh, Tân Uyên, Bình Dương
          <hr />
          SĐT: 0704788773
          <hr />
          Email: nguyenhuuloi2000k@gmail.com
        </li>
        <li>
          Điều khoảng & chính sách <br />
          Chính sách vận chuyển & giao nhận <br />
          Chính sách trả góp <br />
          Chính sách khách hàng thân thiết
        </li>
        <li>
          Hướng dẫn mua <br />
          Cách chọn nệm phù hợp <br />
          Cách chọn gối phù hợp <br />
          Dịch vụ vệ sinh nệm <br />
          Chuyện về nệm
        </li>
      </ul>

      <div className="footer-socail-icon">
        <div className="footer-icons-container">
          <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={pintester_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={whatsapp_icon} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Nệm Kim Nga ♥ Nguyễn Hữu Lợi</p>
      </div>
    </div>
  );
};

export default Footer;
