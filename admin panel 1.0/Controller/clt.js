const fs = require("fs");
const upload = require('../middleware/multer');
const Admin = require('../model/firstSchema');
const path = require('path');
const mailer=require("../middleware/mailer")


module.exports.profile=(req,res)=>{
  res.render("profile")
}
module.exports.login = (req, res) => {
  res.render("login");
}

module.exports.logout = (req,res) =>{
  req.session.destroy();
  res.redirect("/");
}

module.exports.userLogin = async (req, res) => {

    req.flash("success","Login Successfully...")

 

  console.log("Login attempt for email:", req.body.email);
 
    let admin = await Admin.findOne({ email: req.body.email });
    
    admin ? res.redirect("/dashboard") : res.redirect("/");
    
}

module.exports.admin = (req, res) => {
   res.render("dashboard") 
};  
module.exports.addAdmin = (req, res) => {
   res.render('addAdmin') 
};

module.exports.addAdminData = async (req, res) => {
  // console.log(req.body);
  // console.log(req.file);

  req.body.image = req.file.path;
  await Admin.create(req.body).then((data) => {
    res.redirect("/addAdmin");
  });
};

module.exports.viewAdmin = async (req, res) => {
 
    const data = await Admin.find();
    res.render("viewAdmin", { data });
  
};

module.exports.deleteAdmin = async (req, res) => {
  await Admin.findByIdAndDelete(req.query.id).then((data) => {
    res.redirect("/viewAdmin");
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

module.exports.changepass=(req,res)=>{
  res.render("updatepass")
}

module.exports.updatepassword=async(req,res)=>{
  let user=req.user;
  console.log(user)

  if(user.passWord==req.body.oldpass){
  if(req.body.oldpass!=req.body.newpass){
  if(req.body.newpass==req.body.confirompass){
    let admin=await Admin.findByIdAndUpdate(user.id,{passWord:req.body.newpass})
    admin && res.redirect("/logout")
  }else{
    console.log("password not match")
  }
  }else{
    console.log("old and new password are same");
  }
  }else{
    console.log("Old Password is Wrong");
  }

}


module.exports.recoverPass = async (req, res) => {
  let admin = await Admin.findOne({ email: req.body.email });

  if (!admin) {
      console.log("Admin not found for email:", req.body.email);
      return res.redirect("/");
  }

  let otp = Math.floor(Math.random() * 100000 + 400000);
  console.log("Generated OTP:", otp);

  mailer.sendotp(req.body.email, otp);

  req.session.otp = otp;
  req.session.adminData = admin;

  // res.redirect("/");
  res.render("verifyPass")
};

module.exports.verifyPass = async (req, res) => {
  const { otp, newpass, confirompass } = req.body;

  if (otp != req.session.otp) {
      console.log("Invalid OTP");
      return res.redirect("/verifyPass");
  }

  if (newpass !== confirompass) {
      console.log("Passwords do not match");
      return res.redirect("/verifyPass");
  }

  let admin = await Admin.findById(req.session.adminData._id);
  if (!admin) {
      console.log("Admin not found");
      return res.redirect("/verifyPass");
  }

  admin.passWord = newpass;
  await admin.save();

  console.log("Password updated successfully");
  res.redirect("/");
};