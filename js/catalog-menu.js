document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('catalogMenuBtn');
  const menu = document.getElementById('catalogDropdownMenu');
  const closeBtn = menu.querySelector('.catalog-menu-close');
  const moreLink = document.querySelector('.open-catalog-menu');

  if (!menu) return;

  function openMenu() {
    menu.classList.add('open');
  }
  function closeMenu() {
    menu.classList.remove('open');
  }

  if (btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (menu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (moreLink) {
    moreLink.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      openMenu();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeMenu();
    });
  }

  document.addEventListener('click', function(e) {
    if (!menu.contains(e.target) && e.target !== btn && e.target !== moreLink) {
      closeMenu();
    }
  });

  // Активные категории
  const cats = menu.querySelectorAll('.catalog-dropdown-menu__categories li');
  cats.forEach(cat => {
    cat.addEventListener('click', function() {
      cats.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      // Здесь можно добавить подгрузку контента для правой части
    });
  });

  // Открытие меню по клику на каждое слово (ссылку <a>) в главном меню (index.html)
  const sidebarList = document.querySelector('.menu-categories__list');
  if (sidebarList) {
    const links = sidebarList.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        openMenu();
      });
    });
  }

  // Активные табы
  const tabs = menu.querySelectorAll('.catalog-dropdown-menu__tabs .tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      // Здесь можно добавить подгрузку контента для таба
    });
  });
}); 