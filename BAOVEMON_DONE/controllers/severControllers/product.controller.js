var multer = require("multer");
var fs = require("fs");
var productMD = require("../../models/product.model");
const cloudinary = require('../../cloudinaryConfig');

// Get list sản phẩm
exports.list_san_pham = async (req, res, next) => {

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
    return res.status(200).json(listProducts);

  } catch (error) {
    return res.status(error.status).json({
      msg: error.message,
    });
  }
}
exports.getListSPJson = async () => {
  try {
      
      const data = await productMD.productModel.find()
      .populate({
        path: 'idProductType',
        model: 'productTypeModel' ,
        select: 'name'
    })
      ;

      return { data: data };  
  } catch (error) {
    
      return { status: 500, message: error.message, data: null };
  }
};
exports.getTenSanPhamID = async (id) => {
  try {
      // Tìm người dùng theo email trong cơ sở dữ liệu
      const prod = await productMD.productModel.find({ _id: id });

      return { name: prod[0].productName };  // Giả sử bạn chỉ muốn lấy 1 người dùng, không phải array
  } catch (error) {
      // Trả về lỗi nếu có sự cố trong khi tìm kiếm người dùng
      return { status: 500, message: error.message, name: null };
  }
};
exports.xoaVariant = async (req, res, next) => {
  const { _id, index } = req.body; // Nhận _id và index từ request body

  try {
    // Tìm sản phẩm theo _id
    const product = await productMD.productModel.findById(_id);

    if (!product) {
      return res.status(404).json({
        status: 404,
        msg: "Sản phẩm không tồn tại",
      });
    }

    // Kiểm tra index có hợp lệ không
    if (index < 0 || index >= product.variants.length) {
      return res.status(400).json({
        status: 400,
        msg: "Index không hợp lệ",
      });
    }

    // Xóa variant theo index
    product.variants.splice(index, 1);

    // Lưu lại sản phẩm sau khi cập nhật
    await product.save();

    res.status(200).json({
      status: 200,
      msg: "Xóa variant thành công",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      msg: "Lỗi server",
      error: error.message,
    });
  }
};
exports.themVariant = async (req, res, next) => {
  const { _id, variant } = req.body; // Nhận _id sản phẩm và thông tin variant từ request body

  try {
    // Tìm sản phẩm theo _id
    const product = await productMD.productModel.findById(_id);

    if (!product) {
      return res.status(404).json({
        status: 404,
        msg: "Sản phẩm không tồn tại",
      });
    }

    // Kiểm tra tính hợp lệ của variant
    if (!variant || !variant.size || !variant.color || variant.quantity === undefined) {
      return res.status(400).json({
        status: 400,
        msg: "Dữ liệu variant không hợp lệ",
      });
    }

    // Thêm variant mới vào danh sách
    product.variants.push(variant);

    // Lưu lại sản phẩm sau khi cập nhật
    await product.save();

    res.status(201).json({
      status: 200,
      msg: "Thêm variant thành công",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      msg: "Lỗi server",
      error: error.message,
    });
  }
};

exports.numberProduct = async (req, res, next) => {
  try {
      const count = await productMD.productModel.countDocuments();
      return count; 
  } catch (error) {
      return 0; 
  }
};

exports.getListSanPhamByLoai = async (req, res, next) => {
  try {
    const { idProductType } = req.params;

    // Tìm sản phẩm theo thể loại
    const products = await productMD.productModel.find({ idProductType: idProductType });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found in this category' });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi truy xuất!', error });
  }
}




exports.getSanPhamById = async (req, res, next) => {

  const id = req.params;

  try {
    const product = await productMD.productModel.findById(id);
    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({
        "message": "Không tìm thấy sản phẩm!"
      })
    }
  } catch (err) {
    return res.status(400).json({
      msg: err.message,
    });
  }
}

exports.getProductByID = async (id) => {
  try {
     
      const prod = await productMD.productModel.find({ _id: id });

      return { data: prod[0] };
  } catch (error) {
    
      return { status: 500, message: error.message, data: null };
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



// Thêm
exports.add_san_pham = async (req, res, next) => {

  if (req.method == "POST") {

    let file = req.file;

    let variants = req.body.variants;

    // for (let i = 0; req.body.variants.length; i++) {
    //   variants.push({
    //     size: req.body[`variants[${i}].size`],
    //     color: req.body[`variants[${i}].color`],
    //     quantity: req.body[`variants[${i}].quantity`]
    //   });
    // }
    console.log(variants)
    let objSanPham = new productMD.productModel();
    objSanPham.productName = req.body.productName;
    objSanPham.description = req.body.description;
    objSanPham.idProductType = req.body.idProductType;
    objSanPham.price = req.body.price;
    objSanPham.variants = variants;


    try {
      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Upload hình ảnh lên Cloudinary
      const result = await cloudinary.uploader.upload(file.path);
      objSanPham.image = result.secure_url;

      // Trả về URL của hình ảnh đã upload
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

    try {

      let newSanPham = await objSanPham.save();
      return res.status(201).json({
        msg: "Thêm sản phẩm thành công", newSanPham
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }



  }
}
exports.add_san_pham_post = async (req, res, next) => {

  let obj = new productMD.productModel();
  obj.productName = req.body.productName
  obj.description = req.body.description;
  obj.idProductType = req.body.idProductType;
  obj.price = req.body.price;
  obj.image = req.body.image;

    if (req.method == 'POST') {

        try {
            let newPro = await obj.save()
            return res.status(201).json({
                status: 200,
                msg: "Thêm sản phẩm thành công",
                newPro
            });
        } catch (error) {
            return res.send(error.message);
        }

    }
}


exports.addVariant = async (req, res, next) => {
  try {
    const { _id } = req.params;
    let { variants } = req.body;

    // variants.size = size.toUpperCase();

    const product = await productMD.productModel.findById(_id);
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm!' });

    // const existingVariant = product.variants.find(variant =>
    //   variant.size.toLocaleLowerCase() === size.toLocaleLowerCase() &&
    //   variant.color.toLocaleLowerCase() === color.toLocaleLowerCase());
    // if (existingVariant) {
    //   return res.status(400).json({ message: 'Variant đã tồn tại' });
    // }

    // const newVariant = { size, color, quantity };
    // product.variants.push(newVariant);

    variants.forEach(newVariant => {
      const isDuplicate = product.variants.some(
        variant =>
          variant.size.toLowerCase() === newVariant.size.toLowerCase() &&
          variant.color.toLowerCase() === newVariant.color.toLowerCase()
      );
      if (!isDuplicate) {
        product.variants.push(newVariant);
      }
    });


    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// Sửa 
exports.update_san_pham = async (req, res, next) => {
  const { _id, productName, description, idProductType, price, image } = req.body; 

  try {

    const updated = await productMD.productModel.findByIdAndUpdate(
        _id, 
        { productName, description, idProductType, price, image }, 
        { new: true } // Trả về bản ghi đã được cập nhật
    );

    // Kiểm tra nếu không tìm thấy voucher
    if (!updated) {
        return res.status(404).json({ status: 404,msg: "Sản phẩm không tồn tại!" });
    }

    
    return res.status(200).json({
        status: 200,
        msg: "Sản phẩm đã được cập nhật thành công!",
        data: updated
    });

} catch (error) {
    return res.status(500).json({ msg: error.message });
}
}

// Xóa 
exports.delete_san_pham = async (req, res, next) => {
  const { _id } = req.body;
  try {
      // Tìm và xóa voucher theo _id
      const sp = await productMD.productModel.findByIdAndDelete(_id);

      // Kiểm tra nếu không tìm thấy voucher
      if (!sp) {
          return res.status(404).json({ msg: "sản phẩm không tìm thấy" });
      }

      // Gửi phản hồi thành công
      res.status(200).json({ status: 200, msg: "Xóa thành công" });

  } catch (error) {
      // Xử lý lỗi và gửi phản hồi lỗi
      console.error(error);
      return res.status(500).json({
          msg: error.message || "Lỗi server"
      });
  }
}


