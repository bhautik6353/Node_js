
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/Api");
const db = mongoose.connection;
db.once("open",(err)=>{
    err?console.log(err):console.log("MongoDb Connected");
})
module.exports = mongoose;