// Custom hook: useCart (src/contexto/useCart.js) junto a su proveedor CartProvider.
// renderHook recibe "wrapper" para envolver el hook en el proveedor, igual que en la app.
import { describe, test, expect, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useCart } from './useCart'
import { CartProvider } from './CartContext.jsx'
import { productosMock } from '../test-utils'

const miel = productosMock[3] // $5.000, stock 50
const platanos = productosMock[2] // $800, stock 250
const renderCarrito = () => renderHook(() => useCart(), { wrapper: CartProvider })

describe('useCart', () => {
  test('agrega productos, suma cantidades del mismo producto y calcula el subtotal', () => {
    const { result } = renderCarrito()

    act(() => {
      result.current.addToCart(miel, 2)
      result.current.addToCart(platanos, 1)
      result.current.addToCart(miel, 1)
    })

    expect(result.current.cart).toHaveLength(2)
    expect(result.current.cart.find((i) => i.id === 'PO001').quantity).toBe(3)
    expect(result.current.subtotal).toBe(3 * 5000 + 800)
  })

  test('no deja superar el stock ni aceptar cantidades inválidas', () => {
    const { result } = renderCarrito()

    act(() => result.current.addToCart(miel, 80)) // pide 80, hay 50
    expect(result.current.cart[0].quantity).toBe(50)

    act(() => {
      result.current.updateQuantity('PO001', 0)
      result.current.updateQuantity('PO001', -3)
    })
    expect(result.current.cart[0].quantity).toBe(50) // se ignoraron

    act(() => result.current.clearCart())
    expect(result.current.cart).toEqual([])
  })

  test('avisa con un error si se usa fuera de CartProvider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {}) // React registra el error en consola
    expect(() => renderHook(() => useCart())).toThrow('useCart debe utilizarse dentro de CartProvider.')
  })
})
