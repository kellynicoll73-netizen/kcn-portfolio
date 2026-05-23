/* ============================================================
   Poster carousel — conveyor belt
   Shows 2 portrait posters at a time, slides left on advance.
   7 real items + 2 clones at end for seamless looping.
   Partners' Conference — Indigenous inclusion callout
   ============================================================ */
(function () {
    'use strict';

    var track = document.getElementById('posterTrack');
    if (!track) return;

    var REAL_COUNT  = 7;     // actual poster items (not clones)
    var GAP_PX      = 8;     // must match CSS gap on .cs-poster-track
    var INTERVAL_MS = 5000;  // ms between auto-advances
    var EASE        = 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)';

    var current       = 0;
    var animating     = false;
    var timer         = null;
    var reducedMotion = !!(window.matchMedia &&
                           window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    /* --- helpers ------------------------------------------ */

    function step() {
        // Live item width + gap (recalculated each time for responsive accuracy)
        return track.children[0].offsetWidth + GAP_PX;
    }

    function moveTo(index, animate) {
        track.style.transition = (animate && !reducedMotion) ? EASE : 'none';
        track.style.transform  = 'translateX(' + (-index * step()) + 'px)';
    }

    /* --- advance / retreat -------------------------------- */

    function advance() {
        if (animating) return;
        animating = true;
        current++;
        moveTo(current, true);

        // Reduced-motion: no transitionend fires, so complete manually
        if (reducedMotion) {
            animating = false;
            if (current >= REAL_COUNT) {
                moveTo(0, false);
                current = 0;
            }
        }
    }

    function retreat() {
        if (animating) return;
        if (current === 0) {
            // Wrap backward: snap instantly to last real item, then done
            animating = true;
            current = REAL_COUNT - 1;
            moveTo(current, false);
            // Re-enable transition on next two frames (same technique as forward loop)
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    track.style.transition = '';
                    animating = false;
                });
            });
            return;
        }
        animating = true;
        current--;
        moveTo(current, true);
        if (reducedMotion) { animating = false; }
    }

    /* --- seamless loop snap ------------------------------- */

    track.addEventListener('transitionend', function (e) {
        if (e.propertyName !== 'transform') return;
        animating = false;
        if (current >= REAL_COUNT) {
            // Snap instantly to the real start — visually identical to clone position
            moveTo(0, false);
            current = 0;
            // Re-enable CSS transition on the next two animation frames
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    track.style.transition = '';
                });
            });
        }
    });

    /* --- pause on hover / focus --------------------------- */

    var carousel = track.closest
        ? track.closest('.cs-poster-carousel')
        : track.parentNode;

    function stopTimer()  { clearInterval(timer); timer = null; }
    function startTimer() { if (!timer) timer = setInterval(advance, INTERVAL_MS); }

    if (carousel) {
        carousel.addEventListener('mouseenter', stopTimer);
        carousel.addEventListener('mouseleave', startTimer);
        carousel.addEventListener('focusin',    stopTimer);
        carousel.addEventListener('focusout',   startTimer);
    }

    /* --- swipe (touch) ------------------------------------ */
    var swipeStartX  = null;
    var SWIPE_MIN_PX = 40;

    var swipeTarget = carousel || track;

    swipeTarget.addEventListener('touchstart', function (e) {
        swipeStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    swipeTarget.addEventListener('touchend', function (e) {
        if (swipeStartX === null) return;
        var dx = e.changedTouches[0].clientX - swipeStartX;
        swipeStartX = null;
        if (Math.abs(dx) < SWIPE_MIN_PX) return;
        stopTimer();
        if (dx < 0) {
            advance();  // swipe left → next poster
        } else {
            retreat();  // swipe right → previous poster
        }
        startTimer();
    }, { passive: true });

    /* --- go ----------------------------------------------- */
    startTimer();

}());
