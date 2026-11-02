/* =========================================================
   MAIN JS  -  theme, mobile menu, text animations, contact form
   (loaded after components.js, so header/footer already exist)
========================================================= */

/* ---------- Config ---------- */
const CONTACT_EMAIL = "hello@example.com"; // contact form opens a mail to this address

/* ---------- Theme (light / dark) with circular reveal + sun/moon spin ---------- */
(function theme() {
  const root = document.documentElement;
  const btn = document.getElementById("themeBtn");
  const icon = document.getElementById("themeIcon");

  function paintIcon(spin) {
    icon.innerHTML = root.classList.contains("dark")
      ? '<i class="bi bi-moon-fill"></i>'
      : '<i class="bi bi-sun-fill"></i>';
    if (spin) {
      icon.classList.remove("spin");
      void icon.offsetWidth; // restart the animation
      icon.classList.add("spin");
    }
  }
  paintIcon(false);

  function apply() {
    root.classList.toggle("dark");
    try {
      localStorage.setItem("portfolio-theme", root.classList.contains("dark") ? "dark" : "light");
    } catch (e) {}
    paintIcon(true);
  }

  btn.addEventListener("click", () => {
    const r = btn.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const maxR = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { apply(); return; }

    // Best: View Transitions API -> the NEW theme grows out of the button like a circle
    if (document.startViewTransition) {
      root.classList.add("theme-switching");
      const t = document.startViewTransition(apply);
      t.ready.then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxR}px at ${x}px ${y}px)`] },
          { duration: 750, easing: "cubic-bezier(.4,0,.2,1)", pseudoElement: "::view-transition-new(root)" }
        );
      });
      t.finished.finally(() => root.classList.remove("theme-switching"));
      return;
    }

    // Fallback for older browsers: a coloured circle expands, then the theme changes
    const goingDark = !root.classList.contains("dark");
    const ripple = document.createElement("div");
    ripple.className = "theme-ripple";
    ripple.style.background = goingDark ? "#071b30" : "#d4f1ff";
    document.body.appendChild(ripple);
    const grow = ripple.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxR}px at ${x}px ${y}px)`] },
      { duration: 600, easing: "cubic-bezier(.4,0,.2,1)", fill: "forwards" }
    );
    grow.onfinish = () => {
      apply();
      ripple.animate({ opacity: [1, 0] }, { duration: 300, fill: "forwards" }).onfinish = () => ripple.remove();
    };
  });
})();

/* ---------- Mobile menu ---------- */
(function menu() {
  const btn = document.getElementById("menuBtn");
  const nav = document.getElementById("navMenu");
  function setOpen(open) {
    nav.classList.toggle("show", open);
    btn.innerHTML = open ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
  }
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(!nav.classList.contains("show"));
  });
  // click outside the menu closes it
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target)) setOpen(false);
  });
})();

/* ---------- Typing animation (type -> pause -> delete -> repeat) ---------- */
document.querySelectorAll(".typing-text").forEach((el) => {
  const text = (el.dataset.text || "").replace(/\s+/g, " ").trim();
  let index = 0;
  let deleting = false;

  function tick() {
    el.textContent = text.substring(0, index);
    let delay;

    if (!deleting && index < text.length) {
      index++;
      delay = 100 + Math.random() * 35;
    } else if (!deleting) {
      deleting = true;
      delay = 1800;
    } else if (index > 0) {
      index--;
      delay = 55;
    } else {
      deleting = false;
      delay = 450;
    }
    setTimeout(tick, delay);
  }
  tick();
});

/* ---------- Letter-by-letter animated names ---------- */
function animateLetters(root = document) {
  root.querySelectorAll(".animated-name").forEach((el) => {
    if (el.dataset.animated) return;
    el.dataset.animated = "true";

    const letters = [...el.textContent.trim()];
    el.replaceChildren();
    letters.forEach((letter, i) => {
      const span = document.createElement("span");
      span.textContent = letter === " " ? " " : letter;
      span.style.animationDelay = `${i * 0.07}s`;
      el.appendChild(span);
    });
  });
}
animateLetters();

/* ---------- Toast message ---------- */
function showToast(text, type = "success") {
  let wrap = document.querySelector(".message-wrapper");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.className = "message-wrapper";
    document.body.appendChild(wrap);
  }
  const box = document.createElement("div");
  box.className = `glass glass-message message-${type}`;
  box.innerHTML = `<span></span><button type="button" class="message-close" aria-label="Close">&times;</button>`;
  box.querySelector("span").textContent = text;
  box.querySelector("button").addEventListener("click", () => box.remove());
  wrap.appendChild(box);
  setTimeout(() => box.remove(), 5000);
}

/* ---------- Contact form ---------- */
(function contactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const d = Object.fromEntries(new FormData(form));
    const body = `Name: ${d.name}\nEmail: ${d.email}\n\n${d.message}`;
    const url =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(d.subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = url;
    showToast("Thanks! Your email app is opening to send the message.");
    form.reset();
  });
})();
