document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("deleteModal");
  const form = document.getElementById("deleteModalForm");
  const itemType = document.getElementById("deleteItemType");
  const itemName = document.getElementById("deleteItemName");
  const closeBtn = document.getElementById("deleteModalClose");
  const cancelBtn = document.getElementById("deleteModalCancel");

  if (!overlay || !form) return;

  let previousFocus = null;

  function openModal(buttonOrData) {
    let url, name, type, focusEl = null;

    if (buttonOrData && buttonOrData.dataset) {
      url = buttonOrData.dataset.deleteUrl;
      name = buttonOrData.dataset.itemName || "this item";
      type = buttonOrData.dataset.itemType || "Item";
      focusEl = buttonOrData;
    } else if (buttonOrData && typeof buttonOrData === "object") {
      url = buttonOrData.url;
      name = buttonOrData.name || "this item";
      type = buttonOrData.type || "Item";
    }

    if (!url) {
      console.error("Delete modal: data-delete-url is missing.");
      return;
    }

    previousFocus = focusEl;
    form.action = url;
    itemName.textContent = `"${name}"`;
    itemType.textContent = type;

    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("delete-modal-active");

    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("delete-modal-active");

    if (previousFocus) previousFocus.focus();
  }

  window.openDeleteModal = openModal;

  document.querySelectorAll("[data-delete-url]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openModal(button);
    });
  });

  closeBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay.classList.contains("is-open")) {
      closeModal();
    }
  });
});
