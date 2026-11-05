// Página: Checkout (compra exitosa y compra fallida)
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Checkout from './Checkout'
import * as ordenService from '../services/ordenService'
import { renderConProveedores, itemCarritoMock, ordenMock } from '../test-utils'

// MOCK del servicio de órdenes: respuestas controladas (éxito o rechazo) sin llamar al backend
vi.mock('../services/ordenService')
vi.mock('../hooks/useCatalogo', () => ({
  useProductos: () => ({ productos: [], cargando: false, error: '' }),
}))

const carritoGuardado = () => JSON.parse(localStorage.getItem('huertohogar-cart'))

describe('Checkout', () => {
  beforeEach(() => {
    ordenService.validarCarrito.mockReturnValue([]) // el carrito es válido
  })

  test('Prueba 10a · compra exitosa: muestra la confirmación, la boleta y vacía el carrito', async () => {
    ordenService.crearOrden.mockResolvedValue(ordenMock)
    renderConProveedores(<Checkout />, { ruta: '/Checkout', carrito: [itemCarritoMock] })
    expect(screen.getByTestId('checkout-total')).toHaveTextContent('$10.000 CLP')

    await userEvent.click(screen.getByRole('button', { name: 'Simular compra válida' }))

    expect(await screen.findByText('✓ Compra exitosa')).toBeInTheDocument()
    expect(screen.getByTestId('boleta-total')).toHaveTextContent('$10.000')
    expect(ordenService.crearOrden).toHaveBeenCalledWith(
      [expect.objectContaining({ id: 'PO001', quantity: 2 })], expect.objectContaining({ simularFallo: false })
    )
    expect(carritoGuardado()).toEqual([])
  })

  test('Prueba 10b · compra fallida: muestra un error claro y conserva el carrito', async () => {
    const rechazo = new Error('Pago rechazado')
    rechazo.response = { data: { mensaje: 'El pago fue rechazado por el medio de pago.' } }
    ordenService.crearOrden.mockRejectedValue(rechazo)
    renderConProveedores(<Checkout />, { ruta: '/Checkout', carrito: [itemCarritoMock] })

    await userEvent.click(screen.getByRole('button', { name: 'Simular compra fallida' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('El pago fue rechazado por el medio de pago.')
    expect(screen.queryByText('✓ Compra exitosa')).not.toBeInTheDocument()
    expect(carritoGuardado()).toHaveLength(1) // el producto sigue en el carrito
    expect(screen.getByRole('button', { name: 'Intentar nuevamente' })).toBeEnabled()
  })
})
