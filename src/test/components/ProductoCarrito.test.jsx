// Componente: ProductoCarrito (fila del carrito con cantidad, total y eliminar)
import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductoCarrito from '../../components/ProductoCarrito'
import { useCart } from '../../contexto/useCart'
import { renderConProveedores, itemCarritoMock } from '../test-utils'

// Dibuja el carrito real (CartContext) para ver cómo cambia al hacer click
function ListaCarrito() {
  const { cart, subtotal } = useCart()
  return (
    <>
      {cart.map((item) => <ProductoCarrito key={item.id} item={item} />)}
      <p data-testid="subtotal">{subtotal}</p>
      {cart.length === 0 && <p>Carrito vacío</p>}
    </>
  )
}

describe('ProductoCarrito', () => {
  test('Prueba 7 · los botones + y - modifican la cantidad y recalculan el subtotal', async () => {
    renderConProveedores(<ListaCarrito />, { carrito: [itemCarritoMock] }) // 2 frascos x $5.000
    expect(screen.getByTestId('subtotal')).toHaveTextContent('10000')

    await userEvent.click(screen.getByRole('button', { name: 'Aumentar cantidad de Miel Orgánica' }))
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByTestId('subtotal')).toHaveTextContent('15000')

    await userEvent.click(screen.getByRole('button', { name: 'Disminuir cantidad de Miel Orgánica' }))
    await userEvent.click(screen.getByRole('button', { name: 'Disminuir cantidad de Miel Orgánica' }))
    expect(screen.getByText('1')).toBeInTheDocument()
    // No permite bajar de 1 (cantidad inválida)
    expect(screen.getByRole('button', { name: 'Disminuir cantidad de Miel Orgánica' })).toBeDisabled()
  })

  test('Prueba 8 · el botón "Eliminar" quita el producto del carrito', async () => {
    renderConProveedores(<ListaCarrito />, { carrito: [itemCarritoMock] })

    await userEvent.click(screen.getByRole('button', { name: 'Eliminar' }))

    expect(screen.queryByText('Miel Orgánica')).not.toBeInTheDocument()
    expect(screen.getByText('Carrito vacío')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('huertohogar-cart'))).toEqual([])
  })
})
