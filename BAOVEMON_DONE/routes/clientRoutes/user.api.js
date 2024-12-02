var express = require('express');
var router = express.Router();
var nguoiDungApiCtrl = require('../../controllers/clientControllers/user.api.controller');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

var multer = require('multer');

const storage = new CloudinaryStorage({
    cloudinary: require('../../cloudinaryConfig'),
    params: {
      folder: 'uploads', //  Thư mục trên Cloudinary
      allowed_formats: ['jpg', 'png', 'jpeg'], // Định dạng cho phép
    },
  });

var uploader = multer({ dest: './tmp' ,storage:storage});

/* GET home page. */
router.get('/',nguoiDungApiCtrl.getUser);
router.put('/update',uploader.single('image'),nguoiDungApiCtrl.updateUser);
router.get('/usersID',nguoiDungApiCtrl.getUserID);
router.get('/Role/:email',nguoiDungApiCtrl.getRole);
module.exports = router;
