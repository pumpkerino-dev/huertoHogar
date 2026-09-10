// Logica del carrito de compras (front-end, sin backend)
// Estructura guardada en localStorage bajo la clave "huertohogar-cart":
// [{ id, name, unit, unitPrice, image, quantity }, ...]

import { renderAccountLink } from "../utils/session.js";
import { wireHeaderSearch } from "../utils/search.js";

const STORAGE_KEY = "huertohogar-cart";
const IVA_RATE = 0.19;
const FREE_SHIPPING_FROM = 5000;
const SHIPPING_COST = 2990;

// Datos de ejemplo (mock) para poder probar la página sin backend.
// Imágenes reales del proyecto (confirmadas por Sofi: img/manzana-fuji.png,
// img/miel-organica.png, img/zanahorias-organicas.png, img/leche-entera.png).
const MOCK_ITEMS = [
  { id: "FR001", name: "Manzanas Fuji", unit: "1 Kilo", unitPrice: 1200, image: "img/manzana-fuji.png", quantity: 1 },
  { id: "PO001", name: "Miel Orgánica", unit: "1 Frasco 500g", unitPrice: 4900, image: "img/miel-organica.png", quantity: 1 },
  { id: "VR001", name: "Zanahorias de Campo", unit: "2 Kilos", unitPrice: 990, image: "img/zanahorias-organicas.png", quantity: 2 }
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
  // El badge del header usa el formato corto "$X.XXX" (sin sufijo "CLP"),
  // igual que el placeholder que ya existe en el código de tu compañero.
  if (badge) badge.textContent = "$" + Math.round(total).toLocaleString("es-CL");
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
  renderAccountLink(".account-link", "login-register.html", "user-profile-tracking.html");
  wireHeaderSearch();
  renderCart();
  renderDeliveryDays();
  updateCheckoutState();

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
    updateCheckoutState();
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
    updateCheckoutState();
  });

  const checkoutButton = document.getElementById("checkout-button");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      const items = getCart();
      const hasDaySelected = document.querySelector(".delivery-day.is-selected");

      if (items.length === 0) {
        alert("Tu carrito está vacío.");
        return;
      }
      if (!hasDaySelected) {
        alert("Selecciona un día de despacho antes de continuar.");
        return;
      }

      openPaymentModal();
    });
  }

  setupPaymentForm();
});

// =========================================================
// PAGO SIMULADO (Transbank/Webpay)
// =========================================================
const PAYMENT_METHODS_STORAGE_KEY = "huertohogar-payment-methods"; // misma clave que usa profile.js

function loadPaymentMethodsForCheckout() {
  const raw = localStorage.getItem(PAYMENT_METHODS_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function savePaymentMethodsFromCheckout(methods) {
  localStorage.setItem(PAYMENT_METHODS_STORAGE_KEY, JSON.stringify(methods));
}

function openPaymentModal() {
  renderPaymentMethodOptions();
  const modal = document.getElementById("modal-pago");
  if (modal) modal.classList.add("is-open");
}

function closePaymentModal() {
  const modal = document.getElementById("modal-pago");
  if (modal) modal.classList.remove("is-open");
}

function renderPaymentMethodOptions() {
  const container = document.getElementById("payment-methods-select");
  const methods = loadPaymentMethodsForCheckout();

  container.innerHTML = "";

  methods.forEach((pm) => {
    const option = document.createElement("label");
    option.className = "payment-method-option";
    option.innerHTML = `
      <input type="radio" name="payment-method-choice" value="${pm.id}" ${pm.isDefault ? "checked" : ""} />
      <span>
        <strong>${pm.name}</strong>
        <span class="pm-detail">Termina en ${pm.last4} · Vence ${pm.expiry}</span>
      </span>
    `;
    container.appendChild(option);
  });

  const newOption = document.createElement("label");
  newOption.className = "payment-method-option";
  newOption.innerHTML = `
    <input type="radio" name="payment-method-choice" value="new" ${methods.length === 0 ? "checked" : ""} />
    <span><strong>+ Usar otra tarjeta</strong></span>
  `;
  container.appendChild(newOption);

  container.querySelectorAll('input[name="payment-method-choice"]').forEach((radio) => {
    radio.addEventListener("change", updatePaymentModeVisibility);
  });

  updatePaymentModeVisibility();
}

function updatePaymentModeVisibility() {
  const container = document.getElementById("payment-methods-select");
  const selected = container.querySelector('input[name="payment-method-choice"]:checked');
  const isNew = !selected || selected.value === "new";

  document.getElementById("payment-new-card-block").hidden = !isNew;
  document.getElementById("payment-cvv-only-block").hidden = isNew;

  container.querySelectorAll(".payment-method-option").forEach((opt) => {
    const radio = opt.querySelector("input");
    opt.classList.toggle("is-selected", radio.checked);
  });
}

function setupPaymentForm() {
  const form = document.getElementById("payment-form");
  if (!form) return;

  const cardNumberInput = document.getElementById("payment-card-number");
  const cardExpiryInput = document.getElementById("payment-card-expiry");
  const cardCvvInput = document.getElementById("payment-card-cvv");
  const message = document.getElementById("payment-message");

  cardNumberInput.addEventListener("input", () => {
    const digits = cardNumberInput.value.replace(/\D/g, "").slice(0, 16);
    cardNumberInput.value = digits.replace(/(.{4})/g, "$1 ").trim();
  });

  cardExpiryInput.addEventListener("input", () => {
    let digits = cardExpiryInput.value.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) digits = digits.slice(0, 2) + "/" + digits.slice(2);
    cardExpiryInput.value = digits;
  });

  [cardCvvInput, document.getElementById("payment-cvv-existing")].forEach((input) => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/\D/g, "").slice(0, 4);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    message.textContent = "";

    const container = document.getElementById("payment-methods-select");
    const selected = container.querySelector('input[name="payment-method-choice"]:checked');
    const isNew = !selected || selected.value === "new";

    let last4ForSimulation;

    if (isNew) {
      const cardName = document.getElementById("payment-card-name").value.trim();
      const cardDigits = cardNumberInput.value.replace(/\s/g, "");
      const expiry = cardExpiryInput.value.trim();
      const cvv = cardCvvInput.value.trim();

      if (cardName.length < 3) {
        message.textContent = "Ingresa el nombre tal como aparece en la tarjeta.";
        return;
      }
      if (cardDigits.length < 15 || cardDigits.length > 16) {
        message.textContent = "El número de tarjeta debe tener 15 o 16 dígitos.";
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        message.textContent = "La fecha de vencimiento debe tener el formato MM/AA.";
        return;
      }
      if (cvv.length < 3) {
        message.textContent = "El CVV debe tener 3 o 4 dígitos.";
        return;
      }

      last4ForSimulation = cardDigits.slice(-4);

      if (document.getElementById("payment-save-card").checked) {
        const methods = loadPaymentMethodsForCheckout();
        methods.push({
          id: "pm-" + Date.now(),
          name: cardName,
          last4: last4ForSimulation,
          expiry,
          isDefault: methods.length === 0
        });
        savePaymentMethodsFromCheckout(methods);
      }
    } else {
      const cvv = document.getElementById("payment-cvv-existing").value.trim();
      if (cvv.length < 3) {
        message.textContent = "Ingresa el CVV de tu tarjeta.";
        return;
      }
      const method = loadPaymentMethodsForCheckout().find((m) => m.id === selected.value);
      last4ForSimulation = method ? method.last4 : "0000";
    }

    // Simulación de resultado: el último dígito decide aprobado/rechazado
    const lastDigit = Number(last4ForSimulation.slice(-1));
    const isApproved = lastDigit % 2 === 0;

    form.querySelector("#payment-submit-button").disabled = true;
    setTimeout(() => {
      form.querySelector("#payment-submit-button").disabled = false;
      if (isApproved) {
        handlePaymentApproved();
      } else {
        handlePaymentDeclined();
      }
    }, 700);
  });
}

function handlePaymentApproved() {
  const items = getCart();
  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0) * (1 + IVA_RATE);

  closePaymentModal();
  localStorage.removeItem(STORAGE_KEY);

  Swal.fire({
    icon: "success",
    title: "Pago Aprobado",
    text: `Tu pago de ${formatCLP(total)} fue procesado correctamente. Redirigiendo a tu pedido...`,
    confirmButtonColor: "#2e8b57"
  }).then(() => {
    window.location.href = "user-profile-tracking.html";
  });
}

function handlePaymentDeclined() {
  Swal.fire({
    icon: "error",
    title: "Pago Rechazado",
    text: "La transacción fue rechazada por el emisor de tu tarjeta. Verifica los datos e intenta nuevamente.",
    confirmButtonColor: "#2e8b57"
  });
}

// Habilita/deshabilita "Proceder al Pago" según si hay productos y fecha elegida.
function updateCheckoutState() {
  const checkoutButton = document.getElementById("checkout-button");
  if (!checkoutButton) return;

  const items = getCart();
  const hasDaySelected = document.querySelector(".delivery-day.is-selected");
  const isReady = items.length > 0 && Boolean(hasDaySelected);

  checkoutButton.disabled = !isReady;
  checkoutButton.title = isReady
    ? ""
    : items.length === 0
      ? "Agrega productos a tu carrito para continuar"
      : "Selecciona un día de despacho para continuar";
}


