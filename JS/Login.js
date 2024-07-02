// lấy thông tin thẻ
const open = document.getElementById("login");
const showModal = document.querySelector(".ShowModal");
const close = document.querySelector(".close");

// open modal
open.addEventListener("click", () => {
  showModal.classList.add("open");
});

//close modal
close.addEventListener("click", () => {
  showModal.classList.remove("open");
});

const modalLogin = document.getElementById("form");
// click ra ngoài modal mất
window.onclick = (e) => {
  if (e.target === modal) {
    modalLogin.classList.remove("open");
  }
};

// ========= VALIDATE LOGIN ===========
const form = document.getElementById("form");
const email = document.getElementById("Email");
const password = document.getElementById("password");

form.addEventListener("submit", (e) => {
  validateForm();
});

const validateForm = () => {
  // xoá dữ liệu các khoảng trắng input
  const Emailvalue = email.value.trim();
  const Passwordvalue = password.value.trim();

  // kiểm tra thông tin input Email và password
  if (Emailvalue === "") {
    setError(email, "vui lòng nhập lại Email");
  } else if (!validateEmail(Emailvalue)) {
    setError(email, "Email không hợp lệ");
  } else {
    setSuccess(email);
  }

  if (Passwordvalue === "") {
    setError(password, "vui lòng nhập mật khẩu");
  } else if (Passwordvalue.length < 8) {
    setError(password, "Password cần dài ít nhất 8 ký tự");
  } else {
    setSuccess(password);
  }
};

// setError
const setError = (element, messenger) => {
  const InputValue = element.parentElement; // lấy thông tin thẻ cha
  const SelectError = InputValue.querySelector(".modal__error"); // tìm thẻ error

  SelectError.innerText = messenger; // hiện messenger error
  InputValue.classList.add("modal__error"); // lỗi thì hiện modal error
  document.querySelector(".modal__eyes").style.margin = "-10px 0px";
  InputValue.classList.remove("modal__success"); // xoá modal success
};

//  setSuccess
const setSuccess = (element) => {
  const InputValue = element.parentElement; // lấy thông tin thẻ cha
  const SelectSuccess = InputValue.querySelector(".modal__error"); // tìm thẻ error

  SelectSuccess.innerText = ""; // đúng thì nó mảng rỗng
  InputValue.classList.add("modal__success");
  document.querySelector(".modal__eyes").style.margin = "0px 0px";
  InputValue.classList.remove("modal__error");
};

//check email
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

//============= TOGGLE PASSWORD ===========
const togglePassword = document.getElementById("toggler-password");
const Password = document.getElementById("password");

togglePassword.addEventListener("click", () => {
  if (Password.type === "password") {
    Password.type = "text";
    togglePassword.innerHTML = `<i class="fa-solid fa-eye"></i>`;
  } else {
    Password.type = "password";
    togglePassword.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`;
  }
});
