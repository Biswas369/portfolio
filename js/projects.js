/* =========================================================
   PROJECTS
   - Cards are generated from this list.
   - Clicking a card opens a details modal (description,
     features, tech, links).  All links below are DUMMY -
     replace them with your real ones.
   color: blue | purple | green | orange
========================================================= */

const PROJECTS = [
  {
    id: "ecommerce", icon: "bi-cart3", color: "blue", category: "E-COMMERCE",
    title: "Ecommerce Platform",
    text: "A full ecommerce application with products, categories, cart, orders, users and admin management.",
    description: [
      "A complete online store built with Django where customers can browse products, add them to a cart and place orders, while admins manage everything from a dashboard.",
      "The project focuses on a clean database design, a smooth shopping flow and a simple, responsive interface that works on phones and desktops.",
    ],
    features: [
      "Product listing with categories and search",
      "Shopping cart with quantity update and remove",
      "User registration, login and order history",
      "Checkout flow with order summary",
      "Admin panel for products, orders and users",
      "Responsive layout for mobile and desktop",
    ],
    tech: ["Django", "Python", "Bootstrap", "SQLite"],
    meta: { status: "Completed", year: "2025", role: "Full Stack" },
    left: { icon: "bi-github", label: "Source Code" }, button: "Open Project",
    links: { demo: "https://example.com/ecommerce-demo", source: "https://github.com/Biswas369/ecommerce-platform" },
  },
  {
    id: "edureach", icon: "bi-mortarboard", color: "purple", category: "EDUCATION",
    title: "EduReach",
    text: "An education platform concept connecting students, teachers, consultancies and educational organizations.",
    description: [
      "EduReach is an education platform concept that brings students, teachers, consultancies and institutions together in one place.",
      "Students can discover courses and organizations, while institutions can publish information and manage inquiries.",
    ],
    features: [
      "Separate roles for students, teachers and organizations",
      "Course and institution directory",
      "Search and filter by category",
      "Inquiry / contact system for consultancies",
      "Profile pages for every user type",
      "Interactive UI with JavaScript",
    ],
    tech: ["Django", "Python", "Bootstrap", "JavaScript"],
    meta: { status: "Concept", year: "2025", role: "Full Stack" },
    left: { icon: "bi-github", label: "Source Code" }, button: "View Project",
    links: { demo: "https://example.com/edureach-demo", source: "https://github.com/Biswas369/edureach" },
  },
  {
    id: "mero-note", icon: "bi-journal-text", color: "green", category: "WEB APPLICATION",
    title: "Mero Note",
    text: "A note-sharing platform where users can create, manage and share educational notes.",
    description: [
      "Mero Note lets students write, organize and share study notes with others, making learning material easy to find and reuse.",
      "Every user has their own space to manage notes, and public notes can be browsed by everyone.",
    ],
    features: [
      "Create, edit and delete notes",
      "Public and private note sharing",
      "Subject-wise organization",
      "Search through shared notes",
      "User accounts with personal dashboard",
    ],
    tech: ["Django", "Python", "Bootstrap"],
    meta: { status: "Completed", year: "2024", role: "Full Stack" },
    left: { icon: "bi-github", label: "Source Code" }, button: "Live Demo",
    links: { demo: "https://example.com/mero-note-demo", source: "https://github.com/Biswas369/mero-note" },
  },
  {
    id: "quiz", icon: "bi-question-circle", color: "orange", category: "EXAM SYSTEM",
    title: "Online Quiz System",
    text: "An online examination system with quizzes, questions, timers, results and student management.",
    description: [
      "An online examination system where teachers create quizzes and students attempt them within a time limit.",
      "Results are calculated automatically and stored so both students and teachers can review performance.",
    ],
    features: [
      "Quiz and question management",
      "Countdown timer for every attempt",
      "Automatic scoring and result page",
      "Student management for teachers",
      "Attempt history and performance review",
      "Instant feedback using JavaScript",
    ],
    tech: ["Django", "Python", "JavaScript"],
    meta: { status: "Completed", year: "2025", role: "Full Stack" },
    left: { icon: "bi-github", label: "Source Code" }, button: "View Project",
    links: { demo: "https://example.com/quiz-demo", source: "https://github.com/Biswas369/online-quiz-system" },
  },
  {
    id: "todo", icon: "bi-check2-square", color: "blue", category: "PRODUCTIVITY",
    title: "Todo App",
    text: "A simple todo application for creating, editing, completing and deleting daily tasks.",
    description: [
      "A minimal task manager for planning the day. Add a task, mark it done, edit it later or remove it when it is no longer needed.",
      "Built to practice full CRUD in Django with the same glass design used across this portfolio.",
    ],
    features: [
      "Add new tasks in one step",
      "Mark tasks as completed / pending",
      "Edit and delete tasks",
      "Task counter and empty state",
      "Light and dark theme support",
    ],
    tech: ["Django", "Python", "Bootstrap", "SQLite"],
    meta: { status: "Completed", year: "2025", role: "Full Stack" },
    left: { icon: "bi-check2-square", label: "Todo App" }, button: "Open Project",
    links: { demo: "https://example.com/todo-demo", source: "https://github.com/Biswas369/todo-app" },
  },
  {
    id: "blog", icon: "bi-journal-richtext", color: "purple", category: "CONTENT",
    title: "Blog App",
    text: "A blog management system for creating, filtering, editing and deleting posts by category and search.",
    description: [
      "A blog management system for writing and organizing posts. Posts can be filtered by category or found with search.",
      "It supports image upload for every post and a simple confirmation step before deleting.",
    ],
    features: [
      "Create, edit and delete posts",
      "Category filter and keyword search",
      "Image upload for posts",
      "Delete confirmation modal",
      "REST API endpoints for posts",
    ],
    tech: ["Django", "Python", "Bootstrap", "SQLite"],
    meta: { status: "Completed", year: "2025", role: "Full Stack" },
    left: { icon: "bi-journal-richtext", label: "Blog App" }, button: "Open Project",
    links: { demo: "https://example.com/blog-demo", source: "https://github.com/Biswas369/blog-app" },
  },
  {
    id: "students", icon: "bi-people", color: "green", category: "MANAGEMENT",
    title: "Students Management",
    text: "A student management system for adding, searching, updating and deleting student records.",
    description: [
      "A student record system for schools and training centers. Staff can add students, search them quickly and keep their details up to date.",
      "Each student has a profile view with course and status information.",
    ],
    features: [
      "Add, update and delete student records",
      "Search students by name or course",
      "Student profile popup",
      "Active / inactive status badges",
      "Table view that works on mobile",
    ],
    tech: ["Django", "Python", "Bootstrap", "SQLite"],
    meta: { status: "Completed", year: "2025", role: "Full Stack" },
    left: { icon: "bi-people", label: "Students App" }, button: "Open Project",
    links: { demo: "https://example.com/students-demo", source: "https://github.com/Biswas369/students-management" },
  },
];

/* ---------- Cards ---------- */
const grid = document.getElementById("projectGrid");

grid.innerHTML = PROJECTS.map(
  (p, i) => `
  <div class="project-col">
  <div class="project-card glass" data-index="${i}" role="button" tabindex="0" aria-label="Open ${p.title} details">
    <div class="project-image project-${p.color}"><i class="bi ${p.icon}"></i></div>
    <div class="project-content">
      <span class="project-category">${p.category}</span>
      <h2><span class="animated-name">${p.title}</span></h2>
      <p>${p.text}</p>
      <div class="project-tech">${p.tech.map((t) => `<span>${t}</span>`).join("")}</div>
      <div class="project-links">
        <span><i class="bi ${p.left.icon}"></i> ${p.left.label}</span>
        <span class="btn text-white btn-blink">${p.button} <i class="bi bi-arrow-up-right"></i></span>
      </div>
    </div>
  </div>
  </div>`
).join("");

/* ---------- Modal ---------- */
const modal = document.createElement("div");
modal.className = "project-modal";
modal.setAttribute("role", "dialog");
modal.setAttribute("aria-modal", "true");
modal.setAttribute("aria-hidden", "true");
modal.innerHTML = `
  <div class="pm-backdrop" data-close></div>
  <div class="pm-dialog glass" tabindex="-1">
    <button type="button" class="pm-close" data-close aria-label="Close"><i class="bi bi-x-lg"></i></button>
    <div class="pm-body"></div>
  </div>`;
document.body.appendChild(modal);

const pmBody = modal.querySelector(".pm-body");
const pmDialog = modal.querySelector(".pm-dialog");
let current = 0;
let lastFocus = null;

function renderModal(i, dir = 0) {
  current = (i + PROJECTS.length) % PROJECTS.length;
  const p = PROJECTS[current];
  pmBody.innerHTML = `
    <div class="pm-hero project-${p.color}"><i class="bi ${p.icon}"></i></div>
    <div class="pm-content">
      <span class="project-category">${p.category}</span>
      <h2 class="pm-title">${p.title}</h2>

      <div class="pm-meta">
        <span><i class="bi bi-activity"></i> ${p.meta.status}</span>
        <span><i class="bi bi-calendar3"></i> ${p.meta.year}</span>
        <span><i class="bi bi-person-workspace"></i> ${p.meta.role}</span>
      </div>

      <h3 class="pm-heading">About this project</h3>
      ${p.description.map((d) => `<p class="pm-text">${d}</p>`).join("")}

      <h3 class="pm-heading">Key features</h3>
      <ul class="pm-features">
        ${p.features.map((f) => `<li><i class="bi bi-check2-circle"></i><span>${f}</span></li>`).join("")}
      </ul>

      <h3 class="pm-heading">Tech stack</h3>
      <div class="project-tech pm-tech">${p.tech.map((t) => `<span>${t}</span>`).join("")}</div>

      <div class="pm-actions">
        <a class="btn btn-blink pm-btn" href="${p.links.demo}" target="_blank" rel="noopener">
          <i class="bi bi-box-arrow-up-right"></i> Live Demo
        </a>
        <a class="btn btn-secondary-glass pm-btn" href="${p.links.source}" target="_blank" rel="noopener">
          <i class="bi bi-github"></i> Source Code
        </a>
      </div>

      <div class="pm-nav">
        <button type="button" data-prev><i class="bi bi-arrow-left"></i> Previous</button>
        <span>${current + 1} / ${PROJECTS.length}</span>
        <button type="button" data-next>Next <i class="bi bi-arrow-right"></i></button>
      </div>
    </div>`;
  pmDialog.scrollTop = 0;

  // slide animation when switching between projects (dir: 1 = next, -1 = previous)
  if (dir && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    pmBody.animate(
      [
        { transform: `translateX(${dir * 70}px)`, opacity: 0 },
        { transform: "translateX(0)", opacity: 1 },
      ],
      { duration: 420, easing: "cubic-bezier(.2,.8,.2,1)" }
    );
  }
}

function openModal(i) {
  lastFocus = document.activeElement;
  renderModal(i);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  pmDialog.focus();
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}

grid.addEventListener("click", (e) => {
  const card = e.target.closest(".project-card");
  if (card) openModal(+card.dataset.index);
});
grid.addEventListener("keydown", (e) => {
  if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("project-card")) {
    e.preventDefault();
    openModal(+e.target.dataset.index);
  }
});

modal.addEventListener("click", (e) => {
  if (e.target.closest("[data-close]")) closeModal();
  else if (e.target.closest("[data-prev]")) renderModal(current - 1, -1);
  else if (e.target.closest("[data-next]")) renderModal(current + 1, 1);
});

document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("open")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft") renderModal(current - 1, -1);
  if (e.key === "ArrowRight") renderModal(current + 1, 1);
});
