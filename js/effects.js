/* =========================================================
   EFFECTS.JS  -  premium animations
   Loaded last on every page. Everything is optional: if this
   file fails, the site still works normally.

   1. Preloader              6. Cursor glow + glass spotlight
   2. Scroll progress        7. 3D tilt cards
   3. Aurora blobs + bubbles        8. Magnetic buttons
   4. Navbar on scroll       9. Skill bars + rings
   5. Scroll reveal         10. Page transitions + back to top
        (animated counters live in section 5b)
========================================================= */
(function () {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- tiny helpers ---------- */
  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html) n.innerHTML = html;
    return n;
  }
  const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

  /* =========================================================
     Things that run right away (no need to wait for preloader)
  ========================================================= */

  /* ---------- 2. Scroll progress + 4. navbar + back-to-top ---------- */
  const bar = el("div", "scroll-progress");
  bar.setAttribute("aria-hidden", "true");
  body.appendChild(bar);

  const toTop = el("button", "to-top", '<i class="bi bi-arrow-up"></i>');
  toTop.type = "button";
  toTop.setAttribute("aria-label", "Back to top");
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  body.appendChild(toTop);
  toTop.dataset.magnetic = "";

  const navWrap = $(".navbar-wrapper");
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    if (navWrap) navWrap.classList.toggle("scrolled", y > 30);
    toTop.classList.toggle("show", y > 500);
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------- 3. Aurora blobs + bubbles---------- */
  const blobs = el("div", "blobs", [1, 2, 3, 4, 5].map((n) => `<span class="blob blob-${n}"></span>`).join(""));
  blobs.setAttribute("aria-hidden", "true");
  body.prepend(blobs);

  /* floating glass bubbles (pure decoration, behind the cards) */
  if (!reduceMotion) {
    const rnd = (a, b) => a + Math.random() * (b - a);
    for (let i = 0; i < 10; i++) {
      const b = el("span", "bubble");
      b.style.cssText =
        `--s:${rnd(26, 104).toFixed(0)}px;--x:${rnd(2, 96).toFixed(1)}%;--t:${rnd(24, 52).toFixed(1)}s;` +
        `--d:-${rnd(0, 46).toFixed(1)}s;--sway:${rnd(-70, 70).toFixed(0)}px`;
      blobs.appendChild(b);
    }
  }

  /* ---------- 6. Cursor glow + glass spotlight ---------- */
  if (fineHover && !reduceMotion) {
    const glow = el("div", "cursor-glow");
    glow.setAttribute("aria-hidden", "true");
    body.prepend(glow);

    let tx = innerWidth / 2, ty = innerHeight / 2, cx = tx, cy = ty;
    (function loop() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      glow.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(loop);
    })();

    document.addEventListener("pointermove", (e) => {
      tx = e.clientX; ty = e.clientY;
      glow.classList.add("on");
      let g = e.target.closest && e.target.closest(".glass");
      while (g) {
        const r = g.getBoundingClientRect();
        g.style.setProperty("--mx", e.clientX - r.left + "px");
        g.style.setProperty("--my", e.clientY - r.top + "px");
        g = g.parentElement && g.parentElement.closest(".glass");
      }
    }, { passive: true });
    document.addEventListener("pointerleave", () => glow.classList.remove("on"));
  }

  /* ---------- 8. Magnetic buttons ---------- */
  if (fineHover && !reduceMotion) {
    const magSel = ".btn, .theme-btn, .social-links a, .mobile-menu-btn, [data-magnetic]";
    document.addEventListener("pointermove", (e) => {
      $$(magSel).forEach((m) => {
        const r = m.getBoundingClientRect();
        const mx = r.left + r.width / 2;
        const my = r.top + r.height / 2;
        const dx = e.clientX - mx;
        const dy = e.clientY - my;
        const reach = Math.max(r.width, r.height) / 2 + 70;
        if (Math.hypot(dx, dy) < reach) {
          m.style.translate = `${(dx * 0.32).toFixed(1)}px ${(dy * 0.32).toFixed(1)}px`;
        } else if (m.style.translate) {
          m.style.translate = "";
        }
      });
    }, { passive: true });
  }

  /* ---------- 7. 3D tilt (eased every frame -> very smooth) ----------
     Writes CSS variables only: --rx --ry --ty --sc (card)  and
     --px --py (-0.5 .. 0.5, used for parallax + moving reflections). */
  function setupTilt() {
    if (!fineHover || reduceMotion) return;
    const targets = $$(".project-card, .feature-card, .ring-card, .tilt-wrap, .technology, .content-card, .page-title, .footer-box");
    const active = new Set();
    let last = 0;
    let running = false;

    function paint(s) {
      const st = s.node.style;
      st.setProperty("--rx", s.rx.toFixed(3) + "deg");
      st.setProperty("--ry", s.ry.toFixed(3) + "deg");
      st.setProperty("--ty", s.ty.toFixed(2) + "px");
      st.setProperty("--sc", s.sc.toFixed(4));
      st.setProperty("--px", s.px.toFixed(4));
      st.setProperty("--py", s.py.toFixed(4));
    }
    function frame(now) {
      const dt = Math.min(now - last, 40);
      last = now;
      const k = 1 - Math.exp(-dt / 75); // lower number = snappier
      active.forEach((s) => {
        s.rx += (s.trx - s.rx) * k;
        s.ry += (s.try - s.ry) * k;
        s.ty += (s.tty - s.ty) * k;
        s.sc += (s.tsc - s.sc) * k;
        s.px += (s.tpx - s.px) * k;
        s.py += (s.tpy - s.py) * k;
        paint(s);
        const settled =
          Math.abs(s.trx - s.rx) + Math.abs(s.try - s.ry) + Math.abs(s.tty - s.ty) +
          Math.abs(s.tsc - s.sc) * 100 + Math.abs(s.tpx - s.px) + Math.abs(s.tpy - s.py) < 0.02;
        if (!s.hover && settled) {
          ["--rx", "--ry", "--ty", "--sc", "--px", "--py"].forEach((v) => s.node.style.removeProperty(v));
          active.delete(s);
        }
      });
      if (active.size) requestAnimationFrame(frame);
      else running = false;
    }
    function wake() {
      if (running) return;
      running = true;
      last = performance.now();
      requestAnimationFrame(frame);
    }

    targets.forEach((node) => {
      node.setAttribute("data-tilt", "");
      const s = { node, rx: 0, ry: 0, ty: 0, sc: 1, px: 0, py: 0, trx: 0, try: 0, tty: 0, tsc: 1, tpx: 0, tpy: 0, hover: false, max: 8, lift: -6, scale: 1.02 };

      node.addEventListener("pointerenter", (e) => {
        if (e.pointerType && e.pointerType !== "mouse") return;
        const r = node.getBoundingClientRect();
        const m = Math.max(r.width, r.height);
        // small cards tilt a lot, big panels only a little
        s.max   = m < 260 ? 13 : m < 460 ? 10 : m < 700 ? 6 : 2.2;
        s.lift  = m < 460 ? -9 : m < 700 ? -6 : -3;
        s.scale = m < 460 ? 1.04 : m < 700 ? 1.02 : 1.004;
        s.hover = true;
        s.tty = s.lift;
        s.tsc = s.scale;
        active.add(s);
        wake();
      });
      node.addEventListener("pointermove", (e) => {
        if (!s.hover) return;
        const r = node.getBoundingClientRect();
        const px = Math.max(-0.5, Math.min(0.5, (e.clientX - r.left) / r.width - 0.5));
        const py = Math.max(-0.5, Math.min(0.5, (e.clientY - r.top) / r.height - 0.5));
        s.try = px * 2 * s.max;
        s.trx = -py * 2 * s.max;
        s.tpx = px;
        s.tpy = py;
      }, { passive: true });
      node.addEventListener("pointerleave", () => {
        s.hover = false;
        s.trx = s.try = s.tty = s.tpx = s.tpy = 0;
        s.tsc = 1;
        active.add(s);
        wake();
      });
    });
  }

  /* ---------- 7b. Water wave on every glass card ----------
     .wave is added on hover; when the pointer leaves, the current
     ripple is allowed to finish before the class is removed. */
  function setupWave() {
    if (reduceMotion) return;
    $$(".glass:not(.navbar-box):not(.pm-dialog)").forEach((g) => {
      let leaving = false;
      let timer = 0;
      function stop() {
        g.classList.remove("wave");
        g.removeEventListener("animationiteration", onIter);
        clearTimeout(timer);
      }
      function onIter(e) {
        if (leaving && e.target === g && e.pseudoElement === "::after" && e.animationName === "waveSpread") stop();
      }
      g.addEventListener("pointerenter", () => {
        leaving = false;
        clearTimeout(timer);
        g.addEventListener("animationiteration", onIter);
        g.classList.add("wave");
      });
      g.addEventListener("pointerleave", () => {
        leaving = true;
        timer = setTimeout(stop, 2600); // safety net
      });
    });
  }

  /* ---------- 10. Page transitions ---------- */
  const curtain = el("div", "page-curtain");
  curtain.setAttribute("aria-hidden", "true");
  body.appendChild(curtain);

  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target && a.target !== "_self") return;
    if (a.hasAttribute("download")) return;
    let url;
    try { url = new URL(a.href, location.href); } catch (err) { return; }
    if (url.protocol === "mailto:" || url.protocol === "tel:") return;
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname) return; // same page / #hash -> normal behaviour
    if (reduceMotion) return;
    e.preventDefault();
    try { sessionStorage.setItem("pt", "1"); } catch (err) {}
    root.classList.add("leaving");
    setTimeout(() => { location.href = a.href; }, 460);
  });
  // coming back with the browser Back button (bfcache): clear the curtain
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) root.classList.remove("leaving");
  });

  function playArrival() {
    // the page was opened through a transition: curtain slides away upward
    if (!root.classList.contains("arriving")) return;
    curtain.style.transform = "translateY(0)";
    curtain.style.transition = "none";
    root.classList.remove("arriving");
    requestAnimationFrame(() => requestAnimationFrame(() => {
      curtain.style.transition = "transform .6s cubic-bezier(.77,0,.18,1)";
      curtain.style.transform = "translateY(-100%)";
      setTimeout(() => {
        curtain.style.transition = "none";
        curtain.style.transform = "";
        void curtain.offsetWidth;
        curtain.style.transition = "";
      }, 650);
    }));
  }

  /* =========================================================
     5. SCROLL REVEAL  (+ 5b. counters, 9. bars & rings)
     started AFTER the preloader so visitors actually see them
  ========================================================= */
  function startScrollAnimations() {
    const REVEAL = [
      ".availability", ".hero-content h1", ".hero-content h2", ".hero-description",
      ".hero-buttons", ".tilt-wrap", ".section-heading", ".feature-card", ".ring-card",
      ".page-title", ".content-card", ".project-card", ".technology", ".info-item",
      ".contact-item", ".sbar", ".footer-box",
    ].join(",");

    function groupIndex(node) {
      let n = node;
      if (n.parentElement && (n.parentElement.classList.contains("w-full") || n.parentElement.classList.contains("project-col"))) n = n.parentElement;
      return n.parentElement ? [...n.parentElement.children].indexOf(n) : 0;
    }

    const items = $$(REVEAL);
    if (reduceMotion) { items.forEach((n) => n.classList.add("in")); }
    else {
      items.forEach((n) => {
        n.classList.add("reveal");
        n.style.setProperty("--rd", (groupIndex(n) % 5) * 0.1 + "s");
      });

      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const n = en.target;
          n.classList.add("in");
          io.unobserve(n);
          // clean up so normal hover transitions come back
          setTimeout(() => {
            n.classList.remove("reveal", "in");
            n.style.removeProperty("--rd");
          }, 1500);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      items.forEach((n) => io.observe(n));
    }

    /* ---- 5b. Animated counters ---- */
    function countUp(node, target, suffix, dur) {
      if (reduceMotion) { node.textContent = target + suffix; return; }
      const t0 = performance.now();
      (function step(now) {
        const p = Math.min((now - t0) / dur, 1);
        node.textContent = Math.round(target * easeOutExpo(p)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    }
    const counters = $$(".stat-item strong");
    counters.forEach((n) => {
      const m = n.textContent.trim().match(/^(\d+)(.*)$/);
      if (!m) return;
      n.dataset.target = m[1];
      n.dataset.suffix = m[2];
      n.textContent = "0" + m[2];
    });
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const n = en.target;
        cio.unobserve(n);
        countUp(n, +n.dataset.target, n.dataset.suffix, 1800);
      });
    }, { threshold: 0.6 });
    counters.forEach((n) => n.dataset.target && cio.observe(n));

    /* ---- 9. Skill bars + progress rings ---- */
    const meters = $$("[data-level]");
    meters.forEach((m, i) => {
      const lv = Math.max(0, Math.min(100, +m.dataset.level)) / 100;
      m.style.setProperty("--lv", lv);
      m.style.setProperty("--bd", (i % 6) * 0.12 + "s");
      const num = $("[data-num]", m);
      if (num) num.textContent = "0";
    });
    const mio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const m = en.target;
        mio.unobserve(m);
        const delay = parseFloat(m.style.getPropertyValue("--bd")) * 1000 || 0;
        setTimeout(() => {
          m.classList.add("go");
          const num = $("[data-num]", m);
          if (num) countUp(num, +m.dataset.level, "", 1600);
        }, delay);
      });
    }, { threshold: 0.35 });
    meters.forEach((m) => mio.observe(m));

    setupTilt();
    setupWave();
  }

  /* =========================================================
     1. PRELOADER  (first visit of the session only)
  ========================================================= */
  function ready() {
    body.classList.add("page-ready");
    playArrival();
    startScrollAnimations();
  }

  const pl = $("#preloader");
  if (pl && !root.classList.contains("no-pl") && !reduceMotion) {
    const nameBox = $(".pl-name", pl);
    if (nameBox) {
      nameBox.innerHTML = [...nameBox.textContent.trim()]
        .map((c, i) => `<span style="animation-delay:${0.5 + i * 0.045}s">${c === " " ? "&nbsp;" : c}</span>`)
        .join("");
    }
    setTimeout(() => {
      pl.classList.add("done");
      try { sessionStorage.setItem("pl", "1"); } catch (e) {}
      setTimeout(() => {
        pl.remove();
        root.classList.remove("preloading");
      }, 950);
      setTimeout(ready, 380); // content starts animating while the curtain lifts
    }, 2000);
  } else {
    if (pl) pl.remove();
    root.classList.remove("preloading");
    try { sessionStorage.setItem("pl", "1"); } catch (e) {}
    ready();
  }
})();
