const swiper = new Swiper('.special-swiper', {
  slidesPerView: 6,
  slidesPerGroup: 4,
  spaceBetween: 0,
  navigation: {
    nextEl: '.special-next',
    prevEl: '.special-prev',
  },
  allowTouchMove: false,
  simulateTouch: false,
});

const hitsSwiper = new Swiper('.hits-swiper', {
  slidesPerView: 6,
  spaceBetween: 0,
  navigation: {
    nextEl: '.hits-next',
    prevEl: '.hits-prev',
  },
  allowTouchMove: false,
  simulateTouch: false,
});

const fixedSwiper = new Swiper('.fixed-swiper', {
  slidesPerView: 6,
  spaceBetween: 0,
  navigation: {
    nextEl: '.hits-next',
    prevEl: '.hits-prev',
  },
  allowTouchMove: false,
  simulateTouch: false,
});

// Main screen swiper
const mainSwiper = new Swiper('.main-swiper', {
  loop: true,
  pagination: {
    el: '.main-swiper .swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.main-swiper .swiper-button-next',
    prevEl: '.main-swiper .swiper-button-prev',
  },
});

// Catalog banner swiper
const catalogBannerSwiper = new Swiper('.catalog-banner-swiper', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: '.catalog-swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.catalog-swiper-button-next',
    prevEl: '.catalog-swiper-button-prev',
  },
});