import api from "../api";

const RUTA = "/categorias";

export const getCategorias = () => api.get(RUTA).then((res) => res.data);

export const crearCategoria = (datos) => api.post(RUTA, datos).then((res) => res.data);

export const actualizarCategoria = (id, datos) => api.put(`${RUTA}/${id}`, datos).then((res) => res.data);
