// Componente: ProductoCatalogo (tarjeta de producto del catálogo)
import { describe, test, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductoCatalogo from '../../components/ProductoCatalogo'
import { useCart } from '../../contexto/useCart'
import { renderConProveedores, productosMock } from '../test-utils'

// Componente auxiliar que muestra el estado del carrito, para verificar el efecto del click
function EstadoCarrito() {
  const { cart, subtotal } = useCart()
  return <p data-testid="estado-carrito">{cart.length} productos · subtotal {subtotal}</p>
}

const manzanas = productosMock[0] // en oferta: 900 (antes 1200)

describe('ProductoCatalogo', () => {
  test('Prueba 1 · renderiza nombre, descripción, precio de oferta y precio original', () => {
    renderConProveedores(<ProductoCatalogo product={manzanas} />)

    expect(screen.getByRole('heading', { name: 'Manzanas Fuji' })).toBeInTheDocument()
    expect(screen.getByText('Manzanas crujientes')).toBeInTheDocument()
    expect(screen.getByText('$900')).toBeInTheDocument()   // precio con oferta
    expect(screen.getByText('$1.200')).toBeInTheDocument() // precio anterior
    expect(screen.getAllByRole('link')[0]).toHaveAttribute('href', '/Product/FR001')
  })

  test('Prueba 6 · al dar click en "Añadir al carrito" el producto se agrega al carrito', async () => {
    renderConProveedores(<><ProductoCatalogo product={manzanas} /><EstadoCarrito /></>)
    expect(screen.getByTestId('estado-carrito')).toHaveTextContent('0 productos')

    await userEvent.click(screen.getByRole('button', { name: 'Añadir al carrito' }))

    expect(screen.getByTestId('estado-carrito')).toHaveTextContent('1 productos · subtotal 900')
    expect(screen.getByRole('button', { name: '✓ Añadido' })).toBeDisabled() // evita doble click
  })
})
