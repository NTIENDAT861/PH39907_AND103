const db = require('./db');

const notificationSchema = new db.mongooes.Schema(
    {
        idNguoiDung: { type: db.mongooes.Schema.ObjectId, ref: 'nguoiDungModel' },
        thongBao: { type: String, required: true }

    },
    {
        collection: 'tb_thong_bao'
    }
);

let notificationModel = db.mongooes.model('notificationModel', notificationSchema);

module.exports = { notificationModel };
