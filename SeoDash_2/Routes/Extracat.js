const express = require("express");
const route = express.Router();
const multer = require('../Middleware/Multer');
const subctl = require('../Controller/ExtracatCtl');
const passport=require("../Middleware/Passport");


route.get("/addExtraCat",passport.checkAuth, subctl.addExtraCat);
route.post("/addExtraCat",passport.checkAuth, multer, subctl.addExtraCategory);
route.get("/viewExtraCat",passport.checkAuth, subctl.viewExtraCat);
route.get("/deleteExtraCat",passport.checkAuth, subctl.deleteExtraCat);



module.exports = route;