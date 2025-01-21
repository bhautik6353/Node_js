const express = require("express");
const port = 1008;
const app = express();
const db = require("./Config/db");
const path = require("path");
const cookie = require("cookie-parser");
const passport = require("./Middleware/passport");
const session = require("express-session");


app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.use(cookie());
app.use(session({
    name:"local",
    secret: 'abc',
    resave: true,
    saveUninitialized: false,
    cookie: { Maxage: 100*100*60}
}));
app.use(passport.initialize());
app.use(passport.session());


app.use("/",require("./Routes/route"));

app.listen(port,(err)=>{
    err?console.log(err):console.log(`Server Started: http://localhost:${port}`);    
});