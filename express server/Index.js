const express=require("express");
const port=1009;

const app=express();

app.set("view engine","ejs");

const list=[
    {
        "id":"1","name":"jeet","Age":"18"
    },
    {
        "id":"2","name":"bk","Age":"15"
    },
    {
        "id":"3","name":"jk","Age":"19"
    },
    {
        "id":"4","name":"kp","Age":"20"
    },
    {
        "id":"5","name":"nk","Age":"22"
    }
]

app.get("/",(req,res)=>{
    res.render("Index",{list})
})


app.listen(port,(err)=>{
    err ? console.log(err):console.log("server started on port:" + port);
})