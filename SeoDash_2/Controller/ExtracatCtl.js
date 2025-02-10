const schemaCat = require('../Model/catSchema');
const subschema = require('../Model/SubSchema');
const ExtracatSchema = require('../Model/Extracat');

const fs = require('fs');

module.exports.addExtraCat = async (req, res) => {
    const record = await schemaCat.find({});
    const data = await subschema.find({}).populate('CategoryId');
    res.render("addExtraCatagory", { data, record });
};

module.exports.addExtraCategory = async (req, res) => {
    if (req.file) {
        req.body.image = req.file.path;
    }
    const subCategory = await subschema.findById(req.body.SubCategoryId).populate('CategoryId');
    if (subCategory) {
        req.body.CategoryId = subCategory.CategoryId._id;
    }
    await ExtracatSchema.create(req.body).then(() => {
        res.redirect("/viewExtraCat");
    });
};

module.exports.viewExtraCat = async (req, res) => {
    await ExtracatSchema.find({})
        .populate({
            path: "SubCategoryId",
            populate: { path: "CategoryId" }
        })
        .then((data) => {
            res.render("viewExtraCat", { data });
        });
};

module.exports.deleteExtraCat = async (req, res) => {

    await ExtracatSchema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect("/viewExtraCat");
    });
};
