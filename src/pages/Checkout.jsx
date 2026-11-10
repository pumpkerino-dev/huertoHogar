import { useState } from 'react';
import { Alert, Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../contexto/useCart';
import { useProductos } from '../hooks/useCatalogo';
import BoletaDetalle from '../components/BoletaDetalle';
import * as ordenService from '../services/ordenService';
import { mensajeDeError } from '../api';
import { CLAVE_DESPACHO, formatoDiaDespacho } from '../utils/despacho';
import '../css/pages/cart.css';
import '../App.css';
import { formatoPrecio as formatPrice } from '../utils/producto';


/**
 * CHECKOUT (página adaptada con Bootstrap).
 * La compra se confirma en el backend (POST /api/v1/ordenes), que valida el stock con la BD,
 * descuenta el stock y guarda la orden. "Simular compra fallida" pide al backend un pago rechazado.
 * Si la compra falla, el carrito se conserva para volver a intentarlo.
 */
function Checkout() {
    const { cart, subtotal, clearCart } = useCart();
    const { productos } = useProductos();
    const [estado, setEstado] = useState('pendiente'); // pendiente | procesando | exito | fallo
    const [orden, setOrden] = useState(null);
    const [error, setError] = useState('');

    const diaDespacho = sessionStorage.getItem(CLAVE_DESPACHO) ?? '';
    // Avisos antes de pagar (por ejemplo, si el stock bajó después de agregar al carrito)
    const problemas = estado === 'pendiente' ? ordenService.validarCarrito(cart, productos) : [];

    async function pagar(simularFallo) {
        setEstado('procesando');
        setError('');
        try {
            const nueva = await ordenService.crearOrden(cart, { simularFallo, fechaEntrega: diaDespacho });
            setOrden(nueva);
            setEstado('exito');
            clearCart();
            sessionStorage.removeItem(CLAVE_DESPACHO);
        } catch (err) {
            // El carrito NO se vacía: el usuario puede corregir y volver a intentarlo
            setError(mensajeDeError(err, 'Ocurrió un problema durante el pago.'));
            setEstado('fallo');
        }
    }

    // Sin productos (y sin una compra recién hecha): no hay nada que pagar
    if (cart.length === 0 && estado !== 'exito') {
        return (
            <main className="checkout-page">
                <Container className="py-5 text-center">
                    <h2>No hay productos para pagar</h2>
                    <p>Agrega productos antes de iniciar la compra.</p>
                    <Link to="/Catalogue" className="btn btn-primary w-auto px-4">Volver al catálogo</Link>
                </Container>
            </main>
        );
    }

    return (
        <main className="checkout-page">
            <Container className="py-4">
                {/* COMPRA EXITOSA: confirmación + boleta */}
                {estado === 'exito' && (
                    <Row className="justify-content-center">
                        <Col lg={9}>
                            <Alert variant="success" role="status">
                                <Alert.Heading as="h2" className="h4">✓ Compra exitosa</Alert.Heading>
                                El pago de prueba fue aprobado. Tu número de orden es <strong>{orden.id}</strong>.
                            </Alert>
                            <Card className="border-0 shadow-sm mb-3">
                                <Card.Body><BoletaDetalle orden={orden} /></Card.Body>
                            </Card>
                            <Link to="/Catalogue" className="btn btn-primary w-auto px-4">Volver a comprar</Link>
                        </Col>
                    </Row>
                )}

                {estado !== 'exito' && (
                    <Row className="g-4">
                        {/* Resumen del pedido */}
                        <Col xs={12} lg={7}>
                            <Card className="border-0 shadow-sm">
                                <Card.Header className="bg-white fw-semibold">Resumen de tu pedido</Card.Header>
                                <Table responsive className="mb-0 align-middle">
                                    <thead className="table-light">
                                        <tr><th>Producto</th><th className="text-center">Cantidad</th><th className="text-end">Total</th></tr>
                                    </thead>
                                    <tbody>
                                        {cart.map(item => (
                                            <tr key={item.id}>
                                                <td>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <img src={item.image || "/img/logo.png"} alt="" width="40" height="40" className="rounded object-fit-cover d-none d-sm-block" />
                                                        <div>
                                                            {item.name}
                                                            <div className="small text-muted">
                                                                {item.originalUnitPrice != null && (
                                                                    <span className="text-decoration-line-through me-1">{formatPrice(item.originalUnitPrice)}</span>
                                                                )}
                                                                {formatPrice(item.unitPrice)} c/u
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center">{item.quantity}</td>
                                                <td className="text-end">{formatPrice(item.unitPrice * item.quantity)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card>
                        </Col>

                        {/* Pago simulado */}
                        <Col xs={12} lg={5}>
                            <Card className="border-0 shadow-sm checkout-panel">
                                <Card.Body>
                                    <h2 className="h4">Simulación de pago</h2>
                                    <p className="small text-muted">
                                        Selecciona el resultado que deseas simular. Esta página no procesa pagos reales.
                                    </p>

                                    <div className="summary-row"><span>Despacho</span>
                                        <span className="value">{diaDespacho ? formatoDiaDespacho(diaDespacho) : 'Por coordinar'}</span>
                                    </div>
                                    <div className="summary-row"><span>Envío</span><span className="value free">Gratis</span></div>
                                    <div className="summary-row total"><span>Total de la compra</span>
                                        <span className="value" data-testid="checkout-total">{formatPrice(subtotal)}</span>
                                    </div>

                                    {problemas.length > 0 && (
                                        <Alert variant="warning" className="small py-2">
                                            Revisa tu carrito antes de pagar: {problemas.join(' ')}
                                        </Alert>
                                    )}

                                    {/* COMPRA FALLIDA: mensaje claro, el carrito se conserva */}
                                    {estado === 'fallo' && (
                                        <Alert variant="danger" role="alert">
                                            <Alert.Heading as="h3" className="h6">No se pudo procesar la compra</Alert.Heading>
                                            {error} Tus productos siguen en el carrito; puedes intentarlo nuevamente.
                                        </Alert>
                                    )}

                                    <div className="d-grid gap-2 my-3">
                                        <Button variant="success" disabled={estado === 'procesando'} onClick={() => pagar(false)}>
                                            {estado === 'procesando' ? 'Procesando...' : estado === 'fallo' ? 'Intentar nuevamente' : 'Simular compra válida'}
                                        </Button>
                                        <Button variant="outline-danger" disabled={estado === 'procesando'} onClick={() => pagar(true)}>
                                            Simular compra fallida
                                        </Button>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link to="/ShoppingCart" className="link-muted keep-shopping-link">Volver al carrito</Link>
                                        <Link to="/EasterEgg" className="btn btn-primary easter-egg-button w-auto">Easter egg</Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Container>
        </main>
    );
}

export default Checkout;
