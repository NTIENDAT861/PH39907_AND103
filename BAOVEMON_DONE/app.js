var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var admin = require('firebase-admin');
// var firebase = require('firebase');


var loginRouter = require('./routes/serverRoutes/login');
var sanPhamRouter = require('./routes/serverRoutes/product');
var donHangRouter = require('./routes/serverRoutes/order');
var khuyenMaiRouter = require('./routes/serverRoutes/voucher');
var loaiHangRouter = require('./routes/serverRoutes/productType');
var thongBaoRouter = require('./routes/serverRoutes/notification');
var nguoiDungRouter = require('./routes/serverRoutes/user');
var orderItemRouter = require('./routes/serverRoutes/orderItem');
var indexRouter = require('./routes/IndexRoutes/index');

// API

var authApiRouter = require('./routes/clientRoutes/auth.api');
var sanPhamApiRouter = require('./routes/clientRoutes/product.api');
var donHangApiRouter = require('./routes/clientRoutes/order.api');
var khuyenMaiApiRouter = require('./routes/clientRoutes/voucher.api');
var loaiHangApiRouter = require('./routes/clientRoutes/productType.api');
var thongBaoApiRouter = require('./routes/clientRoutes/notification.api');
var nguoiDungApiRouter = require('./routes/clientRoutes/user.api');
var addressApiRouter = require('./routes/clientRoutes/address.api');
var upload = require('./routes/serverRoutes/upload.api');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', sanPhamRouter);
app.use('/auth', loginRouter);
app.use('/products',sanPhamRouter);
app.use('/orders',donHangRouter);
app.use('/vouchers',khuyenMaiRouter);
app.use('/types',loaiHangRouter);
app.use('/notifys',thongBaoRouter);
app.use('/users',nguoiDungRouter);
app.use('/upload-image',upload);
app.use('/orders-items',orderItemRouter);
//LINK GIAO DIỆN
var iHomeRouter = require('./routes/IndexRoutes/home');
var iTKRouter = require('./routes/IndexRoutes/QuanLyTaiKhoan');
var iDHRouter = require('./routes/IndexRoutes/QuanLyDonHang');
var iSPRouter = require('./routes/IndexRoutes/QuanLySanPham');
var iCodeRouter = require('./routes/IndexRoutes/QuanLyVoucher');

app.use('/quan-ly-san-pham', iSPRouter);
app.use('/quan-ly-don-hang', iDHRouter);
app.use('/quan-ly-code', iCodeRouter);
app.use('/quan-ly-tai-khoan', iTKRouter);
app.use('/home', iHomeRouter);
app.use('/login', indexRouter);
app.use('/', indexRouter);
//API
app.use('/api/auth',authApiRouter);
app.use('/api/products',sanPhamApiRouter);
app.use('/api/orders',donHangApiRouter);
app.use('/api/vouchers',khuyenMaiApiRouter);
app.use('/api/types',loaiHangApiRouter);
app.use('/api/notifys',thongBaoApiRouter);
app.use('/api/users',nguoiDungApiRouter);
app.use('/api/address',addressApiRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error');
});


//CODE HOME ADMIN

//
module.exports = app;
