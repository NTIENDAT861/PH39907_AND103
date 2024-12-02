const db = require('./db');

const productType = new db.mongooes.Schema(
    {
        name: { type: String, required: true },
        image:{ type: String, required: true}
    },
    {
        collection: 'tb_loai_hang'
    }
);

let productTypeModel = db.mongooes.model('productTypeModel', productType);

module.exports = { productTypeModel };
