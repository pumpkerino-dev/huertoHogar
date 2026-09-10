// Logica de autenticacion frontend

import {
  isValidEmail,
  validatePassword,
  isValidName,
  isValidPhone,
  isValidAddress,
  passwordsMatch
} from "../utils/validation.js";

import {
  showMessage,
  clearMessage
} from "../utils/messages.js";

import { setSession, renderAccountLink } from "../utils/session.js";
import { addUser, validateLogin, findUserByEmail } from "../utils/db.js";
import { wireHeaderSearch } from "../utils/search.js";

// Marca un input como válido/inválido (borde verde/rojo) sin bloquear el submit.
function markField(input, isValid) {
  input.classList.toggle("is-invalid", !isValid);
  input.classList.toggle("is-valid", isValid);
}

document.addEventListener("DOMContentLoaded", () => {
  renderAccountLink(".account-link", "login-register.html", "user-profile-tracking.html");
  wireHeaderSearch();

  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  const loginMessage = document.getElementById("login-message");
  const registerMessage = document.getElementById("register-message");

  // =========================================================
  // INICIAR SESION
  // =========================================================
  if (loginForm) {
    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");

    emailInput.addEventListener("blur", () => {
      if (emailInput.value.trim() === "") return;
      markField(emailInput, isValidEmail(emailInput.value.trim()));
    });

    passwordInput.addEventListener("blur", () => {
      if (passwordInput.value === "") return;
      markField(passwordInput, passwordInput.value.length >= 8);
    });

    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      clearMessage(loginMessage);

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      if (!email || !password) {
        showMessage(loginMessage, "Completa tu correo y contraseña.", false);
        return;
      }

      if (!isValidEmail(email)) {
        showMessage(loginMessage, "Ingresa un correo electrónico válido.", false);
        markField(emailInput, false);
        emailInput.focus();
        return;
      }

      if (password.length < 8) {
        showMessage(loginMessage, "La contraseña debe tener al menos 8 caracteres.", false);
        markField(passwordInput, false);
        passwordInput.focus();
        return;
      }

      // Valida contra la "BD" simulada (usuarios creados con el formulario de registro)
      const user = validateLogin(email, password);
      if (!user) {
        showMessage(loginMessage, "Correo o contraseña incorrectos. ¿Ya creaste tu cuenta?", false);
        markField(emailInput, false);
        markField(passwordInput, false);
        return;
      }

      setSession(user.name);

      showMessage(
        loginMessage,
        "¡Bienvenida de vuelta! Te llevamos a tu cuenta...",
        true
      );

      setTimeout(() => {
        window.location.href = "user-profile-tracking.html";
      }, 900);
    });
  }

  // =========================================================
  // CREAR CUENTA
  // =========================================================
  if (registerForm) {
    const nameInput = document.getElementById("register-name");
    const emailInput = document.getElementById("register-email");
    const passwordInput = document.getElementById("register-password");
    const confirmPasswordInput = document.getElementById("register-confirm-password");
    const phoneInput = document.getElementById("register-phone");
    const addressInput = document.getElementById("register-address");
    const termsInput = document.getElementById("accept-terms");

    // Validación en tiempo real, campo por campo, al salir de cada uno
    nameInput.addEventListener("blur", () => {
      if (!nameInput.value.trim()) return;
      markField(nameInput, isValidName(nameInput.value.trim()));
    });

    emailInput.addEventListener("blur", () => {
      const value = emailInput.value.trim();
      if (!value) return;
      const isValid = isValidEmail(value) && !findUserByEmail(value);
      markField(emailInput, isValid);
      if (isValidEmail(value) && findUserByEmail(value)) {
        showMessage(registerMessage, "Ese correo ya tiene una cuenta registrada.", false);
      } else {
        clearMessage(registerMessage);
      }
    });

    passwordInput.addEventListener("blur", () => {
      if (!passwordInput.value) return;
      markField(passwordInput, validatePassword(passwordInput.value).length === 0);
    });

    confirmPasswordInput.addEventListener("blur", () => {
      if (!confirmPasswordInput.value) return;
      markField(confirmPasswordInput, passwordsMatch(passwordInput.value, confirmPasswordInput.value));
    });

    phoneInput.addEventListener("blur", () => {
      if (!phoneInput.value.trim()) return;
      markField(phoneInput, isValidPhone(phoneInput.value.trim()));
    });

    addressInput.addEventListener("blur", () => {
      if (!addressInput.value.trim()) return;
      markField(addressInput, isValidAddress(addressInput.value.trim()));
    });

    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      clearMessage(registerMessage);

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      const phone = phoneInput.value.trim();
      const address = addressInput.value.trim();
      const acceptsTerms = termsInput.checked;

      if (!name || !email || !password || !confirmPassword || !phone || !address) {
        showMessage(registerMessage, "Completa todos los campos obligatorios.", false);
        return;
      }

      if (!isValidName(name)) {
        showMessage(registerMessage, "Ingresa un nombre válido (nombre y apellido).", false);
        markField(nameInput, false);
        nameInput.focus();
        return;
      }

      if (!isValidEmail(email)) {
        showMessage(registerMessage, "Ingresa un correo electrónico válido.", false);
        markField(emailInput, false);
        emailInput.focus();
        return;
      }

      if (findUserByEmail(email)) {
        showMessage(registerMessage, "Ya existe una cuenta registrada con ese correo.", false);
        markField(emailInput, false);
        emailInput.focus();
        return;
      }

      const passwordErrors = validatePassword(password);
      if (passwordErrors.length > 0) {
        showMessage(registerMessage, "Contraseña no válida: " + passwordErrors.join(" "), false);
        markField(passwordInput, false);
        passwordInput.focus();
        return;
      }

      if (!passwordsMatch(password, confirmPassword)) {
        showMessage(registerMessage, "Las contraseñas no coinciden.", false);
        markField(confirmPasswordInput, false);
        confirmPasswordInput.focus();
        return;
      }

      if (!isValidPhone(phone)) {
        showMessage(registerMessage, "Ingresa un número telefónico válido (ej: +56 9 1234 5678).", false);
        markField(phoneInput, false);
        phoneInput.focus();
        return;
      }

      if (!isValidAddress(address)) {
        showMessage(registerMessage, "Ingresa una dirección válida (calle, número, comuna).", false);
        markField(addressInput, false);
        addressInput.focus();
        return;
      }

      if (!acceptsTerms) {
        showMessage(registerMessage, "Debes aceptar los Términos y Condiciones.", false);
        termsInput.focus();
        return;
      }

      // Inyecta el usuario en el array que simula la "BD" (ver js/utils/db.js)
      // (el correo duplicado ya se validó más arriba, así que esto no debería fallar)
      const newUser = addUser({ name, email, password, phone, address });

      if (!newUser) {
        showMessage(registerMessage, "Ya existe una cuenta registrada con ese correo.", false);
        markField(emailInput, false);
        emailInput.focus();
        return;
      }

      setSession(newUser.name);

      showMessage(
        registerMessage,
        "¡Cuenta creada! Te llevamos a tu perfil...",
        true
      );

      setTimeout(() => {
        window.location.href = "user-profile-tracking.html";
      }, 900);
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
