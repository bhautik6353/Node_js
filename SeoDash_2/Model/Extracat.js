const mongoose = require("mongoose");
const schema = mongoose.Schema({
    ExtraCatName: {
        type: String,
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
    }
});

let ExtracatSchema = mongoose.model("Extracategory", schema);
module.exports = ExtracatSchema;