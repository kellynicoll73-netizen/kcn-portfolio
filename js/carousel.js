(function () {
    'use strict';

    var carousel   = document.getElementById('carousel');
    var slides     = Array.from(carousel.querySelectorAll('.carousel-slide'));
    var dots       = Array.from(carousel.querySelectorAll('.carousel-dot'));
    var prevBtn    = document.getElementById('carouselPrev');
    var nextBtn    = document.getElementById('carouselNext');
    var liveRegion = document.getElementById('carouselLive');

    var current     = 0;
    var timer       = null;
    var INTERVAL    = 5000;
    var autoEnabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function goTo(index) {
        var next = (index + slides.length) % slides.length;
        if (next === current) return;

        // Deactivate outgoing slide
        slides[current].classList.remove('is-active');
        slides[current].querySelector('.slide-link').setAttribute('tabindex', '-1');
        dots[current].setAttribute('aria-selected', 'false');

        current = next;

        // Activate incoming slide
        slides[current].classList.add('is-active');
        slides[current].querySelector('.slide-link').setAttribute('tabindex', '0');
        dots[current].setAttribute('aria-selected', 'true');

        // Announce to screen readers
        liveRegion.textContent = 'Slide ' + (current + 1) + ' of ' + slides.length;
    }

    function startAuto() {
        if (!autoEnabled) return;
        stopAuto();
        timer = setInterval(function () { goTo(current + 1); }, INTERVAL);
    }

    function stopAuto() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    // Button handlers — restart timer after manual interaction
    prevBtn.addEventListener('click', function () {
        goTo(current - 1);
        startAuto();
    });

    nextBtn.addEventListener('click', function () {
        goTo(current + 1);
        startAuto();
    });

    dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
            goTo(i);
            startAuto();
        });
    });

    // Keyboard: arrow keys navigate when carousel is focused
    carousel.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            goTo(current - 1);
            startAuto();
        } else if (e.key === 'ArrowRight') {
            goTo(current + 1);
            startAuto();
        }
    });

    // Pause auto-advance while user is interacting
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);
    carousel.addEventListener('focusin',    stopAuto);
    carousel.addEventListener('focusout',   startAuto);

    // Swipe (touch) — left = next, right = prev
    var swipeStartX  = null;
    var SWIPE_MIN_PX = 40;

    carousel.addEventListener('touchstart', function (e) {
        swipeStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', function (e) {
        if (swipeStartX === null) return;
        var dx = e.changedTouches[0].clientX - swipeStartX;
        swipeStartX = null;
        if (Math.abs(dx) < SWIPE_MIN_PX) return;
        if (dx < 0) {
            goTo(current + 1); // swipe left → next
        } else {
            goTo(current - 1); // swipe right → prev
        }
        startAuto();
    }, { passive: true });

    // Start auto-advance only when reduced-motion is not preferred
    startAuto();

}());
