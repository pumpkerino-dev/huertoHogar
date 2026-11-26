// Tiendas de HuertoHogar (caso del curso). "mapa" es la búsqueda que se muestra en Google Maps.
export const TIENDAS = [
  { id: 'santiago', ciudad: 'Santiago', region: 'Región Metropolitana', direccion: 'Av. Providencia 1245', matriz: true },
  { id: 'puerto-montt', ciudad: 'Puerto Montt', region: 'Región de Los Lagos', direccion: 'Av. Diego Portales 860' },
  { id: 'villarrica', ciudad: 'Villarrica', region: 'Región de la Araucanía', direccion: 'Camilo Henríquez 540' },
  { id: 'nacimiento', ciudad: 'Nacimiento', region: 'Región del Biobío', direccion: 'Freire 380' },
  { id: 'vina-del-mar', ciudad: 'Viña del Mar', region: 'Región de Valparaíso', direccion: 'Av. Valparaíso 650' },
  { id: 'valparaiso', ciudad: 'Valparaíso', region: 'Región de Valparaíso', direccion: 'Av. Pedro Montt 2150' },
  { id: 'concepcion', ciudad: 'Concepción', region: 'Región del Biobío', direccion: 'Barros Arana 1020' },
];

export const urlMapa = (tienda) =>
  `https://www.google.com/maps?q=${encodeURIComponent(`${tienda.direccion}, ${tienda.ciudad}, Chile`)}&output=embed`;

// Video "Agentes de Cambio" de INDAP (YouTube). Se puede cambiar por otro id de video.
export const VIDEO_YOUTUBE = 'https://www.youtube-nocookie.com/embed/BZ_pbBD5M-Q';
