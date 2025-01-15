const schema = require('../model/schema');
const fs = require("fs");

module.exports.bookmyshow= async (req, res) => {
    let data = await schema.find({});
    res.render('bookmyshow', { data });
};

module.exports.AddPage = async (req, res) => {
    let data = schema.find({});
    res.render('adddata');
};

module.exports.AddData = async (req, res) => {
    req.body.image = req.file.path;
    let data = await schema.create(req.body);
    data && res.redirect('/');
};

module.exports.DeleteData = async (req, res) => {
    let singleData = await schema.findById(req.query.id);
    fs.unlinkSync(singleData.image);
    let data = await schema.findByIdAndDelete(req.query.id);
    data && res.redirect('/');
};

module.exports.EditPage = async (req, res) => {
    let data = await schema.findById(req.query.id);
    data && res.render('editdata', { data });
};

module.exports.UpdateData = async (req, res) => {
    let img = "";
    let singleData = await schema.findById(req.body.id);
    req.file ? (img = req.file.path) : (img = singleData.image);
    req.file && fs.unlinkSync(singleData.image);
    req.body.image = img;
    let data = await schema.findByIdAndUpdate(req.body.id, req.body);
    data && res.redirect("/");
};
