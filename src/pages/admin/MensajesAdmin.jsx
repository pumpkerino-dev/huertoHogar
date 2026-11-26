import { Card, Table } from "react-bootstrap";
import EncabezadoPagina from "../../components/admin/EncabezadoPagina";
import Avisos from "../../components/admin/Avisos";
import Cargando from "../../components/admin/Cargando";
import { useListado } from "../../hooks/useListado";
import * as contactoService from "../../services/contactoService";
import { formatoFecha } from "../../utils/producto";

/** MENSAJES: lo que llega desde el formulario de Contacto de la tienda (GET /api/v1/contacto). */
function MensajesAdmin() {
  const { datos: mensajes, cargando, error, setError } =
    useListado(contactoService.getMensajes, "No se pudieron cargar los mensajes");

  return (
    <>
      <EncabezadoPagina titulo="Mensajes de contacto" descripcion="Consultas enviadas desde la página de Contacto." />
      <Avisos error={error} onCerrarError={() => setError("")} />
      <Card className="border-0 shadow-sm">
        {cargando ? <Cargando /> : mensajes.length === 0 ? (
          <p className="text-muted m-3">Todavía no hay mensajes.</p>
        ) : (
          <Table hover responsive className="align-middle mb-0">
            <thead className="table-success">
              <tr>
                <th className="d-none d-md-table-cell">Fecha</th>
                <th>Nombre</th>
                <th className="d-none d-lg-table-cell">Correo</th>
                <th>Comentario</th>
              </tr>
            </thead>
            <tbody>
              {mensajes.map((m) => (
                <tr key={m.id}>
                  <td className="d-none d-md-table-cell text-nowrap small">{formatoFecha(m.fecha)}</td>
                  <td>{m.nombre}</td>
                  <td className="d-none d-lg-table-cell">{m.correo || "—"}</td>
                  <td className="small">{m.comentario}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </>
  );
}

export default MensajesAdmin;
