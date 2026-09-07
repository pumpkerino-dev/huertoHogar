// Logica de autenticacion frontend

import {
    isValidEmail,
    validatePassword,
    isValidName,
    isValidPhone,
    isValidAddress
} from "js/utils/validation.js";

import {
    showMessage,
    clearMessage
} from "js/utils/messages.js";

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
            // -------------------------------------------------
            // Validacion de campos obligatorios
            if (!email || !password) {
                showMessage(
                    loginMessage,
                    "Completa tu correo y contraseña.",
                    false
                );
                return;
            }
            // -------------------------------------------------
            // ValidaciOn del correo
            if (!isValidEmail(email)) {
                showMessage(
                    loginMessage,
                    "Ingresa un correo electrónico válido.",
                    false
                );
                emailInput.focus();
                return;
            }
            // -------------------------------------------------
            // Validacion de contraseña
            if (password.length < 8) {
                showMessage(
                    loginMessage,
                    "La contraseña debe tener al menos 8 caracteres.",
                    false
                );
                passwordInput.focus();
                return;
            }
            // -------------------------------------------------
            // Validaciones superadas
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

            // -------------------------------------------------
            // Campos obligatorios
            if (
                !name ||
                !email ||
                !password ||
                !phone ||
                !address
            ) {
                showMessage(
                    registerMessage,
                    "Completa todos los campos obligatorios.",
                    false
                );
                return;
            }
            // -------------------------------------------------
            // Nombre
            if (!isValidName(name)) {

                showMessage(
                    registerMessage,
                    "Ingresa un nombre válido.",
                    false
                );

                nameInput.focus();

                return;
            }
            // -------------------------------------------------
            // Correo
            if (!isValidEmail(email)) {

                showMessage(
                    registerMessage,
                    "Ingresa un correo electrónico válido.",
                    false
                );

                emailInput.focus();

                return;
            }
            // -------------------------------------------------
            // Contraseña
            const passwordErrors = validatePassword(password);

            if (passwordErrors.length > 0) {

                showMessage(
                    registerMessage,
                    "Contraseña no válida: " + passwordErrors.join(" "),
                    false
                );

                passwordInput.focus();

                return;
            }
            // -------------------------------------------------
            // Telefono
            if (!isValidPhone(phone)) {
                showMessage(
                    registerMessage,
                    "Ingresa un número telefónico válido.",
                    false
                );
                phoneInput.focus();
                return;
            }
            // -------------------------------------------------
            // Direccion
            if (!isValidAddress(address)) {
                showMessage(
                    registerMessage,
                    "Ingresa una dirección válida.",
                    false
                );
                addressInput.focus();
                return;
            }
            // -------------------------------------------------
            // Terminos y condiciones
            if (!acceptsTerms) {
                showMessage(
                    registerMessage,
                    "Debes aceptar los Términos y Condiciones.",
                    false
                );
                termsInput.focus();
                return;
            }
            // -------------------------------------------------
            // Validaciones superadas
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