var express = require('express');
var router = express.Router();
var nguoiDungCtrl = require('../../controllers/severControllers/user.controller');

/* GET home page. */
router.get('/',nguoiDungCtrl.listUsers);
router.post('/update',nguoiDungCtrl.updateUser);
router.delete('/delete/:_id',nguoiDungCtrl.deleteUsers)
router.get('/number', nguoiDungCtrl.numberUserString);
router.post('/update-account',nguoiDungCtrl.UpdateAccountWeb);
module.exports = router;
