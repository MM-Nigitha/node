const multer = require('multer');
const path = require('path');

const fileStorage = multer.diskStorage({
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, callback) => {
    let ext = path.extname(file.originalname);
    if (![".jpeg", ".jpg", ".png", ".webp", ".svg", ".jfif", ".mp4", ".mp3"].includes(ext)) {
        callback(new Error("Unsupported file format"), false);
        return;
    }
    callback(null, true);
};

const upload = multer({
    storage: fileStorage,
    fileFilter: fileFilter
});

module.exports = upload;
