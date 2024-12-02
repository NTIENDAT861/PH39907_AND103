const db = require('./db');

const voucherSchema = new db.mongooes.Schema(
    {
        code: { type: String, required: true },
        discountPrice: { type: Number, required: true },
        end: { type: Date, require: true },
        status: { type: Boolean, required: true },
    },
    {
        collection: 'tb_khuyen_mai'
    }
);

let voucherModel = db.mongooes.model('voucherModel', voucherSchema);

module.exports = { voucherModel };
