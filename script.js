document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealTargets = document.querySelectorAll(
        'main > section, .project-card, .feature-panel, .spec-box, .image-box, .media-card, .stat-card, .credit-block, .contact-card'
    );

    revealTargets.forEach((element, index) => {
        element.classList.add('reveal-on-scroll');
        element.style.transitionDelay = `${Math.min(index * 45, 260)}ms`;
    });

    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealTargets.forEach((element) => element.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -7% 0px'
    });

    revealTargets.forEach((element) => observer.observe(element));
});
