var multer = require('multer');
var fs = require('fs');
var productTypeMD = require('../../models/productType.model');
const cloudinary = require('../../cloudinaryConfig');



exports.gettypeByID = async (id) => {
    try {
        // Tìm người dùng theo email trong cơ sở dữ liệu
        const prod = await productTypeMD.productTypeModel.find({ _id: id });
  
        return { name: prod[0].name };
    } catch (error) {
      
        return { status: 500, message: error.message, name: null };
    }
  };
// Get list loại hàng
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
exports.getListTypeJson = async () => {
    try {
        
        const data = await productTypeMD.productTypeModel.find();
  
        return { data: data };  
    } catch (error) {
      
        return { status: 500, message: error.message, data: null };
    }
  };

// Thêm loại hàng
exports.addProductType = async (req, res, next) => {


    let file = req.file;

    let objProductType = new productTypeMD.productTypeModel();
    objProductType.name = req.body.name;


    try {
        if (!file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }
  
        // Upload hình ảnh lên Cloudinary
        const result = await cloudinary.uploader.upload(file.path);
        objProductType.image = result.secure_url;
  
        // Trả về URL của hình ảnh đã upload
      } catch (error) {
        res.status(500).json({ message: error.message });
      }

    if (req.method == 'POST') {

        try {
            let newProducType = await objProductType.save();
            return res.status(201).json({
                msg: "Thêm loại hàng thành công"
            });
        } catch (error) {
            return res.status(error.status).json({
                msg: error.message
            });
        }

    }

}


// Sửa loại hàng
exports.updateProductType = async (req, res, next) => {

    let idProductType = req.param.idProducType;

    if (req.method == 'PUT') {

        try {
            res.status(200).json({ msg: 'Sửa thành công!' });

        } catch (error) {
            return res.status(error.status).json({
                msg: error.message
            });
        }

    }

}

// Xóa loại hàng
exports.deleteProductType = async (req, res, next) => {
    // let idProductType = req.param.idProducType;

    try {

        res.status(200).json({ msg: 'Xóa thành công' });

    } catch (error) {
        return res.status(error.status).json({
            msg: error.message
        });
    }
    res.status(200).json({ msg: 'xóa' });

}



