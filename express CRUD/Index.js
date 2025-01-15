const express=require("express");
const port=1008;

const app=express();


app.set("view engine","ejs");

app.use(express.urlencoded());
let list=[];

app.post("/addData",(req,res)=>{
    req.body.id=String(Date.now());
    list.push(req.body);
    res.redirect("/");
});

app.get("/deleteData",(req,res)=>{
    let deleteRecord=list.filter((e)=>e.id !== req.query.id);
    list=deleteRecord;
    res.redirect("/");
});

app.get("/editData/:id",(req,res)=>{
    let singledata=list.find((item)=>item.id==req.params.id);
    res.render("edit",{singledata})
})

app.post("/updatedata",(req,res)=>{
    list.map((e,i)=>{
        if(e.id==req.body.id){
            (e.id==req.body.id),
            (e.name=req.body.name),
            (e.subject=req.body.subject),
            (e.age=req.body.age)
        }else{
            e;
        }
    });
    res.redirect("/");
})

app.get("/",(req,res)=>{
    res.render("Index",{list})
});


app.listen(port,(err)=>{
    err ? console.log(err):console.log("server started on port:" + port);
});