const orderMD = require('../../models/order.model');

exports.listOrderByIdUser = async (req, res, next) => {
    
    const { idUser,status } = req.query;
    const query = {};

    if (idUser && status) {
        query.idUser = idUser;
        query.status = status;
    }

    console.log(query);

    try {
        var listOrder = await orderMD.orderModel.find(query);
        return res.status(200).json(
            listOrder
        );
    } catch (error) {
        return res.status(error.status).json({
            msg: error.message
        });
    }
}

exports.addOrder = async (req, res, next) => {

    let objOrder = new orderMD.orderModel();
    objOrder.totalPrice = req.body.totalPrice;
    objOrder.status = 0;
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