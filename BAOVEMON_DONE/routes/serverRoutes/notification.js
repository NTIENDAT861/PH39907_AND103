var express = require('express');
var router = express.Router();
var notificationCtrl = require('../../controllers/severControllers/thong_bao.controller');

/* GET home page. */
router.get('/',notificationCtrl.listNotification);

module.exports = router;
