import api from "../api";
import { aFormatoTienda } from "../utils/productoAdapter";

const RUTA = "/productos";

export const getProductos = (categoria) =>
  api.get(RUTA, { params: categoria ? { categoria } : {} }).then((res) => res.data);

export const getProductosTienda = () => getProductos().then((lista) => lista.map(aFormatoTienda));

export const getProductoById = (id) => api.get(`${RUTA}/${id}`).then((res) => res.data);

export const getProductoByCodigo = (codigo) =>
  api.get(`${RUTA}/codigo/${encodeURIComponent(codigo)}`).then((res) => res.data);

export const crearProducto = (producto) => api.post(RUTA, producto).then((res) => res.data);

export const actualizarProducto = (id, producto) => api.put(`${RUTA}/${id}`, producto).then((res) => res.data);

export const eliminarProducto = (id) => api.delete(`${RUTA}/${id}`);
