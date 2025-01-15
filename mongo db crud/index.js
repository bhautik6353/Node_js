const express=require("express");
const port=1009;
const path = require("path");
const db=require("./config/db");
const Schema = require("./model/firstschema")
const app = express()
const multer=require("multer");
const fs=require("fs")
app.set("view engine","ejs");

app.use(express.urlencoded());
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
const Storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now());
    }
})

const upload=multer({storage:Storage}).single("image");




app.post("/addData",upload,async(req,res)=>{
    req.body.image=req.file.path;

    await Schema.create(req.body)
    .then(data=>{
        res.redirect("/")
    })
});

app.get("/editData",async(req,res)=>{
    let data=await Schema.findById(req.query.id)
    res.render("edit",{data})
})

app.post("/updatedata",upload,async(req,res)=>{
    let img="";
    let singledata=await Schema.findById(req.body.id);
    if(req.file){
        (img=req.file.path);
    }
    else{
        (img=singledata.image);
    }
    req.file && fs.unlinkSync(singledata.image);
    req.body.image=img;
    console.log(img)
    await Schema.findByIdAndUpdate(req.body.id,req.body)
    .then((data)=>{
        res.redirect("/")
    })
})

app.get("/deleteData",async(req,res)=>{
    let singledata=await Schema.findById(req.query.id);
    fs.unlinkSync(singledata.image)
    await Schema.findByIdAndDelete(req.query.id)
    .then((data)=>{
        res.redirect("/")
    })
})



app.get("/",async(req,res)=>{
    let data=await Schema.find({})
    res.render("index",{data})
});




app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`server started at http://localhost:${port}`);
    }
})