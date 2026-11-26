import { useState } from 'react';
import { Alert, Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../contexto/useCart';
import { useAuth } from '../contexto/useAuth';
import { useProductos } from '../hooks/useCatalogo';
import FormularioEnvio from '../components/FormularioEnvio';
import * as ordenService from '../services/ordenService';
import { mensajeDeError } from '../api';
import { CLAVE_DESPACHO, formatoDiaDespacho } from '../utils/despacho';
import { ENVIO_VACIO, envioDesdeUsuario, limpiarEnvio } from '../utils/envio';
import { sinErrores, validarEnvio } from '../utils/validation';
import '../css/pages/cart.css';
import '../App.css';
import { formatoPrecio as formatPrice } from '../utils/producto';


/**
 * CHECKOUT (comprar.html de la plantilla, adaptado con Bootstrap).
 * Pide los datos de envío (se autocompletan si hay sesión iniciada) y confirma la compra
 * en el backend (POST /api/v1/boletas), que valida el stock, lo descuenta y guarda la boleta.
 * Si sale bien lleva a "Compra exitosa"; si falla, a "Compra con error" y el carrito se conserva.
 */
function Checkout() {
    const { cart, subtotal, clearCart } = useCart();
    const { usuario } = useAuth();
    const { productos } = useProductos();
    const navigate = useNavigate();
    const location = useLocation();

    const [envio, setEnvio] = useState(() => location.state?.envio ?? (usuario ? envioDesdeUsuario(usuario) : ENVIO_VACIO));
    const [errores, setErrores] = useState({});
    const [procesando, setProcesando] = useState(false);

    // Si la sesión termina de cargar después de abrir la página, se autocompletan los datos una vez.
    // Se ajusta durante el render (patrón recomendado por React) en vez de en un useEffect.
    const [usuarioAplicado, setUsuarioAplicado] = useState(usuario?.id ?? null);
    if (usuario && usuario.id !== usuarioAplicado) {
        setUsuarioAplicado(usuario.id);
        if (!location.state?.envio) setEnvio(envioDesdeUsuario(usuario));
    }

    const diaDespacho = sessionStorage.getItem(CLAVE_DESPACHO) ?? '';
    // Avisos antes de pagar (por ejemplo, si el stock bajó después de agregar al carrito)
    const problemas = ordenService.validarCarrito(cart, productos);

    async function pagar(simularFallo) {
        const encontrados = validarEnvio(envio);
        setErrores(encontrados);
        if (!sinErrores(encontrados)) return;

        const datosEnvio = limpiarEnvio(envio);
        setProcesando(true);
        try {
            const orden = await ordenService.crearOrden(cart, { envio: datosEnvio, simularFallo, fechaEntrega: diaDespacho });
            clearCart();
            sessionStorage.removeItem(CLAVE_DESPACHO);
            navigate('/CompraExitosa', { state: { orden } });
        } catch (err) {
            // El carrito NO se vacía: el usuario puede corregir y volver a intentarlo
            navigate('/CompraError', {
                state: { mensaje: mensajeDeError(err, 'Ocurrió un problema durante el pago.'), envio: datosEnvio },
            });
        }
    }

    // Sin productos: no hay nada que pagar
    if (cart.length === 0) {
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
                <Row className="g-4">
                    <Col xs={12} lg={7} className="d-grid gap-4 align-content-start">
                        {/* Resumen del pedido */}
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

                        {/* Datos de envío */}
                        <Card className="border-0 shadow-sm">
                            <Card.Header className="bg-white fw-semibold">Datos de envío</Card.Header>
                            <Card.Body>
                                {usuario ? (
                                    <p className="small text-muted">Completamos tus datos con los de tu cuenta. Puedes cambiarlos para este pedido.</p>
                                ) : (
                                    <p className="small text-muted">
                                        ¿Ya tienes cuenta? <Link to="/Login">Inicia sesión</Link> para completar tus datos automáticamente.
                                    </p>
                                )}
                                <FormularioEnvio envio={envio} errores={errores} onCambiar={setEnvio} />
                            </Card.Body>
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

                                {!sinErrores(errores) && (
                                    <Alert variant="danger" className="small py-2" role="alert">
                                        Revisa los datos de envío marcados en rojo.
                                    </Alert>
                                )}

                                <div className="d-grid gap-2 my-3">
                                    <Button variant="success" disabled={procesando} onClick={() => pagar(false)}>
                                        {procesando ? 'Procesando...' : 'Simular compra válida'}
                                    </Button>
                                    <Button variant="outline-danger" disabled={procesando} onClick={() => pagar(true)}>
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
            </Container>
        </main>
    );
}

export default Checkout;
