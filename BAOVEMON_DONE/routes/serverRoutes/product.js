var express = require('express');
var router = express.Router();
var productCtl = require('../../controllers/severControllers/product.controller');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const authMiddleware = require('../../middlewares/middleware');

var multer = require('multer');

const storage = new CloudinaryStorage({
    cloudinary: require('../../cloudinaryConfig'),
    params: {
      folder: 'uploads', // Thư mục trên Cloudinary
      allowed_formats: ['jpg', 'png', 'jpeg'], // Định dạng cho phép
    },
  });

var uploader = multer({ dest: './tmp' ,storage:storage});


//GET
router.get('/',productCtl.list_san_pham);
router.get('/:_id',productCtl.getSanPhamById);
router.get('/:_id/sizes',productCtl.getSizeSanPham);
router.get('/:_id/colors',productCtl.getColorSanPham);
// router.get('/category/:idLoaiHang',productCtl.getListSanPhamByLoai);

router.post('/update',productCtl.update_san_pham);
//POST
router.post('/add',uploader.single("image"),productCtl.add_san_pham);  
router.post('/add-product',productCtl.add_san_pham_post);
router.post('/add/:_id/variants',productCtl.addVariant);


router.post('/delete',productCtl.delete_san_pham);

router.post('/delete-variants',productCtl.xoaVariant);
router.post('/add-variants',productCtl.themVariant);
module.exports = router;
