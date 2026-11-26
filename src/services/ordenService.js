import api from "../api";

const RUTA = "/boletas";

export const ESTADOS_PEDIDO = [
  { valor: "EN_PREPARACION", texto: "En preparación", color: "warning" },
  { valor: "EN_CAMINO", texto: "En camino", color: "primary" },
  { valor: "ENTREGADO", texto: "Entregado", color: "success" },
  { valor: "CANCELADA", texto: "Cancelado", color: "secondary" },
];

export const infoEstado = (valor) =>
  ESTADOS_PEDIDO.find((e) => e.valor === valor) ?? { valor, texto: valor ?? "—", color: "secondary" };

export const getOrdenes = () => api.get(RUTA).then((res) => res.data);

export const getMisOrdenes = () => api.get(`${RUTA}/mias`).then((res) => res.data);

export const getOrden = (id) => api.get(`${RUTA}/${id}`).then((res) => res.data);

export const getOrdenesDeUsuario = (usuarioId) => api.get(`${RUTA}/usuario/${usuarioId}`).then((res) => res.data);

export const cambiarEstado = (id, estado) => api.patch(`${RUTA}/${id}/estado`, { estado }).then((res) => res.data);

export const crearOrden = (items, { envio, simularFallo = false, fechaEntrega = "" } = {}) =>
  api
    .post(RUTA, {
      items: items.map((item) => ({ codigo: item.id, cantidad: item.quantity })),
      envio,
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
