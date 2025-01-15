const mongoose=require("mongoose");
const Schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    Language:{
        type:String,
        required:true
    },
    Type:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
    }
})

const firstschema=mongoose.model("movielist",Schema);

module.exports=firstschema;