const express = require("express");
const route = express.Router();
const multer = require('../middleware/multer');
const catCtl = require('../Controller/catCtl'); // Import the controller
const passport=require("../middleware/passport");


route.get("/addCat",passport.checkAuth, catCtl.showCat);
route.post("/addCat",passport.checkAuth, multer, catCtl.addCat); // Use multer middleware for file upload
route.get("/addCat",passport.checkAuth, catCtl.showCat);
route.get("/viewCat",passport.checkAuth, catCtl.viewCat);
route.get("/updateCategoryPage" ,passport.checkAuth, catCtl.updateCategoryPage);
route.post("/updateCategory" ,passport.checkAuth, multer, catCtl.updateCategory); // Use multer middleware for file upload
route.get("/deleteCategory" ,passport.checkAuth,multer, catCtl.deleteCategory); // Use multer middleware for file upload

module.exports = route;