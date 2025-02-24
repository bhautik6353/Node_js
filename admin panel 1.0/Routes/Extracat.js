const express = require("express");
const route = express.Router();
const multer = require('../middleware/multer');
const subctl = require('../Controller/ExtracatCtl');
const passport=require("../middleware/passport");


route.get("/addExtraCat",passport.checkAuth, subctl.addExtraCat);
route.post("/addExtraCat",passport.checkAuth, multer, subctl.addExtraCategory);
route.get("/viewExtraCat",passport.checkAuth, subctl.viewExtraCat);
route.get("/deleteExtraCat",passport.checkAuth, subctl.deleteExtraCat);
route.get("/updateExtraCat",passport.checkAuth, subctl.updateExtraCat); // Ensure the correct route is used
route.post("/updateExtraCategory",passport.checkAuth, multer, subctl.updateExtraCategory);


module.exports = route;