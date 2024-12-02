var express = require('express');
var router = express.Router();
var orderItemCtrl= require('../../controllers/severControllers/orderItem.controller');

/* GET home page. */
router.get('/',orderItemCtrl.listOrderItem);
router.post('/add',orderItemCtrl.addOrderItem);
router.post('/get-product',orderItemCtrl.geProductByID);
router.post('/total-money-product',orderItemCtrl.getTotalMoneyProductByID);
module.exports = router;
