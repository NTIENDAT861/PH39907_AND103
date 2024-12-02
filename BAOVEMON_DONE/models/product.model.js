const db = require('./db');

const variantSchema = new db.mongooes.Schema({
    size: { type: String, required: true },
    color: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },

  },{_id:false});

const productSchema = new db.mongooes.Schema(
    {
        idProductType : { type: db.mongooes.Schema.ObjectId, ref: 'loaiHangModel' },
        productName: { type: String, required: true },
        variants: [variantSchema],
        price: { type: Number, require: true },
        description: { type: String, required: true },
        image: { type: String, required: true },

    },
    {
        collection: 'tb_san_pham'
    }
);

let productModel = db.mongooes.model('productModel', productSchema);

module.exports = { productModel };
