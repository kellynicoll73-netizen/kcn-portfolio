/* ============================================================
   Poster carousel — centred conveyor
   Desktop (> 960px): one poster centred, half-peeks each side,
   feathered edges via CSS. Tablet/mobile (≤ 960px): standard
   2-up scroll, no centring offset, no feathering.

   Track layout (total 11 items):
     [0]  front clone B  — poster 6  (left-peek context for backward loop)
     [1]  front clone A  — poster 7  (left peek at start position)
     [2–8] real posters 1–7
     [9]  back clone     — poster 1
     [10] back clone     — poster 2

   Partners' Conference — Indigenous inclusion callout
   ============================================================ */
(function () {
    'use strict';

    const track = document.getElementById('posterTrack');
    if (!track) return;

    const REAL_COUNT   = 7;     // actual poster items (not clones)
    const FRONT_CLONES = 2;     // front clones prepended before poster 1
    const GAP_PX       = 8;     // matches CSS gap on .cs-poster-track
    const INTERVAL_MS  = 5000;  // ms between auto-advances
    const EASE         = 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)';

    let current     = FRONT_CLONES;  // start at real poster 1 (index 2)
    let animating   = false;
    let timer       = null;
    const reducedMotion = !!(window.matchMedia &&
                           window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    /* --- helpers ------------------------------------------ */

    function step() {
        // Live item width + gap — recalculated each call for responsive accuracy
        return track.children[0].offsetWidth + GAP_PX;
    }

    function moveTo(index, animate) {
        // Desktop (> 960px): offset by half a step so the current poster is centred,
        // with ~half of the prev and next posters peeking out each side.
        // Tablet/mobile (≤ 960px): standard left-aligned 2-up, no offset.
        const centred = !window.matchMedia('(max-width: 960px)').matches;
        const offset  = centred ? step() / 2 : 0;
        track.style.transition = (animate && !reducedMotion) ? EASE : 'none';
        track.style.transform  = 'translateX(' + (-index * step() + offset) + 'px)';
    }

    /* --- advance / retreat -------------------------------- */

    function advance() {
        if (animating) return;
        animating = true;
        current++;
        moveTo(current, true);

        // Reduced-motion: no transitionend fires — apply snap manually
        if (reducedMotion) {
            animating = false;
            if (current >= REAL_COUNT + FRONT_CLONES) {
                current = FRONT_CLONES;
                moveTo(current, false);
            }
        }
    }

    function retreat() {
        if (animating) return;
        animating = true;
        current--;
        moveTo(current, true);

        // Reduced-motion: no transitionend fires — apply snap manually
        if (reducedMotion) {
            animating = false;
            if (current < FRONT_CLONES) {
                current = REAL_COUNT + FRONT_CLONES - 1;
                moveTo(current, false);
            }
        }
    }

    /* --- seamless loop snap ------------------------------- */

    track.addEventListener('transitionend', function (e) {
        if (e.propertyName !== 'transform') return;
        animating = false;

        if (current >= REAL_COUNT + FRONT_CLONES) {
            // Forward wrap: snap from back clone (poster 1) → real poster 1 (same visual)
            current = FRONT_CLONES;
            moveTo(current, false);
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    track.style.transition = '';
                });
            });
        } else if (current < FRONT_CLONES) {
            // Backward wrap: snap from front clone A (poster 7) → real poster 7 (same visual)
            current = REAL_COUNT + FRONT_CLONES - 1;
            moveTo(current, false);
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    track.style.transition = '';
                });
            });
        }
    });

    /* --- pause on hover / focus / button ------------------ */

    const carousel = track.closest
        ? track.closest('.cs-poster-carousel')
        : track.parentNode;

    let userPaused = false;  // true when the pause button is toggled on

    function stopTimer()  { clearInterval(timer); timer = null; }
    function startTimer() { if (!timer && !userPaused) timer = setInterval(advance, INTERVAL_MS); }

    if (carousel) {
        carousel.addEventListener('mouseenter', stopTimer);
        carousel.addEventListener('mouseleave', startTimer);
        carousel.addEventListener('focusin',    stopTimer);
        carousel.addEventListener('focusout',   startTimer);
    }

    // Pause/play toggle button (WCAG 2.2.2)
    const pauseBtn = document.getElementById('posterPause');
    if (pauseBtn) {
        pauseBtn.addEventListener('click', function () {
            userPaused = !userPaused;
            pauseBtn.classList.toggle('is-paused', userPaused);
            pauseBtn.setAttribute('aria-label', userPaused ? 'Play poster carousel' : 'Pause poster carousel');
            if (userPaused) {
                stopTimer();
            } else {
                startTimer();
            }
        });
    }

    /* --- swipe (touch) ------------------------------------ */
    let swipeStartX  = null;
    const SWIPE_MIN_PX = 40;

    const swipeTarget = carousel || track;

    swipeTarget.addEventListener('touchstart', function (e) {
        swipeStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    swipeTarget.addEventListener('touchend', function (e) {
        if (swipeStartX === null) return;
        const dx = e.changedTouches[0].clientX - swipeStartX;
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

    /* --- recalculate position on resize ------------------- */
    // After a resize the item width changes, so the stored pixel offset is stale.
    // Snap the track to the correct position (no animation) so the next
    // auto-advance starts from the right place with the correct centring offset.

    let resizeTimer = null;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            moveTo(current, false);
        }, 100);
    });

    /* --- go ----------------------------------------------- */
    moveTo(current, false);  // Set initial position before first auto-advance
    // Short initial delay (1.2s) before the first advance so the carousel doesn't
    // appear frozen on load; subsequent advances use the normal 5s interval.
    setTimeout(function () {
        advance();
        startTimer();
    }, 1200);

}());
