
var express = require('express');
var router = express.Router();

var nguoiDungCtrl = require('../../controllers/severControllers/user.controller');
var donHangCtrl = require('../../controllers/severControllers/order.controller');
var sanpahmCtrl = require('../../controllers/severControllers/product.controller');
var voucherCtrl = require('../../controllers/severControllers/voucher.controller');
var orderItemCtrl = require('../../controllers/severControllers/orderItem.controller');
router.get('/', async function(req, res, next) {


  const username = req.cookies.username;
  const data_account = await nguoiDungCtrl.getAccount(username)
  const data_order  = await donHangCtrl.listOrderSeverFullJson();



  res.render('pages/quanLyDonHang', { 
    title: "Quản lý đơn hàng", 
    data_account: data_account.user,
    data : data_order.data,

});

});

module.exports = router;
