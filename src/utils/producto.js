// Constantes y funciones de productos compartidas entre componentes.

// Productos con este stock o menos se marcan como "stock bajo"
export const STOCK_BAJO = 10;

// 1200 -> "$1.200"
export const formatoCLP = (valor) => "$" + Number(valor ?? 0).toLocaleString("es-CL");

// "2026-10-28T10:15:00" -> "28-10-2026, 10:15"
export const formatoFecha = (fecha) =>
  new Date(fecha).toLocaleString("es-CL", { dateStyle: "short", timeStyle: "short" });

// Nombre visible de una categoría a partir de su id ("frutas" -> "Frutas Frescas")
export const nombreCategoria = (categorias, id) => categorias.find((c) => c.id === id)?.nombre ?? id;

const esEnteroNoNegativo = (v) => v !== "" && Number.isInteger(Number(v)) && Number(v) >= 0;

// Valida un producto antes de enviarlo al backend. Devuelve { campo: mensaje }.
export function validarProducto(p) {
  const errores = {};
  if (!p.codigo.trim()) errores.codigo = "El código es obligatorio";
  else if (!/^[A-Z]{2}\d{3}$/.test(p.codigo.trim().toUpperCase()))
    errores.codigo = "Formato: 2 letras + 3 números (ej: FR001)";
  if (!p.nombre.trim()) errores.nombre = "El nombre es obligatorio";
  if (!esEnteroNoNegativo(p.precio)) errores.precio = "Ingresa un precio entero mayor o igual a 0";
  if (!esEnteroNoNegativo(p.stock)) errores.stock = "Ingresa un stock entero mayor o igual a 0";
  // Oferta: el precio original (antes de la oferta) es opcional, pero si existe debe ser mayor
  if (p.precioOriginal !== "" && p.precioOriginal != null) {
    if (!esEnteroNoNegativo(p.precioOriginal)) errores.precioOriginal = "Ingresa un precio entero";
    else if (Number(p.precioOriginal) <= Number(p.precio))
      errores.precioOriginal = "Debe ser mayor que el precio de oferta";
  }
  return errores;
}

// Nombre corto para el filtro del catálogo, igual al que usaba la tienda:
// "Frutas Frescas" -> "Frutas", "Productos Lácteos" -> "Lácteos", "Hierbas Aromáticas" -> "Hierbas"
export const nombreCortoCategoria = (nombre) =>
  String(nombre ?? "").replace(/^Productos\s+/i, "").split(" ")[0];
