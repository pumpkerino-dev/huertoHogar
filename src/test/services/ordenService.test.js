// Servicio de órdenes: validación del carrito y llamadas al backend (src/services/ordenService.js)
import { describe, test, expect, vi } from 'vitest'
import api from '../../api'
import { cambiarEstado, crearOrden, infoEstado, validarCarrito } from '../../services/ordenService'
import { envioMock, itemCarritoMock, productosMock } from '../test-utils'

// MOCK de api.js: las pruebas no llaman al backend real
vi.mock('../../api', () => ({ default: { post: vi.fn(), patch: vi.fn() } }))

describe('ordenService', () => {
  test('validarCarrito detecta carrito vacío, cantidades inválidas y stock insuficiente antes de pagar', () => {
    expect(validarCarrito([], productosMock)).toEqual(['El carrito está vacío.'])
    expect(validarCarrito([{ ...itemCarritoMock, quantity: 0 }], productosMock)[0]).toMatch('no es válida')
    expect(validarCarrito([{ ...itemCarritoMock, quantity: 999 }], productosMock)[0]).toMatch('Solo quedan 50')
    expect(validarCarrito([itemCarritoMock], productosMock)).toEqual([])
  })

  test('crearOrden envía a /boletas el código y la cantidad de cada producto junto con los datos de envío', async () => {
    api.post.mockResolvedValue({ data: { id: 1, numero: 'HH-1', total: 10000 } })

    const orden = await crearOrden([itemCarritoMock], { envio: envioMock, fechaEntrega: '2026-11-10' })

    expect(api.post).toHaveBeenCalledWith('/boletas', {
      items: [{ codigo: 'PO001', cantidad: 2 }],
      envio: envioMock,
      fechaEntrega: '2026-11-10',
      simularFallo: false,
    })
    expect(orden.total).toBe(10000)
  })

  test('cambiarEstado usa PATCH /boletas/{id}/estado y los estados tienen un texto para mostrar', async () => {
    api.patch.mockResolvedValue({ data: { id: 1, estado: 'EN_CAMINO' } })

    await cambiarEstado(1, 'EN_CAMINO')

    expect(api.patch).toHaveBeenCalledWith('/boletas/1/estado', { estado: 'EN_CAMINO' })
    expect(infoEstado('EN_CAMINO').texto).toBe('En camino')
    expect(infoEstado('CANCELADA').texto).toBe('Cancelado')
  })
})
