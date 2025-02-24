const express = require("express");
const route = express.Router();
const multer = require('../middleware/multer');
const subctl = require('../Controller/SubCtl');
const passport=require("../middleware/passport");

route.get("/addSubcat",passport.checkAuth, subctl.addSubCat);
route.post("/addSubCat",passport.checkAuth, multer, subctl.addSubCategory);
route.get("/viewSubCat",passport.checkAuth, subctl.viewSubCat);
route.get("/deleteSubCat",passport.checkAuth, subctl.deleteSubCat);
route.get("/updateSubCat",passport.checkAuth, subctl.updateSubCat); // Ensure the correct route is used
route.post("/updateSubCategory",passport.checkAuth, multer, subctl.updateSubCategory);


module.exports = route;