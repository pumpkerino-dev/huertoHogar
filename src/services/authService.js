import api from "../api";

export const login = (email, password) =>
  api.post("/auth/login", { email, password }).then((res) => res.data);

export const registro = (datos) => api.post("/auth/registro", datos).then((res) => res.data);

export const obtenerSesion = () => api.get("/auth/me").then((res) => res.data);

export const actualizarPerfil = (datos) => api.put("/auth/me", datos).then((res) => res.data);
