function transitionToPage(url) {
    // Check if transition overlay exists
    let overlay = document.querySelector('.overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
    }

    overlay.classList.add('active');
    
    setTimeout(() => {
        window.location.href = url;
    }, 600);
}

// Fade-in elements as they come into view
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.stat-card, .btn, .hero-section').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});
