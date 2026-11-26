// Página: Checkout (datos de envío, compra exitosa y compra fallida)
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Checkout from '../../pages/Checkout'
import CompraExitosa from '../../pages/CompraExitosa'
import CompraError from '../../pages/CompraError'
import { AuthContext } from '../../contexto/authContext'
import { CartProvider } from '../../contexto/CartContext.jsx'
import * as ordenService from '../../services/ordenService'
import { clienteMock, itemCarritoMock, ordenMock, sesionDe } from '../test-utils'

// MOCK del servicio de órdenes: respuestas controladas (éxito o rechazo) sin llamar al backend
vi.mock('../../services/ordenService', async (original) => ({
  ...(await original()),
  crearOrden: vi.fn(),
  validarCarrito: vi.fn(),
}))
vi.mock('../../hooks/useCatalogo', () => ({
  useProductos: () => ({ productos: [], cargando: false, error: '' }),
}))

const carritoGuardado = () => JSON.parse(localStorage.getItem('huertohogar-cart'))

function renderCheckout(usuario = clienteMock) {
  localStorage.setItem('huertohogar-cart', JSON.stringify([itemCarritoMock]))
  return render(
    <AuthContext.Provider value={sesionDe(usuario)}>
      <CartProvider>
        <MemoryRouter initialEntries={['/Checkout']}>
          <Routes>
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/CompraExitosa" element={<CompraExitosa />} />
            <Route path="/CompraError" element={<CompraError />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    </AuthContext.Provider>
  )
}

describe('Checkout', () => {
  beforeEach(() => {
    ordenService.validarCarrito.mockReturnValue([]) // el carrito es válido
  })

  test('con sesión iniciada, los datos de envío se completan con los del usuario', () => {
    renderCheckout()
    expect(screen.getByLabelText('Nombre')).toHaveValue('María')
    expect(screen.getByLabelText('Correo')).toHaveValue('cliente@gmail.com')
    expect(screen.getByLabelText('Calle y número')).toHaveValue('Av. Providencia 1245')
    expect(screen.getByLabelText('Comuna')).toHaveValue('Providencia')
  })

  test('sin datos de envío no se llama al backend y se marcan los campos', async () => {
    renderCheckout(null)
    await userEvent.click(screen.getByRole('button', { name: 'Simular compra válida' }))

    expect(screen.getByText('Revisa los datos de envío marcados en rojo.')).toBeInTheDocument()
    expect(screen.getByLabelText('Calle y número')).toHaveClass('is-invalid')
    expect(ordenService.crearOrden).not.toHaveBeenCalled()
  })

  test('Prueba 10a · compra exitosa: muestra la confirmación, la boleta y vacía el carrito', async () => {
    ordenService.crearOrden.mockResolvedValue(ordenMock)
    renderCheckout()
    expect(screen.getByTestId('checkout-total')).toHaveTextContent('$10.000 CLP')

    await userEvent.click(screen.getByRole('button', { name: 'Simular compra válida' }))

    expect(await screen.findByText('✓ Compra exitosa')).toBeInTheDocument()
    expect(screen.getByText('HH-TEST-1', { selector: 'strong' })).toBeInTheDocument()
    expect(screen.getByTestId('boleta-total')).toHaveTextContent('$10.000')
    expect(ordenService.crearOrden).toHaveBeenCalledWith(
      [expect.objectContaining({ id: 'PO001', quantity: 2 })],
      expect.objectContaining({ simularFallo: false, envio: expect.objectContaining({ correo: 'cliente@gmail.com' }) })
    )
    expect(carritoGuardado()).toEqual([])
  })

  test('Prueba 10b · compra fallida: muestra la página de error y conserva el carrito', async () => {
    const rechazo = new Error('Pago rechazado')
    rechazo.response = { data: { mensaje: 'El pago fue rechazado por el medio de pago.' } }
    ordenService.crearOrden.mockRejectedValue(rechazo)
    renderCheckout()

    await userEvent.click(screen.getByRole('button', { name: 'Simular compra fallida' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('El pago fue rechazado por el medio de pago.')
    expect(screen.queryByText('✓ Compra exitosa')).not.toBeInTheDocument()
    expect(carritoGuardado()).toHaveLength(1) // el producto sigue en el carrito
    expect(screen.getByRole('link', { name: 'Volver a realizar el pago' })).toBeInTheDocument()
  })
})
