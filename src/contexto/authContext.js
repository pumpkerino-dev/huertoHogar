import { createContext } from "react";

// Contexto de autenticación: { usuario, esAdmin, esVendedor, esPersonal, cargando, iniciarSesion, registrarse, cerrarSesion }
export const AuthContext = createContext(null);
