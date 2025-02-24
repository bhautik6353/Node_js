const express = require('express');
const managerRoute = express.Router();
const managerController = require('../controller/managerController');
const authentication = require('../middleware/jwt');
const checkAdmin = require('../middleware/checkAdminOrManager');
const Multer = require('../middleware/multer');

managerRoute.post("/register", authentication, Multer, managerController.managerRegister);
managerRoute.post("/login", managerController.managerLogin);
managerRoute.get("/list", authentication, checkAdmin, managerController.managerList);
managerRoute.get("/profile", authentication, managerController.managerProfile);
managerRoute.post("/changePassword", authentication, managerController.managerChangePassword);
managerRoute.post("/forgotPassword", managerController.forgotPassword);
managerRoute.post("/resetPassword", managerController.resetPassword);
managerRoute.delete("/delete", authentication, checkAdmin, managerController.deleteManager);
managerRoute.put("/update", authentication, Multer, managerController.updateManager);

module.exports = managerRoute;