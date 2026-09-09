// Logica de la página de perfil / seguimiento de pedidos (front-end)

import { isValidEmail, isValidPhone, isValidAddress, isValidName } from "../utils/validation.js";
import { showMessage, clearMessage } from "../utils/messages.js";

// ---- Datos de ejemplo (mock), reemplazar por datos reales del backend ----

const ACTIVE_ORDER = {
  id: "HH-9824",
  status: "en-camino", // "en-preparacion" | "en-camino" | "entregado"
  origin: "Huerto Maule (Talca)",
  destination: "Providencia, Santiago",
  eta: "Llegada aprox: Hoy, 17:30 hrs",
  courier: {
    name: "Manuel Rojas Espinoza",
    role: "Despachador Climatizado · Camioneta Verde",
    avatar: "img/icono-usuario.png"
  }
};

const NOTIFICATIONS = [
  { text: "Tu pedido #HH-9824 ya está en camino a Av. Providencia. Manuel Rojas es tu repartidor.", time: "Hace 15 min" },
  { text: "¡Gran cosecha de temporada! Disfruta 20% de descuento en la categoría Frutas hoy con el código FRUTAMAULE.", time: "Hace 2 horas" }
];

const ORDER_HISTORY = [
  {
    id: "HH-9742",
    date: "12 de Octubre, 2025",
    detail: "Manzanas Fuji (2kg), Miel Orgánica Valdivia (1 frasco), Zanahorias de Campo (1kg)",
    total: 8080,
    status: "Entregado"
  },
  {
    id: "HH-9610",
    date: "28 de Septiembre, 2025",
    detail: "Leche Entera de Campo (3L), Naranjas Valencia (3kg), Espinacas Frescas (2 atados)",
    total: 10250,
    status: "Entregado"
  }
];

const STATUS_STEPS = { "en-preparacion": 1, "en-camino": 2, "entregado": 3 };

function formatCLP(value) {
  return "$" + Math.round(value).toLocaleString("es-CL") + " CLP";
}

// =========================================================
// PEDIDO ACTIVO
// =========================================================
function renderActiveOrder() {
  const badge = document.getElementById("order-badge");
  if (badge) badge.textContent = "#" + ACTIVE_ORDER.id;

  const step = STATUS_STEPS[ACTIVE_ORDER.status];
  document.querySelectorAll(".progress-step").forEach((el, index) => {
    const stepNumber = index + 1;
    el.classList.toggle("done", stepNumber <= step);
    el.classList.toggle("line-done", stepNumber <= step);
  });

  document.getElementById("route-origin").textContent = ACTIVE_ORDER.origin;
  document.getElementById("route-destination").textContent = ACTIVE_ORDER.destination;
  document.getElementById("route-eta").textContent = ACTIVE_ORDER.eta;

  document.getElementById("courier-avatar").src = ACTIVE_ORDER.courier.avatar;
  document.getElementById("courier-name").textContent = ACTIVE_ORDER.courier.name;
  document.getElementById("courier-role").textContent = ACTIVE_ORDER.courier.role;
}

// =========================================================
// NOTIFICACIONES
// =========================================================
function renderNotifications() {
  const list = document.getElementById("notification-list");
  if (!list) return;

  list.innerHTML = "";
  NOTIFICATIONS.forEach((n) => {
    const item = document.createElement("div");
    item.className = "notification-item";
    item.innerHTML = `<p>${n.text}</p><time>${n.time}</time>`;
    list.appendChild(item);
  });
}

// =========================================================
// HISTORIAL DE PEDIDOS
// =========================================================
function renderHistory() {
  const list = document.getElementById("order-history-list");
  if (!list) return;

  list.innerHTML = "";
  ORDER_HISTORY.forEach((order) => {
    const item = document.createElement("article");
    item.className = "order-item";

    item.innerHTML = `
      <div>
        <p class="order-item-id">#${order.id} <span class="order-item-date">— ${order.date}</span></p>
        <p class="order-item-detail">${order.detail}</p>
      </div>
      <div class="order-item-actions">
        <span class="order-item-price">${formatCLP(order.total)}</span>
        <span class="order-status-badge">${order.status}</span>
        <button type="button" class="btn btn-outline btn-sm">Repetir Pedido</button>
      </div>
    `;

    list.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderActiveOrder();
  renderNotifications();
  renderHistory();

  const profileForm = document.getElementById("profile-form");
  const profileMessage = document.getElementById("profile-message");

  if (profileForm) {
    profileForm.addEventListener("submit", (event) => {
      event.preventDefault();
      clearMessage(profileMessage);

      const name = document.getElementById("profile-name").value.trim();
      const email = document.getElementById("profile-email").value.trim();
      const phone = document.getElementById("profile-phone").value.trim();
      const address = document.getElementById("profile-address").value.trim();

      if (!isValidName(name)) {
        showMessage(profileMessage, "Ingresa un nombre válido (nombre y apellido).", false);
        return;
      }
      if (!isValidAddress(address)) {
        showMessage(profileMessage, "Ingresa una dirección válida (calle, número, comuna).", false);
        return;
      }
      if (!isValidPhone(phone)) {
        showMessage(profileMessage, "Ingresa un número telefónico válido (ej: +56 9 1234 5678).", false);
        return;
      }
      if (!isValidEmail(email)) {
        showMessage(profileMessage, "Ingresa un correo electrónico válido.", false);
        return;
      }

      showMessage(profileMessage, "Tus datos se actualizaron correctamente.", true);
    });
  }
});
