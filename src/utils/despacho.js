// Utilidades del día de despacho (lo usan el Carrito, el Checkout y las pruebas)

// Clave donde se recuerda el día elegido en el carrito (lo lee el Checkout)
export const CLAVE_DESPACHO = 'huertohogar-despacho';

const DIAS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

// Próximos días a partir de mañana, en formato "AAAA-MM-DD". Los domingos no hay despacho.
export function proximosDias(desde = new Date(), cantidad = 7) {
  return Array.from({ length: cantidad }, (_, i) => {
    const fecha = new Date(desde);
    fecha.setDate(fecha.getDate() + i + 1);
    const iso = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
    return { iso, diaSemana: DIAS[fecha.getDay()], diaMes: fecha.getDate(), bloqueado: fecha.getDay() === 0 };
  });
}

// "2026-11-05" -> "jueves 5 de noviembre"
export function formatoDiaDespacho(iso) {
  if (!iso) return '';
  const [anio, mes, dia] = iso.split('-').map(Number);
  return new Date(anio, mes - 1, dia).toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' });
}
