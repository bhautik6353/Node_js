const express=require("express");
const port=1009;
const path=require("path")

const app=express();

app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{
    res.render("Index")
})


app.listen(port,(err)=>{
    err ? console.log(err):console.log("server started on port:" + port);
})