// Página admin: Categorías (Nueva categoría y Editar categoría)
// El formulario usa React Hook Form + Yup, que valida de forma asíncrona:
// por eso se usa findByText / waitFor (esperan a que aparezca el resultado).
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CategoriasAdmin from '../../../pages/admin/CategoriasAdmin'
import * as categoriaService from '../../../services/categoriaService'

vi.mock('../../../services/categoriaService')

describe('CategoriasAdmin', () => {
  beforeEach(() => {
    categoriaService.getCategorias.mockResolvedValue([
      { id: 'frutas', nombre: 'Frutas Frescas', descripcion: '', cantidadProductos: 3 },
    ])
    categoriaService.crearCategoria.mockResolvedValue({ id: 'hierbas', nombre: 'Hierbas' })
  })

  test('valida el nombre y luego crea la categoría', async () => {
    render(<CategoriasAdmin />)
    await screen.findByText('Frutas Frescas')
    await userEvent.click(screen.getByRole('button', { name: /Nueva categoría/ }))
    const modal = await screen.findByRole('dialog')

    await userEvent.type(within(modal).getByLabelText('Nombre'), 'Hi')
    await userEvent.click(within(modal).getByRole('button', { name: 'Guardar' }))
    expect(await within(modal).findByText('El nombre debe tener al menos 3 caracteres.')).toBeInTheDocument()
    expect(categoriaService.crearCategoria).not.toHaveBeenCalled()

    await userEvent.type(within(modal).getByLabelText('Nombre'), 'erbas')
    await userEvent.click(within(modal).getByRole('button', { name: 'Guardar' }))
    await waitFor(() =>
      expect(categoriaService.crearCategoria).toHaveBeenCalledWith({ nombre: 'Hierbas', descripcion: '' })
    )
    expect(await screen.findByText('Categoría creada')).toBeInTheDocument()
  })

  test('"Editar" abre el formulario con los datos de la categoría', async () => {
    render(<CategoriasAdmin />)
    await userEvent.click(await screen.findByRole('button', { name: 'Editar Frutas Frescas' }))
    expect(within(await screen.findByRole('dialog')).getByLabelText('Nombre')).toHaveValue('Frutas Frescas')
  })
})
