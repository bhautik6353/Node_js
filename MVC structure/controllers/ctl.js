const Schema = require("../model/firstschema");
const fs=require("fs")



module.exports.firstpage=async (req,res)=>{
    let data=await Schema.find({})
    res.render("index",{data})
}

module.exports.addData=async(req,res)=>{
    req.body.image=req.file.path;
    await Schema.create(req.body)
    .then(data=>{
        res.redirect("/")
    })
}

module.exports.editData=async(req,res)=>{
    let data=await Schema.findById(req.query.id)
    res.render("edit",{data})
}

module.exports.updatedata=async(req,res)=>{
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
}

module.exports.deleteData=async(req,res)=>{
           let singledata=await Schema.findById(req.query.id);
           fs.unlinkSync(singledata.image)
           await Schema.findByIdAndDelete(req.query.id)
           .then((data)=>{
               res.redirect("/")
           })
}
