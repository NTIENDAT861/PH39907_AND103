const multer = require("multer");
const storage = multer.diskStorage({
  destination: (rq, file, cb) => {
    cb(null, "uploads");
  },
  filename: (rq, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
