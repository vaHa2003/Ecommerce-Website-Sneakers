// ======= tooggle respon mobile ======
let menu = document.getElementById("menu");
let menuShow = document.getElementById("nav__show");

menu.addEventListener("click", () => {
  menuShow.classList.toggle("show__menu");
});

// ==== Show modal cart ========
const showCart = document.getElementById("showCart");
console.log("vietanh ~ showCart:", showCart);
const modalCart = document.getElementById("modalCart");
const closeCart = document.querySelector(".modal__form-close");

// open modal cart
showCart.onclick = () => {
  modalCart.classList.toggle("open");
};

// close modal cart
closeCart.onclick = () => {
  modalCart.classList.remove("open");
};

// click ra ngoài modal cart mất
const modalCarts = document.getElementById("modalCart");
window.onclick = (e) => {
  if (e.target === modalCarts) {
    modalCart.classList.remove("open");
  }
};


// function openShopping(){
//   const showCart = document.getElementById("showCart");
//   console.log("vietanh ~ showCart:", showCart);
//   const modalCart = document.getElementById("modalCart");
//   const closeCart = document.querySelector(".modal__form-close");
  
//   // open modal cart
//   showCart.onclick = () => {
//     modalCart.classList.toggle("open");
//   };
  
//   // close modal cart
//   closeCart.onclick = () => {
//     modalCart.classList.remove("open");
//   };
  
//   // click ra ngoài modal cart mất
//   const modalCarts = document.getElementById("modalCart");
//   window.onclick = (e) => {
//     if (e.target === modalCarts) {
//       modalCart.classList.remove("open");
//     }
//   };
// }
// openShopping()

// ===============

// Lấy danh sách sản phẩm từ localStorage
let allProducts = JSON.parse(localStorage.getItem("products")) || [];
let menProducts = JSON.parse(localStorage.getItem("menProducts")) || [];

// Kết hợp tất cả các sản phẩm vào một danh sách
let allAvailableProducts = [...allProducts, ...menProducts];

// Lấy id sản phẩm từ URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id")); // Lấy id từ query string

// Tìm sản phẩm theo ID
const product = allAvailableProducts.find((p) => p.id === productId);

if (product) {
  // Nếu tìm thấy sản phẩm, hiển thị chi tiết sản phẩm
  const productDetailContainer = document.getElementById(
    "product-detail-container"
  );

  // Cập nhật HTML sản phẩm với các giá trị an toàn
  const productHTML = `
    <div class="product-detail">
      <div class="product-detail__container">
        <div class="product-detail__img">
          <div class="product-detail__img-item">
            <img src="${product.image}" alt="${product.name}" />
          </div>
           <div class="product-detail__img-item">
              <img src="./img/men2.png" alt="Product Image 2" />
            </div>
        </div>
        <div class="product-detail__info">
          <div class="product-detail__info-container">
            <h2 class="product-detail__info-title">${product.name}</h2>
            <ul class="product-detail__info-list">
              <li class="product-detail__info-item">- Individually Handcrafted</li>
              <li class="product-detail__info-item">- Limited Production</li>
              <li class="product-detail__info-item">- Mother of Pearl | Palladium | 22 Kt Gold</li>
            </ul>
            <p class="product-detail__info-price">${product.price} <sup>đ</sup></p>
            <p class="product-detail__info-configure">Configure your pen</p>
            <div class="product-detail__info-freeship">
              <span><i class="fa-solid fa-cube" style="font-size: 26px"></i></span>
              <p class="product-detail__info-shipping">Free standard shipping in the USA</p>
            </div>
            <div class="product-detail-btn">
              <button class="product-detail__info-btn product-detail__info-btn--add" onclick="addToCart(${product.id})">ADD TO CART</button>
              <button class="product-detail__info-btn product-detail__info-btn--buy" onclick="openShopping()">Buy with shop</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  productDetailContainer.innerHTML = productHTML;

  // Cập nhật tiêu đề của trang với tên sản phẩm
  document.title = product.name;
} else {
  // Nếu không tìm thấy sản phẩm, hiển thị thông báo lỗi
  document.getElementById("product-detail-container").innerHTML =
    "<p>Sản phẩm không tồn tại.</p>";
  document.title = "Sản phẩm không tồn tại";
}

// Hàm cập nhật số lượng sản phẩm duy nhất trong giỏ hàng trên header
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Cập nhật số lượng giỏ hàng bằng số sản phẩm duy nhất
  const cartCountElement = document.querySelector(".total-number p");
  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
  }
}
updateCartCount();

// =========  Hàm xử lý khi nhấn "Add to Cart" =========
function addToCart(productId) {
  // Kiểm tra xem người dùng đã đăng nhập chưa
  const userData = JSON.parse(localStorage.getItem("userData")); // Giả sử thông tin người dùng được lưu ở đây

  if (!userData) {
    // Nếu không có thông tin người dùng (chưa đăng nhập), hiển thị modal login
    const modal = document.getElementById("form");
    if (modal) {
      modal.style.display = "flex"; 
    }
    return; 
  }

  // Nếu đã đăng nhập, thực hiện thêm sản phẩm vào giỏ hàng
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productToAdd = allAvailableProducts.find(
    (item) => item.id === productId
  ); // Sử dụng allAvailableProducts thay vì product

  const existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...productToAdd, quantity: 1 });
  }

  // Lưu giỏ hàng vào localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`Đã thêm sản phẩm "${productToAdd.name}" vào giỏ hàng.`);

  // Cập nhật số lượng giỏ hàng sau khi thêm sản phẩm
  renderCartItems();
  updateCartCount();
}

// ============= Hiển thị danh sách sản phẩm ===========
const productListContainer = document.getElementById("product__list");
allAvailableProducts.forEach((product) => {
  const productHTML = `
    <div class="women__item">
      <p class="women__item-sale">Sale</p>
      <div class="women__item-info">
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
            <button class="women__btn-item" onclick="addToCart(${product.id})">
              Add to Cart
              <i class="bx bx-right-arrow-alt icon" id="women__btn-arrow"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  productListContainer.innerHTML += productHTML;
});

// ============  handle đăng xuất ===========
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

      // Hiển thị popup đăng xuất
      const logoutModal = document.getElementById("logoutModal");
      logoutModal.style.display = "flex"; // Hiển thị popup đăng xuất
      // Ẩn popup đăng nhập (nếu có)
      const loginPopup = document.getElementById("form");
      if (loginPopup) {
        loginPopup.style.display = "none"; // Ẩn popup đăng nhập
      }
    });
  }

  // Sự kiện cho nút "Yes" trong popup (đăng xuất)
  const confirmLogoutButton = document.getElementById("confirmLogout");
  confirmLogoutButton.addEventListener("click", () => {
    // Xóa dữ liệu userData khỏi localStorage
    localStorage.removeItem("userData");
    localStorage.removeItem("cart");
    window.location.href = "home.html";
  });

  // Sự kiện cho nút "No" trong popup (hủy bỏ đăng xuất)
  const cancelLogoutButton = document.getElementById("cancelLogout");
  cancelLogoutButton.addEventListener("click", () => {
    const logoutModal = document.getElementById("logoutModal");
    logoutModal.style.display = "none";
  });
});


close.addEventListener("click", () => {
  showModal.classList.remove("open");
});