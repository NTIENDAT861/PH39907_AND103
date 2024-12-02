var express = require('express');
var router = express.Router();
var productTypeCtrl = require('../../controllers/clientControllers/productType.api.controller');

/* GET home page. */
router.get('/',productTypeCtrl.listProductType);
router.get('/:_id',productTypeCtrl.ProductTypeById);

module.exports = router;
