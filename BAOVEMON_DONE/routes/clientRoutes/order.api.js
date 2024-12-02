var express = require('express');
var router = express.Router();
var orderApiCtrl = require('../../controllers/clientControllers/order.api.controller');

/* GET home page. */
router.get('/',orderApiCtrl.listOrderByIdUser);
router.post('/add',orderApiCtrl.addOrder);

module.exports = router;
