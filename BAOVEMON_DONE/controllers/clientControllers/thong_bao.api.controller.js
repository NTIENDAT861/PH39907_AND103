const notificationMD = require('../../models/notification.model');

exports.listNotification = async (req, res, next) => {

    try {
        var listNotification = await notificationMD.notificationModel.find();
        return res.status(200).json(
            listNotification
        );
    } catch (error) {
        return res.status(error.status).json({
            msg: error.message
        });
    }
}