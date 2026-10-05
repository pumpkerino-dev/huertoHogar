// Logica genérica de popups/modales (Términos, Políticas, etc.)
document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll("[data-modal-target]");
  const overlays = document.querySelectorAll(".modal-overlay");

  function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add("is-open");
  }

  function closeModal(modal) {
    modal.classList.remove("is-open");
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = trigger.dataset.modalTarget;
      openModal(targetId);
    });
  });

  overlays.forEach((overlay) => {
    const closeBtn = overlay.querySelector(".modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => closeModal(overlay));
    }

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closeModal(overlay);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      overlays.forEach((overlay) => closeModal(overlay));
    }
  });
});
