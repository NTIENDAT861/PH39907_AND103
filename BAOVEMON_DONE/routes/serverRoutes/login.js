var express = require('express');
var router = express.Router();
var login = require("../../controllers/severControllers/login.controller");
const cors = require('cors');
const admin = require('firebase-admin');

/* GET home page. */
router.get('/',login.showForm);
router.post('/',login.auth);

// router.post('/',login.register);

module.exports = router;
