var multer = require('multer');
var fs = require('fs');
const userMD = require('../../models/user.model');



// Get list người dùng
exports.listUsers = async (req, res, next) => {
    try {
        return res.status(200).json(
            await userMD.userModel.find()
        );
    } catch (error) {
        return res.status(error.status).json({
            msg: error.message
        });
    }
}
exports.getListUserJson = async () => {
    try {
        
        const user = await userMD.userModel.find();

        return { data: user };  
    } catch (error) {
      
        return { status: 500, message: error.message, data: null };
    }
};
exports.numberUserString = async (req, res, next) => {
    try {
        const count = await userMD.userModel.countDocuments(); 
        return res.send(count.toString());   // Trả về số lượng người dùng
    } catch (error) {
        return  res.send("0");;
    }
};
exports.numberUsers = async (req, res, next) => {
    try {
        const count = await userMD.userModel.countDocuments(); 
        return count ;
    } catch (error) {
        return  0;
    }
};

// Sửa người dùng
exports.updateUser = async (req, res, next) => {
    const _id = req.body;
    const file = req.file;

    if (req.method == "POST") {
        try {

            let objUser = new userMD.userModel();
            objUser._id = _id;

            objUser.fullname = req.body.fullname;
            objUser.birthday = req.body.birthday;
            try {
                if (!file) {
                    objUser.image = userMD.userModel.findOne({ "_id": _id }).image;
                } else {
                    const result = await cloudinary.uploader.upload(file.path);
                    objUser.image = result.secure_url;
                }
                // Upload hình ảnh lên Cloudinary

                // Trả về URL của hình ảnh đã upload
            } catch (error) {
                return res.send(error.message);
            }
            let newObjUpdate = await userMD.userModel.findByIdAndUpdate(_id, objUser);
            let listUsers = userMD.userModel.find();
            res.render({ listUsers, newObjUpdate });
        } catch (error) {
            return res.send(error.message);
        }
    }

}

// Xóa người dùng
exports.deleteUsers = async (req, res, next) => {
    let _id = req.params._id;

    try {
        await userMD.userModel.findByIdAndDelete(_id);
        let listUsers = userMD.userModel.find();
        return res.send({msg:"Xóa thành công"});

    } catch (error) {
        return res.send(error.message)
    }
    res.status(200).json({ msg: 'xóa' });

}


exports.getAccount = async (email) => {
    try {
        // Tìm người dùng theo email trong cơ sở dữ liệu
        const user = await userMD.userModel.find({ email: email });

        return { user: user[0] };  // Giả sử bạn chỉ muốn lấy 1 người dùng, không phải array
    } catch (error) {
        // Trả về lỗi nếu có sự cố trong khi tìm kiếm người dùng
        return { status: 500, message: error.message, user: null };
    }
};
exports.getFullNameID = async (id) => {
    try {
        // Tìm người dùng theo email trong cơ sở dữ liệu
        const user = await userMD.userModel.find({ _id: id });

        return { fullname: user[0].fullname };  // Giả sử bạn chỉ muốn lấy 1 người dùng, không phải array
    } catch (error) {
        // Trả về lỗi nếu có sự cố trong khi tìm kiếm người dùng
        return { status: 500, message: error.message, user: null };
    }
};
exports.UpdateAccountWeb = async (req, res, next) => {
 const { _id, birthday, email, fullname, role, image } = req.body; 
    try {
        const updateAC = await userMD.userModel.findByIdAndUpdate(
            _id, 
            { birthday, email, fullname, role, image }, 
            { new: true } 
        );

     
        if (!updateAC) {
            return res.status(403).json({ status: 404,msg: "Account không tồn tại!" });
        }

        // Trả về kết quả sau khi cập nhật
        return res.status(200).json({
            status: 200,
            msg: "Account đã được cập nhật thành công!",
            data: updateAC
        });

    } catch (error) {
       
        console.error(error);
        return res.status(500).json({
            msg: error.message || "Lỗi server"
        });
    }
};
