const schemaCat = require('../model/catSchema');
const subschema = require('../model/SubSchema');
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

module.exports.updateSubCat = async (req, res) => {
    const data = await subschema.findById(req.query.id);
    const categories = await schemaCat.find({});
    res.render("updateSub", { data, categories });
};

module.exports.updateSubCategory = async (req, res) => {
    let img = "";
    let singleData = await subschema.findById(req.body.id);
    if (req.file) {
        img = req.file.path;
        if (singleData.image) {
     
        }
    } else {
        img = singleData.image;
    }
    req.body.image = img;
    req.body.hobby = Array.isArray(req.body.hobby) ? req.body.hobby : [req.body.hobby];
    let data = await subschema.findByIdAndUpdate(req.body.id, req.body);
    data && res.redirect("/viewSubCat");
};
