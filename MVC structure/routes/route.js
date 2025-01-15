const express=require("express");
const route=express.Router();
const ctl=require("../controllers/ctl")
const upload=require("../middleware/multer")

route.get("/",ctl.firstpage)
route.post("/addData",upload,ctl.addData)
route.get("/editData",ctl.editData)
route.post("/updateData",upload,ctl.updatedata)
route.get("/deleteData",ctl.deleteData)

module.exports=route;