// Página admin: Productos (Mostrar, Nuevo, Eliminar y Productos críticos)
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../../contexto/authContext'
import ProductosAdmin from '../../../pages/admin/ProductosAdmin'
import * as productoService from '../../../services/productoService'
import * as categoriaService from '../../../services/categoriaService'
import { categoriasMock, sesionDe } from '../../test-utils'

vi.mock('../../../services/productoService')
vi.mock('../../../services/categoriaService')

const PRODUCTOS = [
  { id: 'FR001', codigo: 'FR001', nombre: 'Manzanas Fuji', categoria: 'frutas', precio: 900, precioOriginal: 1200, unidad: 'kg', stock: 150, stockCritico: 20, critico: false },
  { id: 'PL001', codigo: 'PL001', nombre: 'Leche Entera', categoria: 'lacteos', precio: 1250, precioOriginal: null, unidad: '1 L', stock: 5, stockCritico: 10, critico: true },
]
const ADMIN = { id: 1, nombre: 'Admin', rol: 'ADMIN' }
const VENDEDOR = { id: 2, nombre: 'Pedro', rol: 'VENDEDOR' }
const renderPagina = (props, usuario = ADMIN) => render(
  <AuthContext.Provider value={sesionDe(usuario)}>
    <MemoryRouter><ProductosAdmin {...props} /></MemoryRouter>
  </AuthContext.Provider>
)

describe('ProductosAdmin', () => {
  beforeEach(() => {
    productoService.getProductos.mockResolvedValue(PRODUCTOS)
    productoService.getProductosCriticos.mockResolvedValue(PRODUCTOS.filter((p) => p.critico))
    categoriaService.getCategorias.mockResolvedValue(categoriasMock)
  })

  test('lista los productos con su categoría y marca las ofertas', async () => {
    renderPagina()
    const fila = (await screen.findByText('Manzanas Fuji')).closest('tr')
    expect(within(fila).getByText('Oferta')).toBeInTheDocument()
    expect(within(fila).getByText('Frutas Frescas')).toBeInTheDocument()
  })

  test('no envía el formulario si el código no tiene el formato correcto', async () => {
    renderPagina()
    await screen.findByText('Manzanas Fuji')
    await userEvent.click(screen.getByRole('button', { name: /Nuevo producto/ }))
    const modal = await screen.findByRole('dialog')
    await userEvent.type(within(modal).getByLabelText('Código'), 'manzana')
    await userEvent.click(within(modal).getByRole('button', { name: 'Guardar' }))

    expect(within(modal).getByText('Formato: 2 letras + 3 números (ej: FR001)')).toBeInTheDocument()
    expect(productoService.crearProducto).not.toHaveBeenCalled()
  })

  test('la vista de productos críticos pide al backend los que llegaron a su stock crítico', async () => {
    renderPagina({ soloCriticos: true })
    expect(await screen.findByText('Leche Entera')).toBeInTheDocument()
    expect(screen.queryByText('Manzanas Fuji')).not.toBeInTheDocument()
    expect(productoService.getProductosCriticos).toHaveBeenCalled()
  })

  test('el VENDEDOR solo puede ver el detalle: no hay botones para crear, editar ni eliminar', async () => {
    renderPagina({}, VENDEDOR)
    await screen.findByText('Manzanas Fuji')
    expect(screen.queryByRole('button', { name: /Nuevo producto/ })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Editar' })).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Ver Manzanas Fuji' }))
    const modal = await screen.findByRole('dialog')
    expect(within(modal).getByText('Detalle del producto')).toBeInTheDocument()
    expect(within(modal).getByLabelText('Nombre')).toBeDisabled()
    expect(within(modal).queryByRole('button', { name: 'Guardar' })).not.toBeInTheDocument()
  })
})
