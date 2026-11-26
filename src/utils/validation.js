// Funciones de validación reutilizables para formularios.
// Siguen las mismas reglas que el backend (paquete validacion/ de Spring Boot).

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Acepta +56 9 1234 5678, 912345678, 9 1234 5678, etc.
const PHONE_REGEX = /^(\+?56)?\s?9\s?\d{4}\s?\d{4}$/;
// Letras (incluye acentos y ñ) y espacios
const NOMBRE_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+(\s[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+)*$/;

export const DOMINIOS_PERMITIDOS = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];

export function isValidEmail(email) {
  return EMAIL_REGEX.test(email.trim());
}

// Solo correos @duoc.cl, @profesor.duoc.cl y @gmail.com
export function isCorreoPermitido(email) {
  const limpio = email.trim().toLowerCase();
  const dominio = limpio.slice(limpio.lastIndexOf("@") + 1);
  return isValidEmail(limpio) && DOMINIOS_PERMITIDOS.includes(dominio);
}

export function isValidNombre(nombre) {
  return NOMBRE_REGEX.test(nombre.trim());
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

// RUN sin puntos ni guion: "12.345.678-5" -> "123456785"
export const normalizarRun = (run) => String(run ?? "").replace(/[.-]/g, "").trim().toUpperCase();

// Dígito verificador por módulo 11
export function calcularDv(cuerpo) {
  let suma = 0;
  let multiplicador = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }
  const resto = 11 - (suma % 11);
  if (resto === 11) return "0";
  if (resto === 10) return "K";
  return String(resto);
}

export function isValidRun(run) {
  const limpio = normalizarRun(run);
  if (!/^\d{6,8}[0-9K]$/.test(limpio)) return false;
  return calcularDv(limpio.slice(0, -1)) === limpio.slice(-1);
}

// La fecha de nacimiento es opcional; si viene, debe ser anterior a hoy
export function isFechaPasada(fecha) {
  if (!fecha) return true;
  return fecha < new Date().toISOString().slice(0, 10);
}

// Devuelve un arreglo con los mensajes de error encontrados.
// Un arreglo vacío significa que la contraseña es válida.
export function validatePassword(password) {
  const errors = [];

  if (password.length < 8) {
    errors.push("Debe tener al menos 8 caracteres.");
  }
  if (password.length > 10) {
    errors.push("No puede tener más de 10 caracteres.");
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
// Validaciones de formularios completos.
// Devuelven un objeto { campo: "mensaje" }; vacío = todo OK.
// ---------------------------------------------------------------

function validarCorreo(email, errores, campo = "email") {
  if (!isValidEmail(email)) errores[campo] = "Ingresa un correo electrónico válido.";
  else if (email.trim().length > 100) errores[campo] = "El correo no puede superar los 100 caracteres.";
  else if (!isCorreoPermitido(email)) errores[campo] = "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
}

// Nombre, apellidos, fecha de nacimiento, teléfono, región, comuna y dirección
function validarDatosPersonales(d, errores) {
  if (!d.nombre.trim()) errores.nombre = "El nombre es obligatorio.";
  else if (d.nombre.trim().length > 50) errores.nombre = "El nombre no puede superar los 50 caracteres.";
  else if (!isValidNombre(d.nombre)) errores.nombre = "El nombre solo puede tener letras.";

  if (!d.apellidos.trim()) errores.apellidos = "Los apellidos son obligatorios.";
  else if (d.apellidos.trim().length > 100) errores.apellidos = "Los apellidos no pueden superar los 100 caracteres.";
  else if (!isValidNombre(d.apellidos)) errores.apellidos = "Los apellidos solo pueden tener letras.";

  if (!isFechaPasada(d.fechaNacimiento)) errores.fechaNacimiento = "La fecha de nacimiento debe ser anterior a hoy.";
  if (d.telefono && !isValidPhone(d.telefono)) errores.telefono = "Ingresa un teléfono válido (ej: +56 9 1234 5678).";
  if (!d.region) errores.region = "Selecciona una región.";
  if (!d.comuna) errores.comuna = "Selecciona una comuna.";

  if (!isValidAddress(d.direccion)) errores.direccion = "Ingresa calle y número.";
  else if (d.direccion.trim().length > 300) errores.direccion = "La dirección no puede superar los 300 caracteres.";
}

function validarRun(run, errores) {
  const limpio = normalizarRun(run);
  if (!limpio) errores.run = "El RUN es obligatorio.";
  else if (limpio.length < 7 || limpio.length > 9) errores.run = "El RUN debe tener entre 7 y 9 caracteres (sin puntos ni guion).";
  else if (!isValidRun(limpio)) errores.run = "El RUN no es válido (revisa el dígito verificador).";
}

export function validarLogin({ email, password }) {
  const errores = {};
  validarCorreo(email, errores);
  if (!password) errores.password = "Ingresa tu contraseña.";
  else if (password.length < 4 || password.length > 10) errores.password = "La contraseña debe tener entre 4 y 10 caracteres.";
  return errores;
}

export function validarRegistro(datos) {
  const errores = {};
  validarRun(datos.run, errores);
  validarDatosPersonales(datos, errores);
  validarCorreo(datos.email, errores);

  const problemas = validatePassword(datos.password);
  if (problemas.length > 0) errores.password = "Contraseña no válida: " + problemas.join(" ");
  else if (!passwordsMatch(datos.password, datos.confirmar)) errores.confirmar = "Las contraseñas no coinciden.";

  if (!datos.terminos) errores.terminos = "Debes aceptar los términos y condiciones.";
  return errores;
}

// Formulario de usuario del panel admin.
// Al crear, la contraseña es obligatoria; al editar es opcional (vacía = no se cambia).
export function validarUsuario(u, esNuevo) {
  const errores = {};
  validarRun(u.run, errores);
  validarDatosPersonales(u, errores);
  validarCorreo(u.email, errores);
  if (esNuevo || u.password) {
    const problemas = validatePassword(u.password);
    if (problemas.length > 0) errores.password = problemas.join(" ");
  }
  if (!u.rol) errores.rol = "Selecciona el tipo de usuario.";
  return errores;
}

// Formulario "Mi perfil" (cliente y admin). El teléfono y la fecha de nacimiento son opcionales.
export function validarPerfil(p) {
  const errores = {};
  validarDatosPersonales(p, errores);
  return errores;
}

// Datos de envío del Checkout
export function validarEnvio(e) {
  const errores = {};
  if (!e.nombre.trim()) errores.nombre = "El nombre es obligatorio.";
  if (!e.apellidos.trim()) errores.apellidos = "Los apellidos son obligatorios.";
  validarCorreo(e.correo, errores, "correo");
  if (!isValidAddress(e.calle)) errores.calle = "Ingresa calle y número.";
  if (e.departamento.trim().length > 100) errores.departamento = "Máximo 100 caracteres.";
  if (!e.region) errores.region = "Selecciona una región.";
  if (!e.comuna) errores.comuna = "Selecciona una comuna.";
  if (e.indicaciones.trim().length > 300) errores.indicaciones = "Máximo 300 caracteres.";
  return errores;
}

// Formulario de Contacto
export function validarContacto(c) {
  const errores = {};
  if (!c.nombre.trim()) errores.nombre = "El nombre es obligatorio.";
  else if (c.nombre.trim().length > 100) errores.nombre = "El nombre no puede superar los 100 caracteres.";
  validarCorreo(c.correo, errores, "correo");
  if (!c.comentario.trim()) errores.comentario = "Escribe tu comentario.";
  else if (c.comentario.trim().length > 500) errores.comentario = "El comentario no puede superar los 500 caracteres.";
  return errores;
}

// (La categoría se valida con Yup: ver utils/esquemas.js)

// true si el objeto de errores está vacío
export const sinErrores = (errores) => Object.keys(errores).length === 0;

// Sugerencias para un <datalist> de correo: "ana" -> ["ana@duoc.cl", "ana@profesor.duoc.cl", "ana@gmail.com"]
export function sugerenciasCorreo(texto) {
  const usuario = String(texto ?? "").split("@")[0].trim();
  return usuario ? DOMINIOS_PERMITIDOS.map((dominio) => `${usuario}@${dominio}`) : [];
}
