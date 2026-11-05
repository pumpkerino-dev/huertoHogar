import { Badge, Button, Table } from "react-bootstrap";

/** Tabla de usuarios del panel admin. */
function UsuarioTable({ usuarios, idUsuarioActual, onEditar, onEliminar, onHistorial }) {
  if (usuarios.length === 0) {
    return <p className="text-muted">No hay usuarios registrados.</p>;
  }

  return (
    <Table hover responsive className="align-middle mb-0">
      <thead className="table-success">
        <tr>
          <th>Nombre</th>
          <th className="d-none d-md-table-cell">Correo</th>
          <th className="d-none d-lg-table-cell">Teléfono</th>
          <th>Rol</th>
          <th className="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((u) => (
          <tr key={u.id}>
            <td>
              {u.nombre} {u.id === idUsuarioActual && <Badge bg="secondary">Tú</Badge>}
            </td>
            <td className="d-none d-md-table-cell">{u.email}</td>
            <td className="d-none d-lg-table-cell">{u.telefono || "—"}</td>
            <td>
              <Badge bg={u.rol === "ADMIN" ? "danger" : "success"}>
                {u.rol === "ADMIN" ? "Administrador" : "Cliente"}
              </Badge>
            </td>
            <td className="text-center text-nowrap">
              {onHistorial && (
                <Button size="sm" variant="outline-success" className="me-1" onClick={() => onHistorial(u)}
                  aria-label={`Historial de compras de ${u.nombre}`}>
                  <i className="bi bi-clock-history" /> <span className="d-none d-xl-inline">Historial</span>
                </Button>
              )}
              <Button size="sm" variant="outline-primary" className="me-1" onClick={() => onEditar(u)} aria-label="Editar">
                <i className="bi bi-pencil" /> <span className="d-none d-md-inline">Editar</span>
              </Button>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => onEliminar(u)}
                disabled={u.id === idUsuarioActual}
                title={u.id === idUsuarioActual ? "No puedes eliminar tu propia cuenta" : undefined}
                aria-label="Eliminar"
              >
                <i className="bi bi-trash" /> <span className="d-none d-md-inline">Eliminar</span>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default UsuarioTable;
