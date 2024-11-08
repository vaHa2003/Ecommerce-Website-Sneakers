// Lấy thông tin thẻ modal và form
const open = document.getElementById("login");
const showModal = document.querySelector(".ShowModal");
const close = document.querySelector(".close");
const modalLogin = document.getElementById("form");
const form = document.getElementById("form");
const email = document.getElementById("Email");
const password = document.getElementById("password");

// Mở modal
open.addEventListener("click", () => {
  showModal.classList.add("open");
});

// Đóng modal
close.addEventListener("click", () => {
  showModal.classList.remove("open");
});

// Click ra ngoài modal để đóng
window.onclick = (e) => {
  if (e.target === modalLogin) {
    modalLogin.classList.remove("open");
  }
};

// ========= VALIDATE LOGIN ===========

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Ngừng hành động mặc định của form
  validateForm();
  handleLogin(); // Gọi hàm xử lý đăng nhập
});

const validateForm = () => {
  // Xoá dữ liệu các khoảng trắng input
  const Emailvalue = email.value.trim();
  const Passwordvalue = password.value.trim();

  // Kiểm tra thông tin input Email và password
  if (Emailvalue === "") {
    setError(email, "Please re-enter Email");
  } else if (!validateEmail(Emailvalue)) {
    setError(email, "Invalid email");
  } else {
    setSuccess(email);
  }

  if (Passwordvalue === "") {
    setError(password, "Please enter your password");
  } else if (Passwordvalue.length < 8) {
    setError(password, "Password needs to be at least 8 characters long");
  } else {
    setSuccess(password);
  }
};

// Kiểm tra email hợp lệ
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// Lấy thông tin từ localStorage
// Lấy thông tin từ localStorage
const handleLogin = () => {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  // Lấy dữ liệu người dùng từ localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData) {
    // Kiểm tra email và mật khẩu
    if (userData.email === emailValue && userData.password === passwordValue) {
      // Đăng nhập thành công, hiển thị thông báo thành công
      alert("Log in successfully!");
      // Chuyển hướng đến home.html
      window.location.href = "home.html";
    } else {
      // Đăng nhập thất bại, hiển thị thông báo lỗi
      alert("Email or password is incorrect");
    }
  } else {
    // Không tìm thấy tài khoản trong localStorage
    alert("Account not found. Please register in advance!");
  }
};


// Cập nhật giao diện lỗi
const setError = (element, message) => {
  const inputValue = element.parentElement; // Lấy thông tin thẻ cha
  const selectError = inputValue.querySelector(".modal__error"); // Tìm thẻ error

  selectError.innerText = message; // Hiển thị message lỗi
  inputValue.classList.add("modal__error"); // Thêm lớp lỗi
  inputValue.classList.remove("modal__success"); // Xoá lớp thành công
};

// Cập nhật giao diện thành công
const setSuccess = (element) => {
  const inputValue = element.parentElement; // Lấy thông tin thẻ cha
  const selectSuccess = inputValue.querySelector(".modal__error"); // Tìm thẻ error

  selectSuccess.innerText = ""; // Xoá thông báo lỗi
  inputValue.classList.add("modal__success"); // Thêm lớp thành công
  inputValue.classList.remove("modal__error"); // Xoá lớp lỗi
};

//============= TOGGLE PASSWORD ===========

const togglePassword = document.getElementById("toggler-password");
togglePassword.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    togglePassword.innerHTML = `<i class="fa-solid fa-eye"></i>`;
  } else {
    password.type = "password";
    togglePassword.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`;
  }
});
