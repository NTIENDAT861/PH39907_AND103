var express = require('express');
var router = express.Router();
var donHangCtrl = require('../../controllers/severControllers/order.controller');

/* GET home page. */
router.get('/',donHangCtrl.listOrder);
router.post('/add',donHangCtrl.addOrder);
router.post('/actions',donHangCtrl.updateDonHangServer);
router.get('/full',donHangCtrl.listOrderSeverFullJson);
module.exports = router;
