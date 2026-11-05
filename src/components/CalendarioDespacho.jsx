import { proximosDias } from '../utils/despacho';

// Calendario de despacho: el cliente elige el día de entrega (requerimiento del caso:
// "Permitir la selección de fechas de entrega preferidas"). Los domingos no hay despacho.
function CalendarioDespacho({ seleccionado, onSeleccionar }) {
  return (
    <div className="delivery-days" role="radiogroup" aria-label="Día de despacho">
      {proximosDias().map((dia) => (
        <button
          key={dia.iso}
          type="button"
          role="radio"
          aria-checked={seleccionado === dia.iso}
          className={`delivery-day${seleccionado === dia.iso ? ' is-selected' : ''}${dia.bloqueado ? ' is-blocked' : ''}`}
          disabled={dia.bloqueado}
          onClick={() => onSeleccionar(dia.iso)}
        >
          <span className="dow">{dia.diaSemana}</span>
          <span className="dom">{dia.diaMes}</span>
          <span className="status">{dia.bloqueado ? 'Sin despacho' : 'Disponible'}</span>
        </button>
      ))}
    </div>
  );
}

export default CalendarioDespacho;
