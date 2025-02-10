const mongoose = require("mongoose");
const schema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productprice: {
        type: Number,
        required: true
    },
    CategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categorie",
        required: true,
    },
    SubCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
        required: true,
    },
    ExtracategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Extracategory",
        required: true,
    }
});

let productSchema = mongoose.model("product_detail", schema);
module.exports = productSchema;