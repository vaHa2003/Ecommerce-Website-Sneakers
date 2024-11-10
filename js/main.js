const btn_now = document.querySelectorAll("#btn-now");

const productId = 123; // Thay 123 bằng ID sản phẩm bạn muốn hiển thị

// Gắn sự kiện click vào nút
btn_now.forEach((button) => {
  button.addEventListener("click", function() {
    const productId = button.getAttribute("data-product-id");
    viewProductDetail(productId);
  });
});

// ======== show & remove menu =====
let menu = document.getElementById("menu");
let menuShow = document.getElementById("nav__show");

menu.addEventListener("click", () => {
  menuShow.classList.toggle("show__menu");
});

// ===== slide show =====
$(document).ready(function () {
  $(".slider__show").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    prevArrow:
      "<button type='button' class='slick-prev pull-left'><i class='bx bx-left-arrow-alt'></i></button>",
    nextArrow:
      "<button type='button' class='slick-next pull-right'><i class='bx bx-right-arrow-alt'></i></button>",
  });
});

// =========== Text Run =========
// slide 1
let text = new Typed(".auto-type", {
  strings: ["White Mother"],
  typeSpeed: 50,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});
// slide 2
let text1 = new Typed(".auto__text-slide2", {
  strings: ["Individually Handcrafted "],
  typeSpeed: 50,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

// slide 3
let text2 = new Typed(".auto__textSlide3", {
  strings: ["Fountain Pen"],
  typeSpeed: 50,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

// =============  render view =============
// Dữ liệu sản phẩm
const products = [
  {
    id: 1,
    name: "Tycoon Lustrous Tan Fountain Pen",
    price: "3.273.288",
    image: "./img/woman3.png",
  },
  {
    id: 2,
    name: "Tycoon Signature Blue Rollerball Pen",
    price: "3.273.288",
    image: "./img/women1.png",
  },
  {
    id: 3,
    name: "Tycoon Signature Blue Fountain Pen",
    price: "4.972.376",
    image: "./img/women2.png",
  },
  {
    id: 4,
    name: "Tycoon Lustrous Tan Rollerball Pen",
    price: "2.000.000",
    image: "./img/women4.png",
  },
];

const menProducts = [
  {
    id: 5,
    name: "Closer LUXE White Mother of Pearl Rollerball Pen",
    price: "2.490.000",
    image: "./img/men1.png",
  },
  {
    id: 6,
    name: "Closer LUXE White Mother of Pearl Fountain Pen",
    price: "2.590.000",
    image: "./img/men2.png",
  },
  {
    id: 7,
    name: "Closer LUXE Sapphire Abalone Shell Fountain Pen",
    price: "1.681.737",
    image: "./img/men3.png",
  },
  {
    id: 8,
    name: "Closer LUXE Sapphire Abalone Shell Rollerball Pen",
    price: "3.390.000",
    image: "./img/men4.png",
  },
];

// Lưu danh sách sản phẩm vào localStorage
localStorage.setItem("products", JSON.stringify(products));
localStorage.setItem("menProducts", JSON.stringify(menProducts));

// Hàm render danh sách sản phẩm
function renderProductList(containerId, productList) {
  const container = document.getElementById(containerId);

  productList.forEach((product) => {
    const productHTML = `
      <div class="women__item">
        <p class="women__item-sale">Sale</p>
        <div class="women__item-info">
          <!-- Bao quanh ảnh bằng thẻ <a> để chuyển hướng sang trang chi tiết -->
          <a href="product-detail.html?id=${product.id}">
            <img src="${product.image}" alt="${product.name}" class="women__item-img" />
          </a>
          <div class="women__description">
            <h3 class="women__title">${product.name}</h3>
            <div style="display: flex; justify-content: center">
              <p class="women__price">${product.price}</p>
              <sup>đ</sup>
            </div>
            <div class="women__btn">
              <button class="women__btn-item" onclick="viewProductDetail(${product.id})">
               View to cart
                <i class="bx bx-right-arrow-alt icon" id="women__btn-arrow"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", productHTML);
  });
}

// Hàm xử lý khi nhấn "Add to Cart" để xem chi tiết sản phẩm
function viewProductDetail(productId) {
  // Chuyển hướng đến trang chi tiết sản phẩm
  window.location.href = `product-detail.html?id=${productId}`;
}

// Lấy dữ liệu từ localStorage
const productsFromStorage = JSON.parse(localStorage.getItem("products")) || [];
const menProductsFromStorage =
  JSON.parse(localStorage.getItem("menProducts")) || [];

// Gọi hàm render cho cả hai danh sách sản phẩm
renderProductList("product-list", productsFromStorage);
renderProductList("product-men", menProductsFromStorage);

// ============  xử lý khi nhấn username trên header để hiện popup đăng xuất và tắt popup đăng nhập
document.addEventListener("DOMContentLoaded", () => {
  // Kiểm tra nếu có dữ liệu userData trong localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData && userData.fullName) {
    // Thay thế icon user bằng tên người dùng
    const loginLink = document.getElementById("login");
    loginLink.innerHTML = `<span>Welcome, ${userData.fullName}</span>`;

    // Xử lý sự kiện khi nhấn vào tên người dùng
    loginLink.addEventListener("click", (event) => {
      event.preventDefault(); // Ngừng hành động mặc định (di chuyển tới trang login)

      // Ẩn popup đăng nhập (nếu có)
      const loginPopup = document.getElementById("form");
      if (loginPopup) {
        loginPopup.style.display = "none"; // Ẩn popup đăng nhập
      }

      // Hiển thị popup đăng xuất
      const logoutModal = document.getElementById("logoutModal");
      logoutModal.style.display = "flex"; // Hiển thị popup đăng xuất
    });
  }

  // Sự kiện cho nút "Yes" trong popup (đăng xuất)
  const confirmLogoutButton = document.getElementById("confirmLogout");
  confirmLogoutButton.addEventListener("click", () => {
    // Xóa dữ liệu userData khỏi localStorage
    localStorage.removeItem("userData");
    window.location.href = "home.html"; // Chuyển hướng đến trang login
  });

  // Sự kiện cho nút "No" trong popup (hủy bỏ đăng xuất)
  const cancelLogoutButton = document.getElementById("cancelLogout");
  cancelLogoutButton.addEventListener("click", () => {
    const logoutModal = document.getElementById("logoutModal");
    logoutModal.style.display = "none"; // Ẩn popup đăng xuất
  });
});

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng trên header
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Tìm phần tử để hiển thị số lượng
  const cartCountElement = document.querySelector(".total-number p");
  if (cartCountElement) {
    cartCountElement.textContent = totalQuantity;
  }
}

// Gọi hàm updateCartCount khi trang được tải để hiển thị số lượng giỏ hàng ban đầu
updateCartCount();
