"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Ports the CCD reveal.js count-up logic and extends it to also drive
// scroll-triggered fade/slide-in for [data-reveal] elements. Elements are
// fully visible by default (no opacity:0 in the base stylesheet) — this
// script only *arms* them for animation once mounted, so content never
// disappears if JS fails to run.
export function ScrollFX() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);

  // Top-of-page scroll progress bar. Kept in its own effect/listener so it
  // keeps tracking for the life of the page, independent of the reveal
  // listener above, which detaches itself once every reveal target has fired.
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    let ticking = false;

    function update() {
      ticking = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      if (bar) bar.style.transform = `scaleX(${pct})`;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal]:not(.reveal-armed), [data-reveal-left]:not(.reveal-armed), [data-reveal-right]:not(.reveal-armed)"
      )
    );
    revealEls.forEach((el) => el.classList.add("reveal-armed"));

    const countEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-count]:not([data-counted])")
    );
    countEls.forEach((el) => el.setAttribute("data-counted", "1"));

    function isNear(el: HTMLElement) {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.92 && r.bottom > 0;
    }

    function runCounter(el: HTMLElement) {
      const target = parseFloat(el.getAttribute("data-count") || "0");
      const suffix = el.getAttribute("data-suffix") || "";
      const prefix = el.getAttribute("data-prefix") || "";
      const dur = 1400;
      const t0 = performance.now();
      function step(t: number) {
        const p = Math.min(1, (t - t0) / dur);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(target * ease).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    const pendingReveal = revealEls.slice();
    const pendingCount = countEls.slice();
    let ticking = false;

    function check() {
      for (let i = pendingReveal.length - 1; i >= 0; i--) {
        const el = pendingReveal[i];
        if (isNear(el)) {
          el.classList.add("in-view");
          pendingReveal.splice(i, 1);
        }
      }
      for (let i = pendingCount.length - 1; i >= 0; i--) {
        const el = pendingCount[i];
        if (isNear(el)) {
          runCounter(el);
          pendingCount.splice(i, 1);
        }
      }
      if (!pendingReveal.length && !pendingCount.length) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    }

    function scheduleCheck() {
      ticking = false;
      check();
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(scheduleCheck);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    check();

    const safety = window.setTimeout(() => {
      pendingReveal.splice(0).forEach((el) => el.classList.add("in-view"));
      pendingCount.splice(0).forEach((el) => runCounter(el));
    }, 1600);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(safety);
      // Un-arm anything still pending so a re-run of this effect (StrictMode
      // double-invoke in dev, or any remount over surviving DOM) can pick the
      // elements up again instead of leaving them stuck at opacity 0.
      pendingReveal.splice(0).forEach((el) => el.classList.remove("reveal-armed"));
      pendingCount.splice(0).forEach((el) => el.removeAttribute("data-counted"));
    };
  }, [pathname]);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress-bar" ref={progressRef} />
    </div>
  );
}
