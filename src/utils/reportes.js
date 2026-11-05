// Cálculos de reportes a partir de las órdenes y productos.
// Los reutilizan el Dashboard y la página de Reportes del admin.
import { STOCK_BAJO } from './producto';

export function resumenVentas(ordenes) {
  const total = ordenes.reduce((suma, o) => suma + o.total, 0);
  const unidades = ordenes.reduce((suma, o) => suma + o.items.reduce((s, i) => s + i.cantidad, 0), 0);
  return {
    total,
    cantidadOrdenes: ordenes.length,
    ticketPromedio: ordenes.length ? Math.round(total / ordenes.length) : 0,
    unidades,
  };
}

// [{ categoria, total }] de mayor a menor venta
export function ventasPorCategoria(ordenes) {
  const totales = {};
  ordenes.forEach((o) => o.items.forEach((i) => {
    totales[i.categoria] = (totales[i.categoria] ?? 0) + i.precioUnitario * i.cantidad;
  }));
  return Object.entries(totales)
    .map(([categoria, total]) => ({ categoria, total }))
    .sort((a, b) => b.total - a.total);
}

// Los productos más vendidos (por unidades)
export function productosMasVendidos(ordenes, limite = 5) {
  const porProducto = {};
  ordenes.forEach((o) => o.items.forEach((i) => {
    const actual = porProducto[i.codigo] ?? { codigo: i.codigo, nombre: i.nombre, unidades: 0, total: 0 };
    actual.unidades += i.cantidad;
    actual.total += i.precioUnitario * i.cantidad;
    porProducto[i.codigo] = actual;
  }));
  return Object.values(porProducto).sort((a, b) => b.unidades - a.unidades).slice(0, limite);
}

export const productosCriticos = (productos) =>
  productos.filter((p) => p.stock <= STOCK_BAJO).sort((a, b) => a.stock - b.stock);
