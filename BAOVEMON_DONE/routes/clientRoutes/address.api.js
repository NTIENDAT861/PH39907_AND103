var express = require('express');
var router = express.Router();
var addressCtrl = require('../../controllers/clientControllers/address.api.controller');

/* GET home page. */
router.get('/',addressCtrl.listAddressByIdUser);
router.post('/add',addressCtrl.addAddress);
router.put('/update',addressCtrl.updateAddress);
router.delete('/delete',addressCtrl.deleteAddress);

module.exports = router;
