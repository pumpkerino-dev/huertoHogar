import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link, Navigate, useLocation } from 'react-router-dom';
import BoletaDetalle from '../components/BoletaDetalle';
import '../css/pages/cart.css';
import '../App.css';

/** COMPRA EXITOSA (comprar-ok.html de la plantilla): confirmación y boleta de la compra recién hecha. */
function CompraExitosa() {
    const orden = useLocation().state?.orden;
    if (!orden) return <Navigate to="/" replace />;

    return (
        <main className="checkout-page">
            <Container className="py-4">
                <Row className="justify-content-center">
                    <Col lg={9}>
                        <Alert variant="success" role="status">
                            <Alert.Heading as="h2" className="h4">✓ Compra exitosa</Alert.Heading>
                            El pago de prueba fue aprobado. Tu número de orden es <strong>{orden.numero}</strong>.
                            Te enviamos el detalle a <strong>{orden.envio?.correo}</strong>.
                        </Alert>
                        <Card className="border-0 shadow-sm mb-3">
                            <Card.Body><BoletaDetalle orden={orden} /></Card.Body>
                        </Card>
                        <div className="d-flex flex-wrap gap-2">
                            <Button variant="outline-success" onClick={() => window.print()}>
                                <i className="bi bi-printer" /> Imprimir boleta
                            </Button>
                            <Link to="/Profile" className="btn btn-outline-secondary w-auto">Seguir mi pedido</Link>
                            <Link to="/Catalogue" className="btn btn-primary w-auto px-4">Volver a comprar</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default CompraExitosa;
