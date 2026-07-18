// CCD site helpers: animated impact counters.
// NOTE: scroll-reveal is handled declaratively via CSS (@keyframes + [data-reveal]
// attribute selectors defined inline in each page's <style> block) — never via
// JS opacity/transform mutation. That keeps content guaranteed-visible even if
// an animation never progresses in a given rendering environment. This file
// only powers the count-up numbers.
export function initReveal(root) {
  const scope = root || document;
  const countEls = Array.from(scope.querySelectorAll('[data-count]:not([data-counted])'));
  countEls.forEach((el) => el.setAttribute('data-counted', '1'));

  function isNear(el) {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top < vh * 0.92 && r.bottom > 0;
  }

  function runCounter(el) {
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const dur = 1400;
    const t0 = performance.now();
    function step(t) {
      const p = Math.min(1, (t - t0) / dur);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * ease).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function check() {
    for (let i = countEls.length - 1; i >= 0; i--) {
      const el = countEls[i];
      if (isNear(el)) {
        runCounter(el);
        countEls.splice(i, 1);
      }
    }
    if (countEls.length) {
      requestAnimationFrame(scheduleCheck);
    } else {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
  }

  let ticking = false;
  function scheduleCheck() { ticking = false; check(); }
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(scheduleCheck);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  check();
  // Safety net in case scroll/rAF never fires in a given host environment.
  setTimeout(() => {
    countEls.splice(0).forEach((el) => runCounter(el));
  }, 1600);
}
