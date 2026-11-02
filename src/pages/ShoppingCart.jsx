import { Link } from 'react-router-dom';
import { useCart } from '../contexto/CartContext.jsx';
import ProductoCarrito from '../components/ProductoCarrito.jsx';

import '../css/pages/cart.css';
import '../App.css';

function formatPrice(price) {
  return `$${Math.round(price).toLocaleString('es-CL')} CLP`;
}

function ShoppingCart() {
  const { cart, subtotal } = useCart();

  const isEmpty = cart.length === 0;

  return (
      <main>
        <section className="cart-section">

          <div className="cart-section-header">
            <h1>Tu Carrito de Compras</h1>

            <Link
                to="/Catalogue"
                className="link-muted keep-shopping-link"
            >
              &larr; Seguir Comprando
            </Link>
          </div>

          <div className="cart-main">

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
                        <ProductoCarrito
                            key={item.id}
                            item={item}
                        />
                    ))}

                  </div>
              )}

            </div>

            <div className="delivery-card">
              <h2>Calendario de Despacho</h2>

              <p className="delivery-card-subtitle">
                Selecciona tu día preferido para recibir
                tus productos del campo
              </p>

              <div className="delivery-days" id="delivery-days">
              </div>
            </div>

          </div>

          <aside className="cart-summary">

            <h2>Resumen del Pedido</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span className="value">
                            {formatPrice(subtotal)}
                        </span>
            </div>

            <div className="summary-row">
              <span>Envío estimado</span>
              <span className="value">Gratis</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span className="value">
                            {formatPrice(subtotal)}
                        </span>
            </div>

            <button
                type="button"
                className="btn btn-primary"
                id="checkout-button"
                disabled={isEmpty}
            >
              Proceder al Pago
            </button>

            <Link
                to="/Catalogue"
                className="link-muted keep-shopping-link keep-shopping-link-bottom"
            >
              + Agregar otro producto antes de pagar
            </Link>

            <p className="cart-secure-note">
              🛡️ Compra 100% segura con Webpay.
              Despachos climatizados.
            </p>

          </aside>

        </section>
      </main>
  );
}

export default ShoppingCart;