import { useCallback } from "react";
import { Badge, Card, Col, ProgressBar, Row, Table } from "react-bootstrap";
import StatCard from "../../components/admin/StatCard";
import EncabezadoPagina from "../../components/admin/EncabezadoPagina";
import Avisos from "../../components/admin/Avisos";
import Cargando from "../../components/admin/Cargando";
import { useListado } from "../../hooks/useListado";
import * as ordenService from "../../services/ordenService";
import * as productoService from "../../services/productoService";
import * as categoriaService from "../../services/categoriaService";
import { formatoCLP, nombreCategoria } from "../../utils/producto";
import { productosCriticos, productosMasVendidos, resumenVentas, ventasPorCategoria } from "../../utils/reportes";

/**
 * REPORTES: ventas generales, ventas por categoría, productos más vendidos y stock crítico.
 * El diagrama tiene "Reportes" en el menú principal y dentro de Producto: ambos llevan aquí
 * (la sección de productos está en #reporte-productos), para no duplicar la página.
 */
function ReportesAdmin() {
  const cargarTodo = useCallback(
    () => Promise.all([ordenService.getOrdenes(), productoService.getProductos(), categoriaService.getCategorias()])
      .then(([ordenes, productos, categorias]) => [{ ordenes, productos, categorias }]),
    []
  );
  const { datos, cargando, error, setError } = useListado(cargarTodo, "No se pudieron cargar los reportes");

  if (cargando) return <Cargando />;
  const { ordenes = [], productos = [], categorias = [] } = datos[0] ?? {};
  const resumen = resumenVentas(ordenes);
  const porCategoria = ventasPorCategoria(ordenes);
  const masVendidos = productosMasVendidos(ordenes);
  const criticos = productosCriticos(productos);

  return (
    <>
      <EncabezadoPagina titulo="Reportes" descripcion="Resumen de ventas y del estado del inventario." />
      <Avisos error={error} onCerrarError={() => setError("")} />

      <Row xs={1} sm={2} xl={4} className="g-3 mb-4">
        <Col><StatCard titulo="Total vendido" valor={formatoCLP(resumen.total)} icono="bi-cash-coin" /></Col>
        <Col><StatCard titulo="Órdenes" valor={resumen.cantidadOrdenes} icono="bi-receipt" color="primary" /></Col>
        <Col><StatCard titulo="Ticket promedio" valor={formatoCLP(resumen.ticketPromedio)} icono="bi-graph-up" color="warning" /></Col>
        <Col><StatCard titulo="Unidades vendidas" valor={resumen.unidades} icono="bi-box-seam" color="danger" /></Col>
      </Row>

      <Row className="g-3">
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white fw-semibold">Ventas por categoría</Card.Header>
            <Card.Body>
              {porCategoria.length === 0 && <p className="text-muted mb-0">Todavía no hay ventas.</p>}
              {porCategoria.map((v) => (
                <div key={v.categoria} className="mb-3">
                  <div className="d-flex justify-content-between small mb-1">
                    <span>{nombreCategoria(categorias, v.categoria)}</span>
                    <span>{formatoCLP(v.total)}</span>
                  </div>
                  <ProgressBar now={resumen.total ? (v.total / resumen.total) * 100 : 0} aria-label={v.categoria} />
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} id="reporte-productos">
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white fw-semibold">Productos más vendidos</Card.Header>
            <Table responsive size="sm" className="mb-0 align-middle">
              <thead className="table-light">
                <tr><th>Producto</th><th className="text-center">Unidades</th><th className="text-end">Total</th></tr>
              </thead>
              <tbody>
                {masVendidos.map((p) => (
                  <tr key={p.codigo}>
                    <td>{p.nombre}</td>
                    <td className="text-center">{p.unidades}</td>
                    <td className="text-end">{formatoCLP(p.total)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>

        <Col xs={12}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white fw-semibold">Stock crítico ({criticos.length})</Card.Header>
            <Card.Body className="d-flex flex-wrap gap-2">
              {criticos.length === 0 && <span className="text-muted">No hay productos con stock crítico. 🌱</span>}
              {criticos.map((p) => (
                <Badge key={p.id} bg="warning" text="dark" className="fs-6 fw-normal">
                  {p.nombre}: {p.stock} {p.unidad}
                </Badge>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ReportesAdmin;
