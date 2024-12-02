const db = require('./db');

const orderItemSchema = new db.mongooes.Schema(
    {
        idUser: { type: db.mongooes.Schema.ObjectId, ref: 'userModel', required: true },
        idOrder: { type: db.mongooes.Schema.ObjectId, ref: 'orderModel'},
        idProduct: { type: db.mongooes.Schema.ObjectId, ref: 'productModel', required: true },
        price: { type: Number, required: true },
        size: { type: String, required: true },
        color: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1, MinKey: 1 },
        isInCart: { type: Boolean, required: true }
    },
    {
        collection: 'tb_chi_tiet_don_hang'
    }
);

let orderItemModel = db.mongooes.model('orderItemModel', orderItemSchema);

module.exports = { orderItemModel };
