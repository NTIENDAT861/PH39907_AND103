var express = require('express');
var router = express.Router();
var ul = require('../../controllers/severControllers/upload.controller');

/* GET home page. */
router.post('/',ul.UpLoadAnh);


module.exports = router;
