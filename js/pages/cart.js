// Logica del carrito de compras (front-end, sin backend)
// Estructura guardada en localStorage bajo la clave "huertohogar-cart":
// [{ id, name, unit, unitPrice, image, quantity }, ...]

const STORAGE_KEY = "huertohogar-cart";
const IVA_RATE = 0.19;
const FREE_SHIPPING_FROM = 5000;
const SHIPPING_COST = 2990;

// Datos de ejemplo (mock) para poder probar la página sin backend.
const MOCK_ITEMS = [
  { id: "FR001", name: "Manzanas Fuji", unit: "1 Kilo", unitPrice: 1200, image: "img/logo.png", quantity: 1 },
  { id: "PO001", name: "Miel Orgánica", unit: "1 Frasco 500g", unitPrice: 4900, image: "img/logo.png", quantity: 1 },
  { id: "VR001", name: "Zanahorias de Campo", unit: "2 Kilos", unitPrice: 990, image: "img/logo.png", quantity: 2 }
];

// Calendario de despacho: 7 días desde hoy, con algunos bloqueados de ejemplo
const DOW_LABELS = ["D", "L", "M", "M", "J", "V", "S"];
const BLOCKED_OFFSETS = [5, 6]; // los últimos 2 días del rango, de ejemplo

function getCart() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_ITEMS));
    return [...MOCK_ITEMS];
  }
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function formatCLP(value) {
  return "$" + Math.round(value).toLocaleString("es-CL") + " CLP";
}

function renderCart() {
  const list = document.getElementById("cart-items-list");
  const emptyState = document.getElementById("cart-empty");
  const itemsBlock = document.getElementById("cart-items");
  const items = getCart();

  list.innerHTML = "";

  if (items.length === 0) {
    emptyState.style.display = "block";
    itemsBlock.style.display = "none";
  } else {
    emptyState.style.display = "none";
    itemsBlock.style.display = "block";

    items.forEach((item) => {
      const row = document.createElement("div");
      row.className = "cart-item";
      row.dataset.id = item.id;

      row.innerHTML = `
        <div class="cart-item-info">
          <div class="cart-item-thumb">
            <img src="${item.image}" alt="${item.name}" />
          </div>
          <div>
            <p class="cart-item-name">${item.name}</p>
            <p class="cart-item-unit">${item.unit} x ${formatCLP(item.unitPrice)}</p>
          </div>
        </div>
        <div class="qty-control">
          <button type="button" data-action="decrease" aria-label="Restar">-</button>
          <span>${item.quantity}</span>
          <button type="button" data-action="increase" aria-label="Sumar">+</button>
        </div>
        <p class="cart-item-price">${formatCLP(item.unitPrice * item.quantity)}</p>
        <button type="button" class="cart-item-remove" data-action="remove">Eliminar</button>
      `;

      list.appendChild(row);
    });
  }

  renderSummary(items);
  updateHeaderCartTotal(items);
}

function renderSummary(items) {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const iva = subtotal * IVA_RATE;
  const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
  const total = subtotal + iva + shipping;

  document.getElementById("summary-subtotal").textContent = formatCLP(subtotal);
  document.getElementById("summary-iva").textContent = formatCLP(iva);

  const shippingEl = document.getElementById("summary-shipping");
  if (shipping === 0) {
    shippingEl.textContent = "Gratis";
    shippingEl.classList.add("free");
  } else {
    shippingEl.textContent = formatCLP(shipping);
    shippingEl.classList.remove("free");
  }

  document.getElementById("summary-total").textContent = formatCLP(total);
}

function updateHeaderCartTotal(items) {
  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const badge = document.getElementById("cart-total-badge");
  if (badge) badge.textContent = formatCLP(total);
}

function changeQuantity(id, delta) {
  const items = getCart();
  const item = items.find((i) => i.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity < 1) {
    return removeItem(id);
  }

  saveCart(items);
  renderCart();
}

function removeItem(id) {
  const items = getCart().filter((i) => i.id !== id);
  saveCart(items);
  renderCart();
}

// =========================================================
// CALENDARIO DE DESPACHO
// =========================================================
function renderDeliveryDays() {
  const container = document.getElementById("delivery-days");
  if (!container) return;

  container.innerHTML = "";

  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const isBlocked = BLOCKED_OFFSETS.includes(i);
    const isSelected = i === 4; // día seleccionado de ejemplo (como en el mockup)

    const day = document.createElement("button");
    day.type = "button";
    day.className = "delivery-day";
    if (isSelected) day.classList.add("is-selected");
    if (isBlocked) day.classList.add("is-blocked");
    day.disabled = isBlocked;
    day.dataset.offset = i;

    day.innerHTML = `
      <span class="dow">${DOW_LABELS[date.getDay()]}</span>
      <span class="dom">${date.getDate()}</span>
      <span class="status">${isBlocked ? "Bloqueado" : isSelected ? "Seleccionado" : "Disponible"}</span>
    `;

    container.appendChild(day);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  renderDeliveryDays();

  const itemsList = document.getElementById("cart-items-list");
  itemsList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const row = button.closest(".cart-item");
    const id = row.dataset.id;
    const action = button.dataset.action;

    if (action === "increase") changeQuantity(id, 1);
    if (action === "decrease") changeQuantity(id, -1);
    if (action === "remove") removeItem(id);
  });

  const deliveryDays = document.getElementById("delivery-days");
  deliveryDays.addEventListener("click", (event) => {
    const day = event.target.closest(".delivery-day");
    if (!day || day.disabled) return;

    deliveryDays.querySelectorAll(".delivery-day").forEach((el) => {
      el.classList.remove("is-selected");
      const status = el.querySelector(".status");
      if (!el.classList.contains("is-blocked")) status.textContent = "Disponible";
    });

    day.classList.add("is-selected");
    day.querySelector(".status").textContent = "Seleccionado";
  });

  const checkoutButton = document.getElementById("checkout-button");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      const items = getCart();
      if (items.length === 0) {
        alert("Tu carrito está vacío.");
        return;
      }
      // La confirmación real de pedido y el pago se conectarán al backend.
      window.location.href = "user-profile-tracking.html";
    });
  }
});
