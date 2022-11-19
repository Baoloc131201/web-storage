document.getElementById("showcart").style.display = "none";
var giohang1 = new Array();
function showcountsp() {
  var giohang = JSON.parse(localStorage.getItem("giohang2"));
  if (giohang != null) {
    document.getElementById("countsp").innerHTML = giohang.length;
  } else {
    return;
  }
}

function themvaogiohang(x) {
  var giohang = JSON.parse(localStorage.getItem("giohang2"));

  var boxsp = x.parentElement.children;
  var hinh = boxsp[0].children[0].src;
  var gia = boxsp[1].children[0].innerText;
  var tensp = boxsp[2].innerText;
  var soluong = parseInt(boxsp[3].value);
  var sp = new Array(hinh, gia, tensp, soluong);
  giohang1.push(sp);
  var giohangtrunggian = localStorage.setItem(
    "giohang1",
    JSON.stringify(giohang1)
  );

  if (giohang) {
    var flag = 0;
    for (let i = 0; i < giohang.length; i++) {
      if (giohang[i][2] == tensp) {
        flag++;
        soluong += parseInt(giohang[i][3]);
        giohang[i][3] = soluong;
        break;
      }
    }
    if (flag == 0) {
      giohang.push(sp);
    }
  } else {
    giohang = JSON.parse(localStorage.getItem("giohang1"));
    localStorage.removeItem("giohang1");
  }

  localStorage.setItem("giohang2", JSON.stringify(giohang));
  showcountsp();
  showMyCard();
}

function showMyCard() {
  var giohang = JSON.parse(localStorage.getItem("giohang2"));
  var ttgiohang = "";
  var tong = 0;
  for (let i = 0; i < giohang.length; i++) {
    var thanhtien = giohang[i][1] * giohang[i][3];
    tong += thanhtien;
    ttgiohang +=
      "<tr>" +
      "<td>" +
      (i + 1) +
      "</td>" +
      // "<td><img src="+'giohang[i][0]'+"></td>"+
      `<td><img src=${giohang[i][0]}></td>` +
      "<td>" +
      giohang[i][2] +
      "</td>" +
      "<td>" +
      giohang[i][1] +
      "</td>" +
      "<td>" +
      giohang[i][3] +
      "</td>" +
      "<td>" +
      `<div>
      ${thanhtien}
      </div>` +
      "</td>" +
      "<td>" +
      "<button onclick='xoasp(this)'>Xóa</button>" +
      "</td>" +
      "</tr>";
  }

  ttgiohang += `<tr>
     <th colspan="6">Tổng Đơn Hàng</th>
     <th>
      <div>${tong}</div>
     </th>
    </tr>`;

  document.getElementById("myCard").innerHTML = ttgiohang;
}
function xoasp(x) {
  var tr = x.parentElement.parentElement;
  var tensp = tr.children[2].innerText;
  console.log(tr);
  tr.remove();
  var giohang = JSON.parse(localStorage.getItem("giohang2"));
  for (let i = 0; i < giohang.length; i++) {
    if (giohang[i][2] == tensp) {
      giohang.splice(i, 1);
      showcountsp();
    }
  }
  localStorage.setItem("giohang2", JSON.stringify(giohang));
  console.log(giohang);
  alert("bạn có muốn xóa sản phẩm " + tensp + " không");

  showMyCard();
  window.location.reload();
}
function showcart() {
  x = document.getElementById("showcart");
  if (x.style.display == "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
  showMyCard();
  showcountsp();
}

function tieptucdathang() {
  localStorage.removeItem("giohang2");
}
function showGioHang_ThanhToan() {
  var giatri = localStorage.getItem("giohang2");
  var giohang = JSON.parse(giatri);
  var ttgiohang = "";
  var tong = 0;
  for (let i = 0; i < giohang.length; i++) {
    var thanhtien = giohang[i][1] * giohang[i][3];
    console.log(thanhtien);
    tong += thanhtien;
    ttgiohang +=
      "<tr>" +
      "<td>" +
      (i + 1) +
      "</td>" +
      // "<td><img src="+'giohang[i][0]'+"></td>"+
      `<td><img src=${giohang[i][0]}></td>` +
      "<td>" +
      giohang[i][2] +
      "</td>" +
      "<td>" +
      giohang[i][1] +
      "</td>" +
      "<td>" +
      giohang[i][3] +
      "</td>" +
      "<td>" +
      `<div>
      ${thanhtien}
      </div>` +
      "</td>" +
      "</tr>";
  }
  ttgiohang +=
    "<tr>" +
    "<th colspan='5'>" +
    "Tổng Đơn Hàng" +
    "</th>" +
    `<th>
      <div>${tong}</div>
     </th>` +
    "</tr>";

  document.getElementById("myCard").innerHTML = ttgiohang;
}

function dongydathang() {
  var ttnhanhang = document.getElementById("thongtinnhanhang").children;
  console.log(ttnhanhang);
  var hoten = ttnhanhang[0].children[1].children[0].value;
  var diachi = ttnhanhang[1].children[1].children[0].value;
  var dienthoai = ttnhanhang[2].children[1].children[0].value;
  var email = ttnhanhang[3].children[1].children[0].value;
  var nguoinhan = new Array(hoten, diachi, dienthoai, email);
  localStorage.setItem("nguoinhan", JSON.stringify(nguoinhan));

  window.location.assign("donhang.html");
}

function showthongtinnguoinhan() {
  var ttnguoinhan = JSON.parse(localStorage.getItem("nguoinhan"));
  var tt = `<tr>
    <td width="20%">Họ tên</td>
    <td>${ttnguoinhan[0]}</td>
</tr>
<tr>
    <td>Địa chỉ</td>
    <td>${ttnguoinhan[1]}</td>
</tr>
<tr>
    <td>Điện thoại</td>
    <td>${ttnguoinhan[2]}</td>
</tr>
<tr>
    <td>Email</td>
    <td>${ttnguoinhan[3]}</td>
</tr>`;
  document.getElementById("thongtinnhanhang").innerHTML = tt;
}

function deleteAll() {
  localStorage.removeItem("giohang2");
  window.location.reload();
  showMyCard();
  showcountsp();
}
