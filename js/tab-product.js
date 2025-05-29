  // Tabs logic
  document.querySelectorAll('.product-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.product-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      const tabName = this.getAttribute('data-tab');
      document.querySelectorAll('.product-tab-content').forEach(c => c.style.display = 'none');
      document.querySelector('.product-tab-content--' + tabName).style.display = '';
    });
  });