// Cálculos de reportes a partir de las órdenes y productos.
// Los reutilizan el Dashboard y la página de Reportes del admin.
// Las órdenes canceladas no cuentan como venta.

const vendidas = (ordenes) => ordenes.filter((o) => o.estado !== 'CANCELADA');

export function resumenVentas(ordenes) {
  const validas = vendidas(ordenes);
  const total = validas.reduce((suma, o) => suma + o.total, 0);
  const unidades = validas.reduce((suma, o) => suma + o.items.reduce((s, i) => s + i.cantidad, 0), 0);
  return {
    total,
    cantidadOrdenes: validas.length,
    ticketPromedio: validas.length ? Math.round(total / validas.length) : 0,
    unidades,
  };
}

// [{ categoria, total }] de mayor a menor venta
export function ventasPorCategoria(ordenes) {
  const totales = {};
  vendidas(ordenes).forEach((o) => o.items.forEach((i) => {
    totales[i.categoria] = (totales[i.categoria] ?? 0) + i.precioUnitario * i.cantidad;
  }));
  return Object.entries(totales)
    .map(([categoria, total]) => ({ categoria, total }))
    .sort((a, b) => b.total - a.total);
}

// Los productos más vendidos (por unidades)
export function productosMasVendidos(ordenes, limite = 5) {
  const porProducto = {};
  vendidas(ordenes).forEach((o) => o.items.forEach((i) => {
    const actual = porProducto[i.codigo] ?? { codigo: i.codigo, nombre: i.nombre, unidades: 0, total: 0 };
    actual.unidades += i.cantidad;
    actual.total += i.precioUnitario * i.cantidad;
    porProducto[i.codigo] = actual;
  }));
  return Object.values(porProducto).sort((a, b) => b.unidades - a.unidades).slice(0, limite);
}

// Productos con stock igual o menor a su stock crítico (el backend lo marca en "critico")
export const productosCriticos = (productos) =>
  productos.filter((p) => p.critico).sort((a, b) => a.stock - b.stock);
