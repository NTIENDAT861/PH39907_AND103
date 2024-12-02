
var express = require('express');
var router = express.Router();

var nguoiDungCtrl = require('../../controllers/severControllers/user.controller');
var donHangCtrl = require('../../controllers/severControllers/order.controller');
var sanpahmCtrl = require('../../controllers/severControllers/product.controller');
var VOUCHER_CTRL = require('../../controllers/severControllers/voucher.controller');

router.get('/', async function (req, res, next) {


  const username = req.cookies.username;
  const data_account = await nguoiDungCtrl.getAccount(username)
  const data_voucher = await VOUCHER_CTRL.getListVoucherJson();
  
  res.render('pages/quanLyVoucher', {
    title: "Quản lý mã giảm giá",
    data_account: data_account.user,
    data: data_voucher.data
  });

});


module.exports = router;
