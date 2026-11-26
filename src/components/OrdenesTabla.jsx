import { Badge, Button, Form, Table } from "react-bootstrap";
import { formatoCLP, formatoFecha } from "../utils/producto";
import { ESTADOS_PEDIDO, infoEstado } from "../services/ordenService";

const ESTADOS_FINALES = ["ENTREGADO", "CANCELADA"];

/**
 * Tabla de órdenes reutilizable: Órdenes/Boletas del admin, Historial de compras
 * de un usuario y "Historial de pedidos" del perfil del cliente.
 * mostrarCliente: oculta la columna Cliente cuando todas las órdenes son de la misma persona.
 * onCambiarEstado: si viene (solo ADMIN), el estado se muestra como un selector para cambiarlo.
 */
function OrdenesTabla({ ordenes, onVerBoleta, onCambiarEstado, mostrarCliente = true, vacio = "No hay órdenes registradas." }) {
  if (ordenes.length === 0) return <p className="text-muted m-3">{vacio}</p>;

  return (
    <Table hover responsive className="align-middle mb-0">
      <thead className="table-success">
        <tr>
          <th>N° orden</th>
          <th className="d-none d-md-table-cell">Fecha</th>
          {mostrarCliente && <th className="d-none d-lg-table-cell">Cliente</th>}
          <th className="text-end">Total</th>
          <th>Estado</th>
          <th className="text-center">Boleta</th>
        </tr>
      </thead>
      <tbody>
        {ordenes.map((orden) => {
          const estado = infoEstado(orden.estado);
          const bloqueado = ESTADOS_FINALES.includes(orden.estado);
          return (
            <tr key={orden.id}>
              <td className="text-nowrap">{orden.numero}</td>
              <td className="d-none d-md-table-cell">{formatoFecha(orden.fecha)}</td>
              {mostrarCliente && <td className="d-none d-lg-table-cell">{orden.cliente?.nombre}</td>}
              <td className="text-end">{formatoCLP(orden.total)}</td>
              <td>
                {onCambiarEstado && !bloqueado ? (
                  <Form.Select size="sm" value={orden.estado} aria-label={`Estado de la orden ${orden.numero}`}
                    onChange={(e) => onCambiarEstado(orden, e.target.value)} style={{ minWidth: 140 }}>
                    {ESTADOS_PEDIDO.map((e) => <option key={e.valor} value={e.valor}>{e.texto}</option>)}
                  </Form.Select>
                ) : (
                  <Badge bg={estado.color} text={estado.color === "warning" ? "dark" : undefined}>{estado.texto}</Badge>
                )}
              </td>
              <td className="text-center">
                <Button size="sm" variant="outline-success" onClick={() => onVerBoleta(orden)} aria-label={`Ver boleta ${orden.numero}`}>
                  <i className="bi bi-receipt" /> <span className="d-none d-md-inline">Ver boleta</span>
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default OrdenesTabla;
