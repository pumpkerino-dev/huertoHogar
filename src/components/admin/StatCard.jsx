import { Card } from 'react-bootstrap'

/**
 * Tarjeta de resumen del dashboard (ej: "Productos: 9").
 * Reutilizable: recibe el título, el valor, un ícono de Bootstrap Icons y un color.
 */
function StatCard({ titulo, valor, icono, color = 'success', detalle }) {
  return (
    <Card className="stat-card h-100 border-0 shadow-sm">
      <Card.Body>
        <div className={`stat-icon bg-${color}-subtle text-${color}`}>
          <i className={`bi ${icono}`} aria-hidden="true" />
        </div>
        <div className="text-start">
          <div className="stat-titulo">{titulo}</div>
          <div className="stat-valor" data-testid={`stat-${titulo}`}>{valor}</div>
          {detalle && <div className="stat-detalle">{detalle}</div>}
        </div>
      </Card.Body>
    </Card>
  )
}

export default StatCard
