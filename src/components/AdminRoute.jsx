import { Navigate } from "react-router-dom";
import { useAuth } from "../contexto/useAuth";

/**
 * Protege rutas del panel en el frontend.
 * - Sin sesión -> al login
 * - CLIENTE -> al inicio
 * - VENDEDOR en una página solo para ADMIN (soloAdmin) -> a productos, que es lo que sí puede ver
 * (El backend valida lo mismo por su lado; esto solo evita mostrar la pantalla.)
 */
function AdminRoute({ children, soloAdmin = false }) {
  const { usuario, esAdmin, esPersonal, cargando } = useAuth();

  if (cargando) {
    return <p className="text-center my-5">Verificando sesión...</p>;
  }
  if (!usuario) {
    return <Navigate to="/Login" replace />;
  }
  if (!esPersonal) {
    return <Navigate to="/" replace />;
  }
  if (soloAdmin && !esAdmin) {
    return <Navigate to="/admin/productos" replace />;
  }
  return children;
}

export default AdminRoute;
