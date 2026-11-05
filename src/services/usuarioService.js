import api from "../api";

const RUTA = "/usuarios";

export const getUsuarios = () => api.get(RUTA).then((res) => res.data);

export const crearUsuario = (usuario) => api.post(RUTA, usuario).then((res) => res.data);

export const actualizarUsuario = (id, usuario) => api.put(`${RUTA}/${id}`, usuario).then((res) => res.data);

export const eliminarUsuario = (id) => api.delete(`${RUTA}/${id}`);
