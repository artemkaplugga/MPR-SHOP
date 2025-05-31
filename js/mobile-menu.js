document.addEventListener("DOMContentLoaded", function() {
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeBtn = document.getElementById("closeBtn");

  if (burger && mobileMenu && closeBtn) {
    burger.addEventListener("click", () => {
      mobileMenu.classList.add("active");
    }, { passive: true });

    closeBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    }, { passive: true });

    document.querySelectorAll(".mobile-menu-links a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
      }, { passive: true });
    });
  }
});
