// Página: Login (formularios de inicio de sesión y registro)
import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Login from '../../pages/Login'
import { AuthProvider } from '../../contexto/AuthProvider'
import * as authService from '../../services/authService'

// MOCK del servicio: las pruebas no usan la BD emulada ni el backend
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

describe('Login', () => {
  test('Prueba 9 · el formulario de registro valida los datos y no envía si hay errores', async () => {
    renderLogin()
    await userEvent.type(screen.getByLabelText('Nombre Completo'), 'Ana Pérez')
    await userEvent.type(screen.getByLabelText('Correo Electrónico', { selector: '#register-email' }), 'ana-sin-arroba')
    await userEvent.click(screen.getByRole('button', { name: 'Crear Cuenta' }))

    expect(screen.getByText('Ingresa un correo electrónico válido.')).toBeInTheDocument()
    expect(screen.getByLabelText('Correo Electrónico', { selector: '#register-email' })).toHaveClass('is-invalid')
    expect(authService.registro).not.toHaveBeenCalled()
  })

  test('un ADMIN que inicia sesión es enviado al panel /admin', async () => {
    authService.login.mockResolvedValue({
      token: 'mock.1',
      usuario: { id: 1, nombre: 'Administrador HuertoHogar', email: 'admin@huertohogar.cl', rol: 'ADMIN' },
    })
    renderLogin()
    await userEvent.type(screen.getByLabelText('Correo Electrónico', { selector: '#login-email' }), 'admin@huertohogar.cl')
    await userEvent.type(screen.getByLabelText('Contraseña', { selector: '#login-password' }), 'Admin123')
    await userEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }))

    expect(await screen.findByText('Panel admin')).toBeInTheDocument()
    expect(authService.login).toHaveBeenCalledWith('admin@huertohogar.cl', 'Admin123')
  })
})
