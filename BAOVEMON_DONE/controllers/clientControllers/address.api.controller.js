const addressMD = require('../../models/address.model');

exports.listAddressByIdUser = async (req, res, next) => {

    const idUser = req.query;

    try {
        var listAddress = await addressMD.addressModel.find(idUser);
        return res.status(200).json(
            listAddress
        );
    } catch (error) {
        return res.send(error.message)

    }
}

exports.addAddress = async (req, res, next) => {

    if (req.method == "POST") {
        let objAddress = new addressMD.addressModel();
        objAddress.name = req.body.name;
        objAddress.address = req.body.address;
        objAddress.phone = req.body.phone;
        objAddress.idUser = req.body.idUser;

        try {

            let newAddress = await objAddress.save();
            return res.status(201).json({
                msg: "Thêm địa chỉ thành công", newAddress
            });
        } catch (error) {
            return res.status(400).send(error.message);
        }

    }

};

exports.updateAddress = async (req, res, next) => {
    const _id = req.body;
    console.log(_id)
    if (req.method == "PUT") {
        try {

            let objAddress = new addressMD.addressModel();
            objAddress.name = req.body.name;
            objAddress.address = req.body.address;
            objAddress.phone = req.body.phone;
            objAddress._id = _id;

            await addressMD.addressModel.findByIdAndUpdate(_id, objAddress);
            res.status(200).json({ msg: "Sửa thành công!" });
        } catch (error) {
            return res.send(error.message);
        }
    }
}

exports.deleteAddress = async (req, res, nex) => {
    let _id = req.body._id;
    console.log(_id);
    try {
        await addressMD.addressModel.findByIdAndDelete(_id);
        res.send({ msg: 'Xóa thành công' });
    } catch (error) {
        return res.send(error.message)
    }
}