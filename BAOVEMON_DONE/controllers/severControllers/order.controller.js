var multer = require('multer');
var fs = require('fs');
var orderMD = require('../../models/order.model')

exports.listOrderSeverFull = async () => {
    try {
        
        const data = await orderMD.orderModel.find();

        return { data };  
    } catch (error) {
    
        return { status: 500, message: error.message, data: null };
    }
};


exports.listOrderSeverFullJson = async () => {
    try {
        // Truy vấn tất cả đơn hàng và chi tiết đơn hàng kèm thông tin sản phẩm
        const data = await orderMD.orderModel.find()
            .populate({
                path: 'idUser',
                model: 'userModel' ,
                select: 'fullname'
            })
            .populate({
                path: 'idVoucher',
                model: 'voucherModel' ,
                select: 'code discountPrice'
            })
           

            return { data };  
    } catch (error) {
        return { status: 500, message: error.message, data: null };
    }
};


exports.listOrderSever = async () => {
    try {
        
        const data = await orderMD.orderModel.find({status : 2})
        .populate({
            path: 'idUser',
            model: 'userModel' ,
            select: 'fullname'
        })
        .populate({
            path: 'idVoucher',
            model: 'voucherModel' ,
            select: 'code discountPrice'
        });

        return { data };  
    } catch (error) {
    
        return { status: 500, message: error.message, data: null };
    }
};
// Get list đơn hàng
exports.listOrder = async (req, res, next) => {

    try {

        return res.status(200).json(

        );
    } catch (error) {
        return res.status(error.status).json({
            msg: error.message
        });
    }
}

// Thêm đơn hàng
exports.addOrder = async (req, res, next) => {

    let objOrder = new orderMD.orderModel();
    objOrder.totalPrice = req.body.totalPrice;
    objOrder.status = req.body.status;
    objOrder.idUser = req.body.idUser;
    objOrder.idVoucher = req.body.idVoucher;
    objOrder.payment = req.body.payment;
    objOrder.idAddress = req.body.idAddress;

    if (req.method == 'POST') {

        try {
            let newOrder = await objOrder.save();
            return res.status(201).json(
                newOrder
            );
        } catch (error) {
            return res.send(error.message)
        }

    }

}
exports.numberOrder = async (req, res, next) => {
    try {
        const count = await orderMD.orderModel.countDocuments({ status: 2 });
        return count; 
    } catch (error) {
        return 0; 
    }
};
exports.numberRevenue = async (req, res, next) => {
    try {
      
        const revenue = await orderMD.orderModel.aggregate([
            { $match: { status: 2 } },  // Lọc các đơn hàng có status = 2
            { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } } 
        ]);

        // Kiểm tra nếu không có kết quả nào
        if (revenue.length === 0) {
            return 0;  
        }
        return revenue[0].totalRevenue;
    } catch (error) {
        return 0;  
    }
};
// Sửa đơn hàng
exports.updateOrder = async (req, res, next) => {

    let idOrder = req.param.idOrder;

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
exports.updateDonHangServer = async (req, res, next) => {
    const {_id, action} = req.body;
    let status = null;
    switch (action) {
        case 'huy-don':
            status = "-1";
            break;
        case 'xac-nhan':
            status = "1";
            break;
        case 'thanh-cong':
            status = "2";
            break;
        default:
            return res.status(400).json({
                status: 400,
                msg: "Hành động không hợp lệ!",
            });
    }
    try {
        const update = await orderMD.orderModel.findByIdAndUpdate(
            _id,
            { status },
            { new: true } 
        );

     
        if (!update) {
            return res.status(403).json({ 
            status: 404,
            msg: "Đơn hàng không tồn tại!" ,
            _id: _id,
            action: action});
        }

        return res.status(200).json({
            status: 200,
            msg: "Đơn hàng đã được cập nhật thành công!",
            _id: _id,
            action: action
        });

    } catch (error) {
       
        console.error(error);
        return res.status(500).json({
            msg: error.message || "Lỗi server"
        });
    }


}
// Xóa đơn hàng
exports.deleteOrder = async (req, res, next) => {
    let idOrder = req.param.idOrder;

    try {

        res.status(200).json({ msg: 'Xóa thành công' });

    } catch (error) {
        return res.status(error.status).json({
            msg: error.message
        });
    }
    res.status(200).json({ msg: 'xóa' });

}



