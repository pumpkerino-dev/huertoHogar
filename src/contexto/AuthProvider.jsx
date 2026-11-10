import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./authContext";
import { EVENTO_SESION_EXPIRADA, TOKEN_KEY } from "../api";
import * as authService from "../services/authService";

const USER_KEY = "huertohogar-usuario";

function leerUsuarioGuardado() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
}

/**
 * Guarda quién inició sesión y su rol, y lo comparte con toda la app.
 * El JWT se guarda en localStorage para que la sesión sobreviva un F5,
 * y al cargar se valida contra el backend (/auth/me).
 * Con JWT el backend no guarda sesiones: "cerrar sesión" es simplemente borrar el token.
 */
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leerUsuarioGuardado);
  const [cargando, setCargando] = useState(() => Boolean(localStorage.getItem(TOKEN_KEY)));

  const guardarSesion = useCallback(({ token, usuario: datos }) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(datos));
    setUsuario(datos);
    return datos;
  }, []);

  const limpiarSesion = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUsuario(null);
  }, []);

  // Al abrir la app: si hay token guardado, se confirma con el backend que siga siendo válido
  // y se refrescan los datos (por ejemplo, si un admin le cambió el rol).
  useEffect(() => {
    if (!localStorage.getItem(TOKEN_KEY)) return;
    authService
      .obtenerSesion()
      .then((datos) => {
        localStorage.setItem(USER_KEY, JSON.stringify(datos));
        setUsuario(datos);
      })
      .catch(limpiarSesion)
      .finally(() => setCargando(false));
  }, [limpiarSesion]);

  // Si el JWT expira mientras se usa la app, api.js emite este evento.
  useEffect(() => {
    window.addEventListener(EVENTO_SESION_EXPIRADA, limpiarSesion);
    return () => window.removeEventListener(EVENTO_SESION_EXPIRADA, limpiarSesion);
  }, [limpiarSesion]);

  const iniciarSesion = useCallback(
    async (email, password) => guardarSesion(await authService.login(email, password)),
    [guardarSesion]
  );

  const registrarse = useCallback(
    async (datos) => guardarSesion(await authService.registro(datos)),
    [guardarSesion]
  );

  // Guarda en el backend los cambios del perfil y actualiza el usuario en pantalla
  const actualizarPerfil = useCallback(async (datos) => {
    const actualizado = await authService.actualizarPerfil(datos);
    localStorage.setItem(USER_KEY, JSON.stringify(actualizado));
    setUsuario(actualizado);
    return actualizado;
  }, []);

  const valor = useMemo(
    () => ({
      usuario,
      esAdmin: usuario?.rol === "ADMIN",
      cargando,
      iniciarSesion,
      registrarse,
      cerrarSesion: limpiarSesion,
      actualizarPerfil,
    }),
    [usuario, cargando, iniciarSesion, registrarse, limpiarSesion, actualizarPerfil]
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}
