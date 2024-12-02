var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('pages/login', { title: 'Đăng nhập' });
});
router.get('/login', function(req, res, next) {
  res.render('pages/login', { title: 'Đăng nhập' });
});
module.exports = router;
