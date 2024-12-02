document.addEventListener("DOMContentLoaded", function () {
document.getElementById("default-search").addEventListener("input", function () {
    const searchValue = this.value.trim().toLowerCase(); // Lấy giá trị tìm kiếm, chuyển thành chữ thường
    const rows = document.querySelectorAll("tbody tr"); // Lấy tất cả các hàng trong tbody

    rows.forEach((row) => {
        const emailCell = row.querySelector("td:nth-child(3)"); // Cột chứa email (cột thứ 3)
        if (emailCell) {
            const email = emailCell.textContent.trim().toLowerCase(); // Lấy email trong ô, chuyển thành chữ thường
            if (email.includes(searchValue)) {
                row.style.display = ""; // Hiển thị hàng nếu khớp
            } else {
                row.style.display = "none"; // Ẩn hàng nếu không khớp
            }
        }
    });
});
});
    
function renderTable(page) {
    const tableBody = document.getElementById('table-body-data');
    tableBody.innerHTML = ''; // Xóa dữ liệu cũ trong tbody

    const start = (page - 1) * rowsPerPage;
    const end = page * rowsPerPage;
    const pageData = listUsers.slice(start, end);

    pageData.forEach((item, index) => {
      const tr = document.createElement('tr');
      tr.classList.add('bg-white', 'border-b', 'dark:bg-gray-800', 'dark:border-gray-700', 'hover:bg-gray-50', 'dark:hover:bg-gray-600');
      let jsonString = JSON.stringify(item);
      let jsonStringEscaped = jsonString.replace(/"/g, '&quot;');
      tr.innerHTML = `
 
<td class="w-4 p-4">
<span class="text-gray-900 dark:text-white">${start + index + 1}</span>
</td>
<th id="user-name-${item.idUser}" scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
<span id="fullname-${item.idUser}">${item.fullname}</span>
</th>
<td class="px-6 py-4">${item.email}</td>
<td class="px-6 py-4">
<img class="w-8 h-8 rounded-full" src="${item.image ? item.image : `https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(item.fullname)}`}" alt="user photo">
</td>
<td class="px-6 py-4">${item.role === true ? 'Quản trị viên' : 'Người dùng'}</td>
<td class="">
<button  data-modal-target="data-modal" 
                onclick="EditAccount(${jsonStringEscaped})"  data-modal-toggle="data-modal"
                class="block  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                type="button">
                <img src="/images/edit_738880.png" class="toggleImgOpen">
             </button>
</td>

`;
      
      tableBody.appendChild(tr);
    });
  }


  function renderPagination(totalRows, rowsPerPage, currentPage) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = ''; // Xóa các nút phân trang cũ

    const totalPages = Math.ceil(totalRows / rowsPerPage);

    // Tạo nút "Previous"
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.classList.add('page-btn-act');
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderTable(currentPage);
        renderPagination(totalRows, rowsPerPage, currentPage);
      }
    });
    pagination.appendChild(prevButton);

    // Tạo các nút trang
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.textContent = i;
      button.classList.add('page-btn');
      if (i === currentPage) {
        button.classList.add('active');
      }
      button.addEventListener('click', () => {
        currentPage = i;
        renderTable(currentPage);
        renderPagination(totalRows, rowsPerPage, currentPage);
      });
      pagination.appendChild(button);
    }

    // Tạo nút "Next"
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.disabled = currentPage === totalPages;
    nextButton.classList.add('page-btn-act');
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderTable(currentPage);
        renderPagination(totalRows, rowsPerPage, currentPage);
      }
    });
    pagination.appendChild(nextButton);
  }
