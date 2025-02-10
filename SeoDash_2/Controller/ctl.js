const fs = require("fs");
const schema = require("../Model/adminSchema");
const path = require("path");
const mailer = require("../Middleware/mailer");

module.exports.login = (req, res) => {
  res.render("login");
};
module.exports.userlogin = async (req, res) => {
  
  res.redirect("/dashboard");
};
module.exports.logout = async (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
module.exports.index = (req, res) => {
  res.render("index");
};
module.exports.addAdmin = (req, res) => {
 res.render("addAdmin");
};
module.exports.addAdminData = async (req, res) => {
  req.body.image = req.file.path;
  await schema.create(req.body).then((data) => {
    res.redirect("/viewAdmin");
  });
};
module.exports.viewAdmin = async (req, res) => {
    let data = await schema.find();
    res.render("viewAdmin", { data })
};
module.exports.deleteAdmin = async (req, res) => {
  let singleData = await schema.findById(req.query.id);
  fs.unlinkSync(singleData.image);
  let data = await schema.findByIdAndDelete(req.query.id).then((data) => {
    res.redirect("/viewAdmin");
  });
};
module.exports.editAdmin = async (req, res) => {
  let singleData = await schema.findById(req.query.id);
  res.render("updateAdmin", { singleData });
};
module.exports.updateAdmin = async (req, res) => {
  let img = "";
  let singleData = await schema.findById(req.body.id);
  console.log(singleData);
  !req.file ? (img = singleData.image) : (img = req.file.path);
  req.file && fs.unlinkSync(singleData.image);
  req.body.image = img;
  let data = await schema.findByIdAndUpdate(req.body.id, req.body);
  data && res.redirect("/viewAdmin");
};


///update password

module.exports.changepass=(req,res)=>{
  res.render("updatepass")
}

module.exports.updatepassword=async(req,res)=>{
  let user=req.user;
  console.log(user)

  if(user.password==req.body.oldpass){
  if(req.body.oldpass!=req.body.newpass){
  if(req.body.newpass==req.body.confirompass){
    let admin=await schema.findByIdAndUpdate(user.id,{password:req.body.newpass})
    admin && res.redirect("/")
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

module.exports.forgotpass=(req,res)=>{
  res.render("otpchapass")
}



//otp throw changer pass

module.exports.recoverPass = async (req, res) => {
  let admin = await schema.findOne({ email: req.body.email });

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

  let admin = await schema.findById(req.session.adminData._id);
  if (!admin) {
      console.log("Admin not found");
      return res.redirect("/verifyPass");
  }

  admin.password = newpass;
  await admin.save();

  console.log("Password updated successfully");
  res.redirect("/");
};
