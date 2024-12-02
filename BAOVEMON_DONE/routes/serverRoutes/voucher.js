var express = require('express');
var router = express.Router();
var voucherCtrl = require('../../controllers/severControllers/voucher.controller');

/* GET home page. */
router.get('/',voucherCtrl.listVoucher);
router.post('/add',voucherCtrl.addVoucher);
router.put('/update',voucherCtrl.updateVoucher);
router.post('/delete',voucherCtrl.deleteVoucher);
module.exports = router;
