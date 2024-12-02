var multer = require('multer');
var fs = require('fs');



// Get list thông báo
exports.listNotification = async (req, res, next) => {
    try {
        return res.status(200).json(

        );
    } catch (error) {
        return res.status(error.status).json({
            msg: error.message
        });
    }
}


// Thêm thông báo
exports.addNotification = async (req, res, next) => {


    if (req.method == 'POST') {

        try {

            return res.status(201).json({
                msg: "Thêm thông báo thành công"
            });
        } catch (error) {
            return res.status(error.status).json({
                msg: error.message
            });
        }

    }

}


// Sửa thông báo
exports.updateNotification = async (req, res, next) => {


    if (req.method == 'PUT') {

        try {
            res.status(200).json({ msg: 'Sửa thành công!' });

        } catch (error) {
            return res.status(error.status).json({
                msg: error.message
            });
        }

    }

}

// Xóa thông báo
exports.delete_Notification = async (req, res, next) => {

    try {

        res.status(200).json({ msg: 'Xóa thành công' });

    } catch (error) {
        return res.status(error.status).json({
            msg: error.message
        });
    }
    res.status(200).json({ msg: 'xóa' });

}



