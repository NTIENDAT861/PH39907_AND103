const orderItemMD = require('../../models/orderItem.model');
const orderCtrl = require("../../controllers/severControllers/order.controller");

exports.listItemOrderByIdOrder = async (req, res, next) => {

    const { idOrder, isInCart } = req.query;
    const query = {};

    if (!idOrder) {
        return res.json({ "msg": "Chưa có idUser" });
    }
    if (isInCart != undefined) {
        query.isInCart = isInCart;

    }
    query.idOrder = idOrder;
    console.log(isInCart, query);
    try {
        var listOrderItems = await orderItemMD.orderItemModel.find(query);
        return res.status(200).json(
            listOrderItems
        );
    } catch (error) {
        return res.status(error.status).json({
            msg: error.message
        });
    }
}

exports.listICart = async (req, res, next) => {

    const { idUser, isInCart } = req.query;
    const query = {};

    if (!idUser) {
        return res.json({ "msg": "Chưa có idUser" });
    }
    if (isInCart != undefined) {
        query.isInCart = isInCart;

    }
    query.idUser = idUser;
    console.log(isInCart, query);
    try {
        var listOrderItems = await orderItemMD.orderItemModel.find(query);
        return res.status(200).json(
            listOrderItems
        );
    } catch (error) {
        return res.status(error.status).json({
            msg: error.message
        });
    }
}

exports.addOrderItem = async (req, res, next) => {

    if (req.method == 'POST') {
        const condition = {
            idUser: req.body.idUser,
            idProduct: req.body.idProduct,
            size: req.body.size,  // Giả sử req.body.size là chuỗi
            color: req.body.color,//
        };

        let oldOrderItem = await orderItemMD.orderItemModel.findOne(condition);
        console.log(oldOrderItem);
        if (oldOrderItem) {
            let updateOldOrderItem = new orderItemMD.orderItemModel();
            updateOldOrderItem._id = oldOrderItem._id;
            updateOldOrderItem.quantity = oldOrderItem.quantity + req.body.quantity;
            updateOldOrderItem.price = oldOrderItem.price + req.body.price;
            await orderItemMD.orderItemModel.findByIdAndUpdate(oldOrderItem._id, updateOldOrderItem);
            res.status(200).json({ msg: "Sản phẩm đang có trong giỏ hàng" });
        } else {
            let objOrderItem = new orderItemMD.orderItemModel();
            objOrderItem.idUser = req.body.idUser;
            objOrderItem.idProduct = req.body.idProduct;
            objOrderItem.idOrder = req.body.idOrder;
            objOrderItem.price = req.body.price;
            objOrderItem.size = req.body.size;
            objOrderItem.color = req.body.color;
            objOrderItem.quantity = req.body.quantity;
            objOrderItem.isInCart = true;


            try {
                let newOrderItem = await objOrderItem.save();
                return res.status(201).json(
                     newOrderItem
                );
            } catch (error) {
                return res.send(error.message)
            }
        }



    }

}

exports.updateOrderItem = async (req, res, next) => {

    const { _id, idOrder } = req.body;


    if (req.method == "PUT") {
        try {

            let objOrderItem = new orderItemMD.orderItemModel();

            objOrderItem._id = _id;
            objOrderItem.idOrder = idOrder;
            objOrderItem.isInCart = false;

            await orderItemMD.orderItemModel.findByIdAndUpdate(_id, objOrderItem);
            res.status(200).json({ msg: "Sửa thành công!" });
        } catch (error) {
            return res.send(error.message);
        }
    }

}