// Lógica pura: búsqueda y orden de productos (utils/busqueda.js)
import { describe, test, expect } from 'vitest'
import { buscarProductos, normalizarTexto, ordenarPorPrecio } from '../../utils/busqueda'
import { productosMock } from '../test-utils'

describe('utils/busqueda', () => {
  test('normaliza el texto: sin mayúsculas, sin tildes y sin espacios extra', () => {
    expect(normalizarTexto('  Plátanos ÓRGANICOS ')).toBe('platanos organicos')
  })

  test('buscarProductos devuelve los mismos resultados que verán el Header y el Catálogo', () => {
    expect(buscarProductos(productosMock, 'ORGÁNIC').map((p) => p.code)).toEqual(['VR001', 'PO001'])
    expect(buscarProductos(productosMock, '')).toHaveLength(productosMock.length)
  })

  test('ordenarPorPrecio no modifica el arreglo original y desempata por nombre', () => {
    const copia = [...productosMock]
    const menor = ordenarPorPrecio(productosMock, 'menorPrecio').map((p) => p.price)
    expect(menor).toEqual([800, 900, 900, 5000])
    expect(productosMock).toEqual(copia)
  })
})
