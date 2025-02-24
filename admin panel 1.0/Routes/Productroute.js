const express = require("express");
const route = express.Router();
const multer = require('../middleware/multer');
const productctl = require('../Controller/ProductCtl');
const passport=require("../middleware/passport");


route.get("/addproduct",passport.checkAuth, productctl.addproduct);
route.post("/addproduct",passport.checkAuth, multer, productctl.addproductdetail);
route.get("/viewProduct",passport.checkAuth, productctl.viewproducdetail);
route.get("/deleteproduct", passport.checkAuth,productctl.deleteproduct);
route.get("/updateProduct",passport.checkAuth, productctl.updateproduct); // Ensure the correct route is used
route.post("/UpdateProduct", passport.checkAuth,multer, productctl.updateProductdetail); // Ensure the correct route is used


module.exports = route;