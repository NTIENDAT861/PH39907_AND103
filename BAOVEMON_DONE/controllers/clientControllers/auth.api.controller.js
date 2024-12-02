const UserModel = require('../../models/user.model');

exports.signup= async (req, res, next) => {

    const {email,fullname} = req.body;


    let objUser = new UserModel.userModel();
    objUser.email = email;
    objUser.fullname = fullname;
    objUser.role = false;
    objUser.image = ""

    await objUser.save();
    return res.send("Đăng ký thành công")
    
}