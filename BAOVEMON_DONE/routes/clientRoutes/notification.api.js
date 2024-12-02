var express = require('express');
var router = express.Router();
var notificationApiCtrl = require('../../controllers/clientControllers/thong_bao.api.controller');

/* GET home page. */
router.get('/',notificationApiCtrl.listNotification);

module.exports = router;
