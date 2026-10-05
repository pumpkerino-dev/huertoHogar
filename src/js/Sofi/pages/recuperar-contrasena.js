// Recuperación de contraseña simulada 
// Flujo: 1) pides el código con tu correo -> 2) ingresas el código
// (se muestra en pantalla, ya que no hay servidor de correo real) ->
// 3) defines tu nueva contraseña, que se actualiza en la "BD" simulada.

import { isValidEmail, validatePassword, passwordsMatch } from "../utils/validation.js";
import { showMessage, clearMessage } from "../utils/messages.js";
import { findUserByEmail, getUsers } from "../utils/db.js";
import { wireHeaderSearch } from "../utils/search.js";

function markField(input, isValid) {
  input.classList.toggle("is-invalid", !isValid);
  input.classList.toggle("is-valid", isValid);
}

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function showStep(stepName) {
  document.querySelectorAll(".recovery-step").forEach((step) => {
    step.hidden = step.dataset.step !== stepName;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  wireHeaderSearch();

  let pendingEmail = "";
  let pendingCode = "";

  // ---- Paso 1: pedir el correo ----
  const emailForm = document.getElementById("recovery-email-form");
  const emailInput = document.getElementById("recovery-email");
  const emailMessage = document.getElementById("recovery-email-message");

  emailForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearMessage(emailMessage);

    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
      showMessage(emailMessage, "Ingresa un correo electrónico válido.", false);
      markField(emailInput, false);
      return;
    }

    if (!findUserByEmail(email)) {
      showMessage(emailMessage, "No encontramos ninguna cuenta con ese correo.", false);
      markField(emailInput, false);
      return;
    }

    pendingEmail = email;
    pendingCode = generateCode();

    showMessage(emailMessage, "Revisa tu correo y sigue las instrucciones para continuar.", true);

    // No hay servidor de correo real: mostramos el código directamente en
    // pantalla para poder probar el flujo completo igual.
    document.getElementById("recovery-demo-code").textContent = pendingCode;
    document.getElementById("recovery-code-target-email").textContent = pendingEmail;

    setTimeout(() => {
      showStep("code");
    }, 1100);
  });

  // ---- Paso 2: verificar el código ----
  const codeForm = document.getElementById("recovery-code-form");
  const codeInput = document.getElementById("recovery-code");
  const codeMessage = document.getElementById("recovery-code-message");

  codeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearMessage(codeMessage);

    const code = codeInput.value.trim();

    if (code !== pendingCode) {
      showMessage(codeMessage, "El código ingresado no es correcto.", false);
      markField(codeInput, false);
      return;
    }

    showStep("new-password");
  });

  document.getElementById("recovery-back-to-email").addEventListener("click", () => {
    showStep("email");
  });

  // ---- Paso 3: definir nueva contraseña ----
  const passwordForm = document.getElementById("recovery-password-form");
  const passwordInput = document.getElementById("recovery-new-password");
  const confirmInput = document.getElementById("recovery-confirm-password");
  const passwordMessage = document.getElementById("recovery-password-message");

  passwordForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearMessage(passwordMessage);

    const password = passwordInput.value;
    const confirm = confirmInput.value;

    const errors = validatePassword(password);
    if (errors.length > 0) {
      showMessage(passwordMessage, "Contraseña no válida: " + errors.join(" "), false);
      markField(passwordInput, false);
      return;
    }

    if (!passwordsMatch(password, confirm)) {
      showMessage(passwordMessage, "Las contraseñas no coinciden.", false);
      markField(confirmInput, false);
      return;
    }

    // Actualiza la contraseña directo en la "BD" simulada (localStorage)
    const users = getUsers();
    const user = users.find((u) => u.email.toLowerCase() === pendingEmail.toLowerCase());
    if (user) {
      user.password = password;
      localStorage.setItem("huertohogar-users", JSON.stringify(users));
    }

    showStep("done");
  });
});
