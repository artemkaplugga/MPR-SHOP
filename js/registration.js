document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');

    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const surname = document.getElementById('surname').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const city = document.getElementById('city').value;
            const dob = document.getElementById('dob').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const agreeTerms = document.getElementById('agree-terms').checked;
            const subscribeNews = document.getElementById('subscribe-news').checked;

            // Basic validation
            if (!name || !surname || !phone || !email || !password || !confirmPassword) {
                alert('Пожалуйста, заполните все обязательные поля.');
                return;
            }

            if (password.length < 6) {
                alert('Пароль должен быть не менее 6 символов длиной.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Пароли не совпадают.');
                return;
            }

            if (!agreeTerms) {
                alert('Вы должны принять условия политики обработки персональных данных.');
                return;
            }

            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('users')) || {};
            if (users[email]) {
                alert('Пользователь с таким Email уже зарегистрирован.');
                return;
            }

            // Store user data
            users[email] = {
                name,
                surname,
                phone,
                email,
                city,
                dob,
                password, // In a real application, you would hash the password
                subscribeNews
            };
            localStorage.setItem('users', JSON.stringify(users));

            alert('Регистрация прошла успешно! Теперь вы можете войти.');
            window.location.href = 'index.html'; // Redirect to home or login page
        });
    }
});
