import { Badge, Button, Table } from "react-bootstrap";
import { formatoCLP, formatoFecha } from "../utils/producto";

/**
 * Tabla de órdenes reutilizable: Órdenes/Boletas del admin, Historial de compras
 * de un usuario y "Historial de pedidos" del perfil del cliente.
 * mostrarCliente: oculta la columna Cliente cuando todas las órdenes son de la misma persona.
 */
function OrdenesTabla({ ordenes, onVerBoleta, mostrarCliente = true, vacio = "No hay órdenes registradas." }) {
  if (ordenes.length === 0) return <p className="text-muted m-3">{vacio}</p>;

  return (
    <Table hover responsive className="align-middle mb-0">
      <thead className="table-success">
        <tr>
          <th>N° orden</th>
          <th className="d-none d-md-table-cell">Fecha</th>
          {mostrarCliente && <th className="d-none d-lg-table-cell">Cliente</th>}
          <th className="text-end">Total</th>
          <th className="d-none d-sm-table-cell">Estado</th>
          <th className="text-center">Boleta</th>
        </tr>
      </thead>
      <tbody>
        {ordenes.map((orden) => (
          <tr key={orden.id}>
            <td>{orden.id}</td>
            <td className="d-none d-md-table-cell">{formatoFecha(orden.fecha)}</td>
            {mostrarCliente && <td className="d-none d-lg-table-cell">{orden.cliente?.nombre}</td>}
            <td className="text-end">{formatoCLP(orden.total)}</td>
            <td className="d-none d-sm-table-cell"><Badge bg="success">{orden.estado}</Badge></td>
            <td className="text-center">
              <Button size="sm" variant="outline-success" onClick={() => onVerBoleta(orden)} aria-label={`Ver boleta ${orden.id}`}>
                <i className="bi bi-receipt" /> <span className="d-none d-md-inline">Ver boleta</span>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default OrdenesTabla;
