
document.addEventListener('DOMContentLoaded', function () {
  const btnSigout = document.getElementById('sigout');

  if (btnSigout) { // Kiểm tra nếu phần tử tồn tại
      btnSigout.addEventListener('click', function (event) {
          event.preventDefault();
          deleteCookie('username');
          window.location.href = "/login";
      });
  }
});
function calculateDaysRemaining(targetDateString) {
 
  const targetDate = new Date(targetDateString);

 
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); 


  const timeDifference = targetDate - currentDate;


  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));


  return daysRemaining > 0
    ? `Còn ${daysRemaining} ngày`
    : daysRemaining === 0
      ? `Hôm nay là ngày đó!`
      : `Ngày đã qua ${Math.abs(daysRemaining)} ngày`;
}



///code FUNCTION

function CheckLogin() {
  if (getCookie('username') != null) {
    window.location.href = "/home";
  }
}
function setCookie(name, value) {
  const expires = new Date();
  expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000)); // Thời gian hết hạn: 1 ngày

  document.cookie = name + "=" + (value || "") + "; expires=" + expires.toUTCString() + "; path=/";
}

// Hàm lấy giá trị cookie theo tên
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length); // Trả về giá trị cookie
    }
  }
  return null; // Nếu cookie không tồn tại, trả về null
}
// Hàm xóa cookie theo tên
function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}


async function openOrder(order) {

  var nguoiMua = document.getElementById('nguoi-mua');
  var sanPham = document.getElementById('san-pham');
  var Gia = document.getElementById('gia');
  var phuongThuc = document.getElementById('phuong-thuc');
  var thoiGian = document.getElementById('thoi-gian');


  sanPham.value = await getSanPham(order._id);
  nguoiMua.value = await getUsername(order.idUser);
  Gia.value = order.totalPrice;
  phuongThuc.value = order.payment;
  thoiGian.value = formatDateTime(order.updatedAt);

}
async function EditAccount(i) {

  var img_account = document.getElementById('img-account');
  var sinhNhat = document.getElementById('sinh-nhat');
  var chucVuSelect = document.getElementById('chuc-vu');
  var hoVaTen = document.getElementById('ho-va-ten');
  var _id = document.getElementById('_id');
  var eMail = document.getElementById('email');
  const dataModal = new Modal(document.getElementById('data-modal'));
  const close = document.getElementById('data-modal-close');
  dataModal.show();


  close.addEventListener("click", ()=> {
     dataModal.hide();
  })
  if (i.image == "") {
    img_account.src = "https://ui-avatars.com/api/?background=random&name=" + i.fullname;
  }
  else {
    img_account.src = i.image;
  }

  hoVaTen.value = i.fullname;
  sinhNhat.value = i.birthday;
  eMail.value = i.email;
  _id.value = i._id;

  if (i.role === true) {
    chucVuSelect.value = "true";
  } else {
    chucVuSelect.value = "false";
  }

}
function formatDateTime(isoString) {
  // Tạo đối tượng Date từ chuỗi ISO 8601
  const date = new Date(isoString);

  // Lấy các thành phần thời gian
  const seconds = String(date.getSeconds()).padStart(2, '0'); // Giây (2 chữ số)
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Phút (2 chữ số)
  const hours = String(date.getHours()).padStart(2, '0'); // Giờ (2 chữ số)
  const day = String(date.getDate()).padStart(2, '0'); // Ngày (2 chữ số)
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng (1-12)
  const year = date.getFullYear(); // Năm

  // Định dạng và trả về chuỗi theo định dạng yêu cầu
  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
}
async function getUsername(id) {
  var zzz = "";
  if (id == null) {
    zzz = null
  }
  else {
    const API_URL = `/api/users/usersID?id=${id}`;
    const response = await fetch(API_URL, {
      method: "GET"
    });

    const data = await response.json();
    zzz = data[0].fullname;
    // Trả về fullname từ API
  }
  return zzz;
}
async function getSanPham(id) {
  var zzz = "";
  
    const API_URL = `/api/products/ProductID/${id}`;
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    if(data!= null)
    {
      zzz = data.ProductName;
    }
 
  
  return zzz;
}

async function EditAccountZ() {
  var _id = document.getElementById('_id').value;
  var image = document.getElementById('img-account').src;
  var email = document.getElementById('email').value;
  var fullname = document.getElementById('ho-va-ten').value;
  var role = document.getElementById('chuc-vu').value;
  var birthday = document.getElementById('sinh-nhat').value;

  const data = {
    _id,
    image,
    email,
    fullname,
    role,
    birthday,
    __v: 0
  }

  var api = "/users/update-account";
  const response = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  const data_result = await response.json();
  Swal.fire({
    title: "Thông báo",
    text: data_result.status === 200 ? "Sửa thành công!" : "Sửa không thành công!",
    icon: data_result.status === 200 ? "success" : "error"
  }).then(() => {

    setTimeout(() => location.reload(), 1000);

  });

}
function previewImage() {
  var fileInput = document.getElementById('img_account'); // Lấy input file
  var file_view = document.getElementById('img-account'); // Lấy thẻ img để hiển thị ảnh
  const file = fileInput.files[0];  // Lấy file từ input

  if (!file) {
    alert("Vui lòng chọn ảnh để upload!");
    return;
  }

  // Tạo FormData để gửi ảnh
  const formData = new FormData();
  formData.append("image", file);

  // Sử dụng Fetch API để gửi file lên server
  fetch('/upload-image', {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Lỗi tải ảnh lên');
      }
      return response.json(); // Giải mã JSON từ phản hồi
    })
    .then(data => {
      if (data.status === 200) {
        file_view.src = data.link_image; // Cập nhật ảnh hiển thị
      } else {
        alert("Đã xảy ra lỗi trong quá trình tải ảnh.");
      }
    })
    .catch(error => {
      console.error("Có lỗi xảy ra:", error);
      alert("Lỗi kết nối với server.");
    });
}

function removeVietnameseAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
}
function formatCurrency(amount, currency = 'VND', locale = 'vi-VN') {
  return amount.toLocaleString(locale, {
    style: 'currency',
    currency: currency
  });
}
function encode_array_item(iii) {
  let jsonString = JSON.stringify(iii);
  let jsonStringEscaped = jsonString.replace(/"/g, '&quot;');
  return jsonStringEscaped;
}

