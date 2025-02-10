const schemaCat = require('../Model/catSchema');
const subschema = require('../Model/SubSchema');
const fs = require('fs');

module.exports.addSubCat = async (req, res) => {
    await schemaCat.find({}).then((data) => {
        res.render("addSubCat", { data }); // Ensure the correct view is rendered and data is passed
    });
};

module.exports.addSubCategory = async (req, res) => {
    if (req.file) {
        req.body.image = req.file.path;
    }
    await subschema.create(req.body).then(() => {
        res.redirect("/viewSubCat");
    });
};

module.exports.viewSubCat = async (req, res) => {
    const data = await subschema.find().populate('CategoryId').then((data) => {
        res.render("viewsubCat", { data });
    });
};

module.exports.deleteSubCat = async (req, res) => {
    await subschema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect("/viewSubCat");
    });
};