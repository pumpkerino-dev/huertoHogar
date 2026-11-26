// Página: Recuperar contraseña (correo -> código -> nueva contraseña)
import { describe, test, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RecuperarContrasena from '../../pages/RecuperarContrasena'
import * as authService from '../../services/authService'
import { renderConProveedores } from '../test-utils'

vi.mock('../../services/authService')

describe('RecuperarContrasena', () => {
  test('recorre los tres pasos y guarda la nueva contraseña en el backend', async () => {
    authService.solicitarRecuperacion.mockResolvedValue({ mensaje: 'ok', codigoDemo: '482913' })
    authService.verificarCodigo.mockResolvedValue({})
    authService.restablecerPassword.mockResolvedValue({})
    renderConProveedores(<RecuperarContrasena />, { ruta: '/RecuperarContrasena' })

    await userEvent.type(screen.getByLabelText('Correo Electrónico'), 'cliente@gmail.com')
    await userEvent.click(screen.getByRole('button', { name: 'Enviar Código' }))
    expect(await screen.findByTestId('codigo-demo')).toHaveTextContent('482913')

    await userEvent.type(screen.getByLabelText('Código de Verificación'), '482913')
    await userEvent.click(screen.getByRole('button', { name: 'Verificar Código' }))
    await userEvent.type(await screen.findByLabelText('Nueva Contraseña'), 'Nueva1234')
    await userEvent.type(screen.getByLabelText('Confirmar Contraseña'), 'Nueva1234')
    await userEvent.click(screen.getByRole('button', { name: 'Guardar Nueva Contraseña' }))

    expect(await screen.findByText('¡Contraseña Actualizada!')).toBeInTheDocument()
    expect(authService.restablecerPassword).toHaveBeenCalledWith('cliente@gmail.com', '482913', 'Nueva1234')
  })

  test('no pide el código si el correo no es de un dominio permitido', async () => {
    renderConProveedores(<RecuperarContrasena />, { ruta: '/RecuperarContrasena' })
    await userEvent.type(screen.getByLabelText('Correo Electrónico'), 'ana@hotmail.com')
    await userEvent.click(screen.getByRole('button', { name: 'Enviar Código' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.')
    expect(authService.solicitarRecuperacion).not.toHaveBeenCalled()
  })

  test('muestra el error del backend si el código es incorrecto y no avanza', async () => {
    authService.solicitarRecuperacion.mockResolvedValue({ mensaje: 'ok', codigoDemo: '482913' })
    const rechazo = new Error('400')
    rechazo.response = { data: { mensaje: 'El código es incorrecto o ya venció. Pide uno nuevo' } }
    authService.verificarCodigo.mockRejectedValue(rechazo)
    renderConProveedores(<RecuperarContrasena />, { ruta: '/RecuperarContrasena' })

    await userEvent.type(screen.getByLabelText('Correo Electrónico'), 'cliente@gmail.com')
    await userEvent.click(screen.getByRole('button', { name: 'Enviar Código' }))
    await userEvent.type(await screen.findByLabelText('Código de Verificación'), '111111')
    await userEvent.click(screen.getByRole('button', { name: 'Verificar Código' }))

    expect(await screen.findByText('El código es incorrecto o ya venció. Pide uno nuevo')).toBeInTheDocument()
    expect(screen.queryByLabelText('Nueva Contraseña')).not.toBeInTheDocument()
  })
})
