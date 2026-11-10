import { useListado } from './useListado';
import * as productoService from '../services/productoService';
import * as categoriaService from '../services/categoriaService';

export function useProductos() {
  const { datos, cargando, error } = useListado(productoService.getProductosTienda, 'No se pudieron cargar los productos');
  return { productos: datos, cargando, error };
}

export function useCategorias() {
  const { datos, cargando, error } = useListado(categoriaService.getCategorias, 'No se pudieron cargar las categorías');
  return { categorias: datos, cargando, error };
}
