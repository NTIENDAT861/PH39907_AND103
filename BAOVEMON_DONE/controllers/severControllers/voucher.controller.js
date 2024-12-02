var multer = require('multer');
var fs = require('fs');
const voucherMD = require('../../models/voucher.model');

exports.getCodeByID = async (id) => {
    try {
        // Tìm người dùng theo email trong cơ sở dữ liệu
        const prod = await voucherMD.voucherModel.find({ _id: id });
  
        return { code: prod[0].code };
    } catch (error) {
      
        return { status: 500, message: error.message, code: null };
    }
  };
// Get list khuyến mãi
exports.listVoucher = async (req, res, next) => {
    try {
        const data = await voucherMD.voucherModel.find();
        return res.status(200).json(
            data
        );
    } catch (error) {
        return res.status(error.status).json({
            msg: error.message
        });
    }
}
exports.getListVoucherJson = async () => {
    try {
        
        const data = await voucherMD.voucherModel.find();

        return { data: data };  
    } catch (error) {
      
        return { status: 500, message: error.message, data: null };
    }
};

// Thêm khuyến mãi
exports.addVoucher = async (req, res, next) => {

    

    let objVoucher = new voucherMD.voucherModel();
    objVoucher.code = req.body.code
    objVoucher.discountPrice = req.body.discountPrice;
    objVoucher.status = req.body.status;
    objVoucher.end = new Date("2025-01-01");

    if (req.method == 'POST') {

        try {
            let newVoucher = await objVoucher.save()
            return res.status(201).json({
                status: 200,
                msg: "Thêm khuyến mãi thành công",
                newVoucher
            });
        } catch (error) {
            return res.send(error.message);
        }

    }

}


// Sửa khuyến mãi
exports.updateVoucher = async (req, res, next) => {
    const { _id, code, discountPrice, status, end } = req.body; 

    try {
        // Cập nhật voucher bằng findByIdAndUpdate
        const updatedVoucher = await voucherMD.voucherModel.findByIdAndUpdate(
            _id, 
            { code, discountPrice, status, end }, 
            { new: true } // Trả về bản ghi đã được cập nhật
        );

        // Kiểm tra nếu không tìm thấy voucher
        if (!updatedVoucher) {
            return res.status(404).json({ status: 404,msg: "Voucher không tồn tại!" });
        }

        // Trả về kết quả sau khi cập nhật
        return res.status(200).json({
            status: 200,
            msg: "Voucher đã được cập nhật thành công!",
            data: updatedVoucher
        });

    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};


exports.deleteVoucher = async (req, res, next) => {
    const { _id } = req.body;
    try {
        // Tìm và xóa voucher theo _id
        const voucher = await voucherMD.voucherModel.findByIdAndDelete(_id);

        // Kiểm tra nếu không tìm thấy voucher
        if (!voucher) {
            return res.status(404).json({ msg: "Voucher không tìm thấy" });
        }

        // Gửi phản hồi thành công
        res.status(200).json({ status: 200, msg: "Xóa thành công" });

    } catch (error) {
        // Xử lý lỗi và gửi phản hồi lỗi
        console.error(error);
        return res.status(500).json({
            msg: error.message || "Lỗi server"
        });
    }
};




