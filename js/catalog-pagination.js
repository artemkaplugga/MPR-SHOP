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
    <div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (24).jpg" alt="Пена для бритья">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Пена для бритья Organic Men</div>
    <div class="special-card__art">Арт.: 949-031</div>
    <div class="special-card__price">139.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (25).jpg" alt="Маркер-выделитель">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Маркер-выделитель, колпачок в форме</div>
    <div class="special-card__art">Арт.: 613-111</div>
    <div class="special-card__price">79.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (26).jpg" alt="Маркер-выделитель">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Маркер-выделитель, колпачок в форме</div>
    <div class="special-card__art">Арт.: 613-110</div>
    <div class="special-card__price">38.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (27).jpg" alt="Маркер-выделитель">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Маркер-выделитель, колпачок в форме</div>
    <div class="special-card__art">Арт.: 613-112</div>
    <div class="special-card__price">48.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>
<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (28).jpg" alt="Маркер-выделитель">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Маркер-выделитель, с колпачком в форме</div>
    <div class="special-card__art">Арт.: 613-109</div>
    <div class="special-card__price">69.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (29).jpg" alt="Маркер-выделитель">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Маркер-выделитель, в форме лапки, 4 цвета</div>
    <div class="special-card__art">Арт.: 613-114</div>
    <div class="special-card__price">79.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (30).jpg" alt="Маркер-выделитель">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Маркер-выделитель, со штампиком</div>
    <div class="special-card__art">Арт.: 613-122</div>
    <div class="special-card__price">89.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (31).jpg" alt="Ручка гелевая">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Ручка гелевая синяя, с наконечником в форме</div>
    <div class="special-card__art">Арт.: 591-198</div>
    <div class="special-card__price">49.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>
<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (32).jpg" alt="Ручка гелевая">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Ручка гелевая синяя, с наконечником в форме</div>
    <div class="special-card__art">Арт.: 591-201</div>
    <div class="special-card__price">49.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (33).jpg" alt="Ручка гелевая">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Ручка гелевая синяя, с наконечником в форме</div>
    <div class="special-card__art">Арт.: 591-202</div>
    <div class="special-card__price">49.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (34).jpg" alt="Авторучка шариковая">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Авторучка шариковая синяя "Ананас"</div>
    <div class="special-card__art">Арт.: 591-218</div>
    <div class="special-card__price">79.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (35).jpg" alt="Ручка гелевая">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Ручка гелевая цветная, фигура на клипе</div>
    <div class="special-card__art">Арт.: 591-217</div>
    <div class="special-card__price">69.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>
<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (36).jpg" alt="Ручка шариковая">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Ручка шариковая синяя, с вращающейся во вс...</div>
    <div class="special-card__art">Арт.: 591-224</div>
    <div class="special-card__price">89.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (37).jpg" alt="Ручка шариковая">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Ручка шариковая синяя, с вращающейся во вс...</div>
    <div class="special-card__art">Арт.: 591-225</div>
    <div class="special-card__price">89.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (38).jpg" alt="Авторучка гелевая">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Авторучка гелевая "пиши-стирай" синяя</div>
    <div class="special-card__art">Арт.: 591-236</div>
    <div class="special-card__price">99.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (39).jpg" alt="Авторучка гелевая">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Авторучка гелевая "пиши-стирай" синяя</div>
    <div class="special-card__art">Арт.: 591-238</div>
    <div class="special-card__price">99.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>
<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (40).jpg" alt="Ручка шариковая">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Ручка шариковая 10-цветная, с принтом н...</div>
    <div class="special-card__art">Арт.: 591-239</div>
    <div class="special-card__price">139.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (41).jpg" alt="Крем для рук">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Крем для рук "AQUATEL"</div>
    <div class="special-card__art">Арт.: 977-206</div>
    <div class="special-card__price">99.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (42).jpg" alt="Крем-мыло твердое">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Крем-мыло твердое Crème by AQUATEL</div>
    <div class="special-card__art">Арт.: 952-140</div>
    <div class="special-card__price">69.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (43).jpg" alt="Гель для душа">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Гель для душа Timotei Мен Акватическая свежесть</div>
    <div class="special-card__art">Арт.: 951-122</div>
    <div class="special-card__price">115.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>
<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (44).jpg" alt="Подарочный набор мужской DC STRONG">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Подарочный набор мужской DC STRONG</div>
    <div class="special-card__art">Арт.: 954-043</div>
    <div class="special-card__price">249.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (45).jpg" alt="Подарочный набор мужской AXE ICE">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Подарочный набор мужской AXE ICE</div>
    <div class="special-card__art">Арт.: 954-051</div>
    <div class="special-card__price">439.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (46).jpg" alt="Подарочный набор мужской MEN CODE">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Подарочный набор мужской MEN CODE</div>
    <div class="special-card__art">Арт.: 954-045</div>
    <div class="special-card__price">469.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (47).jpg" alt="Подарочный набор мужской MEN CODE">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Подарочный набор мужской MEN CODE</div>
    <div class="special-card__art">Арт.: 954-046</div>
    <div class="special-card__price">399.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>
<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (48).jpg" alt="Подарочный набор мужской ORGANIC">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Подарочный набор мужской ORGANIC</div>
    <div class="special-card__art">Арт.: 954-048</div>
    <div class="special-card__price">389.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (49).jpg" alt="Подарочный набор женский DC LILAC">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Подарочный набор женский DC LILAC</div>
    <div class="special-card__art">Арт.: 937-148</div>
    <div class="special-card__price">319.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (50).jpg" alt="Подарочный набор женский HIMALAYA">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Подарочный набор женский HIMALAYA</div>
    <div class="special-card__art">Арт.: 937-151</div>
    <div class="special-card__price">289.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (51).jpg" alt="Подарочный набор женский LISS">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Подарочный набор женский LISS</div>
    <div class="special-card__art">Арт.: 937-150</div>
    <div class="special-card__price">269.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>
<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (52).jpg" alt="Подарочный набор женский LISS">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Подарочный набор женский LISS</div>
    <div class="special-card__art">Арт.: 937-149</div>
    <div class="special-card__price">329.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (53).jpg" alt="Подарочный набор женский">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Подарочный набор женский</div>
    <div class="special-card__art">Арт.: 937-161</div>
    <div class="special-card__price">359.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (54).jpg" alt="Подарочный набор женский AURA">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Подарочный набор женский AURA</div>
    <div class="special-card__art">Арт.: 937-154</div>
    <div class="special-card__price">329.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (55).jpg" alt="Подарочный набор женский ORGANIC">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Подарочный набор женский ORGANIC</div>
    <div class="special-card__art">Арт.: 937-158</div>
    <div class="special-card__price">399.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>
<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (56).jpg" alt="Хна натуральная иранская">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Хна натуральная иранская, 25г</div>
    <div class="special-card__art">Арт.: 972-047</div>
    <div class="special-card__price">49.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (57).jpg" alt="Кондиционер-ополаскиватель">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Кондиционер-ополаскиватель для...</div>
    <div class="special-card__art">Арт.: 956-060</div>
    <div class="special-card__price">249.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (58).jpg" alt="Гель-бальзам для мытья посуды">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Гель-бальзам для мытья посуды Absolut Power</div>
    <div class="special-card__art">Арт.: 992-068</div>
    <div class="special-card__price">139.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (59).jpg" alt="Зубная паста Blend-A-Med">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Зубная паста Blend-A-Med 3D White Нежная</div>
    <div class="special-card__art">Арт.: 981-097</div>
    <div class="special-card__price">159.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>
<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (60).jpg" alt="Зубной порошок Мятный">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Зубной порошок Мятный, Семейный, 75г</div>
    <div class="special-card__art">Арт.: 981-099</div>
    <div class="special-card__price">39 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (61).jpg" alt="Гель для стирки GRASS CRISPI">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Гель для стирки GRASS CRISPI для всех видов тканей</div>
    <div class="special-card__art">Арт.: 958-157</div>
    <div class="special-card__price">339.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (62).jpg" alt="Салфетки бумажные Bumko">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Салфетки бумажные Bumko V-сложения</div>
    <div class="special-card__art">Арт.: 912-025</div>
    <div class="special-card__price">49.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (63).jpg" alt="Рокот Набор подарочный">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Рокот Набор подарочный 30 предметов</div>
    <div class="special-card__art">Арт.: 736-255</div>
    <div class="special-card__price">849.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>
<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (64).jpg" alt="РОКОТ Набор из 13ти предметов">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">РОКОТ Набор из 13ти предметов, отвертка...</div>
    <div class="special-card__art">Арт.: 736-259</div>
    <div class="special-card__price">378.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (65).jpg" alt="РОКОТ Набор 17 предметов">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">РОКОТ Набор 17 предметов, отвертка...</div>
    <div class="special-card__art">Арт.: 736-260</div>
    <div class="special-card__price">469.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (66).jpg" alt="Кружка 350мл, фарфор">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Кружка 350мл, фарфор, "Стиль", 4 дизайна</div>
    <div class="special-card__art">Арт.: 806-132</div>
    <div class="special-card__price">149.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (67).jpg" alt="SATOSHI Монте Ложка">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">SATOSHI Монте Ложка, 33x7 см...</div>
    <div class="special-card__art">Арт.: 882-438</div>
    <div class="special-card__price">149.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>
<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (68).jpg" alt="SATOSHI Монте Венчик">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">SATOSHI Монте Венчик, 30,8x5,7см...</div>
    <div class="special-card__art">Арт.: 882-440</div>
    <div class="special-card__price">149.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (69).jpg" alt="SATOSHI Монте Толкушка">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">SATOSHI Монте Толкушка, 29x9,5см...</div>
    <div class="special-card__art">Арт.: 882-439</div>
    <div class="special-card__price">149.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (70).jpg" alt="SATOSHI Монте Лопатка">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">SATOSHI Монте Лопатка с прорезями...</div>
    <div class="special-card__art">Арт.: 882-443</div>
    <div class="special-card__price">149.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (71).jpg" alt="SATOSHI Монте Шумовка">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">SATOSHI Монте Шумовка, 35x10,8 см...</div>
    <div class="special-card__art">Арт.: 882-444</div>
    <div class="special-card__price">149.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>
<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (72).jpg" alt="SATOSHI Монте Лопатка">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">SATOSHI Монте Лопатка, 34,5x9,8 см...</div>
    <div class="special-card__art">Арт.: 882-441</div>
    <div class="special-card__price">149.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (73).jpg" alt="SATOSHI Монте Ложка для спагетти">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">SATOSHI Монте Ложка для спагетти, 33,6x6 см...</div>
    <div class="special-card__art">Арт.: 882-445</div>
    <div class="special-card__price">149.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (74).jpg" alt="Шампунь для волос ШАУМА">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Шампунь для волос ШАУМА Для Всей Семьи</div>
    <div class="special-card__art">Арт.: 974-096</div>
    <div class="special-card__price">329.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (75).jpg" alt="Средство для мытья посуды AOS">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Средство для мытья посуды AOS в тубе</div>
    <div class="special-card__art">Арт.: 992-060</div>
    <div class="special-card__price">146.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>
<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (76).jpg" alt="Зубная паста Sensodyne">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Зубная паста Сенсодин Комплексная защита...</div>
    <div class="special-card__art">Арт.: 981-095</div>
    <div class="special-card__price">139.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (77).jpg" alt="Кружка Love is...">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Кружка "Love is..." 230 мл, стекло</div>
    <div class="special-card__art">Арт.: 806-128</div>
    <div class="special-card__price">179.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (78).jpg" alt="Ведро для мусора">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Ведро для мусора с подвижной крышкой...</div>
    <div class="special-card__art">Арт.: 407-094</div>
    <div class="special-card__price">449.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (79).jpg" alt="Подарочный набор мужской BIO">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Подарочный набор мужской BIO...</div>
    <div class="special-card__art">Арт.: 954-041</div>
    <div class="special-card__price">329.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>
<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (80).jpg" alt="Подарочный набор мужской TUNE MEN">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Подарочный набор мужской TUNE MEN...</div>
    <div class="special-card__art">Арт.: 954-042</div>
    <div class="special-card__price">249.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (81).jpg" alt="Фитокосметик Краска для бровей">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Фитокосметик Краска для бровей и ресниц...</div>
    <div class="special-card__art">Арт.: 081-037</div>
    <div class="special-card__price">59.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (82).jpg" alt="Фитокосметик Краска для бровей">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Фитокосметик Краска для бровей и ресниц...</div>
    <div class="special-card__art">Арт.: 081-036</div>
    <div class="special-card__price">59.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (83).jpg" alt="Кашпо для цветов">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Кашпо для цветов Дубок d200мм 2,5 л с...</div>
    <div class="special-card__art">Арт.: 164-398</div>
    <div class="special-card__price">119.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>
  `;
  const page3HTML = `
    <div class="special-card">
    <div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (84).jpg" alt="ИГРОЛЕНД Игрушка мягкая">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">ИГРОЛЕНД Игрушка мягкая "Подвеска"</div>
    <div class="special-card__art">Арт.: 264-429</div>
    <div class="special-card__price">99 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>
<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (85).jpg" alt="Диспенсер для жидкого мыла Velvet">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Диспенсер для жидкого мыла "Velvet"</div>
    <div class="special-card__art">Арт.: 463-330</div>
    <div class="special-card__price">269.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (86).jpg" alt="Диспенсер для жидкого мыла Velvet">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Диспенсер для жидкого мыла "Velvet"</div>
    <div class="special-card__art">Арт.: 463-335</div>
    <div class="special-card__price">269.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (87).jpg" alt="Стельки для обуви зимние меховые">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Стельки для обуви зимние меховые, р 36...</div>
    <div class="special-card__art">Арт.: 459-222</div>
    <div class="special-card__price">99.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>
<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (88).jpg" alt="Коврик придверный влаговпитывающий">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Коврик придверный, влаговпитывающий...</div>
    <div class="special-card__art">Арт.: 466-197</div>
    <div class="special-card__price">299.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (89).jpg" alt="Набор для специй Люмици">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Набор для специй "Люмици", пластик, 3...</div>
    <div class="special-card__art">Арт.: 861-285</div>
    <div class="special-card__price">169.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (90).jpg" alt="PROVANCE Нэви Прихватка">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">PROVANCE Нэви Прихватка, 100% хлопок</div>
    <div class="special-card__art">Арт.: 493-134</div>
    <div class="special-card__price">139.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (91).jpg" alt="PROVANCE Нэви Прихватка-варежка">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">PROVANCE Нэви Прихватка-варежка, 100% хлопок</div>
    <div class="special-card__art">Арт.: 493-135</div>
    <div class="special-card__price">229.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>
<div class="special-card">
<div class="hits-card__labels">
                  <span class="label label-sale">АКЦИЯ</span>         
                </div>
    <img class="special-card__img" src="images/product-allproducts/1 (94).jpg" alt="Крем для ног Гидропилинг">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Крем для ног "Гидропилинг"</div>
    <div class="special-card__art">Арт.: 832-022</div>
    <div class="special-card__price">129.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (93).jpg" alt="Luminarc Эклипс Амбиянте Тарелка">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">Luminarc Эклипс Амбиянте Тарелка</div>
    <div class="special-card__art">Арт.: 877-337</div>
    <div class="special-card__price">129.90 руб./шт.</div>
    <button class="special-card__cart">В корзину</button>
</div>

<div class="special-card">
    <img class="special-card__img" src="images/product-allproducts/1 (92).jpg" alt="SATOSHI Форма для выпечки Сорбет">
    <button class="special-like"><img src="images/components/like.svg" alt="like"></button>
    <div class="special-card__title">SATOSHI Форма для выпечки "Сорбет"</div>
    <div class="special-card__art">Арт.: 856-208</div>
    <div class="special-card__price">299.90 руб./шт.</div>
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