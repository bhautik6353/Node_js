const mongoose = require("mongoose");
const schema = mongoose.Schema({
    subCatName: {
        type: String,
        required: true
    },
    CategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categorie",
        required: true,
    },
});

let SubcatSchema = mongoose.model("Subcategory", schema);
module.exports = SubcatSchema;