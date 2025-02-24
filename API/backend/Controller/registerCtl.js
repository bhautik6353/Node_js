const schema = require("../Model/register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports.register = async(req, res) => {
    let admin= await schema.findOne({email:req.body.email});
    if(admin){
        return res.status(400).json({message:"Admin already exist"});
    }
    req.body.password = await bcrypt.hash(req.body.password,10);
    await schema.create(req.body).then(()=>{
        res.status(200).json({message:"Admin Added Successfully"});

    })
}

module.exports.login = async(req, res) => {
    let admin = await schema.findOne({email:req.body.email});
    if(!admin){
        return res.status(400).json({message:"Admin not found"});
    }
    let isValid = await bcrypt.compare(req.body.password,admin.password);
    if(!isValid){
        return res.status(400).json({message:"Invalid Password"});
    }
    let token = jwt.sign({adminData:admin},"secretkey",{expiresIn:"1h"});
    res.status(200).json({message:"Admin Logged in Successfully",token:token});

    }