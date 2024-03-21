const express = require('express');

const router = express.Router();

module.exports = router;

const server = require('../app');

const ProductModel = require('../models/ProductModel');




router.get('/', (req, res) => {
    res.send('404' );
});
router.post('/add-category', async (req, res) => {
    await server.mongoose.connect(server.uri);

    let category = req.body;

    let result = await CategoryModel.create(category);
    console.log(result);
    let results = await CategoryModel.find();

    res.send(results);
})
router.post('/add-product', async (req, res) => {
    try {
        await server.mongoose.connect(server.uri);

        let category = req.body;

        let result = await ProductModel.create(category);
        console.log(result);
        let results = await ProductModel.find();

        res.status(201).json({ success: true, message: "Thêm sản phẩm thành công", data: results });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi thêm sản phẩm", error: error.message });
    } finally {
        await server.mongoose.disconnect();
    }
})
router.get('/get-list-product', async (req, res) => {
    await server.mongoose.connect(server.uri);

    let product = await ProductModel.find();
    res.send(product);
})
router.delete("/delete-product/:id", async (rq, rs) => {
    await server.mongoose.connect(server.uri);
    try {
      const { id } = rq.params;
      const result = await ProductModel.findOneAndDelete({ ProductID: id });
      if (result) {
        rs.status(201).json({ success: true, message: "Xóa thành công", data: result });
      } else {
        rs.status(500).json({ success: false, message: "Lỗi khi xóa sản phẩm", error: error.message });
      }
    } catch (error) {
        rs.status(505).json({ success: false, message: "Lỗi ", error: error.message });
    }
  });
  router.put("/update-product", async (rq, rs) => {
    await server.mongoose.connect(server.uri);
    try {
      
        const updatedProduct = rq.body; // Lấy thông tin sản phẩm cần cập nhật từ request body
        
        // Thực hiện cập nhật thông tin sản phẩm trong cơ sở dữ liệu (mongodb)
        const result = await ProductModel.findOneAndUpdate({ ProductID: updatedProduct.ProductID }, updatedProduct, { new: true });

        if (result) {
            rs.status(200).json({ success: true, data: result });
        } else {
            rs.status(404).json({ success: false, message: "Không tìm thấy sản phẩm cần cập nhật" });
        }
    } catch (error) {
        rs.status(500).json({ success: false, message: error.message });
    }
  } );

exports.ProductModel = ProductModel;
