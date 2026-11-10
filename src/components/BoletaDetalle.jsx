import { Table } from "react-bootstrap";
import { formatoCLP, formatoFecha } from "../utils/producto";
import { formatoDiaDespacho } from "../utils/despacho";

/**
 * Boleta (comprobante) de una orden de compra.
 * Se reutiliza en: Checkout (compra exitosa), Órdenes/Boletas del admin,
 * Historial de compras de un usuario y el perfil del cliente.
 */
function BoletaDetalle({ orden }) {
  if (!orden) return null;
  return (
    <div className="boleta">
      <div className="d-flex flex-column flex-sm-row justify-content-between gap-1 mb-3">
        <div>
          <div className="fw-bold">HUERTO HOGAR</div>
          <div className="small text-muted">Comprobante de compra · Simulación</div>
        </div>
        <div className="text-sm-end small">
          <div><strong>N°</strong> {orden.id}</div>
          <div>{formatoFecha(orden.fecha)}</div>
          <div>{orden.cliente?.nombre}{orden.cliente?.email ? ` · ${orden.cliente.email}` : ""}</div>
          {orden.fechaEntrega && <div><strong>Despacho:</strong> {formatoDiaDespacho(orden.fechaEntrega)}</div>}
        </div>
      </div>

      <Table size="sm" responsive className="align-middle mb-2">
        <thead className="table-light">
          <tr>
            <th>Producto</th>
            <th className="text-center">Cantidad</th>
            <th className="text-end">Precio unitario</th>
            <th className="text-end">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {orden.items.map((item) => (
            <tr key={item.codigo}>
              <td>{item.nombre}</td>
              <td className="text-center">{item.cantidad}</td>
              <td className="text-end">{formatoCLP(item.precioUnitario)}</td>
              <td className="text-end">{formatoCLP(item.precioUnitario * item.cantidad)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="text-end">Envío</td>
            <td className="text-end text-success">Gratis</td>
          </tr>
          <tr className="fw-bold">
            <td colSpan={3} className="text-end">Total</td>
            <td className="text-end" data-testid="boleta-total">{formatoCLP(orden.total)}</td>
          </tr>
        </tfoot>
      </Table>
      <p className="small text-muted mb-0">Comprobante ficticio para pruebas. No es una boleta tributaria.</p>
    </div>
  );
}

export default BoletaDetalle;
