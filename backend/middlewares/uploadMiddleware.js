const multer = require('multer');

// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    const allowedHeaders = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedHeaders.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = {
    upload
};