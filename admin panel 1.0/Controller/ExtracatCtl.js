const schemaCat = require('../model/catSchema');
const subschema = require('../model/SubSchema');
const ExtracatSchema = require('../model/Extracat');

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
    let singleData = await ExtracatSchema.findById(req.query.id);
    fs.unlinkSync(singleData.image);
    await ExtracatSchema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect("/viewExtraCat");
    });
};

module.exports.updateExtraCat = async (req, res) => {
    let catagory = await schemaCat.find({});
    let SubCatagory = await subschema.find({});
    let singleData = await ExtracatSchema.findById(req.query.id);
    res.render("updateExtraCat", { catagory, SubCatagory, singleData });
    console.log(singleData);
};

module.exports.updateExtraCategory = async (req, res) => {
    const { id, ExtraCatName, CategoryId, SubCategoryId } = req.body;

    let updateData = {
        ExtraCatName,
        CategoryId,
        SubCategoryId
    };

    if (req.file) {
        updateData.image = req.file.path;
    }

    await ExtracatSchema.findByIdAndUpdate(id, updateData);
    res.redirect("/viewExtraCat");
};
