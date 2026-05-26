/* ============================================================
   Reading progress bar + sticky section name
   Used on case study pages and thought leadership pieces.
   Requires:
     - #tlProgress   — the progress bar element
     - #tlStickySection — the section name label
     - data-section="…" on each <section>
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

    /* --- Show bar only once the hero has scrolled past the nav --- */

    const stickyBar = document.getElementById('tlStickyBar');
    const hero      = document.querySelector('.cs-hero');

    if (stickyBar && hero) {
        new IntersectionObserver(function (entries) {
            stickyBar.classList.toggle('tl-sticky-bar--scrolled', !entries[0].isIntersecting);
        }, { threshold: 0 }).observe(hero);
    }

    /* --- Sticky section name ------------------------------ */

    const sectionLabel = document.getElementById('tlStickySection');
    const sections     = document.querySelectorAll('[data-section]');

    if (sectionLabel && sections.length) {
        sectionLabel.textContent = sections[0].dataset.section;

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
