document.addEventListener('DOMContentLoaded', () => {
  const cartIcon = document.getElementById('cartIcon');
  const cartDropdown = document.getElementById('cartDropdown');
  const cartItemsContainer = cartDropdown ? cartDropdown.querySelector('.cart-items-container') : null;
  const cartEmptyMessage = cartDropdown ? cartDropdown.querySelector('.cart-empty') : null;
  const cartTotalElement = cartDropdown ? cartDropdown.querySelector('.cart-total') : null;
  // This needs to be broad enough to cover all pages where add to cart buttons exist
  const addToCartButtons = document.querySelectorAll('.special-card__cart, .sport-card__cart, .catalog-product-card__cart'); 

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
        window.openAuthModal(); // Use global function
        return;
      }

      const card = this.closest('.special-card, .sport-card, .catalog-product-card');
      const image = card.querySelector('.special-card__img, .sport-card__img, .catalog-product-card__img').src;
      const title = card.querySelector('.special-card__title, .sport-card__info .sport-card__title, .catalog-product-card__title').textContent.trim();
      const art = card.querySelector('.special-card__art, .sport-card__info .sport-card__title, .catalog-product-card__art').textContent.replace('Арт.: ', '').trim();
      const price = card.querySelector('.special-card__price, .sport-card__price, .catalog-product-card__price').textContent.trim();

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

  // Cart dropdown toggle
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
        window.openAuthModal(); // Use global function
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
