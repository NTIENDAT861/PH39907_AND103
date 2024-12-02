var express = require('express');
var router = express.Router();

var nguoiDungCtrl = require('../../controllers/severControllers/user.controller');
var donHangCtrl = require('../../controllers/severControllers/order.controller');
var sanpahmCtrl = require('../../controllers/severControllers/product.controller');
var voucherCtrl = require('../../controllers/severControllers/voucher.controller');
var orderItemCtrl = require('../../controllers/severControllers/orderItem.controller');

router.get('/', async function(req, res, next) {

  // Lấy số lượng người dùng từ controller
  const number_user = await nguoiDungCtrl.numberUsers();
  const number_order = await donHangCtrl.numberOrder();
  const doanh_thu_ = await donHangCtrl.numberRevenue();
  const san_pham_ = await sanpahmCtrl.numberProduct(); 
  const data_order_ = await donHangCtrl.listOrderSever();

  //
  const username = req.cookies.username;
  const data_account = await nguoiDungCtrl.getAccount(username);



  // Truyền dữ liệu vào view
  res.render('pages/home', { 
    title: "Home", 
    number_users: number_user,  
    data_account: data_account.user ,
    number_order: number_order,
    doanh_thu : doanh_thu_,
    san_pham: san_pham_,
    data_order : data_order_.data,
});

});

module.exports = router;
