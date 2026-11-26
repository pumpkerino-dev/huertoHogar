import { Badge, Button, Table } from "react-bootstrap";
import { formatoCLP, nombreCategoria } from "../../utils/producto";

/**
 * Tabla de productos del panel admin. No hace llamadas: recibe datos y avisa acciones.
 * Con onVer (VENDEDOR) solo se muestra el botón "Ver"; con onEditar/onEliminar (ADMIN), los de editar y eliminar.
 */
function ProductoTable({ productos, categorias = [], onEditar, onEliminar, onVer }) {
  if (productos.length === 0) {
    return <p className="text-muted">No hay productos registrados.</p>;
  }

  return (
    <Table hover responsive className="align-middle mb-0">
      <thead className="table-success">
        <tr>
          <th>Producto</th>
          <th className="d-none d-md-table-cell">Código</th>
          <th className="d-none d-lg-table-cell">Categoría</th>
          <th className="text-end">Precio</th>
          <th className="text-end">Stock</th>
          <th className="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((p) => (
          <tr key={p.id}>
            <td>
              <div className="d-flex align-items-center gap-2">
                <img src={p.imagen || "/img/logo.png"} alt="" className="thumb-producto d-none d-sm-block" />
                <span>{p.nombre}</span>
              </div>
            </td>
            <td className="d-none d-md-table-cell">{p.codigo}</td>
            <td className="d-none d-lg-table-cell">{nombreCategoria(categorias, p.categoria)}</td>
            <td className="text-end">
              {p.precioOriginal && (
                <div className="small text-muted text-decoration-line-through">{formatoCLP(p.precioOriginal)}</div>
              )}
              <span className="text-nowrap">{formatoCLP(p.precio)}</span>
              {p.precioOriginal && <Badge bg="warning" text="dark" className="ms-1">Oferta</Badge>}
              <div className="small text-muted">{p.unidad}</div>
            </td>
            <td className="text-end">
              {p.critico ? <Badge bg="warning" text="dark" title={`Stock crítico: ${p.stockCritico}`}>{p.stock}</Badge> : p.stock}
              {p.stockCritico != null && <div className="small text-muted">crítico: {p.stockCritico}</div>}
            </td>
            <td className="text-center text-nowrap">
              {onVer && (
                <Button size="sm" variant="outline-success" onClick={() => onVer(p)} aria-label={`Ver ${p.nombre}`}>
                  <i className="bi bi-eye" /> <span className="d-none d-md-inline">Ver</span>
                </Button>
              )}
              {onEditar && (
                <Button size="sm" variant="outline-primary" className="me-1" onClick={() => onEditar(p)} aria-label="Editar">
                  <i className="bi bi-pencil" /> <span className="d-none d-md-inline">Editar</span>
                </Button>
              )}
              {onEliminar && (
                <Button size="sm" variant="outline-danger" onClick={() => onEliminar(p)} aria-label="Eliminar">
                  <i className="bi bi-trash" /> <span className="d-none d-md-inline">Eliminar</span>
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ProductoTable;
