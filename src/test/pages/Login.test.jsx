// Página: Login (formularios de inicio de sesión y registro)
import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Login from '../../pages/Login'
import { AuthProvider } from '../../contexto/AuthProvider'
import * as authService from '../../services/authService'

// MOCK del servicio: las pruebas no llaman al backend
vi.mock('../../services/authService')

function renderLogin() {
  return render(
    <MemoryRouter initialEntries={['/Login']}>
      <AuthProvider>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/admin" element={<p>Panel admin</p>} />
          <Route path="/Profile" element={<p>Perfil cliente</p>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  )
}

const correoRegistro = () => screen.getByLabelText('Correo Electrónico', { selector: '#register-email' })

describe('Login', () => {
  test('Prueba 9 · el formulario de registro valida los datos y no envía si hay errores', async () => {
    renderLogin()
    await userEvent.type(screen.getByLabelText('RUN'), '123456789')
    await userEvent.type(screen.getByLabelText('Nombre'), 'Ana')
    await userEvent.type(correoRegistro(), 'ana@hotmail.com')
    await userEvent.click(screen.getByRole('button', { name: 'Crear Cuenta' }))

    expect(screen.getByText('El RUN no es válido (revisa el dígito verificador).')).toBeInTheDocument()
    expect(screen.getByLabelText('RUN')).toHaveClass('is-invalid')
    expect(correoRegistro()).toHaveClass('is-invalid')
    expect(authService.registro).not.toHaveBeenCalled()
  })

  test('la comuna depende de la región elegida', async () => {
    renderLogin()
    expect(screen.getByLabelText('Comuna')).toBeDisabled()
    await userEvent.selectOptions(screen.getByLabelText('Región'), 'Región de Los Lagos')

    expect(screen.getByLabelText('Comuna')).toBeEnabled()
    expect(screen.getByRole('option', { name: 'Puerto Montt' })).toBeInTheDocument()
    expect(screen.queryByRole('option', { name: 'Providencia' })).not.toBeInTheDocument()
  })

  test('un ADMIN que inicia sesión es enviado al panel /admin y se guardan los dos tokens', async () => {
    authService.login.mockResolvedValue({
      token: 'acceso.1',
      refreshToken: 'renovacion.1',
      usuario: { id: 1, nombre: 'Administrador', apellidos: 'HuertoHogar', email: 'admin@duoc.cl', rol: 'ADMIN' },
    })
    renderLogin()
    await userEvent.type(screen.getByLabelText('Correo Electrónico', { selector: '#login-email' }), 'admin@duoc.cl')
    await userEvent.type(screen.getByLabelText('Contraseña', { selector: '#login-password' }), 'Admin123')
    await userEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }))

    expect(await screen.findByText('Panel admin')).toBeInTheDocument()
    expect(authService.login).toHaveBeenCalledWith('admin@duoc.cl', 'Admin123')
    expect(localStorage.getItem('token')).toBe('acceso.1')
    expect(localStorage.getItem('refreshToken')).toBe('renovacion.1')
  })
})
