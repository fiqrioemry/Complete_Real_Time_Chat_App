const multer = require("multer");

const storage = multer.diskStorage({
  dest: "uploads/",
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Maksimal 10MB
  fileFilter: (req, file, cb) => {
    const allowedFileTypes =
      /jpeg|jpg|png|gif|mp4|mkv|avi|mov|pdf|doc|docx|txt/;
    const isValidType = allowedFileTypes.test(file.mimetype);

    if (isValidType) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file format"));
    }
  },
}).single("file");

const handleFileUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ error: "File size exceeds limit of 10MB" });
      }
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }

    next();
  });
};

module.exports = handleFileUpload;
