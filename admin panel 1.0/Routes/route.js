const express = require("express");
const route = express.Router();
const ctl = require('../Controller/clt');
const multer = require('../middleware/multer');
const passport=require("passport")

route.get("/",ctl.login);
route.get("/logout",ctl.logout)
route.post("/login",passport.authenticate('local', {failureRedirect:"/"}), ctl.userlogin)
route.get("/admin",passport.checkauth, ctl.admin);
route.get("/viewAdmin",passport.checkauth, ctl.viewAdmin);
route.get("/addAdmin",passport.checkauth, ctl.addAdmin);
route.post("/addAdmin", multer, ctl.addAdminData);
route.get("/deleteAdmin", ctl.deleteAdmin);
route.get("/dataFill" , ctl.dataFill);
route.get("/updateAdminPage", ctl.updateAdminPage);
route.post("/updateAdmin", multer, ctl.updateAdmin);

module.exports = route;