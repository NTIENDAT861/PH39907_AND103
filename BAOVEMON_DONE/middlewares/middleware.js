// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'makeTokenMD08'; // Thay bằng khóa bí mật của bạn

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send("Bạn cần đăng nhập để truy cập trang này");

    // Xác minh token
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send("Token không hợp lệ");
        req.user = user; // Thêm thông tin người dùng vào request
        next(); // Tiếp tục đến route tiếp theo
    });
};
