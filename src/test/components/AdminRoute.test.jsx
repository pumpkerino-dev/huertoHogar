// Componente: AdminRoute (protege las páginas del administrador)
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import AdminRoute from '../../components/AdminRoute'
import { AuthContext } from '../../contexto/authContext'
import { sesionDe } from '../test-utils'

function renderConUsuario(usuario, ruta = '/admin') {
  return render(
    <AuthContext.Provider value={sesionDe(usuario)}>
      <MemoryRouter initialEntries={[ruta]}>
        <Routes>
          <Route path="/admin" element={<AdminRoute><p>Contenido admin</p></AdminRoute>} />
          <Route path="/admin/usuarios" element={<AdminRoute soloAdmin><p>Gestión de usuarios</p></AdminRoute>} />
          <Route path="/admin/productos" element={<AdminRoute><p>Productos del panel</p></AdminRoute>} />
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

  test('un VENDEDOR entra al panel, pero las páginas solo para ADMIN lo llevan a productos', () => {
    const vendedor = { id: 2, nombre: 'Pedro', rol: 'VENDEDOR' }
    const { unmount } = renderConUsuario(vendedor)
    expect(screen.getByText('Contenido admin')).toBeInTheDocument()
    unmount()
    renderConUsuario(vendedor, '/admin/usuarios')
    expect(screen.getByText('Productos del panel')).toBeInTheDocument()
    expect(screen.queryByText('Gestión de usuarios')).not.toBeInTheDocument()
  })
})
