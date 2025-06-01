// catalog-pagination.js
// Рабочая пагинация с разным контентом для каждой страницы

document.addEventListener('DOMContentLoaded', function() {
  const productsList = document.getElementById('catalog-products-list');
  const pagination = document.querySelector('.catalog-pagination');
  if (!productsList || !pagination) return;
  const pageButtons = pagination.querySelectorAll('.catalog-pagination__page');

  // Сохраняем HTML для каждой страницы (можно менять содержимое)
  const page1HTML = productsList.innerHTML;
  const page2HTML = `
    <div class="special-card">
      <img class="special-card__img" src="images/Products/1 (52).jpg" alt="Товар 2-1">
      <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
      <div class="special-card__title">Товар страницы 2 — пример</div>
      <div class="special-card__art">Арт.: 222-222</div>
      <div class="special-card__price">999 руб./шт.</div>
      <button class="special-card__cart">В корзину</button>
    </div>
    <div class="special-card">
      <img class="special-card__img" src="images/Products/1 (1).jpg" alt="Товар 2-2">
      <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
      <div class="special-card__title">Второй товар страницы 2</div>
      <div class="special-card__art">Арт.: 222-223</div>
      <div class="special-card__price">888 руб./шт.</div>
      <button class="special-card__cart">В корзину</button>
    </div>
  `;
  const page3HTML = `
    <div class="special-card">
      <img class="special-card__img" src="images/Products/1 (3).jpg" alt="Товар 3-1">
      <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
      <div class="special-card__title">Товар страницы 3 — пример</div>
      <div class="special-card__art">Арт.: 333-333</div>
      <div class="special-card__price">777 руб./шт.</div>
      <button class="special-card__cart">В корзину</button>
    </div>
  `;
  const pages = [page1HTML, page2HTML, page3HTML];

  pageButtons.forEach((btn, idx) => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      pageButtons.forEach(b => b.classList.remove('catalog-pagination__page--active'));
      this.classList.add('catalog-pagination__page--active');
      productsList.innerHTML = pages[idx];
    });
  });
}); 