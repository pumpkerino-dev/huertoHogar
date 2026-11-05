// Página: Catalogue (visualización, búsqueda, orden por precio y filtro por categoría)
import { describe, test, expect, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Catalogue from './Catalogue'
import { renderConProveedores, categoriasMock, productosMock } from '../test-utils'

// MOCK: en vez de pedir los productos al backend, el catálogo recibe el arreglo de prueba
vi.mock('../hooks/useCatalogo', () => ({
  useProductos: () => ({ productos: productosMock, cargando: false, error: '' }),
  useCategorias: () => ({ categorias: categoriasMock, cargando: false, error: '' }),
}))

const renderCatalogo = (ruta = '/Catalogue') => renderConProveedores(<Catalogue filtersVisible />, { ruta })
const nombresVisibles = () =>
  screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent).filter((t) => productosMock.some((p) => p.name === t))

describe('Catalogue', () => {
  test('Prueba 2 · muestra todos los productos que entrega el servicio', () => {
    renderCatalogo()
    expect(nombresVisibles()).toEqual(['Manzanas Fuji', 'Zanahorias Orgánicas', 'Plátanos Cavendish', 'Miel Orgánica'])
  })

  test('Prueba 3 · la búsqueda filtra por nombre (sin importar tildes) y avisa si no hay coincidencias', () => {
    const { unmount } = renderCatalogo('/Catalogue?buscar=platano')
    expect(nombresVisibles()).toEqual(['Plátanos Cavendish'])
    unmount()

    renderCatalogo('/Catalogue?buscar=kiwi')
    expect(screen.getByRole('status')).toHaveTextContent('No se encontraron productos para "kiwi"')
  })

  test('Prueba 4 · ordena por precio de menor a mayor y de mayor a menor (empate por nombre)', async () => {
    renderCatalogo()

    await userEvent.click(screen.getByRole('link', { name: 'Menor precio' }))
    expect(nombresVisibles()).toEqual(['Plátanos Cavendish', 'Manzanas Fuji', 'Zanahorias Orgánicas', 'Miel Orgánica'])

    await userEvent.click(screen.getByRole('link', { name: 'Mayor precio' }))
    expect(nombresVisibles()).toEqual(['Miel Orgánica', 'Manzanas Fuji', 'Zanahorias Orgánicas', 'Plátanos Cavendish'])
  })

  test('Prueba 5 · el filtro por categoría muestra solo esa categoría y se combina con el orden', async () => {
    renderCatalogo()
    const filtros = screen.getByRole('heading', { name: 'CATEGORÍA' }).parentElement

    await userEvent.click(within(filtros).getByLabelText('Frutas'))
    expect(nombresVisibles()).toEqual(['Manzanas Fuji', 'Plátanos Cavendish'])

    await userEvent.click(screen.getByRole('link', { name: 'Menor precio' }))
    expect(nombresVisibles()).toEqual(['Plátanos Cavendish', 'Manzanas Fuji'])
  })
})
