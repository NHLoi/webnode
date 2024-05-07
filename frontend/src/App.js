import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import nem_benner from "./Components/Asset/banner_nem.jpg";
import giuong_benner from "./Components/Asset/banner_giuong.png";
import drap_benner from "./Components/Asset/banner_drap.jpg";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/nem"
            element={<ShopCategory banner={nem_benner} category="nem" />}
          />
          <Route
            path="/giuong"
            element={<ShopCategory banner={giuong_benner} category="giuong" />}
          />
          <Route
            path="/drap"
            element={<ShopCategory banner={drap_benner} category="drap" />}
          />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
