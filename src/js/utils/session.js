// Sesión simulada del usuario (front-end, sin backend).
// Se usa desde login-register.js, cart.js y profile.js para que el
// header ("Mi Cuenta") refleje si alguien "inició sesión" en esta demo.

const SESSION_KEY = "huertohogar-session";

export function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setSession(name) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ name }));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// Actualiza el texto y el link de "Mi Cuenta" en el header según la sesión.
// accountLinkSelector: selector del <a class="account-link">
// loggedOutHref: a dónde debe apuntar si NO hay sesión (login-register.html)
// loggedInHref: a dónde debe apuntar si SÍ hay sesión (user-profile-tracking.html)
export function renderAccountLink(accountLinkSelector, loggedOutHref, loggedInHref) {
  const link = document.querySelector(accountLinkSelector);
  if (!link) return;

  const session = getSession();
  const label = link.querySelector(".account-label") || link;

  if (session) {
    link.href = loggedInHref;
    label.textContent = session.name.split(" ")[0]; // solo el primer nombre
  } else {
    link.href = loggedOutHref;
    label.textContent = "Mi Cuenta";
  }
}
