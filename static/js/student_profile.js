document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("studentProfileModal");
  if (!overlay) return;

  const closeBtn = document.getElementById("studentProfileClose");
  const closeFooter = document.getElementById("spCloseBtn");
  const editBtn = document.getElementById("spEditBtn");
  const deleteBtn = document.getElementById("spDeleteBtn");

  function initials(name) {
    if (!name) return "ST";
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function openProfile(row) {
    const d = row.dataset;
    document.getElementById("spAvatar").textContent = initials(d.name);
    document.getElementById("spName").textContent = d.name || "—";
    document.getElementById("spId").textContent = d.studentId || "—";
    document.getElementById("spCourse").textContent = d.course || "—";
    document.getElementById("spAge").textContent = d.age || "—";
    document.getElementById("spIdShort").textContent = d.studentId || "—";
    document.getElementById("spEmail").textContent = d.email || "—";
    document.getElementById("spPhone").textContent = d.phone || "—";
    document.getElementById("spAddress").textContent = d.address || "—";

    const status = (d.status || "active").toLowerCase();
    const statusLabel = d.statusLabel || (status === "active" ? "Active" : "Inactive");
    const pill = document.getElementById("spStatus");
    pill.classList.remove("active", "inactive");
    pill.classList.add(status === "active" ? "active" : "inactive");
    document.getElementById("spStatusText").textContent = statusLabel;
    document.getElementById("spStatusStat").textContent =
      status === "active" ? "On" : "Off";

    editBtn.href = d.editUrl || "#";
    deleteBtn.dataset.deleteUrl = d.profileDeleteUrl || "";
    deleteBtn.dataset.itemName = d.name || "this student";
    deleteBtn.dataset.itemType = "Student";

    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeProfile() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("tr.student-row").forEach((row) => {
    row.addEventListener("click", (e) => {
      if (e.target.closest("a, button, .todo-actions")) return;
      openProfile(row);
    });
  });

  closeBtn.addEventListener("click", closeProfile);
  closeFooter.addEventListener("click", closeProfile);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeProfile();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) {
      closeProfile();
    }
  });

  // Delete from profile → use shared delete modal
  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeProfile();
    const url = deleteBtn.dataset.deleteUrl;
    if (!url) return;
    if (typeof window.openDeleteModal === "function") {
      window.openDeleteModal({
        url: url,
        name: deleteBtn.dataset.itemName || "this student",
        type: "Student",
      });
    }
  });
});
