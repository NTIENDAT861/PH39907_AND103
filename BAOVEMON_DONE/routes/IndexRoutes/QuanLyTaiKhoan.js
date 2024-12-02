
var express = require('express');
var router = express.Router();

var nguoiDungCtrl = require('../../controllers/severControllers/user.controller');
var donHangCtrl = require('../../controllers/severControllers/order.controller');
var sanpahmCtrl = require('../../controllers/severControllers/product.controller');


router.get('/', async function(req, res, next) {
  const list_users = await nguoiDungCtrl.getListUserJson();

  const username = req.cookies.username;
  const data_account = await nguoiDungCtrl.getAccount(username)

  res.render('pages/quanLyTaiKhoan', { 
    title: "Quản lý tài khoản", 
    data_account: data_account.user,
    listUsers: list_users.data
});

});

module.exports = router;
