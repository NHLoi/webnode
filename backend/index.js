const express = require("express");
const port = 8080;
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");
app.use(express.json());
app.use(cors());
//kết nối data base
mongoose.connect(
  "mongodb+srv://nhloi:123@cluster0.urrtznf.mongodb.net/e-commerce"
);
// tạo api

app.get("/", (req, res) => {
  res.send("Express App is Running hello");
});

//Image storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });
//creating upload endpoint for images
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Định nghĩa schema cho sản phẩm
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  new_price: {
    type: Number,
    require: true,
  },
  old_price: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avilable: {
    type: Boolean,
    default: true,
  },
});
//APT thêm sản phẩm
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  // Tạo một thể hiện mới của mô hình Product với dữ liệu từ phần thân yêu cầu
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    // Các trường bổ sung có thể được thêm ở đây nếu cần
  });
  // Ghi nhật ký dữ liệu sản phẩm cho mục đích gỡ lỗi
  console.log(product);
  // Lưu sản phẩm vào cơ sở dữ liệu
  await product.save();
  // Ghi nhật ký thông báo cho biết sản phẩm đã được lưu
  console.log("Đã lưu");
  // Gửi một phản hồi JSON trở lại cho máy khách chỉ ra rằng quá trình thêm sản phẩm thành công
  res.json({
    success: true,
    name: req.body.name, // Tùy chọn, bạn có thể bao gồm một số dữ liệu trong phản hồi
  });
});

//APT xóa sản phẩm
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Đã xóa sản phẩm");
  res.json({
    success: true,
    name: req.body.name,
  });
});
//API lấy tất cả sản phẩm
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Product Fetched");
  res.send(products);
});
//Tạo schema kiểm duyệt người dùng
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
//creating endpoind for registering the user
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      error: "existing user found with same email address",
    });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});
//
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Lỗi Password" });
    }
  } else {
    res.json({ success: false, errors: "Lỗi Email" });
  }
});
//tạo kết nối cho newcollection data
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("NewCollection Fetched");
  res.send(newcollection);
});
//tạo kết nối cho Popular in women(sửa lại category)
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "giuong" });
  let popular_in_women = products.slice(0, 4);
  console.log("Popular in women Fetched");
  res.send(popular_in_women);
});
//tạo middelware cho fetch người dùng
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ errors: "please authenticate using a valid token" });
    }
  }
};

//tạo kết nối cho cart
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("added", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Đã Thêm vào giõ hàng");
});
//tạo kết nối cho xóa sản phẩm trong cart
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Đã Xóa khỏi giõ hàng");
});
//tạo kết nối cho dữ liệu cart
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("GetCart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});
app.listen(port, (error) => {
  if (!error) {
    console.log("Máy chủ đang chạy tại " + port);
  } else {
    console.log("ERROR" + error);
  }
});
