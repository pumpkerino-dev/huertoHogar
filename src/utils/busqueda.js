// ============================================================
// BÚSQUEDA Y ORDEN DE PRODUCTOS (lógica compartida)
// La usan el Header (sugerencias mientras se escribe) y el Catálogo (resultados
// al presionar Enter o al escribir estando en el catálogo). Como ambos usan
// la MISMA función, siempre muestran los mismos productos.
// ============================================================

// "Plátanos" -> "platanos" (sin mayúsculas ni tildes)
export const normalizarTexto = (texto) =>
  String(texto ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

export function coincideBusqueda(producto, termino) {
  const buscado = normalizarTexto(termino);
  return !buscado || normalizarTexto(producto.name).includes(buscado);
}

export const buscarProductos = (productos, termino) =>
  productos.filter((producto) => coincideBusqueda(producto, termino));

// Orden por precio. Si dos productos cuestan lo mismo, se ordenan por nombre
// para que el resultado sea siempre el mismo (no queda "a la suerte").
export function ordenarPorPrecio(productos, criterio) {
  const lista = [...productos];
  const porNombre = (a, b) => a.name.localeCompare(b.name, 'es');
  if (criterio === 'menorPrecio') lista.sort((a, b) => a.price - b.price || porNombre(a, b));
  if (criterio === 'mayorPrecio') lista.sort((a, b) => b.price - a.price || porNombre(a, b));
  return lista;
}
