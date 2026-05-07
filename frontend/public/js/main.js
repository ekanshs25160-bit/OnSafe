document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to SCS Digital Experience");

    // Load components - In a real setup, we might fetch HTML but here we'll just insert content.
    loadNavbar();
    loadFooter();
    
    // Animate stats numbers if on homepage
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const targetValue = parseInt(stat.textContent);
        animateNumber(stat, targetValue);
    });
});

function loadNavbar() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.innerHTML = `
            <div class="nav-container">
                <a href="home.html" class="logo">SCS.</a>
                <ul class="nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#vision">Vision</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="index.html" class="btn btn-secondary btn-sm">Sign In</a></li>
                </ul>
            </div>
        `;
    }
}

function loadFooter() {
    const footer = document.getElementById('footer');
    if (footer) {
        footer.innerHTML = `
            <div class="footer-container">
                <p>&copy; 2026 SCS. All rights reserved.</p>
                <div class="social-links">
                    <a href="#">X</a>
                    <a href="#">GitHub</a>
                    <a href="#">LinkedIn</a>
                </div>
            </div>
        `;
    }
}

function animateNumber(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 100);
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target > 100 ? '+' : '');
            clearInterval(interval);
        } else {
            element.textContent = current + '+';
        }
    }, 20);
}
