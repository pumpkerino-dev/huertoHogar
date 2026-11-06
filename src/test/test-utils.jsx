// ============================================================
// UTILIDADES PARA LAS PRUEBAS UNITARIAS
// 1) renderConProveedores: renderiza un componente con router, sesión y carrito, como en la app real.
// 2) Datos de prueba (arreglos simulados), separados de la lógica de los componentes.
// No es una prueba: Vitest solo ejecuta los archivos *.test.js / *.test.jsx.
// ============================================================
import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../contexto/authContext'
import { CartProvider } from '../contexto/CartContext.jsx' // con extensión: en Windows, sin ella se carga cartContext.js

export function renderConProveedores(ui, { ruta = '/', usuario = null, carrito = [], rutasExtra = {} } = {}) {
  // El carrito inicial se lee desde localStorage (igual que en el navegador)
  localStorage.setItem('huertohogar-cart', JSON.stringify(carrito))
  const sesion = { usuario, esAdmin: usuario?.rol === 'ADMIN', cargando: false }

  return render(
    <AuthContext.Provider value={sesion}>
      <CartProvider>
        <MemoryRouter initialEntries={[ruta]}>
          <Routes>
            <Route path={ruta.split('?')[0]} element={ui} />
            {Object.entries(rutasExtra).map(([path, texto]) => (
              <Route key={path} path={path} element={<p>{texto}</p>} />
            ))}
          </Routes>
        </MemoryRouter>
      </CartProvider>
    </AuthContext.Provider>
  )
}

// ============================================================
export const productosMock = [
  {
    code: 'FR001', name: 'Manzanas Fuji', category: 'frutas', price: 900, originalPrice: 1200,
    priceLabel: '$1.200 CLP / kg', description: 'Manzanas crujientes', image: '/img/manzana.png', stars: '⭐⭐⭐⭐⭐',
    detail: { maxQuantity: 150, unit: 'Kilo', unitPlural: 'Kilos' },
  },
  {
    code: 'VR001', name: 'Zanahorias Orgánicas', category: 'verduras', price: 900,
    priceLabel: '$900 CLP / kg', description: 'Zanahorias sin pesticidas', image: '/img/zanahoria.png', stars: '⭐⭐⭐⭐',
    detail: { maxQuantity: 100, unit: 'Kilo', unitPlural: 'Kilos' },
  },
  {
    code: 'FR003', name: 'Plátanos Cavendish', category: 'frutas', price: 800,
    priceLabel: '$800 CLP / kg', description: 'Plátanos maduros', image: '/img/platano.png', stars: '⭐⭐⭐⭐',
    detail: { maxQuantity: 250, unit: 'Kilo', unitPlural: 'Kilos' },
  },
  {
    code: 'PO001', name: 'Miel Orgánica', category: 'organicos', price: 5000,
    priceLabel: '$5.000 CLP / frasco de 500 g', description: 'Miel de apicultores locales', image: '/img/miel.png', stars: '⭐⭐⭐⭐⭐',
    detail: { maxQuantity: 50, unit: 'Frasco', unitPlural: 'Frascos' },
  },
];

export const categoriasMock = [
  { id: 'frutas', nombre: 'Frutas Frescas' },
  { id: 'verduras', nombre: 'Verduras Orgánicas' },
  { id: 'organicos', nombre: 'Productos Orgánicos' },
  { id: 'lacteos', nombre: 'Productos Lácteos' },
];

// Ítem del carrito (formato que guarda CartContext)
export const itemCarritoMock = {
  id: 'PO001', name: 'Miel Orgánica', image: '/img/miel.png', unit: 'Frasco', unitPlural: 'Frascos',
  unitPrice: 5000, maxQuantity: 50, originalUnitPrice: null, quantity: 2,
};

// Respuesta simulada de una compra exitosa (boleta)
export const ordenMock = {
  id: 'HH-TEST-1', fecha: '2026-11-03T12:00:00', estado: 'PAGADA', fechaEntrega: '',
  cliente: { id: 2, nombre: 'María González', email: 'maria@correo.cl' },
  items: [{ codigo: 'PO001', nombre: 'Miel Orgánica', cantidad: 2, precioUnitario: 5000, categoria: 'organicos' }],
  total: 10000,
};

// Órdenes de ejemplo con el mismo formato que devuelve GET /api/v1/ordenes
export const ordenesMock = [
  {
    id: 'HH-1001', fecha: '2026-10-28T10:15:00', estado: 'PAGADA', fechaEntrega: '',
    cliente: { id: 2, nombre: 'María González Silva', email: 'cliente@huertohogar.cl' },
    items: [
      { codigo: 'FR001', nombre: 'Manzanas Fuji', cantidad: 2, precioUnitario: 900, categoria: 'frutas' },
      { codigo: 'PO001', nombre: 'Miel Orgánica', cantidad: 1, precioUnitario: 5000, categoria: 'organicos' },
    ],
    total: 6800,
  },
  {
    id: 'HH-1002', fecha: '2026-10-30T18:40:00', estado: 'PAGADA', fechaEntrega: '',
    cliente: { id: 2, nombre: 'María González Silva', email: 'cliente@huertohogar.cl' },
    items: [
      { codigo: 'PL001', nombre: 'Leche Entera', cantidad: 3, precioUnitario: 950, categoria: 'lacteos' },
      { codigo: 'VR002', nombre: 'Espinacas Frescas', cantidad: 2, precioUnitario: 700, categoria: 'verduras' },
    ],
    total: 4250,
  },
];

// Producto tal como lo devuelve el backend (GET /api/v1/productos)
export const productoBackendMock = {
  id: 7, codigo: 'PL001', nombre: 'Leche Entera', categoria: 'lacteos', precio: 950, precioOriginal: 1250,
  unidad: '1 L', stock: 60, origen: 'Osorno', imagen: '/img/leche.png',
  descripcion: 'Leche entera de origen local.', descripcionCorta: 'Leche fresca de Osorno.',
  estrellas: '⭐⭐⭐⭐⭐', origenFiltro: 'osorno', certificacion: '',
  detalle: '{"thumbnails":["/img/leche-2.png"],"infoTitle":"INFORMACIÓN DE ORIGEN"}',
};
