document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const logoutLink = document.getElementById('logoutLink');
    const authIcon = document.getElementById('authIcon');
    const authToggleContainer = document.getElementById('authToggleContainer');
    const userGreetingContainer = document.getElementById('user-greeting');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            const users = JSON.parse(localStorage.getItem('users')) || {};
            const user = users[email];

            if (user && user.password === password) {
                localStorage.setItem('currentUser', email);
                alert('Вход выполнен успешно!');
                window.location.href = 'index.html';
            } else {
                alert('Неверный Email или пароль.');
            }
        });
    }

    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            alert('Вы вышли из аккаунта.');
            window.location.href = 'index.html';
        });
    }

    // Function to update UI based on login status
    function updateAuthUI() {
        const currentUserEmail = localStorage.getItem('currentUser');
        if (currentUserEmail) {
            // User is logged in
            if (authIcon) authIcon.style.display = 'none';
            if (logoutLink) logoutLink.style.display = 'block';
            
            const users = JSON.parse(localStorage.getItem('users')) || {};
            const currentUser = users[currentUserEmail];
            if (currentUser && userGreetingContainer) {
                userGreetingContainer.innerHTML = `
                    <div class="profile-greeting">
                        Привет, ${currentUser.name} ${currentUser.surname}!
                    </div>
                `;
                userGreetingContainer.style.display = 'block';
            }
            // Hide modal auth if currently open
            const modalAuth = document.getElementById('modalAuth');
            const modalAuthOverlay = document.getElementById('modalAuthOverlay');
            if (modalAuth) modalAuth.style.display = 'none';
            if (modalAuthOverlay) modalAuthOverlay.style.display = 'none';

        } else {
            // User is logged out
            if (authIcon) authIcon.style.display = 'block';
            if (logoutLink) logoutLink.style.display = 'none';
            if (userGreetingContainer) {
                userGreetingContainer.innerHTML = `
                    <button onclick="document.getElementById('modalAuth').style.display = 'block';
                                    document.getElementById('modalAuthOverlay').style.display = 'block';"
                            class="auth-button">
                        Войти
                    </button>
                `;
                userGreetingContainer.style.display = 'none';
            }
        }
    }

    // Initial UI update on page load
    updateAuthUI();
}); 