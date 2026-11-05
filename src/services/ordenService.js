import api from "../api";

const RUTA = "/ordenes";

export const getOrdenes = () => api.get(RUTA).then((res) => res.data);

export const getMisOrdenes = () => api.get(`${RUTA}/mias`).then((res) => res.data);

export const getOrdenesDeUsuario = (email) =>
  api.get(`${RUTA}/usuario/${encodeURIComponent(email)}`).then((res) => res.data);

export const crearOrden = (items, { simularFallo = false, fechaEntrega = "" } = {}) =>
  api
    .post(RUTA, {
      items: items.map((item) => ({ codigo: item.id, cantidad: item.quantity })),
      fechaEntrega,
      simularFallo,
    })
    .then((res) => res.data);

export function validarCarrito(items, productos) {
  if (!Array.isArray(items) || items.length === 0) return ["El carrito está vacío."];
  if (!productos || productos.length === 0) return [];
  const problemas = [];
  for (const item of items) {
    const producto = productos.find((p) => p.code === item.id);
    const cantidad = Number(item.quantity);
    const stock = Number(producto?.detail?.maxQuantity ?? 0);
    if (!producto) problemas.push(`"${item.name}" ya no está disponible.`);
    else if (!Number.isInteger(cantidad) || cantidad < 1) problemas.push(`La cantidad de "${item.name}" no es válida.`);
    else if (cantidad > stock) problemas.push(`Solo quedan ${stock} de "${item.name}" (pediste ${cantidad}).`);
  }
  return problemas;
}
