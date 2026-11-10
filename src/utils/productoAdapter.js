// Convierte un producto del backend ({ codigo, nombre, precio, stock, detalle... })
// al formato que usan los componentes de la tienda ({ code, name, price, detail... }).

import { formatoCLP as clp } from './producto';

const textoUnidad = (unidad) => (unidad === 'kg' ? 'kilo' : unidad || 'unidad');

const nombreUnidad = (unidad = '') => {
  if (unidad === 'kg') return ['Kilo', 'Kilos'];
  if (/bolsa/i.test(unidad)) return ['Bolsa', 'Bolsas'];
  if (/frasco/i.test(unidad)) return ['Frasco', 'Frascos'];
  return ['Unidad', 'Unidades'];
};

const leerDetalle = (texto) => {
  try {
    return texto ? JSON.parse(texto) : {};
  } catch {
    return {};
  }
};

export function aFormatoTienda(p) {
  const detalle = leerDetalle(p.detalle);
  const [unidadSingular, unidadPlural] = nombreUnidad(p.unidad);
  const producto = {
    id: p.id,
    code: p.codigo,
    name: p.nombre,
    image: p.imagen || '/img/logo.png',
    description: p.descripcionCorta || p.descripcion || '',
    price: Number(p.precio),
    priceLabel: `${clp(p.precio)} CLP / ${p.unidad || 'unidad'}`,
    stars: p.estrellas || '⭐⭐⭐⭐☆',
    category: p.categoria,
    origin: p.origenFiltro || '',
    certification: p.certificacion || '',
    originLabel: p.origen ? p.origen.toUpperCase() : '',
    detail: {
      thumbnails: [],
      infoTitle: 'INFORMACIÓN DEL PRODUCTO',
      infoRows: [{ label: 'Código', value: p.codigo }],
      ecoTitle: 'Producto local',
      ecoDescription: 'Producto seleccionado por HuertoHogar.',
      unit: unidadSingular,
      unitPlural: unidadPlural,
      ...detalle,
      description: p.descripcion || '',
      priceDisplay: `${clp(p.precio)} CLP`,
      priceUnit: `por ${textoUnidad(p.unidad)}`,
      maxQuantity: Number(p.stock ?? 0),
    },
  };
  if (Number(p.precioOriginal) > Number(p.precio)) producto.originalPrice = Number(p.precioOriginal);
  return producto;
}
