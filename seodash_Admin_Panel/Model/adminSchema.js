const mongoose = require("mongoose");
const { type } = require("os");
const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  image:{
    type: String,
    require: true,
  },
});

const adminSchema = mongoose.model("Admin2",schema);
module.exports = adminSchema;