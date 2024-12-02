const voucherMD = require('../../models/voucher.model');

exports.listVoucher = async (req, res, next) => {

    try {
        var listVoucher = await voucherMD.voucherModel.find();
        return res.status(200).json(
            listVoucher
        );
    } catch (error) {
        return res.status(error.status).json({
            msg: error.message
        });
    }
}