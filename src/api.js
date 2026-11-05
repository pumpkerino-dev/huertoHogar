import axios from 'axios';

export const TOKEN_KEY = 'token';
export const EVENTO_SESION_EXPIRADA = 'huertohogar:sesion-expirada';

const api = axios.create({
  baseURL: 'http://localhost:8089/api/v1',
});

// interceptor permite interceptar las llamadas antes que se envien al servidor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// interceptor de respuestas: si el backend responde 401 a una petición con token, la sesión expiró
api.interceptors.response.use((response) => response, (error) => {
  if (error?.response?.status === 401 && error?.config?.headers?.Authorization) {
    window.dispatchEvent(new Event(EVENTO_SESION_EXPIRADA));
  }
  return Promise.reject(error);
});

export function mensajeDeError(error, porDefecto = 'Ocurrió un error inesperado') {
  const data = error?.response?.data;
  if (data?.mensaje) return data.mensaje;
  if (data?.error) return data.error;
  if (error?.code === 'ERR_NETWORK') return 'No se pudo conectar con el servidor. ¿Está corriendo el backend?';
  return porDefecto;
}

export default api;
