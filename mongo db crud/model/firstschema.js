const mongoose=require("mongoose");
const Schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    Author:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
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

const firstschema=mongoose.model("booklist",Schema);

module.exports=firstschema;