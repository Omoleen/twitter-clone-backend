const multer = require('multer');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1]
    cb(null, `uploads/`);
  },
  filename: (req, file, cb) => {
      // const ext = file.mimetype.split("/")[1];
    cb(null, Date.now() + '-' + file.originalname);
  }
});
// Multer Filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "pdf") {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!"), false);
  }
};
// Create the multer instance
const upload = multer({
    storage,
    // fileFilter: multerFilter
});

module.exports = upload;