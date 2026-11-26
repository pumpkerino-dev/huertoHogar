import axios from 'axios';

export const API_URL = 'http://localhost:8089/api/v1';
export const TOKEN_KEY = 'token';
export const REFRESH_KEY = 'refreshToken';
export const EVENTO_SESION_EXPIRADA = 'huertohogar:sesion-expirada';

const api = axios.create({
  baseURL: API_URL,
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

let renovacionEnCurso = null;

function renovarToken() {
  if (!renovacionEnCurso) {
    const refreshToken = localStorage.getItem(REFRESH_KEY);
    renovacionEnCurso = (refreshToken
      ? axios.post(`${API_URL}/auth/refresh`, { refreshToken })
      : Promise.reject(new Error('Sin token de renovación')))
      .then(({ data }) => {
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(REFRESH_KEY, data.refreshToken);
        return data.token;
      })
      .finally(() => {
        renovacionEnCurso = null;
      });
  }
  return renovacionEnCurso;
}

// interceptor de respuestas: si el token de acceso venció (401), se renueva una vez con el refreshToken
// y se repite la petición. Si la renovación también falla, la sesión expiró.
api.interceptors.response.use((response) => response, async (error) => {
  const original = error?.config;
  const conToken = Boolean(original?.headers?.Authorization);
  if (error?.response?.status !== 401 || !conToken || original._reintento) {
    return Promise.reject(error);
  }
  original._reintento = true;
  try {
    const nuevoToken = await renovarToken();
    original.headers.Authorization = `Bearer ${nuevoToken}`;
    return api(original);
  } catch {
    window.dispatchEvent(new Event(EVENTO_SESION_EXPIRADA));
    return Promise.reject(error);
  }
});

export function mensajeDeError(error, porDefecto = 'Ocurrió un error inesperado') {
  const data = error?.response?.data;
  if (data?.mensaje) return data.mensaje;
  if (data?.error) return data.error;
  if (error?.code === 'ERR_NETWORK') return 'No se pudo conectar con el servidor. ¿Está corriendo el backend?';
  return porDefecto;
}

export default api;
