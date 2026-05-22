(function () {
    'use strict';

    var toggle   = document.querySelector('.nav-toggle');
    var navLinks = document.getElementById('navLinks');

    if (!toggle || !navLinks) return;

    function openNav() {
        navLinks.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close navigation menu');
    }

    function closeNav() {
        navLinks.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
    }

    toggle.addEventListener('click', function () {
        navLinks.classList.contains('is-open') ? closeNav() : openNav();
    });

    /* Close when tapping outside the nav */
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.site-nav')) {
            closeNav();
        }
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
            closeNav();
            toggle.focus();
        }
    });

    /* Close when a nav link is tapped (e.g. in-page anchors) */
    navLinks.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            closeNav();
        }
    });

}());
