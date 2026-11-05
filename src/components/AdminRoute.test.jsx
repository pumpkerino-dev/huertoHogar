// Componente: AdminRoute (protege las páginas del administrador)
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import AdminRoute from './AdminRoute'
import { AuthContext } from '../contexto/authContext'

function renderConUsuario(usuario) {
  const valor = { usuario, esAdmin: usuario?.rol === 'ADMIN', cargando: false }
  return render(
    <AuthContext.Provider value={valor}>
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/admin" element={<AdminRoute><p>Contenido admin</p></AdminRoute>} />
          <Route path="/Login" element={<p>Pantalla login</p>} />
          <Route path="/" element={<p>Inicio</p>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  )
}

describe('AdminRoute', () => {
  test('muestra el contenido si el usuario es ADMIN', () => {
    renderConUsuario({ id: 1, nombre: 'Admin', rol: 'ADMIN' })
    expect(screen.getByText('Contenido admin')).toBeInTheDocument()
  })

  test('redirige al inicio a un CLIENTE y al login a quien no inició sesión', () => {
    const { unmount } = renderConUsuario({ id: 2, nombre: 'Cliente', rol: 'CLIENTE' })
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    unmount()
    renderConUsuario(null)
    expect(screen.getByText('Pantalla login')).toBeInTheDocument()
  })
})
