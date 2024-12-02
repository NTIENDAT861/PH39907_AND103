var express = require('express');
var router = express.Router();
var authApiCtrl = require('../../controllers/clientControllers/auth.api.controller');

/* GET home page. */
router.post('/signup',authApiCtrl.signup);

module.exports = router;
