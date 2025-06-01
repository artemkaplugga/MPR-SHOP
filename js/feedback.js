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

      // Собираем данные вручную
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('comment', comment);
      formData.append('rating', selectedRating);
      if (anonymous) formData.append('anonymous', 'on');

      fetch('/add_review', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (!response.ok) {
          // If response is not OK (e.g., 4xx or 5xx status)
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then(errorData => {
              throw new Error(errorData.message || "Неизвестная ошибка сервера");
            });
          } else {
            // If not JSON, try to read as text for debugging
            return response.text().then(text => {
              console.error("Server responded with non-JSON error:", text);
              throw new Error("Ошибка сети или некорректный ответ сервера. Подробности в консоли.");
            }).catch(() => {
              throw new Error("Ошибка сети или некорректный ответ сервера");
            });
          }
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'ok') {
          alert("Спасибо за отзыв!");
          closeReviewModal(); // Close the modal on successful submission
          loadReviews(); // загружаем обновлённые отзывы
          document.querySelector('.review-modal-textarea').value = '';
          document.querySelectorAll('.star').forEach(s => s.classList.remove('selected'));
          selectedRating = null;
        } else {
          // This block should ideally not be reached if !response.ok handles most errors
          alert("Не удалось сохранить отзыв: " + (data.message || "Произошла неизвестная ошибка"));
        }
      })
      .catch(err => {
        console.error("Ошибка:", err);
        alert("Не удалось сохранить отзыв: " + err.message);
      });
    });
  }

  // Загрузка отзывов
  function loadReviews() {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(reviews => {
        const container = document.getElementById('reviews-container');
        const reviewCountElement = document.querySelector('.product-reviews-count'); // Get the review count element
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

          card.innerHTML = `
            <div class="review-header">${review.name}</div>
            <div class="review-rating">Рейтинг: ${review.rating}/5</div>
            <div class="review-comment">${review.comment}</div>
          `;
          container.appendChild(card);
        });
      })
      .catch(err => {
        console.error("Ошибка загрузки отзывов", err);
      });
  }

  // При загрузке страницы — загружаем отзывы
  window.addEventListener('load', loadReviews);
});