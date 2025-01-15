const express=require("express");
const port=1008;
const app=express();

app.set("view engine","ejs");

app.use(express.urlencoded());
let Booklist=[];

app.post("/addData",(req,res)=>{
    req.body.id=String(Date.now());
    Booklist.push(req.body);
    res.redirect("/");
});

app.get("/deleteData",(req,res)=>{
    let deleteRecord=Booklist.filter((e)=>e.id !== req.query.id);
    Booklist=deleteRecord;
    res.redirect("/");
});

app.get("/editData/:id",(req,res)=>{
    let singledata=Booklist.find((item)=>item.id==req.params.id);
    res.render("edit",{singledata})
})

app.post("/updatedata",(req,res)=>{
    Booklist.map((e,i)=>{
        if(e.id==req.body.id){
            (e.id==req.body.id),
            (e.name=req.body.name),
            (e.Author=req.body.Author),
            (e.Price=req.body.Price),
            (e.Date=req.body.Date)
        }else{
            e;
        }
    });
    res.redirect("/");
})

app.get("/",(req,res)=>{
    res.render("Index",{Booklist})
});




app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Server is running on port "+port);
    }
})