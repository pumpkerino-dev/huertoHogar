import { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import OrdenesTabla from "../../components/OrdenesTabla";
import BoletaModal from "../../components/BoletaModal";
import StatCard from "../../components/admin/StatCard";
import EncabezadoPagina from "../../components/admin/EncabezadoPagina";
import Avisos from "../../components/admin/Avisos";
import Cargando from "../../components/admin/Cargando";
import { useListado } from "../../hooks/useListado";
import { useAuth } from "../../contexto/useAuth";
import * as ordenService from "../../services/ordenService";
import { mensajeDeError } from "../../api";
import { formatoCLP } from "../../utils/producto";
import { resumenVentas } from "../../utils/reportes";

/**
 * ÓRDENES / BOLETAS
 * Lista todas las compras y permite "Mostrar boleta". El ADMIN además cambia el estado del pedido
 * (En preparación → En camino → Entregado, o Cancelado); el VENDEDOR solo las consulta.
 */
function OrdenesAdmin() {
  const { esAdmin } = useAuth();
  const { datos: ordenes, cargando, error, setError, recargar } =
    useListado(ordenService.getOrdenes, "No se pudieron cargar las órdenes");
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [boleta, setBoleta] = useState(null);
  const [exito, setExito] = useState("");

  const cambiarEstado = async (orden, estado) => {
    try {
      await ordenService.cambiarEstado(orden.id, estado);
      setExito(`La orden ${orden.numero} quedó "${ordenService.infoEstado(estado).texto}"`);
      recargar();
    } catch (err) {
      setError(mensajeDeError(err, "No se pudo cambiar el estado"));
    }
  };

  const texto = busqueda.trim().toLowerCase();
  const visibles = ordenes.filter((o) =>
    (!filtroEstado || o.estado === filtroEstado) &&
    (!texto || o.numero?.toLowerCase().includes(texto) || o.cliente?.nombre?.toLowerCase().includes(texto))
  );
  const resumen = resumenVentas(ordenes);

  return (
    <>
      <EncabezadoPagina titulo="Órdenes / Boletas"
        descripcion={esAdmin
          ? "Compras confirmadas en la tienda. Abre cualquiera para ver su boleta o cambia su estado de despacho."
          : "Compras confirmadas en la tienda. Abre cualquiera para ver su boleta."} />

      <Row xs={1} sm={3} className="g-3 mb-4">
        <Col><StatCard titulo="Órdenes" valor={resumen.cantidadOrdenes} icono="bi-receipt" /></Col>
        <Col><StatCard titulo="Total vendido" valor={formatoCLP(resumen.total)} icono="bi-cash-coin" color="primary" /></Col>
        <Col><StatCard titulo="Ticket promedio" valor={formatoCLP(resumen.ticketPromedio)} icono="bi-graph-up" color="warning" /></Col>
      </Row>

      <div className="d-flex flex-column flex-sm-row gap-2 mb-3">
        <Form.Control type="search" style={{ maxWidth: 360 }} placeholder="Buscar por N° de orden o cliente"
          aria-label="Buscar orden" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        <Form.Select className="w-auto" aria-label="Filtrar por estado" value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
          <option value="">Todos los estados</option>
          {ordenService.ESTADOS_PEDIDO.map((e) => <option key={e.valor} value={e.valor}>{e.texto}</option>)}
        </Form.Select>
      </div>

      <Avisos error={error} exito={exito} onCerrarError={() => setError("")} onCerrarExito={() => setExito("")} />

      <Card className="border-0 shadow-sm">
        {cargando ? <Cargando /> : (
          <OrdenesTabla ordenes={visibles} onVerBoleta={setBoleta} onCambiarEstado={esAdmin ? cambiarEstado : undefined} />
        )}
      </Card>

      {/* MOSTRAR BOLETA */}
      <BoletaModal orden={boleta} onCerrar={() => setBoleta(null)} />
    </>
  );
}

export default OrdenesAdmin;
