const fixedPriceButtons = document.querySelectorAll('.fixed-prices-filter');
const fixedPriceContainers = document.querySelectorAll('.fixed-prices-product-container');

// Initialize Swipers for each price container
const fixedPriceSwipers = {};
fixedPriceContainers.forEach(container => {
  const price = container.dataset.price;
  const swiperElement = container.querySelector('.fixed-swiper');
  if (swiperElement) {
    fixedPriceSwipers[price] = new Swiper(swiperElement, {
      slidesPerView: 6,
      spaceBetween: 0,
      navigation: {
        nextEl: '.special-next2',
        prevEl: '.special-prev2',
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
          spaceBetween: 18,
          allowTouchMove: true,
          simulateTouch: true,
        },
        480: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 10,
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
  }
});

fixedPriceButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    fixedPriceButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to the clicked button
    button.classList.add('active');

    // Get the price from the data attribute
    const price = button.dataset.price;

    // Hide all product containers
    fixedPriceContainers.forEach(container => container.style.display = 'none');

    // Show the product container that matches the price
    const targetContainer = document.querySelector(`.fixed-prices-product-container[data-price="${price}"]`);
    if (targetContainer) {
      targetContainer.style.display = 'block'; // Or appropriate display style

      // Update the Swiper in the active container
      if (fixedPriceSwipers[price]) {
        fixedPriceSwipers[price].update();
      }
    }
  });
});
