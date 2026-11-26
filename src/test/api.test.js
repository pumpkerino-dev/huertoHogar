// Cliente HTTP (src/api.js): renovación automática del token de acceso con el refreshToken
import { describe, test, expect, vi, afterEach } from 'vitest'
import axios, { AxiosError } from 'axios'
import api, { EVENTO_SESION_EXPIRADA, REFRESH_KEY, TOKEN_KEY } from '../api'

const adapterOriginal = api.defaults.adapter

// Respuestas simuladas del backend: no se hace ninguna llamada real
function backendSimulado(responder) {
  const adapter = vi.fn(async (config) => {
    const { status, data } = responder(config, adapter.mock.calls.length)
    const respuesta = { status, data, headers: {}, config, statusText: '' }
    if (status >= 400) throw new AxiosError('Error', 'ERR_BAD_REQUEST', config, null, respuesta)
    return respuesta
  })
  api.defaults.adapter = adapter
  return adapter
}

describe('api.js', () => {
  afterEach(() => {
    api.defaults.adapter = adapterOriginal
    vi.restoreAllMocks()
  })

  test('si el token de acceso venció, lo renueva una vez y repite la petición', async () => {
    localStorage.setItem(TOKEN_KEY, 'acceso-vencido')
    localStorage.setItem(REFRESH_KEY, 'renovacion-1')
    const refresh = vi.spyOn(axios, 'post').mockResolvedValue({ data: { token: 'acceso-nuevo', refreshToken: 'renovacion-2' } })
    const adapter = backendSimulado((config) =>
      config.headers.Authorization === 'Bearer acceso-nuevo' ? { status: 200, data: ['ok'] } : { status: 401, data: {} }
    )

    const respuesta = await api.get('/boletas/mias')

    expect(respuesta.data).toEqual(['ok'])
    expect(refresh).toHaveBeenCalledWith('http://localhost:8089/api/v1/auth/refresh', { refreshToken: 'renovacion-1' })
    expect(adapter).toHaveBeenCalledTimes(2)
    expect(localStorage.getItem(TOKEN_KEY)).toBe('acceso-nuevo')
    expect(localStorage.getItem(REFRESH_KEY)).toBe('renovacion-2')
  })

  test('si la renovación también falla, avisa que la sesión expiró', async () => {
    localStorage.setItem(TOKEN_KEY, 'acceso-vencido')
    localStorage.setItem(REFRESH_KEY, 'renovacion-vencida')
    vi.spyOn(axios, 'post').mockRejectedValue(new Error('401'))
    backendSimulado(() => ({ status: 401, data: {} }))
    const sesionExpirada = vi.fn()
    window.addEventListener(EVENTO_SESION_EXPIRADA, sesionExpirada)

    await expect(api.get('/auth/me')).rejects.toThrow()

    expect(sesionExpirada).toHaveBeenCalledTimes(1)
    window.removeEventListener(EVENTO_SESION_EXPIRADA, sesionExpirada)
  })

  test('un 401 sin token (por ejemplo, contraseña incorrecta en el login) no intenta renovar', async () => {
    const refresh = vi.spyOn(axios, 'post')
    backendSimulado(() => ({ status: 401, data: { mensaje: 'Correo o contraseña incorrectos' } }))

    await expect(api.post('/auth/login', {})).rejects.toThrow()

    expect(refresh).not.toHaveBeenCalled()
  })
})
