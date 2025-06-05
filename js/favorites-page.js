document.addEventListener('DOMContentLoaded', () => {
    const favoritesListContainer = document.querySelector('.favorites-list');

    function getFavorites() {
        return JSON.parse(localStorage.getItem('favorites')) || [];
    }

    function saveFavorites(favorites) {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    function renderFavorites() {
        const favorites = getFavorites();
        if (favoritesListContainer) {
            favoritesListContainer.innerHTML = ''; // Clear existing content

            if (favorites.length === 0) {
                favoritesListContainer.innerHTML = '<p class="favorites-empty">В избранном пока ничего нет.</p>';
                return;
            }

            favorites.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('special-card'); // Use special-card class for consistent styling
                productCard.innerHTML = `
                    <img class="special-card__img" src="${product.imageSrc}" alt="${product.title}">
                    <button class="special-like" data-art="${product.art}"><img src="images/components/like-active.svg" alt="like"></button>
                    <div class="special-card__title">${product.title}</div>
                    <div class="special-card__art">Арт.: ${product.art}</div>
                    <div class="special-card__price">${product.price}</div>
                    <button class="special-card__cart" data-art="${product.art}">В корзину</button>
                `;
                favoritesListContainer.appendChild(productCard);
            });
        }
    }

    // Initial render
    renderFavorites();

    const addAllToCartButton = document.querySelector('.favorites-add-all-btn');

    if (addAllToCartButton) {
        addAllToCartButton.addEventListener('click', () => {
            const currentUserEmail = localStorage.getItem('currentUser');
            if (!currentUserEmail) {
                alert('Для добавления товаров в корзину необходимо авторизоваться.');
                // You might want to open the auth modal here if it's available in this scope
                return;
            }

            let favorites = getFavorites();
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            favorites.forEach(favProduct => {
                const existingItemIndex = cart.findIndex(item => item.art === favProduct.art);
                if (existingItemIndex !== -1) {
                    cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1; 
                } else {
                    cart.push({ 
                        image: favProduct.imageSrc, 
                        title: favProduct.title, 
                        art: favProduct.art, 
                        price: favProduct.price, 
                        quantity: 1 
                    });
                }
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Все избранные товары добавлены в корзину!');

            // Optionally clear favorites after adding to cart
            localStorage.removeItem('favorites');
            renderFavorites(); // Re-render favorites list after clearing
        });
    }

    // Add event listener for removing from favorites directly on the favorites page
    if (favoritesListContainer) {
        favoritesListContainer.addEventListener('click', (e) => {
            if (e.target.closest('.special-like')) {
                const button = e.target.closest('.special-like');
                const art = button.dataset.art;
                
                console.log('Attempting to remove item with art:', art);
                
                let favorites = getFavorites();
                console.log('Favorites before removal:', favorites);
                
                favorites = favorites.filter(item => item.art !== art);
                
                console.log('Favorites after filtering:', favorites);
                
                saveFavorites(favorites);
                renderFavorites(); // Re-render after removal
                alert('Товар удален из избранного!');
            }
            // Add to cart functionality (similar to index.html modals.js logic)
            if (e.target.closest('.special-card__cart')) {
                const button = e.target.closest('.special-card__cart');
                const art = button.dataset.art;
                const card = button.closest('.special-card');
                const image = card.querySelector('.special-card__img').src;
                const title = card.querySelector('.special-card__title').textContent.trim();
                const price = card.querySelector('.special-card__price').textContent.trim();

                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const existingItemIndex = cart.findIndex(item => item.art === art);

                if (existingItemIndex !== -1) {
                    cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1; 
                } else {
                    cart.push({ image, title, art, price, quantity: 1 });
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                alert('Товар добавлен в корзину!');
            }
        });
    }
}); 
document.addEventListener('DOMContentLoaded', () => {
    const mainProductLikeBtn = document.getElementById('mainProductLikeBtn');
    const productTitle = document.querySelector('.product-title').textContent.trim();
    const productArt = document.querySelector('.product-art').textContent.replace('Арт.: ', '').trim();
    const productPrice = document.querySelector('.product-price').textContent.trim();
    const productMainImg = document.querySelector('.product-main-img').src;

    function getFavorites() {
        return JSON.parse(localStorage.getItem('favorites')) || [];
    }

    function saveFavorites(favorites) {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    function isProductInFavorites(art) {
        const favorites = getFavorites();
        return favorites.some(item => item.art === art);
    }

    function updateLikeButton(button, isInFavorites) {
        const img = button.querySelector('img');
        if (isInFavorites) {
            img.src = 'images/components/like-active.svg';
            button.classList.add('active');
        } else {
            img.src = 'images/components/like.svg';
            button.classList.remove('active');
        }
    }

    // Handle main product like button
    if (mainProductLikeBtn) {
        const currentProductInFavorites = isProductInFavorites(productArt);
        updateLikeButton(mainProductLikeBtn, currentProductInFavorites);

        mainProductLikeBtn.addEventListener('click', () => {
            let favorites = getFavorites();
            if (isProductInFavorites(productArt)) {
                favorites = favorites.filter(item => item.art !== productArt);
                alert('Товар удален из избранного!');
            } else {
                favorites.push({
                    imageSrc: productMainImg,
                    title: productTitle,
                    art: productArt,
                    price: productPrice
                });
                alert('Товар добавлен в избранное!');
            }
            saveFavorites(favorites);
            updateLikeButton(mainProductLikeBtn, isProductInFavorites(productArt));
        });
    }

    // Handle similar product cards' like buttons
    document.querySelectorAll('.special-card .special-like').forEach(button => {
        const card = button.closest('.special-card');
        const art = card.querySelector('.special-card__art').textContent.replace('Арт.: ', '').trim();
        const imageSrc = card.querySelector('.special-card__img').src;
        const title = card.querySelector('.special-card__title').textContent.trim();
        const price = card.querySelector('.special-card__price').textContent.trim();

        const isInFavorites = isProductInFavorites(art);
        updateLikeButton(button, isInFavorites);

        button.addEventListener('click', () => {
            let favorites = getFavorites();
            if (isProductInFavorites(art)) {
                favorites = favorites.filter(item => item.art !== art);
                alert('Товар удален из избранного!');
            } else {
                favorites.push({
                    imageSrc: imageSrc,
                    title: title,
                    art: art,
                    price: price
                });
                alert('Товар добавлен в избранное!');
            }
            saveFavorites(favorites);
            updateLikeButton(button, isProductInFavorites(art));
        });
    });
}); 