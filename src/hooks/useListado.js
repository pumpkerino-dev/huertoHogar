import { useCallback, useEffect, useState } from 'react';
import { mensajeDeError } from '../api';

/**
 * Custom hook: carga una lista desde un servicio y maneja "cargando" y errores.
 * Cumple el mismo papel que el useFetch del tutorial de hooks, pero llamando a los
 * servicios del proyecto (BD emulada o backend). Lo reutilizan todas las páginas del admin:
 *
 *   const { datos: productos, cargando, error, recargar } = useListado(productoService.getProductos);
 *
 * Igual que useFetch, el useEffect tiene una FUNCIÓN DE LIMPIEZA. Si el servicio cambia
 * mientras una petición anterior sigue pendiente (en Mi Cuenta, los pedidos se vuelven a
 * pedir cuando cambia el usuario), la respuesta vieja que llega tarde se ignora y no pisa
 * los datos nuevos. También se ignora si el componente ya se desmontó.
 * (useFetch usa AbortController porque llama a fetch; aquí se usa una bandera "montado".)
 */
export function useListado(cargarDatos, mensajeError = 'No se pudieron cargar los datos') {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // sigueMontado() indica si todavía hay que guardar la respuesta
  const ejecutar = useCallback(
    (sigueMontado = () => true) =>
      cargarDatos()
        .then((resultado) => {
          if (sigueMontado()) {
            setDatos(resultado);
            setError('');
          }
          return resultado;
        })
        .catch((err) => {
          if (sigueMontado()) setError(mensajeDeError(err, mensajeError));
        })
        .finally(() => {
          if (sigueMontado()) setCargando(false);
        }),
    [cargarDatos, mensajeError]
  );

  useEffect(() => {
    let montado = true;
    ejecutar(() => montado);
    return () => {
      montado = false; // función de limpieza
    };
  }, [ejecutar]);

  // Para volver a pedir la lista después de crear, editar o eliminar
  const recargar = useCallback(() => ejecutar(), [ejecutar]);

  return { datos, cargando, error, setError, recargar };
}
