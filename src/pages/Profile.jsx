/*Css Especifico*/
import '../css/pages/profile.css'
import '../css/pages/cart.css'
import '../App.css'
import { useCallback, useState } from 'react'
import { Alert, Badge, Button, Card, Col, Container, Form, Nav, Row } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import FormularioPerfil from '../components/FormularioPerfil'
import OrdenesTabla from '../components/OrdenesTabla'
import BoletaModal from '../components/BoletaModal'
import { useAuth } from '../contexto/useAuth'
import { useListado } from '../hooks/useListado'
import * as ordenService from '../services/ordenService'
import { formatoCLP } from '../utils/producto'
import { direccionEnvio, formatoDiaDespacho } from '../utils/despacho'

const PESTANAS = [
    { id: 'pedidos', texto: 'Mis Pedidos', icono: 'bi-bag-check' },
    { id: 'perfil', texto: 'Mi Perfil', icono: 'bi-person' },
    { id: 'direcciones', texto: 'Direcciones', icono: 'bi-geo-alt' },
    { id: 'pago', texto: 'Métodos de Pago', icono: 'bi-credit-card' },
    { id: 'configuracion', texto: 'Configuración', icono: 'bi-gear' },
]

// Etapas del seguimiento: el estado lo cambia el administrador en el panel (Órdenes / Boletas)
const ETAPAS = [
    { estado: 'EN_PREPARACION', texto: 'En preparación', icono: 'bi-box-seam' },
    { estado: 'EN_CAMINO', texto: 'En camino', icono: 'bi-truck' },
    { estado: 'ENTREGADO', texto: 'Entregado', icono: 'bi-house-check' },
]
const etapaPedido = (orden) => ETAPAS.findIndex((e) => e.estado === orden?.estado)

/**
 * MI CUENTA (página adaptada con Bootstrap): menú de pestañas + panel.
 *  - Escritorio: menú vertical a la izquierda (col-lg-3) y contenido a la derecha (col-lg-9).
 *  - Celular: el menú pasa a ser una fila deslizable sobre el contenido.
 * Reutiliza FormularioPerfil (igual que el perfil del admin), OrdenesTabla y BoletaModal.
 */
function Profile() {
    const { usuario, cargando } = useAuth()
    const [panel, setPanel] = useState('pedidos')
    const [boleta, setBoleta] = useState(null)
    const [configGuardada, setConfigGuardada] = useState(false)

    const cargarPedidos = useCallback(
        () => (usuario ? ordenService.getMisOrdenes() : Promise.resolve([])),
        [usuario]
    )
    const { datos: pedidos } = useListado(cargarPedidos, 'No se pudieron cargar tus pedidos')

    // El perfil es solo para usuarios con sesión iniciada
    if (!cargando && !usuario) return <Navigate to="/Login" replace />

    // Se sigue el pedido más reciente que no esté entregado ni cancelado (o el último, si todos terminaron)
    const ultimo = pedidos.find((p) => p.estado === 'EN_PREPARACION' || p.estado === 'EN_CAMINO') ?? pedidos[0]
    const etapa = etapaPedido(ultimo)
    const cancelado = ultimo?.estado === 'CANCELADA'

    return (
        <main>
            <Container as="section" className="profile-section py-4">
                <Row className="g-4">
                    <Col xs={12} lg={3}>
                        <Card className="border-0 shadow-sm account-nav">
                            <Card.Body>
                                <h2 className="h5">Mi Cuenta</h2>
                                <p className="small text-muted mb-3">{usuario?.nombre} {usuario?.apellidos}</p>
                                <Nav variant="pills" className="flex-row flex-lg-column flex-nowrap overflow-auto gap-1"
                                    activeKey={panel} onSelect={(clave) => setPanel(clave)}>
                                    {PESTANAS.map((p) => (
                                        <Nav.Item key={p.id}>
                                            <Nav.Link eventKey={p.id} className="text-nowrap">
                                                <i className={`bi ${p.icono} me-2`} aria-hidden="true" />{p.texto}
                                            </Nav.Link>
                                        </Nav.Item>
                                    ))}
                                </Nav>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={12} lg={9}>
                        {/* MIS PEDIDOS: seguimiento del último pedido + historial real */}
                        {panel === 'pedidos' && (
                            <div className="d-grid gap-4">
                                <Card className="border-0 shadow-sm tracking-card" id="tracking-card-anchor">
                                    <Card.Body>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h2 className="h5 mb-0">Sigue tu Pedido Activo</h2>
                                            {ultimo && <Badge bg="success">N° {ultimo.numero}</Badge>}
                                        </div>
                                        {ultimo ? (
                                            <>
                                                {cancelado ? (
                                                    <Alert variant="secondary" className="py-2 small">Este pedido fue cancelado y no se despachará.</Alert>
                                                ) : (
                                                    <Row className="text-center g-2 mb-3" aria-label="Estado del pedido">
                                                        {ETAPAS.map((e, i) => (
                                                            <Col key={e.estado}>
                                                                <div className={`rounded-pill py-2 small ${i <= etapa ? 'bg-success text-white' : 'bg-light text-muted'}`}
                                                                    aria-current={i === etapa ? 'step' : undefined}>
                                                                    <i className={`bi ${e.icono} me-1`} aria-hidden="true" />{e.texto}
                                                                </div>
                                                            </Col>
                                                        ))}
                                                    </Row>
                                                )}
                                                <p className="mb-1 small"><strong>Destino:</strong> {direccionEnvio(ultimo.envio) || 'Dirección por confirmar'}</p>
                                                <p className="mb-1 small"><strong>Despacho:</strong> {ultimo.fechaEntrega ? formatoDiaDespacho(ultimo.fechaEntrega) : 'Por coordinar'}</p>
                                                <p className="mb-0 small"><strong>Total:</strong> {formatoCLP(ultimo.total)}</p>
                                            </>
                                        ) : (
                                            <p className="text-muted mb-0">
                                                Aún no tienes pedidos. <Link to="/Catalogue">Ir al catálogo</Link>
                                            </p>
                                        )}
                                    </Card.Body>
                                </Card>

                                <Card className="border-0 shadow-sm history-card">
                                    <Card.Header className="bg-white fw-semibold">Historial de Pedidos</Card.Header>
                                    <OrdenesTabla ordenes={pedidos} mostrarCliente={false} onVerBoleta={setBoleta}
                                        vacio="Todavía no tienes compras registradas." />
                                </Card>
                            </div>
                        )}

                        {/* MI PERFIL: mismo formulario que usa el admin */}
                        {panel === 'perfil' && (
                            <Card className="border-0 shadow-sm profile-card">
                                <Card.Header className="bg-white fw-semibold">Información Personal</Card.Header>
                                <Card.Body><FormularioPerfil /></Card.Body>
                            </Card>
                        )}

                        {panel === 'direcciones' && (
                            <Card className="border-0 shadow-sm profile-card">
                                <Card.Header className="bg-white fw-semibold">Mis Direcciones</Card.Header>
                                <Card.Body>
                                    {usuario?.direccion ? (
                                        <div className="border rounded p-3 d-flex justify-content-between align-items-center gap-2">
                                            <div>
                                                <Badge bg="success" className="mb-1">Principal</Badge>
                                                <div>{usuario.direccion}</div>
                                                <div className="small text-muted">{[usuario.comuna, usuario.region].filter(Boolean).join(', ')}</div>
                                            </div>
                                            <Button size="sm" variant="outline-success" onClick={() => setPanel('perfil')}>Editar</Button>
                                        </div>
                                    ) : (
                                        <p className="text-muted mb-2">No tienes una dirección registrada.</p>
                                    )}
                                    <p className="small text-muted mt-3 mb-0">La dirección de despacho se edita en "Mi Perfil".</p>
                                </Card.Body>
                            </Card>
                        )}

                        {panel === 'pago' && (
                            <Card className="border-0 shadow-sm profile-card">
                                <Card.Header className="bg-white fw-semibold">Métodos de Pago</Card.Header>
                                <Card.Body>
                                    <div className="border rounded p-3">
                                        <i className="bi bi-credit-card me-2" aria-hidden="true" />Webpay (simulado)
                                    </div>
                                    <p className="small text-muted mt-3 mb-0">
                                        Los pagos son simulados en esta etapa del proyecto; no se guardan datos de tarjetas.
                                    </p>
                                </Card.Body>
                            </Card>
                        )}

                        {panel === 'configuracion' && (
                            <Card className="border-0 shadow-sm profile-card">
                                <Card.Header className="bg-white fw-semibold">Configuración de la Cuenta</Card.Header>
                                <Card.Body>
                                    <Form onSubmit={(e) => { e.preventDefault(); setConfigGuardada(true) }}>
                                        <Form.Check type="switch" id="config-notif-pedidos" defaultChecked
                                            label="Recibir notificaciones de pedidos por correo" className="mb-2" />
                                        <Form.Check type="switch" id="config-notif-ofertas" defaultChecked
                                            label="Recibir ofertas y novedades de HuertoHogar" className="mb-3" />
                                        <Form.Group controlId="config-idioma" className="mb-3" style={{ maxWidth: 260 }}>
                                            <Form.Label>Idioma</Form.Label>
                                            <Form.Select defaultValue="es">
                                                <option value="es">Español</option>
                                                <option value="en">English</option>
                                            </Form.Select>
                                        </Form.Group>
                                        {configGuardada && <Alert variant="success" className="py-2">Configuración guardada.</Alert>}
                                        <Button type="submit" variant="success">Guardar Configuración</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                </Row>
            </Container>
            <BoletaModal orden={boleta} onCerrar={() => setBoleta(null)} />
        </main>
    )
}

export default Profile
