import { Alert, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useCart } from '../contexto/useCart';
import { direccionEnvio } from '../utils/despacho';
import { formatoPrecio } from '../utils/producto';
import '../css/pages/cart.css';
import '../App.css';

/**
 * COMPRA CON ERROR (comprar-error.html de la plantilla).
 * Explica qué pasó y permite volver a pagar con los mismos datos: el carrito no se vació.
 */
function CompraError() {
    const { state } = useLocation();
    const { cart, subtotal } = useCart();
    if (!state?.mensaje) return <Navigate to="/" replace />;

    return (
        <main className="checkout-page">
            <Container className="py-4">
                <Row className="justify-content-center">
                    <Col lg={9}>
                        <Alert variant="danger" role="alert">
                            <Alert.Heading as="h2" className="h4">No se pudo realizar el pago</Alert.Heading>
                            {state.mensaje} Tus productos siguen en el carrito; puedes intentarlo nuevamente.
                        </Alert>

                        <Card className="border-0 shadow-sm mb-3">
                            <Card.Header className="bg-white fw-semibold">Datos del pedido</Card.Header>
                            <Card.Body className="small">
                                <p className="mb-1"><strong>Cliente:</strong> {state.envio?.nombre} {state.envio?.apellidos} · {state.envio?.correo}</p>
                                <p className="mb-0"><strong>Dirección:</strong> {direccionEnvio(state.envio)}</p>
                            </Card.Body>
                            <Table responsive size="sm" className="mb-0 align-middle">
                                <thead className="table-light">
                                    <tr><th>Producto</th><th className="text-center">Cantidad</th><th className="text-end">Total</th></tr>
                                </thead>
                                <tbody>
                                    {cart.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td className="text-center">{item.quantity}</td>
                                            <td className="text-end">{formatoPrecio(item.unitPrice * item.quantity)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="fw-bold"><td colSpan={2} className="text-end">Total</td><td className="text-end">{formatoPrecio(subtotal)}</td></tr>
                                </tfoot>
                            </Table>
                        </Card>

                        <div className="d-flex flex-wrap gap-2">
                            <Link to="/Checkout" state={{ envio: state.envio }} className="btn btn-success w-auto px-4">
                                Volver a realizar el pago
                            </Link>
                            <Link to="/ShoppingCart" className="btn btn-outline-secondary w-auto">Revisar el carrito</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default CompraError;
