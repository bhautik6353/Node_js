const express = require("express");
const route = express.Router();
const ctl = require('../Controller/ctl');
const multer = require("../Middleware/Multer");

route.get("/",ctl.login);
route.post("/userlogin",ctl.userlogin);
route.get("/dashboard",ctl.index);
route.get("/logout",ctl.logout);
route.get("/addAdmin",ctl.addAdmin);
route.get("/viewAdmin",ctl.viewAdmin);
route.post("/addAdmin",multer,ctl.addAdminData);
route.get("/deleteAdmin",ctl.deleteAdmin);
route.get("/editAdmin",ctl.editAdmin);
route.post("/updateAdmin",multer,ctl.updateAdmin);
module.exports = route;