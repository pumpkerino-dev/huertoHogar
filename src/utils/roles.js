// Tipos de usuario del sistema (los mismos del enum Rol del backend)
export const ROLES = [
  { valor: "CLIENTE", texto: "Cliente", color: "success" },
  { valor: "VENDEDOR", texto: "Vendedor", color: "primary" },
  { valor: "ADMIN", texto: "Administrador", color: "danger" },
];

export const infoRol = (valor) => ROLES.find((r) => r.valor === valor) ?? { valor, texto: valor, color: "secondary" };
