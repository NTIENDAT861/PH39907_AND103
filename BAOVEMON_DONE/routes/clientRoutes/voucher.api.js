var express = require('express');
var router = express.Router();
var voucherApiCtrl = require('../../controllers/clientControllers/voucher.api.controller');

/* GET home page. */
router.get('/',voucherApiCtrl.listVoucher);

module.exports = router;
