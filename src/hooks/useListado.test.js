// Custom hook: useListado (src/hooks/useListado.js)
// Los hooks no se pueden ejecutar fuera de un componente: renderHook los monta en uno de prueba.
// Toda acción que cambia el estado del hook va dentro de act(), para que React termine de
// actualizar antes de revisar el resultado. Siempre se lee result.current (el valor más nuevo).
import { describe, test, expect, vi } from 'vitest'
import { act, renderHook, waitFor } from '@testing-library/react'
import { useListado } from './useListado'

describe('useListado', () => {
  test('parte cargando y luego entrega los datos del servicio', async () => {
    const cargar = vi.fn().mockResolvedValue(['Manzanas', 'Miel'])
    const { result } = renderHook(() => useListado(cargar))

    expect(result.current.cargando).toBe(true)
    await waitFor(() => expect(result.current.cargando).toBe(false))
    expect(result.current.datos).toEqual(['Manzanas', 'Miel'])
    expect(result.current.error).toBe('')
  })

  test('si el servicio falla, entrega el mensaje de error y la lista vacía', async () => {
    const falla = Object.assign(new Error('500'), { response: { data: { mensaje: 'Servidor caído' } } })
    const cargar = vi.fn().mockRejectedValue(falla)
    const { result } = renderHook(() => useListado(cargar))

    await waitFor(() => expect(result.current.error).toBe('Servidor caído'))
    expect(result.current.datos).toEqual([])
  })

  test('recargar() vuelve a pedir los datos (por ejemplo, después de crear un producto)', async () => {
    const cargar = vi.fn().mockResolvedValueOnce(['Manzanas']).mockResolvedValueOnce(['Manzanas', 'Frutillas'])
    const { result } = renderHook(() => useListado(cargar))
    await waitFor(() => expect(result.current.datos).toEqual(['Manzanas']))

    await act(async () => {
      await result.current.recargar()
    })

    expect(result.current.datos).toEqual(['Manzanas', 'Frutillas'])
    expect(cargar).toHaveBeenCalledTimes(2)
  })

  test('limpieza: si cambia el servicio, una respuesta vieja que llega tarde no pisa los datos nuevos', async () => {
    // Pasa en Mi Cuenta: los pedidos se vuelven a pedir cuando cambia el usuario.
    let responderVieja
    const peticionVieja = vi.fn(() => new Promise((resolve) => { responderVieja = resolve }))
    const peticionNueva = vi.fn().mockResolvedValue(['Pedidos de María'])
    const { result, rerender } = renderHook(({ cargar }) => useListado(cargar), {
      initialProps: { cargar: peticionVieja },
    })

    rerender({ cargar: peticionNueva }) // cambia el servicio antes de que responda el primero
    await waitFor(() => expect(result.current.datos).toEqual(['Pedidos de María']))

    await act(async () => responderVieja(['Pedidos del usuario anterior'])) // llega tarde

    expect(result.current.datos).toEqual(['Pedidos de María']) // la limpieza la ignoró
  })
})
