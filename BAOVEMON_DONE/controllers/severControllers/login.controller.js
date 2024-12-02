var multer = require('multer');
var fs = require('fs');
const { query } = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { auth } = require('../../firebaseConfig');
const notifier = require('node-notifier');
const path = require('path');
const { error } = require('console');
const UserModel = require('../../models/user.model');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const SECRET_KEY = 'makeTokenMD08';



exports.auth = async (req, res) => {
    const { email,password,fullName } = req.body;
    const type = req.query.type;
    console.log(req.query.type);
    const user = await UserModel.userModel.findOne({email}); 
    console.log(user);
    if (type === 'login') {
        if(user.role == true){
            signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
             try {
      
              // const token = jwt.sign({_id:user._id, email:email.email}, SECRET_KEY, { expiresIn: '1h' }); // Hết hạn sau 1 giờ
              
             } catch (error) {
              console.log(error.message)
             }
              // Đăng nhập thành công
              
              notifier.notify({
                  title: 'Đăng nhập thành công',
                  message: 'Chào mừng bạn quay trở lại!',
                  sound: true, // Tùy chọn để phát âm thanh thông báo,
                  appID:"Shop bán áo MD08",
                  icon: path.join(__dirname, '../public/images/logoMD08_128x128.png'),
                  wait:true,
                });
              
              // res.set('Authorization', `Bearer ${token}`);
              // console.log(token)
              res.redirect('/products');
            })
            .catch((error) => {
      
              const errorCode = error.code;
              const errorMessage = getFirebaseErrorMessage(errorCode);
              console.log(error.message)
      
              notifier.notify({
                  title: 'Lỗi đăng nhập',
                  message: errorMessage,
                  sound: true, // Tùy chọn để phát âm thanh thông báo,
                  appID:"Shop bán áo MD08",
                  icon: path.join(__dirname, '../public/images/logoMD08_128x128.png'),
                  wait:true,
                });
      
             
      
              console.log(errorMessage);
              return res.render('login/index');
      
            });
        }else{
            notifier.notify({
                title: 'Lỗi đăng nhập',
                message: "Không có quyền truy cập!",
                sound: true, // Tùy chọn để phát âm thanh thông báo,
                appID:"Shop bán áo MD08",
                icon: path.join(__dirname, '../public/images/logoMD08_128x128.png'),
                wait:true,
              });
              return res.render('login/index');
        }
        
    }else if(type === 'register'){
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Đăng ký thành công
          notifier.notify({
            title: 'Thành công',
            message: 'Tạo tài khoản thành công!\n Chào mừng bạn.',
            sound: true, // Tùy chọn để phát âm thanh thông báo,
            appID:"Shop bán áo MD08",
            icon: path.join(__dirname, '../public/images/logoMD08_128x128.png'),
            wait:true,
          });


          let objUser = new UserModel.userModel();
          objUser.email = email;
          objUser.fullname = fullName;
          objUser.role = true;
          objUser.image = "";

          await objUser.save();
          return res.redirect('/auth' );

          
        })
        .catch((error) => {

          const errorCode = error.code;
          const errorMessage = getFirebaseErrorMessage(errorCode);
          // Xử lý lỗi
          notifier.notify({
            title: 'Lỗi đăng ký',
            message: errorMessage,
            sound: true, // Tùy chọn để phát âm thanh thông báo,
            appID:"Shop bán áo MD08",
            icon: path.join(__dirname, '../public/images/logoMD08_128x128.png'),
            wait:true,
          });
          // return res.render('login/index');
        

        });
    }else{
        res.status(400).send('Tham số type không hợp lệ');
    }
    



  };

  exports.showForm = (req, res, next) => {
    res.render('login/index',{error:false,email:""},)
}

function getFirebaseErrorMessage(errorCode) {
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'Địa chỉ email không hợp lệ.';
        case 'auth/user-disabled':
            return 'Tài khoản đã bị vô hiệu hóa.';
        case 'auth/user-not-found':
            return 'Tài khoản không tồn tại.';
        case 'auth/wrong-password':
            return 'Mật khẩu không chính xác.';
        case 'auth/email-already-in-use':
            return 'Email đã được sử dụng cho tài khoản khác.';
        case 'auth/weak-password':
            return 'Mật khẩu quá yếu. Vui lòng nhập mật khẩu mạnh hơn.';
        case 'auth/too-many-requests':
            return 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau.';
        case 'auth/credential-already-in-use':
            return 'Thông tin xác thực đã được sử dụng cho tài khoản khác.';
        case 'auth/invalid-credential':
            return 'Tài khoản hoặc mật khẩu không chính xác.';
        case 'auth/operation-not-allowed':
            return 'Phương thức xác thực này đã bị vô hiệu hóa.';
        case 'auth/network-request-failed':
            return 'Lỗi mạng. Vui lòng kiểm tra kết nối internet.';
        case 'auth/account-exists-with-different-credential':
            return 'Tài khoản đã tồn tại với thông tin xác thực khác.';
        case 'auth/requires-recent-login':
            return 'Cần đăng nhập lại để xác nhận thông tin.';
        default:
            return 'Đã xảy ra lỗi. Vui lòng thử lại.';
    }
}



//   exports.register = (req, res) => {
//     const { email, password } = req.body;
  
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Đăng ký thành công
//         res.status(200).send('Đăng ký thành công');
//       })
//       .catch((error) => {
//         // Xử lý lỗi
//         res.status(400).send(error.message);
//       });
//   };



