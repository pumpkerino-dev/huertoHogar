// Funciones de validación reutilizables para formularios

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Acepta +56 9 1234 5678, 912345678, 9 1234 5678, etc.
const PHONE_REGEX = /^(\+?56)?\s?9\s?\d{4}\s?\d{4}$/;
// Letras (incluye acentos y ñ) y espacios, mínimo 2 caracteres
const NAME_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)+$/;

export function isValidEmail(email) {
  return EMAIL_REGEX.test(email.trim());
}

export function isValidName(name) {
  return NAME_REGEX.test(name.trim());
}

export function isValidPhone(phone) {
  return PHONE_REGEX.test(phone.trim());
}

export function isValidAddress(address) {
  const value = address.trim();
  // Al menos 5 caracteres y que combine letras y números (calle + número)
  return value.length >= 5 && /[a-zA-Z]/.test(value) && /\d/.test(value);
}

export function passwordsMatch(password, confirmPassword) {
  return password.length > 0 && password === confirmPassword;
}

// Devuelve un arreglo con los mensajes de error encontrados.
// Un arreglo vacío significa que la contraseña es válida.
export function validatePassword(password) {
  const errors = [];

  if (password.length < 8) {
    errors.push("Debe tener al menos 8 caracteres.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Debe incluir al menos una mayúscula.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Debe incluir al menos una minúscula.");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Debe incluir al menos un número.");
  }

  return errors;
}
