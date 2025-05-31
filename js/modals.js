const companyDropdown = document.querySelector('.company-dropdown');

if (companyDropdown) {
  companyDropdown.addEventListener('click', function() {
    this.classList.toggle('open');
  });
}



document.addEventListener('DOMContentLoaded', function() {
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
      authBtn.addEventListener('click', function(e) {
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
      openDeliveryBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openDeliveryModal();
      });
    }
    if (mobileOpenDeliveryBtn) {
      mobileOpenDeliveryBtn.addEventListener('click', function(e) {
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
      tabDelivery.addEventListener('click', function() {
        tabDelivery.classList.add('active');
        tabPickup.classList.remove('active');
      });
      tabPickup.addEventListener('click', function() {
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
      deliveryTab.addEventListener('click', function() {
        deliveryTab.classList.add('active');
        pickupTab.classList.remove('active');
        deliveryContent.style.display = 'block';
        pickupContent.style.display = 'none';
      });
      pickupTab.addEventListener('click', function() {
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
      pickupSelected.addEventListener('click', function(e) {
        e.stopPropagation();
        pickupList.style.display = pickupList.style.display === 'block' ? 'none' : 'block';
        pickupDropdown.classList.toggle('open');
      });
      // Select item
      pickupItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
          pickupItems.forEach(i => i.classList.remove('selected'));
          item.classList.add('selected');
          pickupSelected.textContent = item.textContent;
          pickupList.style.display = 'none';
          pickupDropdown.classList.remove('open');
        });
      });
      // Close dropdown on outside click
      document.addEventListener('click', function(e) {
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
      cityColCity.addEventListener('click', function(e) {
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
  });
  