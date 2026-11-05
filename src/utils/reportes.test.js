// Lógica pura: reportes del admin (utils/reportes.js), usados por Dashboard y Reportes
import { describe, test, expect } from 'vitest'
import { productosCriticos, productosMasVendidos, resumenVentas, ventasPorCategoria } from './reportes'
import { ordenesMock as ordenesIniciales } from '../test-utils'

describe('utils/reportes', () => {
  test('resumenVentas suma total, órdenes, ticket promedio y unidades', () => {
    // HH-1001 = 6.800 (3 unidades) · HH-1002 = 4.250 (5 unidades)
    expect(resumenVentas(ordenesIniciales)).toEqual({ total: 11050, cantidadOrdenes: 2, ticketPromedio: 5525, unidades: 8 })
    expect(resumenVentas([]).ticketPromedio).toBe(0) // sin órdenes no divide por cero
  })

  test('ventas por categoría y productos más vendidos quedan ordenados de mayor a menor', () => {
    expect(ventasPorCategoria(ordenesIniciales)[0]).toEqual({ categoria: 'organicos', total: 5000 })
    expect(productosMasVendidos(ordenesIniciales, 1)).toEqual([{ codigo: 'PL001', nombre: 'Leche Entera', unidades: 3, total: 2850 }])
  })

  test('productosCriticos devuelve solo los de stock bajo, del más urgente al menos urgente', () => {
    const productos = [{ id: 'A', stock: 50 }, { id: 'B', stock: 8 }, { id: 'C', stock: 2 }]
    expect(productosCriticos(productos).map((p) => p.id)).toEqual(['C', 'B'])
  })
})
