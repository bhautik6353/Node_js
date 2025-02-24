const schema = require("../Model/Schema");
const fs = require("fs");
const path = require("path");

module.exports.addAdmin = async (req, res) => {
    if (req.file) {
        req.body.image = req.file.path;
    }
    await schema.create(req.body).then((data) => {
        res.status(200).json({ message: "Admin Added Successfully", data });
        console.log(req.body);
    }).catch((error) => {
        res.status(500).json({ message: "Error adding admin", error });
    });
};

module.exports.getAdmin = async (req, res) => {
    await schema.find({}).then((data) => {
        res.status(200).json({ data });
    }).catch((error) => {
        res.status(500).json({ message: "Error fetching admins", error });
    });
};

module.exports.deleteAdmin = async (req, res) => {
    let singleData = await schema.findById(req.query.id);
    if (singleData && singleData.image) {
        if (fs.existsSync(singleData.image)) {
            fs.unlinkSync(singleData.image);
        } else {
            return res.status(404).json({ message: "Image file not found" });
        }
    }
    await schema.findByIdAndDelete(req.query.id).then(() => {
        res.status(200).json({ message: "Admin Deleted Successfully" });
    }).catch((error) => {
        res.status(500).json({ message: "Error deleting admin", error });
    });
};

module.exports.updateAdmin = async (req, res) => {
    let singleData = await schema.findById(req.query.id);
    if (singleData && singleData.image) {
        if (fs.existsSync(singleData.image)) {
            fs.unlinkSync(singleData.image);
        } else {
            return res.status(404).json({ message: "Image file not found" });
        }
    }
    if (req.file) {
        req.body.image = req.file.path;
    }
    await schema.findByIdAndUpdate(req.query.id, req.body).then((data) => {
        res.status(200).json({ message: "Admin Updated Successfully", data });
    }).catch((error) => {
        res.status(500).json({ message: "Error updating admin", error });
    });
};