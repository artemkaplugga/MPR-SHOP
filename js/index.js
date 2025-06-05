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
  breakpoints: {
    1920: {
      slidesPerView: 6,
      slidesPerGroup: 4,
      spaceBetween: 0,
    },
   
    768: {
      slidesPerView: 4,
      slidesPerGroup: 4,
   
  
    },
    480: {
      slidesPerView: 2,
      slidesPerGroup: 2,
   
    },
    375: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    
    },
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
   
    }
  }
});

const topSwiper = new Swiper('.top-swiper', {
  slidesPerView: 6,
  slidesPerGroup: 4,
  spaceBetween: 0,
  navigation: {
    nextEl: '.top-next',
    prevEl: '.top-prev',
  },
  allowTouchMove: false,
  simulateTouch: false,
  breakpoints: {
    
    1920: {
      slidesPerView: 6,
      slidesPerGroup: 4,
      spaceBetween: 0,
    },
   
    768: {
      slidesPerView: 4,
      slidesPerGroup: 4,
   
  
    },
    480: {
      slidesPerView: 2,
      slidesPerGroup: 2,
   
    },
    375: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    
    },
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
   
    }
  }
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
  breakpoints: {
    1920: {
      slidesPerView: 6,
      slidesPerGroup: 4,
      spaceBetween: 0,
    },
   
    768: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 16,
      allowTouchMove: true,
      simulateTouch: true,
    },
    480: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 12,
      allowTouchMove: true,
      simulateTouch: true,
    },
    375: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 10,
      allowTouchMove: true,
      simulateTouch: true,
    },
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 8,
      allowTouchMove: true,
      simulateTouch: true,
    }
  }
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
  breakpoints: {
  
    768: {
       slidesPerView: 1,
       loop: true,
    },
  }
});

// Catalog banner swiper
const catalogBannerSwiper = new Swiper('.catalog-banner-swiper', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 1000,
  loop: true,
  pagination: {
    el: '.catalog-swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.catalog-swiper-button-next',
    prevEl: '.catalog-swiper-button-prev',
  },
  breakpoints: {
    768: {
       slidesPerView: 1,
       loop: true,
    },
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false
  }
});

const likeButtons = document.querySelectorAll('.special-like');

likeButtons.forEach(button => {
  button.addEventListener('click', function() {
    const img = this.querySelector('img');
    if (img.src.includes('like.svg') && !img.src.includes('like-active.svg')) {
      img.src = 'images/components/like-active.svg';
    } else {
      img.src = 'images/components/like.svg';
    }
  });
});
