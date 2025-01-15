const express = require("express");
const route = express.Router();
const ctl = require('../Controller/clt');
const multer = require('../middleware/multer');

route.get("/",ctl.login);
route.get("/logout",ctl.logout)
route.post("/login",ctl.userlogin)
route.get("/admin", ctl.admin);
route.get("/viewAdmin", ctl.viewAdmin);
route.get("/addAdmin", ctl.addAdmin);
route.post("/addAdmin", multer, ctl.addAdminData);
route.get("/deleteAdmin", ctl.deleteAdmin);
route.get("/dataFill" , ctl.dataFill);
route.get("/updateAdminPage", ctl.updateAdminPage);
route.post("/updateAdmin", multer, ctl.updateAdmin);

module.exports = route;