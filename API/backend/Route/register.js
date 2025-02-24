const express=require('express');
const route=express.Router();
const ctl=require('../Controller/registerCtl');
const auth=require("../Middeleware/jwt");

route.post('/register',ctl.register);
route.post('/login',ctl.login);

route.use(auth);

module.exports=route;

