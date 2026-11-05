import { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import OrdenesTabla from "../../components/OrdenesTabla";
import BoletaModal from "../../components/BoletaModal";
import StatCard from "../../components/admin/StatCard";
import EncabezadoPagina from "../../components/admin/EncabezadoPagina";
import Avisos from "../../components/admin/Avisos";
import Cargando from "../../components/admin/Cargando";
import { useListado } from "../../hooks/useListado";
import * as ordenService from "../../services/ordenService";
import { formatoCLP } from "../../utils/producto";
import { resumenVentas } from "../../utils/reportes";

/**
 * ÓRDENES / BOLETAS (componente nuevo del admin)
 * Lista todas las compras confirmadas en el Checkout y permite "Mostrar boleta".
 */
function OrdenesAdmin() {
  const { datos: ordenes, cargando, error, setError } =
    useListado(ordenService.getOrdenes, "No se pudieron cargar las órdenes");
  const [busqueda, setBusqueda] = useState("");
  const [boleta, setBoleta] = useState(null);

  const texto = busqueda.trim().toLowerCase();
  const visibles = ordenes.filter((o) =>
    !texto || o.id.toLowerCase().includes(texto) || o.cliente?.nombre?.toLowerCase().includes(texto)
  );
  const resumen = resumenVentas(ordenes);

  return (
    <>
      <EncabezadoPagina titulo="Órdenes / Boletas" descripcion="Compras confirmadas en la tienda. Abre cualquiera para ver su boleta." />

      <Row xs={1} sm={3} className="g-3 mb-4">
        <Col><StatCard titulo="Órdenes" valor={resumen.cantidadOrdenes} icono="bi-receipt" /></Col>
        <Col><StatCard titulo="Total vendido" valor={formatoCLP(resumen.total)} icono="bi-cash-coin" color="primary" /></Col>
        <Col><StatCard titulo="Ticket promedio" valor={formatoCLP(resumen.ticketPromedio)} icono="bi-graph-up" color="warning" /></Col>
      </Row>

      <Form.Control type="search" className="mb-3" style={{ maxWidth: 360 }} placeholder="Buscar por N° de orden o cliente"
        aria-label="Buscar orden" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />

      <Avisos error={error} onCerrarError={() => setError("")} />

      <Card className="border-0 shadow-sm">
        {cargando ? <Cargando /> : <OrdenesTabla ordenes={visibles} onVerBoleta={setBoleta} />}
      </Card>

      {/* MOSTRAR BOLETA */}
      <BoletaModal orden={boleta} onCerrar={() => setBoleta(null)} />
    </>
  );
}

export default OrdenesAdmin;
