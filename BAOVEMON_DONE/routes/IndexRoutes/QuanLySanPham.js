
var express = require('express');
var router = express.Router();

var nguoiDungCtrl = require('../../controllers/severControllers/user.controller');
var donHangCtrl = require('../../controllers/severControllers/order.controller');
var sanpahmCtrl = require('../../controllers/severControllers/product.controller');
var productTypeCtrl = require('../../controllers/severControllers/productType.controller');

router.get('/', async function(req, res, next) {


  const username = req.cookies.username;
  const data_account = await nguoiDungCtrl.getAccount(username)
  const data_san_pham = await sanpahmCtrl.getListSPJson()
const listType = await productTypeCtrl.getListTypeJson()


  res.render('pages/quanLySanPham', { 
    title: "Quản lý sản phẩm", 
    data_account: data_account.user,
    data: data_san_pham.data,
    typeProduct: listType.data
    
});

});

module.exports = router;
