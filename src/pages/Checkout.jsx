import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../contexto/CartContext.jsx';

import '../css/pages/cart.css';
import '../App.css';

function formatPrice(price) {
    return `$${Math.round(price).toLocaleString('es-CL')} CLP`;
}

function Checkout() {
    const { cart, subtotal, clearCart } = useCart();

    const [result, setResult] = useState(null);
    const [receipt, setReceipt] = useState(null);

    // Simular compra exitosa
    function handleValidPurchase() {
        if (cart.length === 0) return;

        const purchase = {
            number: `HH-${Date.now()}`,
            date: new Date().toLocaleString('es-CL'),
            items: cart.map(item => ({ ...item })),
            subtotal,
            shipping: 0,
            total: subtotal
        };

        setReceipt(purchase);
        setResult('success');
        clearCart();
    }

    // Simular compra fallida
    function handleInvalidPurchase() {
        setResult('failure');
    }

    // Proteger la página si no hay productos
    if (cart.length === 0 && !receipt) {
        return (
            <main className="checkout-page">
                <section className="cart-summary checkout-panel">
                    <h2>No hay productos para pagar</h2>

                    <p>
                        Agrega productos antes de iniciar la compra.
                    </p>

                    <Link
                        to="/Catalogue"
                        className="link-muted keep-shopping-link"
                    >
                        Volver al catálogo
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="checkout-page">

            <section className="cart-summary checkout-panel">

                {/* SELECCIÓN DEL RESULTADO */}
                {result === null && (
                    <>
                        <h2>Simulación de pago</h2>

                        <p>
                            Selecciona el resultado que deseas simular.
                            Esta página no procesa pagos reales.
                        </p>

                        <div className="summary-row total">
                            <span>Total de la compra</span>
                            <span className="value">
                                {formatPrice(subtotal)}
                            </span>
                        </div>

                        <div className="payment-methods-select">

                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleValidPurchase}
                            >
                                Simular compra válida
                            </button>

                            <button
                                type="button"
                                className="btn btn-primary checkout-failure"
                                onClick={handleInvalidPurchase}
                            >
                                Simular compra fallida
                            </button>

                        </div>
                        <div className="checkout-footer-links">
                        <Link
                            to="/ShoppingCart"
                            className="link-muted keep-shopping-link"
                        >
                            Volver al carrito
                        </Link>
                        <Link
                            to="/EasterEgg"
                            className="btn btn-primary easter-egg-button"
                        >
                            Easter egg
                        </Link>
                        </div>
                    </>
                )}

                {/* COMPRA EXITOSA: COMPROBANTE */}
                {result === 'success' && receipt && (
                    <>
                        <h2>✓ Compra exitosa</h2>

                        <p>
                            El pago de prueba fue aprobado.
                        </p>

                        <div className="summary-row">
                            <span>Referencia</span>
                            <span className="value">
                                {receipt.number}
                            </span>
                        </div>

                        <div className="summary-row">
                            <span>Fecha</span>
                            <span className="value">
                                {receipt.date}
                            </span>
                        </div>

                        <h2>HUERTO HOGAR</h2>

                        <p>
                            COMPROBANTE DE COMPRA · SIMULACIÓN
                        </p>

                        {/* Productos comprados */}
                        <div className="cart-items">

                            <div className="cart-items-header">
                                <span>Producto</span>
                                <span>Cantidad</span>
                                <span>Total</span>
                            </div>

                            {receipt.items.map(item => (
                                <div
                                    className="cart-item"
                                    key={item.id}
                                >
                                    <div className="cart-item-info">

                                        <div className="cart-item-thumb">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                            />
                                        </div>

                                        <div>
                                            <div className="cart-item-name">
                                                {item.name}
                                            </div>

                                            {item.originalUnitPrice != null && (
                                                <div className="cart-item-unit receipt-original-price">
                                                    Precio normal: {formatPrice(item.originalUnitPrice)} por unidad
                                                </div>
                                            )}

                                            <div className="cart-item-unit">
                                                {item.originalUnitPrice != null && 'Precio oferta: '}
                                                {formatPrice(item.unitPrice)} por unidad
                                            </div>

                                            <div className="cart-item-unit">
                                                {formatPrice(item.unitPrice)} por unidad
                                            </div>
                                        </div>

                                    </div>

                                    <div>
                                        {item.quantity}{' '}
                                        {item.quantity === 1
                                            ? item.unit
                                            : item.unitPlural ?? `${item.unit}s`}
                                    </div>

                                    <div className="cart-item-price">
                                        {formatPrice(
                                            item.unitPrice * item.quantity
                                        )}
                                    </div>
                                </div>
                            ))}

                        </div>

                        {/* Resumen del comprobante */}
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span className="value">
                                {formatPrice(receipt.subtotal)}
                            </span>
                        </div>

                        <div className="summary-row">
                            <span>Envío</span>
                            <span className="value free">
                                Gratis
                            </span>
                        </div>

                        <div className="summary-row total">
                            <span>Total pagado</span>
                            <span className="value">
                                {formatPrice(receipt.total)}
                            </span>
                        </div>

                        <p className="cart-secure-note">
                            Comprobante ficticio para pruebas.
                            No es una boleta tributaria ni acredita
                            un pago real.
                        </p>

                        <Link
                            to="/Catalogue"
                            className="btn btn-primary"
                        >
                            Volver a comprar
                        </Link>
                    </>
                )}

                {/* COMPRA FALLIDA */}
                {result === 'failure' && (
                    <>
                        <h2>No se pudo procesar la compra</h2>

                        <p>
                            Ocurrió un problema durante el pago.
                            No se completó la compra. Puedes intentarlo
                            nuevamente.
                        </p>

                        <div className="payment-methods-select">

                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => setResult(null)}
                            >
                                Intentar nuevamente
                            </button>

                            <Link
                                to="/ShoppingCart"
                                className="link-muted keep-shopping-link"
                            >
                                Volver al carrito
                            </Link>

                        </div>
                    </>
                )}

            </section>

        </main>
    );
}

export default Checkout;