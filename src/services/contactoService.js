import api from "../api";

const RUTA = "/contacto";

export const enviarMensaje = (datos) => api.post(RUTA, datos).then((res) => res.data);

export const getMensajes = () => api.get(RUTA).then((res) => res.data);
