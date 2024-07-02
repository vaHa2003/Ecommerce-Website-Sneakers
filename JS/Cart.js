// ==== Show modal cart ========
const showCart = document.getElementById("showCart");
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
