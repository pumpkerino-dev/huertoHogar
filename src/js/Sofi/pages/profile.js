// Logica de la página de perfil / seguimiento de pedidos (front-end)

import { isValidEmail, isValidPhone, isValidAddress, isValidName } from "../utils/validation.js";
import { showMessage, clearMessage } from "../utils/messages.js";
import { renderAccountLink } from "../utils/session.js";
import { wireHeaderSearch } from "../utils/search.js";

// La misma clave y forma de dato que usa js/pages/cart.js, para que
// "Repetir Pedido" agregue productos reales al carrito.
const CART_STORAGE_KEY = "huertohogar-cart";

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
  { type: "pedido", text: "Tu pedido #HH-9824 ya está en camino a Av. Providencia. Manuel Rojas es tu repartidor.", time: "Hace 15 min" },
  { type: "oferta", text: "¡Gran cosecha de temporada! Disfruta 20% de descuento en la categoría Frutas hoy con el código FRUTAMAULE.", time: "Hace 2 horas" }
];

// "items" es lo que "Repetir Pedido" agrega de vuelta al carrito.
const ORDER_HISTORY = [
  {
    id: "HH-9742",
    date: "12 de Octubre, 2025",
    detail: "Manzanas Fuji (2kg), Miel Orgánica Valdivia (1 frasco), Zanahorias de Campo (1kg)",
    total: 8080,
    status: "Entregado",
    items: [
      { id: "FR001", name: "Manzanas Fuji", unit: "1 Kilo", unitPrice: 1200, image: "img/manzana-fuji.png", quantity: 2 },
      { id: "PO001", name: "Miel Orgánica", unit: "1 Frasco 500g", unitPrice: 4900, image: "img/miel-organica.png", quantity: 1 },
      { id: "VR001", name: "Zanahorias de Campo", unit: "2 Kilos", unitPrice: 990, image: "img/zanahorias-organicas.png", quantity: 1 }
    ]
  },
  {
    id: "HH-9610",
    date: "28 de Septiembre, 2025",
    detail: "Leche Entera de Campo (3L), Naranjas Valencia (3kg), Espinacas Frescas (2 atados)",
    total: 10250,
    status: "Entregado",
    items: [
      { id: "LA001", name: "Leche Entera de Campo", unit: "1 Litro", unitPrice: 1250, image: "img/leche-entera.png", quantity: 3 },
      { id: "FR002", name: "Naranjas Valencia", unit: "1 Kilo", unitPrice: 1000, image: "img/logo.png", quantity: 3 },
      { id: "VR002", name: "Espinacas Frescas", unit: "1 Atado", unitPrice: 700, image: "img/logo.png", quantity: 2 }
    ]
  }
];

const STATUS_STEPS = { "en-preparacion": 1, "en-camino": 2, "entregado": 3 };

function formatCLP(value) {
  return "$" + Math.round(value).toLocaleString("es-CL") + " CLP";
}

function markField(input, isValid) {
  input.classList.toggle("is-invalid", !isValid);
  input.classList.toggle("is-valid", isValid);
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

  const settings = loadSettings();
  const visible = NOTIFICATIONS.filter((n) => {
    if (n.type === "pedido") return settings.notifPedidos;
    if (n.type === "oferta") return settings.notifOfertas;
    return true;
  });

  list.innerHTML = "";

  if (visible.length === 0) {
    list.innerHTML = `<p class="notification-empty">No tienes notificaciones activas — revisa tu configuración.</p>`;
    return;
  }

  visible.forEach((n) => {
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
        <button type="button" class="btn btn-outline btn-sm" data-detail-order="${order.id}">Ver Detalle</button>
        <button type="button" class="btn btn-outline btn-sm" data-repeat-order="${order.id}">Repetir Pedido</button>
      </div>
    `;

    list.appendChild(item);
  });

  list.addEventListener("click", (event) => {
    const repeatButton = event.target.closest("button[data-repeat-order]");
    if (repeatButton) {
      repeatOrder(repeatButton.dataset.repeatOrder);
      return;
    }

    const detailButton = event.target.closest("button[data-detail-order]");
    if (detailButton) {
      showOrderDetail(detailButton.dataset.detailOrder);
    }
  });
}

// Muestra el detalle completo de un pedido pasado en un modal.
function showOrderDetail(orderId) {
  const order = ORDER_HISTORY.find((o) => o.id === orderId);
  if (!order) return;

  document.getElementById("modal-detalle-title").textContent = `Pedido #${order.id}`;

  const itemsRows = order.items
    .map(
      (item) => `
        <div class="detail-item-row">
          <span>${item.name} <span class="order-item-detail">(${item.unit} x ${item.quantity})</span></span>
          <span>${formatCLP(item.unitPrice * item.quantity)}</span>
        </div>
      `
    )
    .join("");

  document.getElementById("modal-detalle-body").innerHTML = `
    <p style="margin-bottom: 4px;"><strong>Fecha:</strong> ${order.date}</p>
    <p style="margin-bottom: 14px;"><strong>Estado:</strong> ${order.status}</p>
    <div class="detail-items">${itemsRows}</div>
    <div class="detail-item-row detail-total">
      <span>Total</span>
      <span>${formatCLP(order.total)}</span>
    </div>
  `;

  document.getElementById("modal-detalle-pedido").classList.add("is-open");
}

// Agrega los productos de un pedido pasado al carrito (localStorage) y
// lleva a la persona a shopping-cart.html a confirmar.
function repeatOrder(orderId) {
  const order = ORDER_HISTORY.find((o) => o.id === orderId);
  if (!order) return;

  const raw = localStorage.getItem(CART_STORAGE_KEY);
  let cart = [];
  try {
    cart = raw ? JSON.parse(raw) : [];
  } catch {
    cart = [];
  }

  order.items.forEach((newItem) => {
    const existing = cart.find((i) => i.id === newItem.id);
    if (existing) {
      existing.quantity += newItem.quantity;
    } else {
      cart.push({ ...newItem });
    }
  });

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.location.href = "shopping-cart.html";
}

// =========================================================
// PANELES DEL SIDEBAR "MI CUENTA"
// =========================================================
function setupSidebarPanels() {
  const links = document.querySelectorAll(".account-nav a[data-panel]");
  const panels = document.querySelectorAll(".account-panel");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = link.dataset.panel;

      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      panels.forEach((panel) => {
        panel.hidden = panel.id !== `panel-${target}`;
      });

      if (link.dataset.scrollTo) {
        const anchor = document.getElementById(link.dataset.scrollTo);
        if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// =========================================================
// DIRECCIONES (agregar / editar / eliminar)
// =========================================================
const ADDRESS_STORAGE_KEY = "huertohogar-addresses";

const DEFAULT_ADDRESSES = [
  { id: "addr-1", name: "Casa", detail: "Av. Providencia 1245, Apt 402, Santiago", isDefault: true },
  { id: "addr-2", name: "Oficina", detail: "Av. Apoquindo 3400, Of. 501, Las Condes", isDefault: false }
];

function loadAddresses() {
  const raw = localStorage.getItem(ADDRESS_STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(DEFAULT_ADDRESSES));
    return [...DEFAULT_ADDRESSES];
  }
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveAddresses(addresses) {
  localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(addresses));
}

function renderAddresses() {
  const list = document.getElementById("address-list");
  if (!list) return;

  const addresses = loadAddresses();
  list.innerHTML = "";

  if (addresses.length === 0) {
    list.innerHTML = `<p class="notification-empty">Todavía no tienes direcciones guardadas.</p>`;
    return;
  }

  addresses.forEach((addr) => {
    const item = document.createElement("div");
    item.className = "address-item";
    item.innerHTML = `
      <div>
        <p class="address-label">${addr.name}${addr.isDefault ? ' <span class="address-tag">Predeterminada</span>' : ""}</p>
        <p class="address-detail">${addr.detail}</p>
      </div>
      <div class="address-actions">
        <button type="button" class="btn btn-outline btn-sm" data-edit-address="${addr.id}">Editar</button>
        <button type="button" class="btn btn-danger btn-sm" data-delete-address="${addr.id}">Eliminar</button>
      </div>
    `;
    list.appendChild(item);
  });
}

function openAddressModal(address) {
  const form = document.getElementById("address-form");
  form.reset();
  clearMessage(document.getElementById("address-message"));

  document.getElementById("modal-direccion-title").textContent = address ? "Editar Dirección" : "Agregar Dirección";
  document.getElementById("address-id").value = address ? address.id : "";
  document.getElementById("address-name").value = address ? address.name : "";
  document.getElementById("address-detail").value = address ? address.detail : "";
  document.getElementById("address-default").checked = address ? address.isDefault : false;

  document.getElementById("modal-direccion").classList.add("is-open");
}

function setupAddressPanel() {
  const list = document.getElementById("address-list");
  const addButton = document.getElementById("add-address-button");
  const form = document.getElementById("address-form");
  const message = document.getElementById("address-message");
  if (!list || !form) return;

  renderAddresses();

  addButton.addEventListener("click", () => openAddressModal(null));

  list.addEventListener("click", (event) => {
    const editButton = event.target.closest("button[data-edit-address]");
    if (editButton) {
      const addresses = loadAddresses();
      const address = addresses.find((a) => a.id === editButton.dataset.editAddress);
      openAddressModal(address);
      return;
    }

    const deleteButton = event.target.closest("button[data-delete-address]");
    if (deleteButton) {
      if (!confirm("¿Eliminar esta dirección?")) return;
      const addresses = loadAddresses().filter((a) => a.id !== deleteButton.dataset.deleteAddress);
      saveAddresses(addresses);
      renderAddresses();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearMessage(message);

    const id = document.getElementById("address-id").value;
    const name = document.getElementById("address-name").value.trim();
    const detail = document.getElementById("address-detail").value.trim();
    const isDefault = document.getElementById("address-default").checked;

    if (!name) {
      showMessage(message, "Ponle un nombre a esta dirección (ej: Casa, Oficina).", false);
      return;
    }
    if (!isValidAddress(detail)) {
      showMessage(message, "Ingresa una dirección válida (calle, número, comuna).", false);
      return;
    }

    let addresses = loadAddresses();

    if (isDefault) {
      addresses = addresses.map((a) => ({ ...a, isDefault: false }));
    }

    if (id) {
      addresses = addresses.map((a) => (a.id === id ? { ...a, name, detail, isDefault } : a));
    } else {
      addresses.push({ id: "addr-" + Date.now(), name, detail, isDefault });
    }

    saveAddresses(addresses);
    renderAddresses();
    document.getElementById("modal-direccion").classList.remove("is-open");
  });
}

// =========================================================
// MÉTODOS DE PAGO (agregar / eliminar)
// =========================================================
const PAYMENT_METHODS_STORAGE_KEY = "huertohogar-payment-methods";

const DEFAULT_PAYMENT_METHODS = [
  { id: "pm-1", name: "Webpay Crédito", last4: "5678", expiry: "08/28", isDefault: true }
];

function loadPaymentMethods() {
  const raw = localStorage.getItem(PAYMENT_METHODS_STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(PAYMENT_METHODS_STORAGE_KEY, JSON.stringify(DEFAULT_PAYMENT_METHODS));
    return [...DEFAULT_PAYMENT_METHODS];
  }
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function savePaymentMethods(methods) {
  localStorage.setItem(PAYMENT_METHODS_STORAGE_KEY, JSON.stringify(methods));
}

function renderPaymentMethods() {
  const list = document.getElementById("payment-method-list");
  if (!list) return;

  const methods = loadPaymentMethods();
  list.innerHTML = "";

  if (methods.length === 0) {
    list.innerHTML = `<p class="notification-empty">Todavía no tienes métodos de pago guardados.</p>`;
    return;
  }

  methods.forEach((pm) => {
    const item = document.createElement("div");
    item.className = "address-item";
    item.innerHTML = `
      <div>
        <p class="address-label">${pm.name}${pm.isDefault ? ' <span class="address-tag">Predeterminado</span>' : ""}</p>
        <p class="address-detail">Tarjeta terminada en ${pm.last4} · Vence ${pm.expiry}</p>
      </div>
      <div class="address-actions">
        <button type="button" class="btn btn-danger btn-sm" data-delete-payment="${pm.id}">Eliminar</button>
      </div>
    `;
    list.appendChild(item);
  });
}

function setupPaymentMethodPanel() {
  const list = document.getElementById("payment-method-list");
  const addButton = document.getElementById("add-payment-method-button");
  const form = document.getElementById("payment-method-form");
  const message = document.getElementById("payment-method-message");
  if (!list || !form) return;

  renderPaymentMethods();

  addButton.addEventListener("click", () => {
    form.reset();
    clearMessage(message);
    document.getElementById("modal-pago-metodo").classList.add("is-open");
  });

  list.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("button[data-delete-payment]");
    if (!deleteButton) return;
    if (!confirm("¿Eliminar este método de pago?")) return;
    const methods = loadPaymentMethods().filter((m) => m.id !== deleteButton.dataset.deletePayment);
    savePaymentMethods(methods);
    renderPaymentMethods();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearMessage(message);

    const name = document.getElementById("payment-method-name").value.trim();
    const last4 = document.getElementById("payment-method-last4").value.trim();
    const expiry = document.getElementById("payment-method-expiry").value.trim();
    const isDefault = document.getElementById("payment-method-default").checked;

    if (!name) {
      showMessage(message, "Ponle un nombre a este método de pago.", false);
      return;
    }
    if (!/^\d{4}$/.test(last4)) {
      showMessage(message, "Ingresa los 4 últimos dígitos de la tarjeta.", false);
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      showMessage(message, "La fecha de vencimiento debe tener el formato MM/AA.", false);
      return;
    }

    let methods = loadPaymentMethods();
    if (isDefault) {
      methods = methods.map((m) => ({ ...m, isDefault: false }));
    }
    methods.push({ id: "pm-" + Date.now(), name, last4, expiry, isDefault });

    savePaymentMethods(methods);
    renderPaymentMethods();
    document.getElementById("modal-pago-metodo").classList.remove("is-open");
  });
}

// =========================================================
// CONFIGURACIÓN DE LA CUENTA
// =========================================================
const SETTINGS_STORAGE_KEY = "huertohogar-settings";

function loadSettings() {
  const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
  const defaults = { notifPedidos: true, notifOfertas: true, idioma: "es" };
  if (!raw) return defaults;
  try {
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return defaults;
  }
}

function applySettingsToForm(settings) {
  const notifPedidos = document.getElementById("config-notif-pedidos");
  const notifOfertas = document.getElementById("config-notif-ofertas");
  const idioma = document.getElementById("config-idioma");
  if (!notifPedidos || !notifOfertas || !idioma) return;

  notifPedidos.checked = settings.notifPedidos;
  notifOfertas.checked = settings.notifOfertas;
  idioma.value = settings.idioma;
}

function setupSettingsForm() {
  const form = document.getElementById("settings-form");
  const message = document.getElementById("settings-message");
  if (!form) return;

  applySettingsToForm(loadSettings());

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearMessage(message);

    const settings = {
      notifPedidos: document.getElementById("config-notif-pedidos").checked,
      notifOfertas: document.getElementById("config-notif-ofertas").checked,
      idioma: document.getElementById("config-idioma").value
    };

    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    renderNotifications();
    showMessage(message, "Tu configuración se guardó correctamente.", true);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderAccountLink(".account-link", "login-register.html", "user-profile-tracking.html");
  wireHeaderSearch();
  renderActiveOrder();
  renderNotifications();
  renderHistory();
  setupSidebarPanels();
  setupSettingsForm();
  setupAddressPanel();
  setupPaymentMethodPanel();

  const profileForm = document.getElementById("profile-form");
  const profileMessage = document.getElementById("profile-message");

  if (profileForm) {
    const nameInput = document.getElementById("profile-name");
    const emailInput = document.getElementById("profile-email");
    const phoneInput = document.getElementById("profile-phone");
    const addressInput = document.getElementById("profile-address");

    [
      [nameInput, isValidName],
      [emailInput, isValidEmail],
      [phoneInput, isValidPhone],
      [addressInput, isValidAddress]
    ].forEach(([input, validator]) => {
      input.addEventListener("blur", () => {
        if (!input.value.trim()) return;
        markField(input, validator(input.value.trim()));
      });
    });

    profileForm.addEventListener("submit", (event) => {
      event.preventDefault();
      clearMessage(profileMessage);

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();
      const address = addressInput.value.trim();

      if (!isValidName(name)) {
        showMessage(profileMessage, "Ingresa un nombre válido (nombre y apellido).", false);
        markField(nameInput, false);
        return;
      }
      if (!isValidAddress(address)) {
        showMessage(profileMessage, "Ingresa una dirección válida (calle, número, comuna).", false);
        markField(addressInput, false);
        return;
      }
      if (!isValidPhone(phone)) {
        showMessage(profileMessage, "Ingresa un número telefónico válido (ej: +56 9 1234 5678).", false);
        markField(phoneInput, false);
        return;
      }
      if (!isValidEmail(email)) {
        showMessage(profileMessage, "Ingresa un correo electrónico válido.", false);
        markField(emailInput, false);
        return;
      }

      showMessage(profileMessage, "Tus datos se actualizaron correctamente.", true);
    });
  }
});
