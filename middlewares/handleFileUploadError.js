const multer = require("multer");

const handleFileUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle Multer errors
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      // Handle 'maxCount' limit exceeded error
      return res.status(400).json({ error: 'Too many files uploaded.' });
    }
  }

  // Handle other errors
  return res.status(500).json({ error: 'Something went wrong.' });
}

module.exports = handleFileUploadError