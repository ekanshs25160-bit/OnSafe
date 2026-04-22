/**
 * Animation Variants for site-wide consistency
 */

export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export const glitchAnimate = {
    hover: {
        x: [0, -2, 2, -1, 1, 0],
        y: [0, 2, -2, 1, -1, 0],
        transition: {
            repeat: Infinity,
            duration: 0.3
        }
    }
};

// Intersection Observer helper for CSS animations
export const observeEntrance = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-trigger').forEach(el => observer.observe(el));
};
