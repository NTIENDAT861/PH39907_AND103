var express = require('express');
var router = express.Router();
var orderItemCtrl= require('../../controllers/clientControllers/oderItem.api.controller');

/* GET home page. */
router.get('/',orderItemCtrl.listItemOrderByIdOrder);
router.get('/cart',orderItemCtrl.listICart);
router.post('/add',orderItemCtrl.addOrderItem);
router.put('/update',orderItemCtrl.updateOrderItem);    

module.exports = router;
