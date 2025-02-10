const express = require("express");
const route = express.Router();
const multer = require('../Middleware/Multer');
const subctl = require('../Controller/SubCtl');
const passport=require("../Middleware/Passport");

route.get("/addSubcat",passport.checkAuth, subctl.addSubCat);
route.post("/addSubCat",passport.checkAuth, multer, subctl.addSubCategory);
route.get("/viewSubCat",passport.checkAuth, subctl.viewSubCat);
route.get("/deleteSubCat",passport.checkAuth, subctl.deleteSubCat);



module.exports = route;