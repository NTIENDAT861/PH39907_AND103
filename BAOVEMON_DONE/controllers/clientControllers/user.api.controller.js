const userMD = require('../../models/user.model');
const cloudinary = require('../../cloudinaryConfig');

exports.getUserID = async (req, res, next) => {

    const { id } = req.query;



    try {
        var user = await userMD.userModel.find({ "_id": id });
        return res.status(200).json(
            user
        );
    } catch (error) {
        return res.status(404).send(error.message);
    }
};
exports.getRole = async (req, res, next) => {
    // Lấy email từ URL params
    const { email } = req.params;  // Đây là nơi lấy email từ URL (thí dụ: /api/users/Role/:email)

    try {
        // Tìm kiếm người dùng trong cơ sở dữ liệu bằng email
        const user = await userMD.userModel.findOne({ email });

        // Nếu tìm thấy user, trả về kết quả
        if (!user) {
            return res.status(404).json({ role:  false, msg: 'không có tài khoản'});
        }

     
        return res.status(200).json({ role: user.role });

    } catch (error) {
        // Xử lý lỗi
        return res.status(500).json({ message: error.message, role: false });
    }
};


exports.getUser = async (req, res, next) => {

    const { email } =pmas;

    console.log(email);

    try {
        var user = await userMD.userModel.findOne({ "email": email });
        console.log(user);
        return res.status(200).json(
            user
        );
    } catch (error) {
        return res.status(404).send(error.message);
    }
};


exports.updateUser = async (req, res, next) => {
    const _id = req.body;
    const file = req.file;


    if (req.method == "PUT") {
        try {

            let objUser = new userMD.userModel();

            objUser.fullname = req.body.fullname;
            objUser.birthday = req.body.birthday;
            objUser._id = _id;

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
                res.status(500).json({ message: error.message });
            }
            await userMD.userModel.findByIdAndUpdate(_id, objUser);
            res.status(200).json({ msg: "Sửa thành công!" });
        } catch (error) {
            return res.send(error.message);
        }
    }

}