const companyDropdown = document.querySelector('.company-dropdown');

if (companyDropdown) {
  companyDropdown.addEventListener('click', function() {
    this.classList.toggle('open');
  });
}