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
  let isLoggedIn = localStorage.getItem('currentUser') !== null; // Determine login status from localStorage

  // No longer fetching user status from backend
  // try {
  //   const response = await fetch('/api/user');
  //   const data = await response.json();
  //   isLoggedIn = data.logged_in;
  // } catch (error) {
  //   console.error('Error fetching user status:', error);
  // }

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

  // Update UI based on login status
  function updateAuthUI() {
    if (isLoggedIn) {
      // User is logged in
      const currentUserEmail = localStorage.getItem('currentUser');
      const users = JSON.parse(localStorage.getItem('users')) || {};
      const currentUser = users[currentUserEmail];

      if (currentUser) {
        document.getElementById('user-greeting').innerHTML = `
          <div class="profile-greeting">
            Привет, ${currentUser.name} ${currentUser.surname}!
          </div>
        `;
      }

      // Hide auth icon and show logout link
      if (document.getElementById('authIcon')) document.getElementById('authIcon').style.display = 'none';
      if (document.getElementById('logoutLink')) document.getElementById('logoutLink').style.display = 'block';
    } else {
      // User is not logged in
      // Show auth icon and hide logout link
      if (document.getElementById('authIcon')) document.getElementById('authIcon').style.display = 'block';
      if (document.getElementById('logoutLink')) document.getElementById('logoutLink').style.display = 'none';

      // Display the "Войти" button
      document.getElementById('user-greeting').innerHTML = `
        <button onclick="document.getElementById('modalAuth').style.display = 'block';
                        document.getElementById('modalAuthOverlay').style.display = 'block';"
                class="auth-button">
          Войти
        </button>
      `;
    }
  }

  // Initial UI update
  updateAuthUI();

  // Add logout functionality (this part is already handled by js/login.js but keeping it for completeness in modals.js context)
  const logoutLink = document.getElementById('logoutLink');
  if (logoutLink) {
      logoutLink.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.removeItem('currentUser');
          alert('Вы вышли из аккаунта.');
          isLoggedIn = false; // Update isLoggedIn status
          updateAuthUI();
          window.location.href = 'index.html';
      });
  }

  // --- New Review Modal ---
  const openReviewBtn = document.querySelector('.product-reviews-new-btn');
  const modalReview = document.getElementById('modalReview');
  const modalReviewOverlay = document.getElementById('modalReviewOverlay');
  const modalReviewClose = document.getElementById('modalReviewClose');
  const reviewStars = modalReview ? modalReview.querySelectorAll('.review-modal-rating .star') : [];

  if (openReviewBtn) {
    // Cursor style and click event for review button (using isLoggedIn from localStorage)
    if (!isLoggedIn) {
      openReviewBtn.style.cursor = 'not-allowed';
    } else {
      openReviewBtn.style.cursor = 'pointer'; // Ensure it's clickable if logged in
    }

    openReviewBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (!localStorage.getItem('currentUser')) { // Check localStorage directly for auth
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

  // Star rating functionality (using isLoggedIn from localStorage)
  reviewStars.forEach(star => {
    star.addEventListener('click', function () {
      if (!localStorage.getItem('currentUser')) return; // Prevent rating if not logged in
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

  // Like functionality (This logic should ideally be in js/favorites.js, but removing server interaction)
  const likeButtons = document.querySelectorAll('.special-like, .sport-card__like');

  // Function to update the like button's image based on its liked status
  function updateLikeButton(button, isFav) {
    const img = button.querySelector('img');
    if (img) {
      img.src = isFav ? 'images/components/like-active.svg' : 'images/components/like.svg';
    }
  }

  likeButtons.forEach(button => {
    const card = button.closest('.special-card, .sport-card');
    if (!card) return; // Skip if no parent card found
    
    const productTitleElement = card.querySelector('.special-card__title, .sport-card__info .sport-card__title');
    const productImageElement = card.querySelector('.special-card__img, .sport-card__img');
    const productPriceElement = card.querySelector('.special-card__price, .sport-card__price');

    if (!productTitleElement || !productImageElement || !productPriceElement) return;

    const productTitle = productTitleElement.textContent.trim();
    const productImageSrc = productImageElement.src;
    const productPrice = productPriceElement.textContent.trim();

    let productArt = '';
    const specialCardArtElement = card.querySelector('.special-card__art');
    if (specialCardArtElement) {
        productArt = specialCardArtElement.textContent.trim().replace('Арт.: ', '');
    } else {
        // For sport-card, use a combination of title and imageSrc as a unique identifier
        productArt = `${productTitle}-${productImageSrc}`; // This will be the unique identifier for removal
    }

    const product = { title: productTitle, imageSrc: productImageSrc, price: productPrice, art: productArt };

    // Set data-art attribute on the button to ensure it's available for `favorites-page.js`
    button.dataset.art = productArt; 

    // Check initial state from localStorage only if logged in
    if (localStorage.getItem('currentUser')) {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      if (favorites.some(item => item.art === product.art)) { // Changed to use product.art for comparison
        updateLikeButton(button, true);
      }
    } else {
      updateLikeButton(button, false);
      button.style.cursor = 'not-allowed'; // Indicate it's not clickable
    }

    button.addEventListener('click', function(e) {
      if (!localStorage.getItem('currentUser')) { // Check localStorage directly for auth
        e.preventDefault(); // Prevent default action
        alert('Для добавления в избранное необходимо авторизоваться.');
        openAuthModal(); // Open auth modal
        return;
      }

      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const index = favorites.findIndex(item => item.art === product.art); // Changed to use product.art for comparison

      if (index !== -1) {
        // Product is currently favorited, so unfavorite it
        favorites.splice(index, 1);
        updateLikeButton(this, false);
      } else {
        // Product is not favorited, so favorite it
        favorites.push(product);
        updateLikeButton(this, true);
        alert('Товар добавлен в избранное!');
      }
      localStorage.setItem('favorites', JSON.stringify(favorites));
    });
  });

  // Cart functionality (This logic should ideally be in js/cart.js, but removing server interaction)
  const cartIcon = document.getElementById('cartIcon');
  const cartDropdown = document.getElementById('cartDropdown');
  const cartItemsContainer = cartDropdown ? cartDropdown.querySelector('.cart-items-container') : null;
  const cartEmptyMessage = cartDropdown ? cartDropdown.querySelector('.cart-empty') : null;
  const cartTotalElement = cartDropdown ? cartDropdown.querySelector('.cart-total') : null;
  const addToCartButtons = document.querySelectorAll('.special-card__cart, .sport-card__cart');

  function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }

  function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function updateCartDisplay() {
    const cartItems = getCart();
    if (cartItemsContainer) cartItemsContainer.innerHTML = ''; // Clear items container
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
            <div class="cart-item__quantity-controls">
              <button class="cart-item__quantity-minus" data-art="${item.art}">-</button>
              <span class="cart-item__quantity">${item.quantity}</span>
              <button class="cart-item__quantity-plus" data-art="${item.art}">+</button>
            </div>
          </div>
          <button class="cart-item__remove" data-art="${item.art}">×</button>
        `;
        if (cartItemsContainer) {
          cartItemsContainer.appendChild(itemElement);
        }

        const priceValue = parseFloat(item.price.replace('от ', '').replace(' руб./шт.', '').replace(',', '.'));
        if (!isNaN(priceValue)) {
          total += priceValue * item.quantity;
        }
      });
    }
    if (cartTotalElement) {
      cartTotalElement.textContent = `Итого: ${total.toFixed(2).replace('.', ',')} руб.`;
    }

    // Show/hide checkout button
    const checkoutButton = cartDropdown ? cartDropdown.querySelector('.cart-dropdown__checkout-btn') : null;
    if (checkoutButton) {
      if (localStorage.getItem('currentUser') && cartItems.length > 0) {
        checkoutButton.style.display = 'block';
      } else {
        checkoutButton.style.display = 'none';
      }
    }
  }

  // Initialize cart display on page load
  updateCartDisplay();

  addToCartButtons.forEach(button => {
    if (!localStorage.getItem('currentUser')) {
      button.style.cursor = 'not-allowed';
    } else {
      button.style.cursor = 'pointer';
    }

    button.addEventListener('click', function(e) {
      if (!localStorage.getItem('currentUser')) { // Check localStorage directly for auth
        e.preventDefault();
        alert('Для добавления товара в корзину необходимо авторизоваться.');
        openAuthModal();
        return;
      }

      const card = this.closest('.special-card, .sport-card');
      const image = card.querySelector('.special-card__img, .sport-card__img').src;
      const title = card.querySelector('.special-card__title, .sport-card__info .sport-card__title').textContent.trim();
      const art = card.querySelector('.special-card__art, .sport-card__info .sport-card__title').textContent.replace('Арт.: ', '').trim();
      const price = card.querySelector('.special-card__price, .sport-card__price').textContent.trim();

      let cart = getCart();
      const existingItemIndex = cart.findIndex(item => item.art === art);

      if (existingItemIndex !== -1) {
        // If item exists, increase quantity
        cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1; 
      } else {
        // If item does not exist, add it with quantity 1
        cart.push({ image, title, art, price, quantity: 1 });
      }
      saveCart(cart);
      updateCartDisplay();
      alert('Товар добавлен в корзину!');
    });
  });

  // Event listener for removing items from cart and quantity changes
  if (cartItemsContainer) {
    cartItemsContainer.addEventListener('click', function(event) {
      if (!localStorage.getItem('currentUser')) return; // Prevent action if not logged in

      const target = event.target;
      if (target.classList.contains('cart-item__remove')) {
        const artToRemove = target.dataset.art;
        let cart = getCart();
        cart = cart.filter(item => item.art !== artToRemove);
        saveCart(cart);
        updateCartDisplay();
      } else if (target.classList.contains('cart-item__quantity-minus')) {
        const artToUpdate = target.dataset.art;
        let cart = getCart();
        const itemIndex = cart.findIndex(item => item.art === artToUpdate);
        if (itemIndex !== -1) {
          if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity--;
          } else {
            cart.splice(itemIndex, 1); // Remove if quantity goes to 0
          }
          saveCart(cart);
          updateCartDisplay();
        }
      } else if (target.classList.contains('cart-item__quantity-plus')) {
        const artToUpdate = target.dataset.art;
        let cart = getCart();
        const itemIndex = cart.findIndex(item => item.art === artToUpdate);
        if (itemIndex !== -1) {
          cart[itemIndex].quantity++;
          saveCart(cart);
          updateCartDisplay();
        }
      }
    });
  }

  // Cart dropdown toggle (existing working logic)
  if (cartIcon && cartDropdown) {
    if (!localStorage.getItem('currentUser')) {
      cartIcon.style.cursor = 'not-allowed';
    } else {
      cartIcon.style.cursor = 'pointer';
    }

    cartIcon.addEventListener('click', function(event) {
      if (!localStorage.getItem('currentUser')) { // Check localStorage directly for auth
        event.stopPropagation(); // Prevent dropdown toggle
        alert('Для просмотра корзины необходимо авторизоваться.');
        openAuthModal();
        return;
      }
      event.stopPropagation();
      cartDropdown.classList.toggle('show');
    });

    document.addEventListener('click', function(event) {
      if (!localStorage.getItem('currentUser')) return; // Prevent dropdown toggle if not logged in
      if (!cartDropdown.contains(event.target) && !cartIcon.contains(event.target)) {
        cartDropdown.classList.remove('show');
      }
    });
  }
});