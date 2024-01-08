// ========= chức năng Add to Cart ===============
// ====== lấy thông tin Cart =======
const btn = document.querySelectorAll(".women__btn-item"); // tìm các thẻ button
btn.forEach((button, index) => {
  button.addEventListener("click", (e) => {
    // lấy các thông tin của các thẻ
    let buttonItem = e.target; // lấy các thẻ khi ấn vào button
    let products = buttonItem.closest(".women__item-info"); // lay the cha cua button item
    let productsImg = products.querySelector(".women__item-img").src; // lấy thông tin  img
    let productsName = products.querySelector(".women__title").innerText; //lấy thông tin name
    let productsPrice = products.querySelector(".women__price").innerText; // lấy thông tin price
    // console.log(productsImg, productsName, productsPrice);

    // tạo hàm Add
    addCart(productsImg, productsName, productsPrice);
  });
});

// hàm AddCart
function addCart(productsImg, productsName, productsPrice) {
  // kiểm tra khi click thêm 2 sản phẩm vào gỉ hàng
  const cartNames = document.querySelectorAll(".modal__container-name");

  for (let i = 0; i < cartNames.length; i++) {
    // Kiểm tra xem có phần tử .modal__container-text trong .modal__container-name không
    const productName = cartNames[i].querySelector(".modal__container-text");
    if (productName.innerHTML == productsName) {
      alert("Đã có sản phẩm trong giỏ hàng");
      return;
    }
  }

  let addItem = document.createElement("div");
  let renderProducts = `
    <div class="modal__shopping-products">
      <div class="modal__products-item">
        <img src="${productsImg}" alt="" class="modal__item-img" />
      </div>
      <div class="modal__products-container">
        <div class="modal__container-name">
          <h3 class="modal__container-text">${productsName}</h3>
          <div class="modal__btn-close">
            <i class="bx bxs-trash-alt modal__container-close"></i>
          </div>
        </div>
        <div class="modal__products-content">
          <div class="modal__content-number">
            <input class="content__numberCart" type="number" value="1" />
          </div>
          <div style="display: flex; justify-content: center">
            <p class="women__price">${productsPrice}</p>
            <sup>đ</sup>
          </div>
        </div>
      </div>
    </div>
  `;
  addItem.innerHTML = renderProducts;
  // tìm thẻ cha để thêm thẻ .modal__form-shopping vào thẻ cha
  let cartItems = document.querySelector(".modal__form-shopping");
  cartItems.append(addItem);

  //hàm tổng số lượng giỏ hàng
  totoNumbers();

  // hàm thay đổi ô input
  inputCart();
  // hàm totalCart
  totalCart();

  //hàm xoá
  deleteCart();
}

function totoNumbers() {
  // Giả sử bạn muốn đếm tổng số sản phẩm có class "modal__shopping-products"
  let totalCount = document.querySelectorAll(
    ".modal__shopping-products"
  ).length;

  // Cập nhật nội dung của phần tử có class "header__card" để hiển thị tổng số
  document.querySelector(".header__card div p").innerText = totalCount;
  console.log(totalCount);
}

// hàm tính tổng tiền
function totalCart() {
  // lấy thông tin thẻ cha
  let cartItems = document.querySelectorAll(".modal__products-content");
  let cartTotal = 0; // Initialize cart total

  // vòng lặp các item cart trong giỏ hàng
  for (let i = 0; i < cartItems.length; i++) {
    // lấy thông tin thẻ input
    const itemQuantity = parseInt(
      cartItems[i].querySelector(".content__numberCart").value
    );

    // lấy thông tin price
    const itemPrice = cartItems[i].querySelector("div .women__price").innerText;

    const itemTotal = itemQuantity * parseFloat(itemPrice.replace(/\./g, ""));
    // console.log("itemTotal: ", itemTotal);
    cartTotal += itemTotal;
  }

  const formattedTotal = cartTotal.toLocaleString("de-DE");
  const totalBuy = document.querySelector("div .women__total");
  totalBuy.innerHTML = formattedTotal;
}

// hàm sửa số lượng sản phẩm
function inputCart() {
  const parentInput = document.querySelectorAll(".modal__content-number");
  for (let i = 0; i < parentInput.length; i++) {
    const inputValue = parentInput[i].querySelector(".content__numberCart");
    inputValue.addEventListener("change", (e) => {
      const value = e.target;
      // khi value dưới 0 thì cho value = 1
      if (inputValue.value <= 0 || isNaN(inputValue.value)) {
        inputValue.value = 1;
      }
      totalCart();
    });
  }
}

// ============= hàm xoá ==============
function deleteCart() {
  const removeItem = document.querySelectorAll(".modal__container-close");
  // console.log("removeItem: ", removeItem);
  //lặp qua các phần tử trong button remove
  for (let i = 0; i < removeItem.length; i++) {
    let itemButton = removeItem[i]; /// gán vào một biến
    itemButton.addEventListener("click", (e) => {
      let button__remove = e.target; // lấy thẻ button
      button__remove.parentElement.parentElement.parentElement.parentElement.remove();
      totalCart();
    });
  }
}
