// Logica de autenticacion frontend

import {
  isValidEmail,
  validatePassword,
  isValidName,
  isValidPhone,
  isValidAddress
} from "../utils/validation.js";

import {
  showMessage,
  clearMessage
} from "../utils/messages.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  const loginMessage = document.getElementById("login-message");
  const registerMessage = document.getElementById("register-message");

  // =========================================================
  // INICIAR SESION
  // =========================================================
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      clearMessage(loginMessage);

      const emailInput = document.getElementById("login-email");
      const passwordInput = document.getElementById("login-password");

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      if (!email || !password) {
        showMessage(loginMessage, "Completa tu correo y contraseña.", false);
        return;
      }

      if (!isValidEmail(email)) {
        showMessage(loginMessage, "Ingresa un correo electrónico válido.", false);
        emailInput.focus();
        return;
      }

      if (password.length < 8) {
        showMessage(loginMessage, "La contraseña debe tener al menos 8 caracteres.", false);
        passwordInput.focus();
        return;
      }

      showMessage(
        loginMessage,
        "Los datos ingresados son válidos. La autenticación se realizará mediante el backend.",
        true
      );
    });
  }

  // =========================================================
  // CREAR CUENTA
  // =========================================================
  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      clearMessage(registerMessage);

      const nameInput = document.getElementById("register-name");
      const emailInput = document.getElementById("register-email");
      const passwordInput = document.getElementById("register-password");
      const phoneInput = document.getElementById("register-phone");
      const addressInput = document.getElementById("register-address");
      const termsInput = document.getElementById("accept-terms");

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const phone = phoneInput.value.trim();
      const address = addressInput.value.trim();
      const acceptsTerms = termsInput.checked;

      if (!name || !email || !password || !phone || !address) {
        showMessage(registerMessage, "Completa todos los campos obligatorios.", false);
        return;
      }

      if (!isValidName(name)) {
        showMessage(registerMessage, "Ingresa un nombre válido (nombre y apellido).", false);
        nameInput.focus();
        return;
      }

      if (!isValidEmail(email)) {
        showMessage(registerMessage, "Ingresa un correo electrónico válido.", false);
        emailInput.focus();
        return;
      }

      const passwordErrors = validatePassword(password);
      if (passwordErrors.length > 0) {
        showMessage(registerMessage, "Contraseña no válida: " + passwordErrors.join(" "), false);
        passwordInput.focus();
        return;
      }

      if (!isValidPhone(phone)) {
        showMessage(registerMessage, "Ingresa un número telefónico válido (ej: +56 9 1234 5678).", false);
        phoneInput.focus();
        return;
      }

      if (!isValidAddress(address)) {
        showMessage(registerMessage, "Ingresa una dirección válida (calle, número, comuna).", false);
        addressInput.focus();
        return;
      }

      if (!acceptsTerms) {
        showMessage(registerMessage, "Debes aceptar los Términos y Condiciones.", false);
        termsInput.focus();
        return;
      }

      showMessage(
        registerMessage,
        "Todos los datos son válidos. La creación de la cuenta se realizará mediante el backend.",
        true
      );
    });
  }

  // =========================================================
  // LOGIN SOCIAL
  // =========================================================
  const socialButtons = document.querySelectorAll(".btn-social");
  socialButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const provider = button.dataset.provider;
      showMessage(
        loginMessage,
        `El inicio de sesión con ${provider} estará disponible próximamente.`,
        true
      );
    });
  });
});
