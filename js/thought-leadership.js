/* ============================================================
   Thought Leadership — reading progress bar + sticky section name
   ============================================================ */
(function () {
    'use strict';

    /* --- Reading progress bar ----------------------------- */

    const progress = document.getElementById('tlProgress');

    function updateProgress() {
        if (!progress) return;
        const scrolled = window.scrollY;
        const total    = document.body.scrollHeight - window.innerHeight;
        const pct      = total > 0 ? (scrolled / total) * 100 : 0;
        const rounded  = Math.min(pct, 100);
        progress.style.width = rounded + '%';
        progress.setAttribute('aria-valuenow', Math.round(rounded));
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    /* --- Sticky section name ------------------------------ */

    const sectionLabel = document.getElementById('tlStickySection');
    const sections     = document.querySelectorAll('[data-section]');

    if (sectionLabel && sections.length) {
        // Seed with the first section name immediately
        sectionLabel.textContent = sections[0].dataset.section;

        // Update as each section enters the middle band of the viewport
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    sectionLabel.textContent = entry.target.dataset.section;
                }
            });
        }, {
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        });

        sections.forEach(function (s) { observer.observe(s); });
    }

}());
