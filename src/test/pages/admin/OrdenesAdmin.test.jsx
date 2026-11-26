// Página admin: Órdenes / Boletas (el ADMIN cambia el estado; el VENDEDOR solo consulta)
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import OrdenesAdmin from '../../../pages/admin/OrdenesAdmin'
import { AuthContext } from '../../../contexto/authContext'
import * as ordenService from '../../../services/ordenService'
import { ordenesMock, sesionDe } from '../../test-utils'

vi.mock('../../../services/ordenService', async (original) => ({
  ...(await original()),
  getOrdenes: vi.fn(),
  cambiarEstado: vi.fn(),
}))

const renderPagina = (rol) => render(
  <AuthContext.Provider value={sesionDe({ id: 1, nombre: 'Persona', rol })}>
    <OrdenesAdmin />
  </AuthContext.Provider>
)

describe('OrdenesAdmin', () => {
  beforeEach(() => {
    ordenService.getOrdenes.mockResolvedValue(ordenesMock)
    ordenService.cambiarEstado.mockResolvedValue({})
  })

  test('el ADMIN cambia el estado de un pedido en camino a entregado', async () => {
    renderPagina('ADMIN')
    const selector = await screen.findByLabelText('Estado de la orden HH-1002')
    await userEvent.selectOptions(selector, 'ENTREGADO')

    await waitFor(() => expect(ordenService.cambiarEstado).toHaveBeenCalledWith(2, 'ENTREGADO'))
    expect(await screen.findByText('La orden HH-1002 quedó "Entregado"')).toBeInTheDocument()
    // Un pedido ya entregado no se puede volver a cambiar
    expect(screen.queryByLabelText('Estado de la orden HH-1001')).not.toBeInTheDocument()
  })

  test('el VENDEDOR ve el estado, pero no puede cambiarlo', async () => {
    renderPagina('VENDEDOR')
    expect(await screen.findByText('En camino')).toBeInTheDocument()
    expect(screen.queryByLabelText('Estado de la orden HH-1002')).not.toBeInTheDocument()
  })
})
