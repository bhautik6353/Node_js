const schemaCat = require('../model/catSchema');
const subschema = require('../model/SubSchema');
const ExtracatSchema = require('../model/Extracat');
const productSchema = require('../model/productSchema');

const fs = require('fs');
const path = require('path');

module.exports.addproduct = async (req, res) => {
    const record = await schemaCat.find({});
    const data = await subschema.find({}).populate('CategoryId');
    const extracatdata=await ExtracatSchema.find({}).populate('SubCategoryId');
    res.render("addProduct", { data, record,extracatdata });
};

module.exports.addproductdetail = async (req, res) => {
    if (req.file) {
        req.body.image = req.file.path;
    }
    const subCategory = await subschema.findById(req.body.SubCategoryId).populate('CategoryId');
    if (subCategory) {
        req.body.CategoryId = subCategory.CategoryId._id;
    }
    await productSchema.create(req.body).then(() => {
        res.redirect("/viewProduct");
    });
};

module.exports.viewproducdetail = async (req, res) => {
    await productSchema.find({})
    .populate({
        path: "ExtracategoryId",
        populate: [
            { path: "SubCategoryId" },
            { path: "CategoryId" }
        ]
    })
        .then((data) => {
            res.render("viewProduct", { data });
            console.log(data);
        });
        
};

module.exports.deleteproduct = async (req, res) => {
    
        let singleData = await productSchema.findById(req.query.id);
        if (singleData && singleData.image) {
            fs.unlinkSync(singleData.image);
        }
        await productSchema.findByIdAndDelete(req.query.id);
        res.redirect("/viewProduct");

    
};

module.exports.updateproduct = async (req, res) => {
    let SubCatagory = await subschema.find({}).populate('CategoryId');
    let singleData = await ExtracatSchema.findById(req.query.id).populate('SubCategoryId');
    let ProductData = await productSchema.findById(req.query.id).populate('ExtracategoryId');
    let ExtracategoryId = await ExtracatSchema.find({}); // Add this line to fetch ExtracategoryId
    res.render("updateProduuct", { SubCatagory, singleData, ProductData, ExtracategoryId });
    console.log(singleData);
};

module.exports.updateProductdetail = async (req, res) => {
    const { id, productName,productprice, CategoryId, SubCategoryId,ExtracategoryId } = req.body;

    let updateData = {
        productName,
        productprice,
        CategoryId,
        SubCategoryId,
        ExtracategoryId
    };

    if (req.file) {
        updateData.image = req.file.path;
    }

    await productSchema.findByIdAndUpdate(id, updateData);
    res.redirect("/viewProduct");
    console.log(updateData)
};
