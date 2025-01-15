const express=require("express");
const port=1009;
const path = require("path");
const db=require("./config/db");
const app = express()
app.set("view engine","ejs");

app.use(express.urlencoded());
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use("/",require("./routes/route"))

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`server started at http://localhost:${port}`);
    }
})
