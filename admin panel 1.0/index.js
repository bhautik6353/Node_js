const express = require("express");
const port = 1009;
const app = express();
const db = require("./config/db");
const path = require("path");
const cookie=require("cookie-parser")
const passport=require("./middleware/passport")
const session = require("express-session");

app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use(cookie());
app.use(session({
    name:"local",
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 100 *100*60 },

})
)
app.use(passport.initialize());
app.use(passport.session());


app.use("/",require('./Routes/route'));

app.listen(port, (err)=>{
err?console.log(err):console.log(`http://localhost:${port}`);  
});