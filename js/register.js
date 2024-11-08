document.addEventListener("DOMContentLoaded", () => {
  // Đảm bảo form đã được tải lên
  const registerForm = document.querySelector(".modal__form");

  // Lắng nghe sự kiện submit
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Ngừng hành động mặc định của form

    // Lấy giá trị từ các trường nhập liệu
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Kiểm tra mật khẩu và xác nhận mật khẩu
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Lưu thông tin vào localStorage
    const userData = { fullName, email, password };
    localStorage.setItem("userData", JSON.stringify(userData));

    // Thông báo thành công và reset form
    alert("Registration successful!");

    // Chuyển hướng đến home.html
    window.location.href = "home.html";
  });
});
