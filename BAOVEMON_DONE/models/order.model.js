const db = require('./db');

const orderSchema = new db.mongooes.Schema(
    {
        idUser: { type: db.mongooes.Schema.ObjectId, ref: 'userModel' },
        idVoucher: { type: db.mongooes.Schema.ObjectId, ref: 'voucherModel', required: false },
        idAddress: { type: db.mongooes.Schema.ObjectId, ref: 'addressModel', required: true },
        totalPrice: { type: Number, required: true },
        status: { type: Number, required: true, default: -1 },
        payment: { type: String, required: true }
    },
    {
        timestamps: {
            createdAt: 'time'
        }
    },
    {
        collection: 'tb_don_hang'
    }
);

let orderModel = db.mongooes.model('orderModel', orderSchema);

module.exports = { orderModel };
