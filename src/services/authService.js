import api from "../api";

export const login = (email, password) =>
  api.post("/auth/login", { email, password }).then((res) => res.data);

export const registro = (datos) => api.post("/auth/registro", datos).then((res) => res.data);

export const obtenerSesion = () => api.get("/auth/me").then((res) => res.data);

export const actualizarPerfil = (datos) => api.put("/auth/me", datos).then((res) => res.data);

export const solicitarRecuperacion = (email) => api.post("/auth/recuperar", { email }).then((res) => res.data);

export const verificarCodigo = (email, codigo) => api.post("/auth/recuperar/verificar", { email, codigo });

export const restablecerPassword = (email, codigo, password) =>
  api.post("/auth/restablecer", { email, codigo, password });
