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
  strings: ["SPLY - 350"],
  typeSpeed: 50,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});
// slide 2
let text1 = new Typed(".auto__text-slide2", {
  strings: ["Sneakers"],
  typeSpeed: 50,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

// slide 3
let text2 = new Typed(".auto__textSlide3", {
  strings: ["SNEAKER "],
  typeSpeed: 50,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});
