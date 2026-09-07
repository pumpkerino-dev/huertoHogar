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
    // Cerrar con el botón X
    const closeBtn = overlay.querySelector(".modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => closeModal(overlay));
    }

    // Cerrar al hacer clic fuera de la caja (en el fondo oscuro)
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closeModal(overlay);
    });
  });

  // Cerrar con la tecla Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      overlays.forEach((overlay) => closeModal(overlay));
    }
  });
});