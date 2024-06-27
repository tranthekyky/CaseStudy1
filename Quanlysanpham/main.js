import { Store } from "./store.js"; // Nhập giá trị đc xuất từ module khác
import { Product } from "./product.js";

let store = new Store();

window.addProduct = function () {
    // Hàm này có nhiệm vụ là thêm thuộc tính của  product  và thêm vào mảng sản phẩm

    let nameInput = document.getElementById("nameinput").value;
    let imgInput = document.getElementById("imginput").value;
    let codeInput = document.getElementById("codeinput").value;
    let categoryInput = document.getElementById("categoryinput").value;
    let priceinput = document.getElementById("priceinput").value;
    // Lấy value từ các ô input có id tương ứng
    let formattedPrice = parseInt(priceinput).toLocaleString('vi-VN');
    // Khai báo một biến chứa giá trị giá sản phẩm và có chức năng chuyển đổi chuỗi số thành 
    // mênh giá tiền VN

    let product = new Product(nameInput, imgInput, codeInput, categoryInput, formattedPrice);
    // Khái báo biến product để tạo một đối tượng mới từ lớp Product và có những tham số cụ thể đc định nghia sẳn

    if (nameInput !== "" && imgInput !== "" && codeInput !== "" && categoryInput && formattedPrice !== "") {
        // Lệnh này nếu tất cả value trên mà rổng thì sẽ không đc thực thi
        store.listproduct = localStorage.getItem("LIST-PRODUCT") ? JSON.parse(localStorage.getItem("LIST-PRODUCT")) : [];
        // Quy tắc 3 ngôi nếu tìm trong localstorage có key tền là LIST-PRODUCT thì sẽ mã hoá key đó từ kiểu dữ liệu chuỗi 
        //chuyển thành 1 mảng ocject và gán vào store.listproduct còn nếu không có thì sẽ là mảng rổng
        store.listproduct.push(product);
        //Thêm phần tử vào mảng
        console.log(`Đã thêm : ${product.name}`); // Thông báo đã thêm
    } else {
        alert("Bạn chưa nhập đủ thông tin !");
    }
    document.getElementById("nameinput").value = "";
    document.getElementById("imginput").value = "";
    document.getElementById("codeinput").value = "";
    document.getElementById("categoryinput").value = "";
    document.getElementById("priceinput").value = "";
    // Sau khii đc thêm vào mảng thì các dữ liệu của các ô input sẽ đc xoá
    localStorage.setItem("LIST-PRODUCT", JSON.stringify(store.listproduct));
    // lưu trữ dữ liệu sau khi thay đổi
    showAll();

}
window.deleteProduct = function (index) {
    // Gọi hàm delete nhận một tham số index tương ứng với chỉ số index của mảng sản phẩm
    document.getElementById("searchproduct").value = "";
    // sau khi sử dụng phương thức search và sau đó dử dụng phương thức delete thì dữ liệu trong ô search sẽ đc xoá
    let isconfirm = confirm(`Bạn có thực sự muốn xoá sản phẩm : ${store.listproduct[index].name}`);
    // Hiẻn thị một hộp thoại xác nhận có thực sự muốn xoá sp
    if (isconfirm) {
        console.log(`Đã xoa : ${store.listproduct[index].name}`);
        //Nếu OK sẽ thực thi 
        store.listproduct = localStorage.getItem("LIST-PRODUCT") ? JSON.parse(localStorage.getItem("LIST-PRODUCT")) : [];
        store.listproduct.splice(index, 1);
        // Dùng phương thức splice để xoá phần tử ở vị trí index và xoá số lượng 1 
    }
    localStorage.setItem("LIST-PRODUCT", JSON.stringify(store.listproduct));
    //lưu thay đổi
    showAll();
}
window.editProduct = function (index) {
    // Định nghĩa hàm xử lý edit nhận tham số index
    document.getElementById("searchproduct").value = "";
    let arrProduct = store.listproduct;
    alert("Điền thông tin cần sửa vào form sau đó Update sản phẩm");
    document.getElementById("nameinput").value = arrProduct[index].name;
    document.getElementById("imginput").value = arrProduct[index].img;
    document.getElementById("codeinput").value = arrProduct[index].code;
    document.getElementById("categoryinput").value = arrProduct[index].category;
    document.getElementById("priceinput").value = arrProduct[index].price;
    //Gán thông tin của sản phẩm có sẳn vào giá trị của ô input và thay đổi
    let btnAdd = document.getElementById("btn-add");
    // Lấy phần tử button bằng id
    btnAdd.innerText = `Update`;
    // Sau đó sửa nội dung textnote của phần tử đó = Update 
    btnAdd.onclick = function () {
        updateProduct(index);
        // Thêm attribute onclick vào element btnAdd và gán sự kiện 
    }
    showAll();
}
window.updateProduct = function (index) {
    //Định nghiã hàm Update 
    store.listproduct = localStorage.getItem("LIST-PRODUCT") ? JSON.parse(localStorage.getItem("LIST-PRODUCT")) : [];
    // vào localstorage lấy dữ liệu có sẳn
    store.listproduct[index].name = document.getElementById("nameinput").value;
    store.listproduct[index].img = document.getElementById("imginput").value;
    store.listproduct[index].code = document.getElementById("codeinput").value;
    store.listproduct[index].category = document.getElementById("categoryinput").value;
    store.listproduct[index].price = document.getElementById("priceinput").value;
    // gán Tất cả dữ liệu đã thay đổi vào từng thuộc tính tương ứng của sản phẩm
    alert("Sản phẩm đã được Update ")
    let btnUpdate = document.getElementById("btn-add");
    // Lấy phần tử có id là btn-add
    btnUpdate.innerText = "Add";
    // Sửa nội dung textnote vào phần tử 
    btnUpdate.onclick = function () {
        addProduct(); // gọi event onclick cho phần tử đó và gán vào phương thức add 
    }
    // Có nghiaz là sau khi xử lý funcition update xong thì nút đó sẽ trở về lại là nút add như cũ
    localStorage.setItem("LIST-PRODUCT", JSON.stringify(store.listproduct));
    //Lưu thay đổi vào localstorage

    showAll();
    // console.log(arrProduct);
    document.getElementById("nameinput").value = "";
    document.getElementById("imginput").value = "";
    document.getElementById("codeinput").value = "";
    document.getElementById("categoryinput").value = "";
    document.getElementById("priceinput").value = "";
    //Trả dữ liệu vì trống
}
window.searchProduct = function () {
    //Định nghĩa hàm xử lí sự kiện Search
    let valueSearch = document.getElementById("searchproduct").value;
    // Lấy dữ liệu từ phần tử có id searchproduct
    let arrSearch = store.listproduct
        .map((item, index) => ({ ...item, index })) // Sd phương thức map đi qua từng phần tử trong mảng , và thêm thuộc tính 
        // index tương ứng với index cảu các phần tử trong mảng , 
        .filter(value => {
            return value.name.toLowerCase().includes(valueSearch.toLowerCase())
        }) // sd phương thức filter đi qua từng phần tử trong mảng và sẽ trả về phân tử có thuộc tính name tương ứng với valueSearch

    document.querySelector(".table tbody").innerHTML = "";
    // Sau khi xử lý sự kiện của  phương thức thì dữ liệu hiển thị cũ sẽ ẩn
    let tbody = ``;
    for (let i = 0; i < arrSearch.length; i++) {
        tbody +=
            `
            <tr>
                    <td>${arrSearch[i].name}</td>
                    <td><img src="${arrSearch[i].img}" alt=""></td>
                    <td>${arrSearch[i].code}</td>
                    <td>${arrSearch[i].category}</td>
                    <td>${arrSearch[i].price}</td>
                    <td><button onclick="editProduct(${arrSearch[i].index})" class="btn-edit">Edit</button></td>
                    <td><Button onclick="deleteProduct(${arrSearch[i].index})" class="btn-delete">Delete</Button></td>?
            </tr>
            `;
    }
    document.querySelector(".table tbody").innerHTML = tbody;
    // Hiển thị ra bảng 
    console.log(arrSearch);
    return document.getElementById("searchproduct").value;
    //Trả về giá trị của ô input search
}
window.showAll = function () {
    // ĐỊnh nghia phương thức hiển thị ra màn hình
    store.listproduct = localStorage.getItem("LIST-PRODUCT") ? JSON.parse(localStorage.getItem("LIST-PRODUCT")) : [];
    // lấy dữ liệu ở trong localstorage 
    let count = 0;// Khái báo biển count bằng 0 để hiển thị sô lượng sản phẩm 
    let tbody = ``;
    for (let i = 0; i < store.listproduct.length; i++) {
        // Lặp qua các phần tử trong mảng 
        tbody +=
            `
         <tr>
                <td>${store.listproduct[i].name}</td>
                <td><img src="${store.listproduct[i].img}" alt=""></td>
                <td>${store.listproduct[i].code}</td>
                <td>${store.listproduct[i].category}</td>
                <td>${store.listproduct[i].price}</td>
                <td><button onclick="editProduct(${i})" class="btn-edit">Edit</button></td>
                <td><Button onclick="deleteProduct(${i})" class="btn-delete">Delete</Button></td>
        </tr>
        `;
        // Qua mỗi phần tử sẽ hiện thị mỗi thuộc tính của phần tử đó tương ứng với mỗi td trong table
        count += 1;// Đếm sô lượng sản phẩm

    }
    document.getElementById("count").innerHTML = count; // Hiển thị số lượng sản phẩm
    document.querySelector(".table tbody").innerHTML = tbody;// Hiển thị các thuộc tính của product vào phần tử tbody 


}

showAll();

