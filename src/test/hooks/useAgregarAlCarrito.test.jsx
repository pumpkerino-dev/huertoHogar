// Custom hook: useAgregarAlCarrito (src/hooks/useAgregarAlCarrito.js)
// Lo usan ProductoCatalogo y OfertasDestac para el botón "Añadir al carrito".
import { describe, test, expect, vi, afterEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useAgregarAlCarrito } from '../../hooks/useAgregarAlCarrito'
import { useCart } from '../../contexto/useCart'
import { CartProvider } from '../../contexto/CartContext.jsx'
import { productosMock } from '../test-utils'

const miel = productosMock[3]

// El hook y el carrito se montan juntos para poder revisar el carrito después
const renderHookConCarrito = () =>
  renderHook(() => ({ boton: useAgregarAlCarrito(miel), carrito: useCart() }), { wrapper: CartProvider })

describe('useAgregarAlCarrito', () => {
  afterEach(() => vi.useRealTimers())

  test('agrega el producto al carrito y marca "added" mientras se muestra "✓ Añadido"', () => {
    const { result } = renderHookConCarrito()
    expect(result.current.boton.added).toBe(false)

    act(() => result.current.boton.handleAddToCart())

    expect(result.current.boton.added).toBe(true)
    expect(result.current.carrito.cart).toHaveLength(1)
    expect(result.current.carrito.subtotal).toBe(5000)
  })

  test('después de un segundo el botón vuelve a su estado normal', () => {
    vi.useFakeTimers() // reloj simulado: no hay que esperar 1 segundo real
    const { result } = renderHookConCarrito()

    act(() => result.current.boton.handleAddToCart())
    act(() => vi.advanceTimersByTime(1000))

    expect(result.current.boton.added).toBe(false)
  })
})
