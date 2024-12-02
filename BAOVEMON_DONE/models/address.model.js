const db = require('./db');

const addressSchema = new db.mongooes.Schema(
    {
        idUser: { type: db.mongooes.Schema.ObjectId, require: true ,ref : 'userModel'},
        name: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true }
    },
    {
        collection: 'tb_dia_chi'
    }
);

let addressModel = db.mongooes.model('addressModel', addressSchema);

module.exports = { addressModel };
