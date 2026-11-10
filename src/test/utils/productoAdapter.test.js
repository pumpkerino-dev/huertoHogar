// Adaptador: producto del backend -> formato de la tienda (src/utils/productoAdapter.js)
import { describe, test, expect } from 'vitest'
import { aFormatoTienda } from '../../utils/productoAdapter'
import { productoBackendMock } from '../test-utils'

describe('aFormatoTienda', () => {
  test('convierte un producto del backend al formato que usan los componentes de la tienda', () => {
    const producto = aFormatoTienda(productoBackendMock)

    expect(producto).toMatchObject({
      code: 'PL001', name: 'Leche Entera', price: 950, originalPrice: 1250,
      description: 'Leche fresca de Osorno.', origin: 'osorno', originLabel: 'OSORNO',
      priceLabel: '$950 CLP / 1 L',
    })
    expect(producto.detail).toMatchObject({
      maxQuantity: 60, priceDisplay: '$950 CLP', priceUnit: 'por 1 L',
      description: 'Leche entera de origen local.', thumbnails: ['/img/leche-2.png'],
    })
  })

  test('un producto nuevo del admin (sin oferta ni datos de presentación) usa valores por defecto', () => {
    const producto = aFormatoTienda({ id: 9, codigo: 'FR004', nombre: 'Frutillas', categoria: 'frutas', precio: 2500, stock: 40, unidad: 'kg' })

    expect(producto.originalPrice).toBeUndefined()
    expect(producto.image).toBe('/img/logo.png')
    expect(producto.detail).toMatchObject({ unit: 'Kilo', priceUnit: 'por kilo', infoRows: [{ label: 'Código', value: 'FR004' }] })
  })
})
