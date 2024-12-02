const productTypeMD = require('../../models/productType.model');

exports.listProductType = async (req, res, next) => {

    try {
        var listProductType = await productTypeMD.productTypeModel.find();
        return res.status(200).json(
            listProductType
        );
    } catch (error) {
        return res.status(error.status).json({
            msg: error.message
        });
    }
}

exports.ProductTypeById = async (req, res, next) => {
    
    const _id = req.params;

    try {
        var productType = await productTypeMD.productTypeModel.findOne({"_id":_id});
        return res.status(200).json(
            productType
        );
    } catch (error) {
        return res.status(error.status).json({
            msg: error.message
        });
    }
}