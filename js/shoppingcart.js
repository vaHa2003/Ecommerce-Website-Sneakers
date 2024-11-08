// Hàm xử lý khi nhấn "Add to Cart"
function addCart(productsImg, productsName, productsPrice) {
  // Lấy giỏ hàng từ localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  const existingProduct = cart.find(item => item.name === productsName);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ img: productsImg, name: productsName, price: productsPrice, quantity: 1 });
  }

  // Cập nhật giỏ hàng vào localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Gọi các hàm cập nhật số lượng và tổng tiền
  renderCartItems();
  totoNumbers();
  totalCart();
}

// Hàm render giỏ hàng từ localStorage
function renderCartItems() {
  const cartItemsContainer = document.querySelector(".modal__form-shopping");
  cartItemsContainer.innerHTML = ''; 

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.forEach(product => {
    let addItem = document.createElement("div");
    addItem.classList.add("modal__shopping-products");
    
    let renderProducts = `
      <div class="modal__products-item">
        <img src="${product.image}" alt="" class="modal__item-img" />
      </div>
      <div class="modal__products-container">
        <div class="modal__container-name">
          <h3 class="modal__container-text">${product.name}</h3>
          <div class="modal__btn-close">
            <i class="bx bxs-trash-alt modal__container-close" onclick="removeItem('${product.name}')"></i>
          </div>
        </div>
        <div class="modal__products-content">
          <div class="modal__content-number">
            <input class="content__numberCart" type="number" value="${product.quantity}" min="1" onchange="updateQuantity('${product.name}', this.value)" />
          </div>
          <div style="display: flex; justify-content: center">
            <p class="women__price">${product.price}</p><sup>đ</sup>
          </div>
        </div>
      </div>
    `;
    addItem.innerHTML = renderProducts;
    cartItemsContainer.append(addItem);
  });
}

// Cập nhật số lượng sản phẩm
function updateQuantity(name, newQuantity) {
  let cart = JSON.parse(localStorage.getItem('cart'));
  const product = cart.find(item => item.name === name);
  if (product) {
    product.quantity = parseInt(newQuantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    totalCart();
  }
}

// Xóa sản phẩm khỏi giỏ hàng
function removeItem(name) {
  let cart = JSON.parse(localStorage.getItem('cart'));
  cart = cart.filter(item => item.name !== name);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems();
  totoNumbers();
  totalCart();
}

// Cập nhật tổng số lượng sản phẩm trong giỏ hàng
function totoNumbers() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.querySelector(".header__card div p").innerText = cart.length;
}

// Cập nhật tổng tiền trong giỏ hàng
function totalCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let total = cart.reduce((sum, product) => sum + product.quantity * parseFloat(product.price.replace(/\./g, "")), 0);
  document.querySelector("div .women__total").innerText = total.toLocaleString("de-DE");
}

// Khởi động khi trang tải
document.addEventListener("DOMContentLoaded", () => {
  renderCartItems();
  totoNumbers();
  totalCart();
});
