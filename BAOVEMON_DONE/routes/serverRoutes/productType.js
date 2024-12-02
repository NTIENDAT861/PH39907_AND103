var express = require('express');
var router = express.Router();
var productTypeCtrl = require('../../controllers/severControllers/productType.controller');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
var multer = require('multer');

const storage = new CloudinaryStorage({
    cloudinary: require('../../cloudinaryConfig'),
    params: {
      folder: 'uploads', // Thư mục trên Cloudinary
      allowed_formats: ['jpg', 'png', 'jpeg'], // Định dạng cho phép
    },
  });

var uploader = multer({ dest: './tmp' ,storage:storage});

/* GET home page. */
router.get('/',productTypeCtrl.listProductType);
router.post('/add',uploader.single("image"),productTypeCtrl.addProductType);

module.exports = router;
