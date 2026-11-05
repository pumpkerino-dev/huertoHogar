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

// ---------------------------------------------------------------
// Validaciones de formularios completos (Login.jsx y panel admin).
// Devuelven un objeto { campo: "mensaje" }; vacío = todo OK.
// ---------------------------------------------------------------

export function validarLogin({ email, password }) {
  const errores = {};
  if (!isValidEmail(email)) errores.email = "Ingresa un correo electrónico válido.";
  if (!password) errores.password = "Ingresa tu contraseña.";
  return errores;
}

export function validarRegistro(datos) {
  const errores = {};
  if (!isValidName(datos.nombre)) errores.nombre = "Ingresa un nombre válido (nombre y apellido).";
  if (!isValidEmail(datos.email)) errores.email = "Ingresa un correo electrónico válido.";

  const problemas = validatePassword(datos.password);
  if (problemas.length > 0) errores.password = "Contraseña no válida: " + problemas.join(" ");
  else if (!passwordsMatch(datos.password, datos.confirmar)) errores.confirmar = "Las contraseñas no coinciden.";

  if (!isValidPhone(datos.telefono)) errores.telefono = "Ingresa un teléfono válido (ej: +56 9 1234 5678).";
  if (!isValidAddress(datos.direccion)) errores.direccion = "Ingresa calle y número.";
  if (!datos.terminos) errores.terminos = "Debes aceptar los términos y condiciones.";
  return errores;
}

// Formulario de usuario del panel admin.
// Al crear, la contraseña es obligatoria; al editar es opcional (vacía = no se cambia).
export function validarUsuario(u, esNuevo) {
  const errores = {};
  if (!u.nombre.trim()) errores.nombre = "El nombre es obligatorio";
  if (!isValidEmail(u.email)) errores.email = "Ingresa un correo válido";
  if (esNuevo || u.password) {
    const problemas = validatePassword(u.password);
    if (problemas.length > 0) errores.password = problemas.join(" ");
  }
  return errores;
}

// Formulario "Mi perfil" (cliente y admin). Teléfono y dirección son opcionales.
export function validarPerfil(p) {
  const errores = {};
  if (!isValidName(p.nombre)) errores.nombre = "Ingresa nombre y apellido.";
  if (p.telefono && !isValidPhone(p.telefono)) errores.telefono = "Teléfono no válido (ej: +56 9 1234 5678).";
  if (p.direccion && !isValidAddress(p.direccion)) errores.direccion = "Ingresa calle y número.";
  return errores;
}

// (La categoría se valida con Yup: ver utils/esquemas.js)

// true si el objeto de errores está vacío
export const sinErrores = (errores) => Object.keys(errores).length === 0;
