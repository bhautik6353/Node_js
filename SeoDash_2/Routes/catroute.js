const express = require("express");
const route = express.Router();
const multer = require('../Middleware/Multer');
const catCtl = require('../Controller/catCtl'); // Import the controller
const passport = require("../Middleware/Passport");

route.get("/addCat", passport.checkAuth, catCtl.showCat);
route.post("/addCat", passport.checkAuth, multer, catCtl.addCat); // Use multer middleware for file upload
route.get("/viewCat", passport.checkAuth, catCtl.viewCat);
route.get("/deleteCategory", passport.checkAuth, catCtl.deleteCategory); // Ensure deleteCategory is a valid function

module.exports = route;