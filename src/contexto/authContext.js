import { createContext } from "react";

// Contexto de autenticación: { usuario, esAdmin, cargando, iniciarSesion, registrarse, cerrarSesion }
export const AuthContext = createContext(null);
