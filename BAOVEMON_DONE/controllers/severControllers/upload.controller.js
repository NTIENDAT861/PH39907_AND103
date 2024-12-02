var multer = require('multer');
var fs = require('fs');
const upload = require('../../controllers/common/upload');

exports.UpLoadAnh = (req, res, next) => {
        upload.single('image')(req, res, async (err) => {
           
    
            try {
                // Kiểm tra nếu có file
                if (!req.file) {
                    return res.status(400).json({
                        status: 400,
                        message: 'Chưa chọn file ảnh!',
                    });
                }
    
                // Tạo URL của ảnh đã upload
                const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
                const link_p = `/uploads/${req.file.filename}`;
                // Trả về thông tin ảnh đã upload
                res.json({
                    status: 200,
                    message: 'Thêm thành công',
                    url_full: imageUrl,
                    link_image:link_p
                });
            } catch (error) {
                console.error(error);
                res.status(500).json({
                    status: 500,
                    message: 'Lỗi khi xử lý ảnh',
                });
            }
        });
};


