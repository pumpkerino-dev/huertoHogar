import { useCallback } from 'react'
import { Button, Card, Col, ListGroup, ProgressBar, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import StatCard from '../../components/admin/StatCard'
import EncabezadoPagina from '../../components/admin/EncabezadoPagina'
import Avisos from '../../components/admin/Avisos'
import Cargando from '../../components/admin/Cargando'
import { useAuth } from '../../contexto/useAuth'
import { useListado } from '../../hooks/useListado'
import * as productoService from '../../services/productoService'
import * as usuarioService from '../../services/usuarioService'
import * as categoriaService from '../../services/categoriaService'
import * as ordenService from '../../services/ordenService'
import { formatoCLP, STOCK_BAJO } from '../../utils/producto'
import { productosCriticos, resumenVentas } from '../../utils/reportes'

/** HOME / DASHBOARD del admin: resumen de la tienda y accesos rápidos. */
function AdminDashboard() {
  const { usuario } = useAuth()
  const cargarTodo = useCallback(
    () => Promise.all([
      productoService.getProductos(), usuarioService.getUsuarios(),
      categoriaService.getCategorias(), ordenService.getOrdenes(),
    ]).then(([productos, usuarios, categorias, ordenes]) => [{ productos, usuarios, categorias, ordenes }]),
    []
  )
  const { datos, cargando, error, setError } = useListado(cargarTodo, 'No se pudo cargar el resumen')

  if (cargando) return <Cargando />
  if (error) return <Avisos error={error} onCerrarError={() => setError('')} />

  const { productos, usuarios, categorias, ordenes } = datos[0]
  const criticos = productosCriticos(productos)
  const enOferta = productos.filter((p) => p.precioOriginal).length
  const ventas = resumenVentas(ordenes)

  return (
    <>
      <EncabezadoPagina titulo="Dashboard"
        descripcion={`Hola, ${usuario?.nombre?.split(' ')[0] ?? ''}. Este es el estado de la tienda.`} />

      <Row xs={1} sm={2} xl={4} className="g-3 mb-4">
        <Col><StatCard titulo="Productos" valor={productos.length} icono="bi-basket" detalle={`${enOferta} en oferta`} /></Col>
        <Col>
          <StatCard titulo="Stock bajo" valor={criticos.length} icono="bi-exclamation-triangle"
            color="warning" detalle={`${STOCK_BAJO} unidades o menos`} />
        </Col>
        <Col>
          <StatCard titulo="Usuarios" valor={usuarios.length} icono="bi-people" color="primary"
            detalle={`${usuarios.filter((u) => u.rol === 'ADMIN').length} administradores`} />
        </Col>
        <Col>
          <StatCard titulo="Ventas" valor={formatoCLP(ventas.total)} icono="bi-cash-coin" color="danger"
            detalle={`${ventas.cantidadOrdenes} órdenes`} />
        </Col>
      </Row>

      <Row className="g-3">
        <Col lg={7}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white fw-semibold">Productos por categoría</Card.Header>
            <Card.Body>
              {categorias.map((c) => {
                const porcentaje = productos.length ? Math.round((c.cantidadProductos / productos.length) * 100) : 0
                return (
                  <div key={c.id} className="mb-3">
                    <div className="d-flex justify-content-between small mb-1">
                      <span>{c.nombre}</span>
                      <span className="text-muted">{c.cantidadProductos}</span>
                    </div>
                    <ProgressBar now={porcentaje} aria-label={c.nombre} />
                  </div>
                )
              })}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white fw-semibold d-flex justify-content-between align-items-center">
              Reponer stock
              <Button as={Link} to="/admin/productos/criticos" size="sm" variant="outline-success">Ver críticos</Button>
            </Card.Header>
            {criticos.length === 0 ? (
              <Card.Body className="text-muted">Todo el stock está sobre {STOCK_BAJO} unidades. 🌱</Card.Body>
            ) : (
              <ListGroup variant="flush">
                {criticos.map((p) => (
                  <ListGroup.Item key={p.id} className="d-flex justify-content-between">
                    <span>{p.nombre}</span>
                    <span className="badge bg-warning text-dark">{p.stock} {p.unidad}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default AdminDashboard
