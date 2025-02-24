const express = require("express");
const port = 5173;
const app = express();
const db = require("./config/db");
const path = require("path");
const cookie = require('cookie-parser');
const session = require('express-session');
const passport = require("./middleware/passport");
const flash=require("connect-flash")
const flashconnect=require("./middleware/flash")
const route = require("./Routes/route")


app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use("/public",express.static(path.join(__dirname,"public")));

app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use(cookie());


app.use(session({
    name : "local",
    secret: 'no secret',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge : 100 * 100 * 60 }
  }));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.AuthenticateUser);
app.use(flash());
app.use(flashconnect.setFlash)

app.use("/",require('./Routes/route'));
app.use("/",require("./Routes/catroute"));
app.use("/",require("./Routes/SubCatroute"))
app.use("/",require("./Routes/Extracat"))
app.use("/",require("./Routes/Productroute"))

app.listen(port, (err)=>{
err?console.log(err):console.log(`http://localhost:${port}`);  
});