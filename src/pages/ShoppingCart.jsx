import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexto/useCart';
import ProductoCarrito from '../components/ProductoCarrito.jsx';
import CalendarioDespacho from '../components/CalendarioDespacho.jsx';
import '../css/pages/cart.css';
import '../App.css';
import { CLAVE_DESPACHO } from '../utils/despacho';

function formatPrice(price) {
  return `$${Math.round(price).toLocaleString('es-CL')} CLP`;
}

/**
 * CARRITO (página adaptada con Bootstrap): Container + Row + Col.
 *  - Escritorio: productos y despacho a la izquierda (col-lg-8), resumen a la derecha (col-lg-4).
 *  - Celular/tablet: todo en una columna.
 * La lógica del carrito (CartContext y ProductoCarrito) no cambió.
 */
function ShoppingCart() {
  const { cart, subtotal } = useCart();
  const navigate = useNavigate();
  const isEmpty = cart.length === 0;
  const [diaDespacho, setDiaDespacho] = useState(() => sessionStorage.getItem(CLAVE_DESPACHO) ?? '');

  const elegirDia = (iso) => {
    setDiaDespacho(iso);
    sessionStorage.setItem(CLAVE_DESPACHO, iso);
  };

  return (
      <main>
        <Container as="section" className="cart-page py-4">
          <div className="cart-section-header mb-3">
            <h1>Tu Carrito de Compras</h1>
            <Link to="/Catalogue" className="link-muted keep-shopping-link">
              &larr; Seguir Comprando
            </Link>
          </div>

          <Row className="g-4 align-items-start">
            <Col xs={12} lg={8} className="cart-main">
              <div className="cart-items" id="cart-items">
                {!isEmpty && (
                    <div className="cart-items-header">
                      <span>Producto</span>
                      <span>Cantidad</span>
                      <span>Total</span>
                    </div>
                )}
                {isEmpty ? (
                    <p className="cart-empty">
                      Tu carrito está vacío.
                      ¡Explora nuestro catálogo de productos frescos!
                    </p>
                ) : (
                    <div id="cart-items-list">
                      {cart.map(item => (
                          <ProductoCarrito key={item.id} item={item} />
                      ))}
                    </div>
                )}
              </div>

              <div className="delivery-card">
                <h2>Calendario de Despacho</h2>
                <p className="delivery-card-subtitle">
                  Selecciona tu día preferido para recibir tus productos del campo
                </p>
                <CalendarioDespacho seleccionado={diaDespacho} onSeleccionar={elegirDia} />
              </div>
            </Col>

            <Col xs={12} lg={4}>
              <aside className="cart-summary">
                <h2>Resumen del Pedido</h2>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span className="value">{formatPrice(subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Envío estimado</span>
                  <span className="value">Gratis</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span className="value" data-testid="carrito-total">{formatPrice(subtotal)}</span>
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    id="checkout-button"
                    disabled={isEmpty}
                    onClick={() => navigate('/Checkout')}
                >
                  Proceder al Pago
                </button>
                <Link to="/Catalogue" className="link-muted keep-shopping-link keep-shopping-link-bottom">
                  + Agregar otro producto antes de pagar
                </Link>
                <p className="cart-secure-note">
                  🛡️ Compra 100% segura con Webpay. Despachos climatizados.
                </p>
              </aside>
            </Col>
          </Row>
        </Container>
      </main>
  );
}

export default ShoppingCart;
