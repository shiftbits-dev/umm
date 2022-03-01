const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/zendesk')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const zenDeskUpload = multer({
    storage: storage
});

exports.zenDeskUpload = zenDeskUpload