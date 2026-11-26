// Datos de envío vacíos y autocompletados desde el usuario con sesión iniciada
export const ENVIO_VACIO = {
  nombre: '', apellidos: '', correo: '', calle: '', departamento: '', region: '', comuna: '', indicaciones: '',
};

export const envioDesdeUsuario = (usuario) => ({
  ...ENVIO_VACIO,
  nombre: usuario?.nombre ?? '',
  apellidos: usuario?.apellidos ?? '',
  correo: usuario?.email ?? '',
  calle: usuario?.direccion ?? '',
  region: usuario?.region ?? '',
  comuna: usuario?.comuna ?? '',
});

export const limpiarEnvio = (envio) =>
  Object.fromEntries(Object.entries(envio).map(([clave, valor]) => [clave, valor.trim()]));
