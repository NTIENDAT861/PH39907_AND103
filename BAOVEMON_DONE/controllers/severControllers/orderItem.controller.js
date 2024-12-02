const orderItemMD = require('../../models/orderItem.model');

exports.listOrderItem = async (req, res, next) => {

    try {
        var listOrderItems = await orderItemMD.orderItemModel.find();
        return res.status(200).json(
            listOrderItems
        );
    } catch (error) {
        return res.status(error.status).json({
            msg: error.message
        });
    }
}
exports.getOrderItemByID = async (id) => {
    try {
        // Tìm người dùng theo email trong cơ sở dữ liệu
        const prod = await orderItemMD.orderItemModel.find({ idOrder: id });
  
        return { data: prod[0] };
    } catch (error) {
      
        return { status: 500, message: error.message, data: null };
    }
  };
exports.addOrderItem = async (req, res, next) => {



    if (req.method == 'POST') {
        const condition = {
            idUser: req.body.idUser,
            idProduct: req.body.idProduct,
            size: req.body.size,  // Giả sử req.body.size là chuỗi
            color: req.body.color,
            isInCart: req.body.isInCart,
        };

        let oldOrderItem = await orderItemMD.orderItemModel.findOne(condition);

        if (oldOrderItem) {
            let updateOldOrderItem = new orderItemMD.orderItemModel();
            updateOldOrderItem._id = oldOrderItem._id;
            updateOldOrderItem.quantity = oldOrderItem.quantity + req.body.quantity;
            updateOldOrderItem.price = oldOrderItem.price + req.body.price;
            await orderItemMD.orderItemModel.findByIdAndUpdate(oldOrderItem._id, updateOldOrderItem);
            res.status(200).json({ msg: "Sản phẩm đang có trong giỏ hàng" });
        }else{
            let objOrderItem = new orderItemMD.orderItemModel();
            objOrderItem.idUser = req.body.idUser;
            objOrderItem.idProduct = req.body.idProduct;
            objOrderItem.idOrder = req.body.idOrder;
            objOrderItem.price = req.body.price;
            objOrderItem.size = req.body.size;
            objOrderItem.color = req.body.color;
            objOrderItem.quantity = req.body.quantity;
            objOrderItem.isInCart = req.body.isInCart;
    
    
            try {
                let newOrderItem = await objOrderItem.save();
                return res.status(201).json({
                    msg: "Thêm đơn hàng thành công", newOrderItem
                });
            } catch (error) {
                return res.send(error.message)
            }
        }

        

    }

}
exports.geProductByID = async (req, res, next) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({
            status: 400,
            msg: 'Thiếu trường id'
        });
    }
    try {
   

        const data_full = await orderItemMD.orderItemModel.find({ idOrder: id })
            .populate({
                path: 'idProduct',
                model: 'productModel',
                select: "_id productName description idProductType price image",
                populate: {
                    path: 'idProductType',
                    model: 'productTypeModel',
                    select: "name",
                }
            });
            if (!data_full || data_full.length === 0) {
                return res.status(404).json({
                    status: 400,
                    msg: 'Không tìm thấy sản phẩm'
                });
            }
        return res.status(200).json({
            status: 200,
            data: data_full
        });
    } catch (error) {
        // Kiểm tra nếu error.status có tồn tại, nếu không mặc định trả về 500
        const statusCode = error.status || 500;
        return res.status(statusCode).json({
            msg: error.message || 'Lỗi không xác định'
        });
    }
};
exports.getTotalMoneyProductByID = async (req, res, next) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({
            status: 400,
            msg: 'Thiếu trường id'
        });
    }
    try {
   

        const data_full = await orderItemMD.orderItemModel.find({ idOrder: id })
            .populate({
                path: 'idProduct',
                model: 'productModel',
                select: "price",
              
            });
            if (!data_full || data_full.length === 0) {
                return res.status(404).json({
                    status: 400,
                    msg: 'Không tìm thấy sản phẩm',
                    money: 0
                });
            }
        const money =   data_full.reduce((total, item) => {
                const itemTotal = item.idProduct.price * item.quantity;
                return total + itemTotal;
            }, 0);
        return res.status(200).json({
            status: 200,
            money: money
        });
    } catch (error) {
        // Kiểm tra nếu error.status có tồn tại, nếu không mặc định trả về 500
        const statusCode = error.status || 500;
        return res.status(statusCode).json({
            msg: error.message || 'Lỗi không xác định'
        });
    }
};