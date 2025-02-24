const AdminCategory = require('../model/catSchema');
const upload = require('../middleware/multer');
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

module.exports.updateCategoryPage = async (req, res) => {
    const data = await AdminCategory.findById(req.query.id);
    res.render("updateCategory", { data });
}

module.exports.deleteCategory = async (req, res) => {
    await AdminCategory.findByIdAndDelete(req.query.id).then((data) => {
      res.redirect("/viewCat");
    })
  }

module.exports.updateCategory = async (req, res) => {
    let img = "";
    console.log("Updating category with ID:", req.body.id); // Log the ID being passed
    let singleData = await AdminCategory.findById(req.body.id); // Use AdminCategory model
    if (!singleData) {
        console.log("Category not found for ID:", req.body.id); // Log if category not found
        return res.status(404).send("Category not found");
    }
    req.file ? img = req.file.path : img = singleData.image;
    req.file && fs.unlinkSync(singleData.image);
    req.body.image = img;
    let data = await AdminCategory.findByIdAndUpdate(req.body.id, req.body); // Use AdminCategory model
    data && res.redirect("/viewCat");
}