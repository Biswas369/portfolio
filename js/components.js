/* =========================================================
   COMMON HEADER + FOOTER
   Edit them here once - every page updates automatically.
   Pages only need:  <div id="site-header"></div>
                     <div id="site-footer"></div>
========================================================= */

const SITE = {
  name: "Biswas",
  fullName: "Biswas Parajuli",
  tagline: "Full Stack Developer building modern web experiences.",
  links: [
    { label: "Home", href: "index.html", page: "index" },
    { label: "About", href: "about.html", page: "about" },
    { label: "Projects", href: "projects.html", page: "projects" },
    { label: "Contact", href: "contact.html", page: "contact" },
  ],
  social: [
    { icon: "bi-github", label: "GitHub", href: "https://github.com/Biswas369/" },
    { icon: "bi-linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/biswas-parajuli-2a5144398" },
    { icon: "bi-facebook", label: "Facebook", href: "#" },
    { icon: "bi-instagram", label: "Instagram", href: "#" },
  ],
};

function currentPage() {
  const file = location.pathname.split("/").pop().replace(".html", "");
  return file === "" ? "index" : file;
}

function headerHTML() {
  const page = currentPage();
  const links = SITE.links
    .map(
      (l) =>
        `<a href="${l.href}" class="${l.page === page ? "active" : ""}">${l.label}</a>`
    )
    .join("");

  return `
  <header class="navbar-wrapper">
    <div class="container">
      <nav class="glass navbar-box">

        <a href="index.html" class="logo">
          <span class="logo-icon">B</span>
          <span> ${SITE.name} </span>
        </a>

        <nav class="nav-menu" id="navMenu">${links}</nav>

        <div class="nav-actions">
          <button type="button" class="theme-btn" id="themeBtn" aria-label="Change theme">
            <span class="theme-circle" id="themeIcon"><i class="bi bi-sun-fill"></i></span>
          </button>

          <button type="button" class="mobile-menu-btn" id="menuBtn" aria-label="Open menu">
            <i class="bi bi-list"></i>
          </button>
        </div>

      </nav>
    </div>
  </header>`;
}

function footerHTML() {
  const social = SITE.social
    .map(
      (s) =>
        `<a href="${s.href}" aria-label="${s.label}" ${
          s.href.startsWith("http") ? 'target="_blank" rel="noopener"' : ""
        }><i class="bi ${s.icon}"></i></a>`
    )
    .join("");

  return `
  <footer class="footer-section">
    <div class="container">
      <div class="glass footer-box">
        <div>
          <div class="footer-logo">${SITE.fullName}</div>
          <p>${SITE.tagline}</p>
        </div>
        <div class="social-links">${social}</div>
      </div>
      <div class="copyright">© ${new Date().getFullYear()} ${SITE.fullName}. All rights reserved.</div>
    </div>
  </footer>`;
}

document.getElementById("site-header").outerHTML = headerHTML();
document.getElementById("site-footer").outerHTML = footerHTML();
