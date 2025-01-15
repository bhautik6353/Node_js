const fs = require("fs");
const upload = require('../middleware/multer');
const Admin = require('../model/firstSchema');
const path = require('path');

module.exports.login=(req,res)=>{
  res.render("login")
}
module.exports.logout=(req,res)=>{
  res.clearCookie("adminData");
  res.redirect("/");
}

module.exports.userlogin=async(req,res)=>{
  let user=await Admin.findOne({email:req.body.email})
  if(user){
    if(user.passWord==req.body.passWord){
      res.cookie("adminData",user)
      res.redirect("/admin")
    }else{
      res.redirect("/")
    }
  }else{
    res.redirect("/")
  }
}

module.exports.admin = (req, res) => {
  req.cookies.adminData ? res.render("admin") : res.redirect("/");

};
module.exports.addAdmin = (req, res) => {
  req.cookies.adminData ? res.render("addAdmin") : res.redirect("/");
};

module.exports.addAdminData = async (req, res) => {
  console.log(req.body);
  console.log(req.file); 
  req.body.image = req.file.path;
  await Admin.create(req.body).then((data) => {
    res.redirect("/admin");
  });
};

module.exports.viewAdmin = async (req, res) => {
   if(req.cookies.adminData){
    const data = await Admin.find();
    res.render("viewAdmin", { data });
   }else{
    res.redirect("/");
   }
};

module.exports.deleteAdmin = async (req , res) => {
  await Admin.findByIdAndDelete(req.query.id).then((data)=>{
    res.redirect("/viewadmin");
})
}

module.exports.dataFill = async (req , res) => {
  await Admin.findById(res.query.id).then((data)=>{
    res.render("updateAdmin");
  })
}

module.exports.updateAdminPage = async (req, res) => {
  const data = await Admin.findById(req.query.id);
  res.render("updateAdmin", { data });
};

module.exports.updateAdmin = async (req, res) => {
    let img = "";
    let singleData = await Admin.findById(req.body.id);
    req.file ? img = req.file.path : img = singleData.image;
    req.file && fs.unlinkSync(singleData.image);
    req.body.image = img;
    let data = await Admin.findByIdAndUpdate(req.body.id, req.body);
    data && res.redirect("/viewAdmin");
};