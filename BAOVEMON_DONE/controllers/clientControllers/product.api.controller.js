const { default: mongoose } = require('mongoose');
const productMD = require('../../models/product.model');
var orderItemCtrl = require('../../controllers/severControllers/orderItem.controller');
exports.    listProducts = async (req, res, next) => {

    const { minPrice, maxPrice, idProductType } = req.query;

    const query = {};

    if (idProductType) {
        query.idProductType = idProductType; // Chuyển đổi sang ObjectId nếu cần
    }

    if (minPrice || maxPrice) {
        query.price = {}; // Khởi tạo đối tượng cho giá
        if (minPrice) query.price.$gte = parseFloat(minPrice); // Lớn hơn hoặc bằng
        if (maxPrice) query.price.$lte = parseFloat(maxPrice); // Nhỏ hơn hoặc bằng
    }

    console.log(query)

    try {
        var listProducts = await productMD.productModel.find(query);
        return res.status(200).json(
            listProducts
        );
    } catch (error) {
        return res.status(error.status).json({
            msg: error.message
        });
    }
}

exports.getNameByIdOrder = async (req, res) => {
    try {
        const { _id } = req.params;

   
        const itemOrder = await orderItemCtrl.getOrderItemByID(_id);
        
        if (itemOrder.data == null) {
            return res.status(404).json({ status: 404, msg: 'Order Item not found', ProductName: '' });
        }
       
       
        const product = await productMD.productModel.findOne({ _id: itemOrder.data.idProduct });
        if (!product) {
            return res.status(404).json({ status: 404, msg: 'Product not found', ProductName: '' });
        }

      
        res.status(200).json({
            status: 200,
            msg: "Lấy tên sản phẩm thành công",
            ProductName: product.productName,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ status: 500, msg: 'Internal server error' });
    }
};



exports.getProductById = async (req, res, next) => {
    const _id = req.params;
    console.log(_id)

    try {
        const products = await productMD.productModel.findOne({ "_id": _id });
        console.log(products);
        if (!products) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm nào!" });
        }
        res.json(products);

    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        res.status(500).json({ message: "Lỗi server" });
    }


};


exports.getSizeSanPham = async (req, res, next) => {
    try {
        const id = req.params; // Lấy ID sản phẩm từ params

        // Tìm sản phẩm theo ID
        const product = await productMD.productModel.findById(id);

        // console.log(product);
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }

        // Lấy tất cả kích thước từ các biến thể
        const sizes = product.variants.map(variant => variant.size);

        // Loại bỏ các kích thước trùng lặp
        const uniqueSizes = [...new Set(sizes)];

        return res.status(200).json(uniqueSizes);
    } catch (err) {
        return res.status(500).json({ message: 'Lỗi khi truy vấn kích thước', error: err.message });
    }


}
exports.getColorSanPham = async (req, res, next) => {
    try {
        const id = req.params; // Lấy ID sản phẩm từ params

        // Tìm sản phẩm theo ID
        const product = await productMD.productModel.findById(id);

        // console.log(product);
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại!' });
        }

        // Lấy tất cả kích thước từ các biến thể
        const color = product.variants.map(variant => variant.color);

        // Loại bỏ các kích thước trùng lặp
        const uniqueColor = [...new Set(color)];

        return res.status(200).json(uniqueColor);
    } catch (err) {
        return res.status(500).json({ message: 'Lỗi khi truy vấn màu sắc!', error: err.message });
    }

}

exports.getSoLuongKho = async (req, res) => {
    try {
        const { size, color } = req.query;
        const { _id } = req.params; // Nhận _id từ tham số


        const query = {};

        if (size) {
            query["variants.size"] = size;
        }

        // Chỉ thêm điều kiện lọc theo color nếu nó có giá trị
        if (color) {
            query["variants.color"] = color;
        }

        console.log(size, color);




        const result = await productMD.productModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(_id) } }, // Lọc theo productId
            { $unwind: "$variants" },
            {
                $match: query
            }, // Tách mảng variants thành các tài liệu riêng lẻ
            { $group: { _id: null, totalQuantity: { $sum: "$variants.quantity" } } } // Tính tổng quantity
        ]);

        const quantity = result.length > 0 ? result[0].totalQuantity : 0; // Nếu không có variant thì total = 0
        res.json({ quantity });
    } catch (error) {
        res.status(500).send(error.message);
    }  
};


