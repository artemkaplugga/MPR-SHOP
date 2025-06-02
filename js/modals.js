const companyDropdown = document.querySelector('.company-dropdown');

if (companyDropdown) {
  companyDropdown.addEventListener('click', function () {
    this.classList.toggle('open');
  });
}

// Functions moved to global scope
function openReviewModal() {
  const modalReview = document.getElementById('modalReview');
  const modalReviewOverlay = document.getElementById('modalReviewOverlay');
  if (modalReview) modalReview.style.display = 'flex';
  if (modalReviewOverlay) modalReviewOverlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeReviewModal() {
  const modalReview = document.getElementById('modalReview');
  const modalReviewOverlay = document.getElementById('modalReviewOverlay');
  if (modalReview) modalReview.style.display = 'none';
  if (modalReviewOverlay) modalReviewOverlay.style.display = 'none';
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', async function () {
  let isLoggedIn = false; // Declare isLoggedIn here

  // Fetch user status
  try {
    const response = await fetch('/api/user');
    const data = await response.json();
    isLoggedIn = data.logged_in;
  } catch (error) {
    console.error('Error fetching user status:', error);
  }

    const authBtn = document.querySelector('.header-icons img[alt="Auth"]');
    const modal = document.getElementById('modalAuth');
    const overlay = document.getElementById('modalAuthOverlay');
    const closeBtn = document.getElementById('modalAuthClose');
  
    function openAuthModal() {
      modal.style.display = 'flex';
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
    function closeAuthModal() {
      modal.style.display = 'none';
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  
    if (authBtn) {
    authBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openAuthModal();
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', closeAuthModal);
    }
    if (overlay) {
      overlay.addEventListener('click', closeAuthModal);
    }

    // Модалка способа доставки
    const openDeliveryBtn = document.getElementById('openDeliveryModal');
    const mobileOpenDeliveryBtn = document.querySelector('.mobile-menu #openDeliveryModal');
    const deliveryModal = document.getElementById('modalDelivery');
    const deliveryOverlay = document.getElementById('modalDeliveryOverlay');
    const deliveryClose = document.getElementById('modalDeliveryClose');
    const tabDelivery = document.getElementById('deliveryTabDelivery');
    const tabPickup = document.getElementById('deliveryTabPickup');

    function openDeliveryModal() {
      deliveryModal.style.display = 'flex';
      deliveryOverlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
    function closeDeliveryModal() {
      deliveryModal.style.display = 'none';
      deliveryOverlay.style.display = 'none';
      document.body.style.overflow = '';
    }

    if (openDeliveryBtn) {
    openDeliveryBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openDeliveryModal();
      });
    }
    if (mobileOpenDeliveryBtn) {
    mobileOpenDeliveryBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openDeliveryModal();
      });
    }
    if (deliveryClose) {
      deliveryClose.addEventListener('click', closeDeliveryModal);
    }
    if (deliveryOverlay) {
      deliveryOverlay.addEventListener('click', closeDeliveryModal);
    }

    // Переключение табов
    if (tabDelivery && tabPickup) {
    tabDelivery.addEventListener('click', function () {
        tabDelivery.classList.add('active');
        tabPickup.classList.remove('active');
      });
    tabPickup.addEventListener('click', function () {
        tabPickup.classList.add('active');
        tabDelivery.classList.remove('active');
      });
    }

    // --- Delivery/Pickup Tabs Switch ---
    const deliveryTab = document.getElementById('deliveryTabDelivery');
    const pickupTab = document.getElementById('deliveryTabPickup');
    const deliveryContent = document.getElementById('deliveryContent');
    const pickupContent = document.getElementById('pickupContent');

    if (deliveryTab && pickupTab && deliveryContent && pickupContent) {
    deliveryTab.addEventListener('click', function () {
        deliveryTab.classList.add('active');
        pickupTab.classList.remove('active');
        deliveryContent.style.display = 'block';
        pickupContent.style.display = 'none';
      });
    pickupTab.addEventListener('click', function () {
        pickupTab.classList.add('active');
        deliveryTab.classList.remove('active');
        deliveryContent.style.display = 'none';
        pickupContent.style.display = 'block';
      });
    }

    // --- Custom Pickup Dropdown ---
    const pickupDropdown = document.getElementById('pickupDropdown');
    const pickupSelected = document.getElementById('pickupSelected');
    const pickupList = document.getElementById('pickupList');
    const pickupItems = pickupList ? pickupList.querySelectorAll('.modal-pickup-item') : [];

    if (pickupDropdown && pickupSelected && pickupList) {
      // Open/close dropdown
    pickupSelected.addEventListener('click', function (e) {
        e.stopPropagation();
        pickupList.style.display = pickupList.style.display === 'block' ? 'none' : 'block';
        pickupDropdown.classList.toggle('open');
      });
      // Select item
    pickupItems.forEach(function (item) {
      item.addEventListener('click', function (e) {
          pickupItems.forEach(i => i.classList.remove('selected'));
          item.classList.add('selected');
          pickupSelected.textContent = item.textContent;
          pickupList.style.display = 'none';
          pickupDropdown.classList.remove('open');
        });
      });
      // Close dropdown on outside click
    document.addEventListener('click', function (e) {
        if (!pickupDropdown.contains(e.target)) {
          pickupList.style.display = 'none';
          pickupDropdown.classList.remove('open');
        }
      });
    }

    // --- Modal City Select ---
    const headerCity = document.querySelector('.header-city');
    const mobileHeaderCity = document.querySelector('.mobile-menu .header-city');
    const modalCity = document.getElementById('modalCity');
    const modalCityOverlay = document.getElementById('modalCityOverlay');
    const modalCityClose = document.getElementById('modalCityClose');
    const cityColCity = document.getElementById('cityColCity');

    function openCityModal() {
      modalCity.style.display = 'flex';
      modalCityOverlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
    function closeCityModal() {
      modalCity.style.display = 'none';
      modalCityOverlay.style.display = 'none';
      document.body.style.overflow = '';
    }
    if (headerCity) {
      headerCity.addEventListener('click', openCityModal);
    }
    if (mobileHeaderCity) {
      mobileHeaderCity.addEventListener('click', openCityModal);
    }
    if (modalCityClose) {
      modalCityClose.addEventListener('click', closeCityModal);
    }
    if (modalCityOverlay) {
      modalCityOverlay.addEventListener('click', closeCityModal);
    }
    // Выбор города
    if (cityColCity) {
    cityColCity.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal-city-col-item')) {
          // Снять выделение со всех
          cityColCity.querySelectorAll('.modal-city-col-item').forEach(i => i.classList.remove('selected'));
          // Выделить выбранный
          e.target.classList.add('selected');
          // Поставить в шапку
          if (headerCity) headerCity.textContent = 'Ваш город ' + e.target.textContent;
          // Закрыть модалку
          closeCityModal();
        }
      });
    }

  // --- New Review Modal ---
  const openReviewBtn = document.querySelector('.product-reviews-new-btn');
  const modalReview = document.getElementById('modalReview');
  const modalReviewOverlay = document.getElementById('modalReviewOverlay');
  const modalReviewClose = document.getElementById('modalReviewClose');
  const reviewStars = modalReview ? modalReview.querySelectorAll('.review-modal-rating .star') : [];

  if (openReviewBtn) {
    if (!isLoggedIn) {
      openReviewBtn.style.cursor = 'not-allowed';
    }
    openReviewBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (!isLoggedIn) {
        alert('Для оставления отзыва необходимо авторизоваться.');
        openAuthModal();
        return;
      }
      openReviewModal();
    });
  }

  if (modalReviewClose) {
    modalReviewClose.addEventListener('click', closeReviewModal);
  }

  if (modalReviewOverlay) {
    modalReviewOverlay.addEventListener('click', closeReviewModal);
  }

  // Star rating functionality
  reviewStars.forEach(star => {
    star.addEventListener('click', function () {
      if (!isLoggedIn) return; // Prevent rating if not logged in
      const value = parseInt(this.dataset.value);
      reviewStars.forEach((s, index) => {
        if (index < value) {
          s.classList.add('selected');
        } else {
          s.classList.remove('selected');
        }
      });
    });
  });

  // Like functionality
  const likeButtons = document.querySelectorAll('.special-like');

  // Function to update the like button's image based on its liked status
  function updateLikeButton(button, isLiked) {
    const img = button.querySelector('img');
    if (isLiked) {
      img.src = 'images/components/like-active.svg';
    } else {
      img.src = 'images/components/like.svg';
    }
  }

  likeButtons.forEach(button => {
    const card = button.closest('.special-card');
    if (!card) return; // Skip if no parent card found
    const artElement = card.querySelector('.special-card__art');
    if (!artElement) return; // Skip if no article number found
    const artNumber = artElement.textContent.replace('Арт.: ', '').trim();

    // Check initial state from localStorage only if logged in
    if (isLoggedIn) {
      const likedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');
      if (likedProducts.includes(artNumber)) {
        updateLikeButton(button, true);
      }
    } else {
      // If not logged in, ensure the like icon is always the default one
      updateLikeButton(button, false);
      button.style.cursor = 'not-allowed'; // Indicate it's not clickable
    }

    button.addEventListener('click', function(e) {
      if (!isLoggedIn) {
        e.preventDefault(); // Prevent default action
        alert('Для добавления в избранное необходимо авторизоваться.');
        openAuthModal(); // Open auth modal
        return;
      }

      let currentLikedProducts = JSON.parse(localStorage.getItem('likedProducts') || '[]');

      if (currentLikedProducts.includes(artNumber)) {
        // Product is currently liked, so unlike it
        currentLikedProducts = currentLikedProducts.filter(item => item !== artNumber);
        updateLikeButton(this, false);
      } else {
        // Product is not liked, so like it
        currentLikedProducts.push(artNumber);
        updateLikeButton(this, true);
      }
      localStorage.setItem('likedProducts', JSON.stringify(currentLikedProducts));
    });
  });

  // Cart functionality
  const cartIcon = document.getElementById('cartIcon');
  const cartDropdown = document.getElementById('cartDropdown');
  const cartContent = cartDropdown ? cartDropdown.querySelector('.cart-items-container') : null;
  const cartEmptyMessage = cartDropdown ? cartDropdown.querySelector('.cart-empty') : null;
  const cartTotal = cartDropdown ? cartDropdown.querySelector('.cart-total') : null;
  const addToCartButtons = document.querySelectorAll('.special-card__cart');

  async function updateCartDisplay() {
    if (!isLoggedIn) {
      if (cartContent) cartContent.innerHTML = ''; // Clear items container
      if (cartEmptyMessage) cartEmptyMessage.style.display = 'block'; // Show empty message
      if (cartTotal) cartTotal.textContent = 'Итого: 0,00 руб.'; // Reset total
      console.log('Cart display not updated: User not logged in.');
      return;
    }

    const response = await fetch('/api/cart');
    const cartItems = await response.json();
    
    if (cartContent) cartContent.innerHTML = ''; // Clear only items container
    let total = 0;

    if (cartItems.length === 0) {
      if (cartEmptyMessage) {
        cartEmptyMessage.style.display = 'block';
      }
    } else {
      if (cartEmptyMessage) {
        cartEmptyMessage.style.display = 'none';
      }
      cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
          <img src="${item.image}" alt="${item.title}" class="cart-item__img">
          <div class="cart-item__details">
            <div class="cart-item__title">${item.title}</div>
            <div class="cart-item__art">${item.art}</div>
            <div class="cart-item__price">${item.price}</div>
          </div>
          <button class="cart-item__remove" data-art="${item.art}">×</button>
        `;
        if (cartContent) {
          cartContent.appendChild(itemElement);
        }

        // Calculate total price
        const priceValue = parseFloat(item.price.replace('от ', '').replace(' руб./шт.', '').replace(',', '.'));
        if (!isNaN(priceValue)) {
          total += priceValue;
        }
      });
    }
    if (cartTotal) {
      cartTotal.textContent = `Итого: ${total.toFixed(2).replace('.', ',')} руб.`;
    }

    // Show/hide checkout button
    const checkoutButton = cartDropdown ? cartDropdown.querySelector('.cart-dropdown__checkout-btn') : null;
    if (checkoutButton) {
      if (isLoggedIn && cartItems.length > 0) {
        checkoutButton.style.display = 'block';
      } else {
        checkoutButton.style.display = 'none';
      }
    }
  }

  // Initialize cart display on page load
  updateCartDisplay();

  addToCartButtons.forEach(button => {
    if (!isLoggedIn) {
      button.style.cursor = 'not-allowed';
    }
    button.addEventListener('click', async function(e) {
      if (!isLoggedIn) {
        e.preventDefault();
        alert('Для добавления товара в корзину необходимо авторизоваться.');
        openAuthModal();
        return;
      }

      const card = this.closest('.special-card');
      const image = card.querySelector('.special-card__img').src;
      const title = card.querySelector('.special-card__title').textContent.trim();
      const art = card.querySelector('.special-card__art').textContent.replace('Арт.: ', '').trim();
      const price = card.querySelector('.special-card__price').textContent.trim();

      const newItem = { image, title, art, price };

      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });
      const result = await response.json();

      if (result.status === 'added') {
        console.log('Item added to cart:', result.cart_items);
        updateCartDisplay();
      } else if (result.status === 'already_in_cart') {
        console.log('Item already in cart:', result.cart_items);
      } else if (result.status === 'error' && result.message === 'Пользователь не авторизован') {
        alert('Для добавления товара в корзину необходимо авторизоваться.');
        openAuthModal();
      }
    });
  });

  // Event listener for removing items from cart
  if (cartContent) {
    cartContent.addEventListener('click', async function(event) {
      if (!isLoggedIn) return; // Prevent removal if not logged in

      if (event.target.classList.contains('cart-item__remove')) {
        const artToRemove = event.target.dataset.art;
        
        const response = await fetch('/api/cart/remove', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ art: artToRemove })
        });
        const result = await response.json();

        if (result.status === 'removed') {
          console.log('Item removed from cart:', result.cart_items);
          updateCartDisplay();
        } else if (result.status === 'not_found') {
          console.log('Item not found in cart:', result.cart_items);
        } else if (result.status === 'error' && result.message === 'Пользователь не авторизован') {
          alert('Для удаления товара из корзины необходимо авторизоваться.');
          openAuthModal();
        }
      }
    });
  }

  // Cart dropdown toggle (existing working logic)
  if (cartIcon && cartDropdown) {
    if (!isLoggedIn) {
      cartIcon.style.cursor = 'not-allowed';
    }
    cartIcon.addEventListener('click', function(event) {
      if (!isLoggedIn) {
        event.stopPropagation(); // Prevent dropdown toggle
        alert('Для просмотра корзины необходимо авторизоваться.');
        openAuthModal();
        return;
      }
      event.stopPropagation();
      cartDropdown.classList.toggle('show');
    });

    document.addEventListener('click', function(event) {
      if (!isLoggedIn) return; // Prevent dropdown toggle if not logged in
      if (!cartDropdown.contains(event.target) && !cartIcon.contains(event.target)) {
        cartDropdown.classList.remove('show');
      }
    });
  }
});