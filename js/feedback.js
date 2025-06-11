document.addEventListener('DOMContentLoaded', function() {
  let selectedRating = null;

  // Helper function to close the review modal
  function closeReviewModal() {
    const modalReview = document.getElementById('modalReview');
    const modalReviewOverlay = document.getElementById('modalReviewOverlay');
    if (modalReview) modalReview.style.display = 'none';
    if (modalReviewOverlay) modalReviewOverlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Выбор звезд
  document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = star.getAttribute('data-value');
      
      document.querySelectorAll('.star').forEach(s => s.classList.remove('selected'));
      for (let i = 0; i < document.querySelectorAll('.star').length; i++) {
        if (i < selectedRating) {
          document.querySelectorAll('.star')[i].classList.add('selected');
        }
      }
    });
  });

  // Отправка отзыва
  const reviewForm = document.querySelector('.review-modal-form');
  if (reviewForm) { // Add a check to ensure the form exists
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const nameInput = document.querySelector('.review-modal-input[type="text"]');
      const emailInput = document.querySelector('.review-modal-input[type="email"]');
      const commentInput = document.querySelector('.review-modal-textarea');
      const anonymousCheckbox = document.querySelector('.review-modal-checkbox');
      const termsCheckbox = document.querySelector('.review-modal-terms-checkbox');

      const name = nameInput ? nameInput.value : '';
      const email = emailInput ? emailInput.value : '';
      const comment = commentInput ? commentInput.value.trim() : '';
      const anonymous = anonymousCheckbox.checked ? 'on' : '';
      const agreed = termsCheckbox.checked;

      if (!comment || comment.length < 5) {
        alert("Комментарий должен быть не менее 5 символов");
        return;
      }

      if (!agreed) {
        alert("Вы должны принять условия использования");
        return;
      }

      if (!selectedRating) {
        alert("Пожалуйста, поставьте оценку");
        return;
      }

      // Instead of fetching to a backend, save to localStorage
      const review = {
        name: name,
        email: email,
        comment: comment,
        rating: selectedRating,
        anonymous: anonymous // Store anonymous status
      };

      let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
      reviews.push(review);
      localStorage.setItem('reviews', JSON.stringify(reviews));

          alert("Спасибо за отзыв!");
          closeReviewModal(); // Close the modal on successful submission
      loadReviews(); // Load updated reviews

      // Clear the form
      if (nameInput) nameInput.value = '';
      if (emailInput) emailInput.value = '';
      if (commentInput) commentInput.value = '';
      if (anonymousCheckbox) anonymousCheckbox.checked = false;
      if (termsCheckbox) termsCheckbox.checked = false;
          document.querySelectorAll('.star').forEach(s => s.classList.remove('selected'));
      selectedRating = null; // Reset selected rating
    });
  }

  // Загрузка отзывов
  function loadReviews() {
    // Fetch reviews from localStorage instead of /api/reviews
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        const container = document.getElementById('reviews-container');
    const reviewCountElement = document.querySelector('.product-reviews-count');

        if (!container) return;

        // Update the review count
        if (reviewCountElement) {
          reviewCountElement.textContent = `${reviews.length} отзывов`;
        }

        container.innerHTML = '';

        if (reviews.length === 0) {
          container.innerHTML = '<p class="no-reviews">Нет отзывов. Будьте первым!</p>';
          return;
        }

        reviews.forEach(review => {
          const card = document.createElement('div');
          card.className = 'review-card';

      // Display "Анонимно" if anonymous is true
      const displayName = review.anonymous ? 'Анонимно' : review.name;

          card.innerHTML = `
        <div class="review-header">${displayName}</div>
            <div class="review-rating">Рейтинг: ${review.rating}/5</div>
            <div class="review-comment">${review.comment}</div>
          `;
          container.appendChild(card);
      });
  }

  // При загрузке страницы — загружаем отзывы
  window.addEventListener('load', loadReviews);

  // Open the review modal
  const openReviewModalBtn = document.querySelector('.product-reviews-new-btn');
  if (openReviewModalBtn) {
    openReviewModalBtn.addEventListener('click', () => {
      const modalReview = document.getElementById('modalReview');
      const modalReviewOverlay = document.getElementById('modalReviewOverlay');
      if (modalReview) modalReview.style.display = 'flex'; // Use flex to center with CSS
      if (modalReviewOverlay) modalReviewOverlay.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent scrolling of the background
      
      // Load existing reviews and ensure form is clear when opening
      loadReviews(); // Refresh reviews when opening modal
      // Clear the form when opening the modal for a new review
      const nameInput = document.querySelector('.review-modal-input[type="text"]');
      const emailInput = document.querySelector('.review-modal-input[type="email"]');
      const commentInput = document.querySelector('.review-modal-textarea');
      const anonymousCheckbox = document.querySelector('.review-modal-checkbox');
      const termsCheckbox = document.querySelector('.review-modal-terms-checkbox');
      
      if (nameInput) nameInput.value = '';
      if (emailInput) emailInput.value = '';
      if (commentInput) commentInput.value = '';
      if (anonymousCheckbox) anonymousCheckbox.checked = false;
      if (termsCheckbox) termsCheckbox.checked = false;
      document.querySelectorAll('.star').forEach(s => s.classList.remove('selected'));
      selectedRating = null;
    });
  }

  // Close the review modal via close button or overlay
  const modalReviewCloseBtn = document.getElementById('modalReviewClose');
  const modalReviewOverlay = document.getElementById('modalReviewOverlay');

  if (modalReviewCloseBtn) {
    modalReviewCloseBtn.addEventListener('click', closeReviewModal);
  }

  if (modalReviewOverlay) {
    modalReviewOverlay.addEventListener('click', (e) => {
      if (e.target === modalReviewOverlay) {
        closeReviewModal();
      }
    });
  }
});