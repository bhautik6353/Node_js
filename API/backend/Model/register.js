const mongoose = require("mongoose");
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
  language: {
    type: String,
    require: true,
  },


});

const adminSchema = mongoose.model("Register",schema);
module.exports = adminSchema;