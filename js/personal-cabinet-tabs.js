document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.personal-cabinet-menu li');
    const tabContents = document.querySelectorAll('.tab-content');
    const logoutLink = document.querySelector('.personal-cabinet-menu li a[href="#"][alt="Выход"]'); // Select by href and alt text if available

    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            // Check if the clicked item is the logout link
            if (item.querySelector('a').textContent.includes('Выход')) {
                // Simulate logout
                localStorage.removeItem('userLoggedIn'); // Example: remove a login flag
                alert('Вы успешно вышли из аккаунта!');
                window.location.href = 'index.html'; // Redirect to homepage or login page
                return; // Stop further processing for logout link
            }

            event.preventDefault();

            // Remove active class from all menu items and add to clicked one
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));

            // Show the corresponding tab content
            const targetId = item.querySelector('a').getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
        });
    });
}); 