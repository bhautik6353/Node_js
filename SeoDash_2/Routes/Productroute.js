const express = require("express");
const route = express.Router();
const multer = require('../Middleware/Multer');
const productctl = require('../Controller/ProductCtl');
const passport=require("../Middleware/Passport");


route.get("/addproduct",passport.checkAuth, productctl.addproduct);
route.post("/addproduct",passport.checkAuth, multer, productctl.addproductdetail);
route.get("/viewProduct",passport.checkAuth, productctl.viewproducdetail);
route.get("/deleteproduct", passport.checkAuth,productctl.deleteproduct);



module.exports = route;