// Servicio de órdenes: validación del carrito y llamada al backend (src/services/ordenService.js)
import { describe, test, expect, vi } from 'vitest'
import api from '../api'
import { crearOrden, validarCarrito } from './ordenService'
import { itemCarritoMock, productosMock } from '../test-utils'

// MOCK de api.js: las pruebas no llaman al backend real
vi.mock('../api', () => ({ default: { post: vi.fn() } }))

describe('ordenService', () => {
  test('validarCarrito detecta carrito vacío, cantidades inválidas y stock insuficiente antes de pagar', () => {
    expect(validarCarrito([], productosMock)).toEqual(['El carrito está vacío.'])
    expect(validarCarrito([{ ...itemCarritoMock, quantity: 0 }], productosMock)[0]).toMatch('no es válida')
    expect(validarCarrito([{ ...itemCarritoMock, quantity: 999 }], productosMock)[0]).toMatch('Solo quedan 50')
    expect(validarCarrito([itemCarritoMock], productosMock)).toEqual([])
  })

  test('crearOrden envía al backend solo el código y la cantidad de cada producto', async () => {
    api.post.mockResolvedValue({ data: { id: 'HH-1', total: 10000 } })

    const orden = await crearOrden([itemCarritoMock], { fechaEntrega: '2026-11-10' })

    expect(api.post).toHaveBeenCalledWith('/ordenes', {
      items: [{ codigo: 'PO001', cantidad: 2 }],
      fechaEntrega: '2026-11-10',
      simularFallo: false,
    })
    expect(orden.total).toBe(10000)
  })
})
