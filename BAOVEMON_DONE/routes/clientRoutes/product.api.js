var express = require('express');
var router = express.Router();
var productApiCtrl = require('../../controllers/clientControllers/product.api.controller');

/* GET home page. */
router.get('/', productApiCtrl.listProducts);
router.get('/:_id', productApiCtrl.getProductById);
router.get('/:_id/sizes', productApiCtrl.getSizeSanPham);
router.get('/:_id/colors', productApiCtrl.getColorSanPham);
router.get('/:_id/kho', productApiCtrl.getSoLuongKho);

router.get('/ProductID/:_id', productApiCtrl.getNameByIdOrder);


module.exports = router;


// get List sản phẩm:
// https://server-ungdungmuasamaonammd08.onrender.com/api/products
// get List sản phẩm theo thể loại:
// https://server-ungdungmuasamaonammd08.onrender.com/api/products?idProductType= id thể loại
// get list sản phẩm theo khoảng giá:
// https://server-ungdungmuasamaonammd08.onrender.com/api/products?minPrice=...&maxPrice=...
// {
//     đại khái là tôi dùng query nên có thể ghép mấy cái query loại
//     VD get list theo loại và khoảng giá: /products?idProductType= id thể loại&minPrice=...&maxPrice=...
//     có thể lấy sản phẩm từ min đổ lên không giới hạn thì chỉ cần để minPrice=... (... ở đây là số tiền nhé) max đổ xuống cũng vậy maxPrice=...
// }
// get sản phẩm theo _id:
// https://server-ungdungmuasamaonammd08.onrender.com/api/products/id của sản phẩm
// get sản phẩm có các size nào:
// https://server-ungdungmuasamaonammd08.onrender.com/api/products/id của sản phẩm/sizes
// get sản phẩm có các màu nào:
// https://server-ungdungmuasamaonammd08.onrender.com/api/products/id của sản phẩm/colors
// get số lượng kho tổng của sản phẩm: 
// https://server-ungdungmuasamaonammd08.onrender.com/api/products/id của sản phẩm/kho
// get số lượng của sản phẩm theo màu sắc:
// https://server-ungdungmuasamaonammd08.onrender.com/api/products/id của sản phẩm/kho?color=màu gì
// get số lượng của sản phẩm theo màu sắc:
// https://server-ungdungmuasamaonammd08.onrender.com/api/products/id của sản phẩm/kho?size=kích cỡ gì
// get số lượng của sản phẩm theo màu sắc và kích cỡ:
// https://server-ungdungmuasamaonammd08.onrender.com/api/products/id của sản phẩm/kho?size=kích cỡ gì&color= màu gì