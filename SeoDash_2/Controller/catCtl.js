const AdminCategory = require('../Model/catSchema');
const upload = require('../Middleware/Multer');
const fs = require("fs");

module.exports.showCat = (req, res) => {
    res.render("addCat");
}

module.exports.addCat = async (req, res) => {
    if (req.file) {
        req.body.image = req.file.path; // Ensure the image field is set correctly
    }
    await AdminCategory.create(req.body).then((data) => {
        res.redirect("/addCat");
    })

    console.log(req.file);
    console.log(req.body);
}

module.exports.viewCat = async (req, res) => {
    const data = await AdminCategory.find();
    res.render("viewCat", { data });
}

module.exports.deleteCategory = async (req, res) => {
    const { id } = req.query;
    await AdminCategory.findByIdAndDelete(id);
    res.redirect("/viewCat");
}