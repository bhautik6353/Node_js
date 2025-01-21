const express = require("express");
const route = express.Router();
const passport = require("passport");
const ctl = require("../Controller/ctl");
const multer = require("../Middleware/Multer");

route.get("/", ctl.login);
route.get("/logout", ctl.logout);
route.post("/userlogin",passport.authenticate("local", { failureRedirect: "/" }),ctl.userlogin);
route.get("/dashboard", passport.checkAuth, ctl.index);
route.get("/addAdmin",passport.checkAuth, ctl.addAdmin);
route.get("/viewAdmin", passport.checkAuth, ctl.viewAdmin);
route.post("/addAdmin", multer, ctl.addAdminData);
route.get("/deleteAdmin", multer,ctl.deleteAdmin);
route.get("/editAdmin", ctl.editAdmin);
route.post("/updateAdmin", multer, ctl.updateAdmin);

module.exports = route;