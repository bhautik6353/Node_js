const express = require('express');
const route = express.Router();
const ctl = require('../Controller/Ctl');
const authCtl = require('../Controller/AuthCtl'); // Assuming you have an AuthCtl for authentication
const upload = require("../Middeleware/multer");


route.post('/addAdmin', upload, ctl.addAdmin);
route.get('/getAdmin', ctl.getAdmin);
route.delete('/deleteAdmin', ctl.deleteAdmin);
route.put('/updateAdmin', upload, ctl.updateAdmin);
route.post('/register', authCtl.register); // Add register route
route.post('/login', authCtl.login); // Add login route

module.exports = route;

