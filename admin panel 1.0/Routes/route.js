const express = require("express");
const route = express.Router();
const ctl = require('../Controller/clt');
const multer = require('../middleware/multer');
const passport = require("../middleware/passport");

route.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/dashboard");
    } else {
        ctl.login(req, res);
    }
});

route.post("/login", 
    passport.authenticate('local', { failureRedirect: '/' }),
    ctl.userLogin);
route.get("/profile",ctl.profile)    
route.get("/logout" , ctl.logout);
route.get("/dashboard",passport.checkAuth, ctl.admin);
route.get("/viewAdmin", passport.checkAuth, ctl.viewAdmin);
route.get("/addAdmin",passport.checkAuth, ctl.addAdmin);
route.post("/addAdmin", multer, ctl.addAdminData);
route.get("/deleteAdmin" ,passport.checkAuth, ctl.deleteAdmin);
route.get("/updateAdminPage",passport.checkAuth, ctl.updateAdminPage);
route.post("/updateAdmin", multer, ctl.updateAdmin);
route.get("/updatepass",passport.checkAuth,ctl.changepass)
route.post("/updatepassword",passport.checkAuth,ctl.updatepassword)

route.post("/recoverPass", ctl.recoverPass);
route.post("/verifyPass", ctl.verifyPass);

module.exports = route;