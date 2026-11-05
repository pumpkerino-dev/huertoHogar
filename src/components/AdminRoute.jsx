import { Navigate } from "react-router-dom";
import { useAuth } from "../contexto/useAuth";

/**
 * Protege rutas de administración en el frontend.
 * - Sin sesión  -> al login
 * - Sin rol ADMIN -> al inicio
 * (El backend valida lo mismo por su lado; esto solo evita mostrar la pantalla.)
 */
function AdminRoute({ children }) {
  const { usuario, esAdmin, cargando } = useAuth();

  if (cargando) {
    return <p className="text-center my-5">Verificando sesión...</p>;
  }
  if (!usuario) {
    return <Navigate to="/Login" replace />;
  }
  if (!esAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default AdminRoute;
