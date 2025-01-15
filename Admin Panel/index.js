const express = require("express");
const port = 1009;
const app = express();
const db = require("./config/db");
const path = require("path");
const cookies=require("cookie-parser")

app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use(cookies());


app.use("/",require('./Routes/route'));

app.listen(port, (err)=>{
err?console.log(err):console.log(`http://localhost:${port}`);  
});