/*Css Especifico*/
import '../css/pages/cart.css'
/*Css Reutilizable*/
import '../css/components/buttons.css'
import '../css/components/forms.css'
/*Css General*/
import '../css/base/variables.css'
import '../css/base/reset.css'
/*Reglas Responsive*/
import '../css/responsive.css'

function ShoppingCart() {
    return(
        <>
  <main>
    <section className="cart-section">
      <div className="cart-section-header">
        <h1>Tu Carrito de Compras</h1>
        <a href="/Catalogue" className="link-muted keep-shopping-link">&larr; Seguir Comprando</a>
      </div>

      <div className="cart-main">
        <div className="cart-items" id="cart-items">
          <div className="cart-items-header">
            <span>Producto</span>
            <span>Cantidad</span>
            <span>Total</span>
          </div>
          <div id="cart-items-list">

          </div>
        </div>

        <p classNameName="cart-empty" id="cart-empty" style={{ display: "none" }}>
          Tu carrito está vacío. ¡Explora nuestro catálogo de productos frescos!
        </p>

        <div className="delivery-card">
          <h2>Calendario de Despacho</h2>
          <p className="delivery-card-subtitle">Selecciona tu día preferido para recibir tus productos del campo</p>
          <div className="delivery-days" id="delivery-days">

          </div>
        </div>
      </div>

      <aside className="cart-summary">
        <h2>Resumen del Pedido</h2>

        <div className="summary-row">
          <span>Subtotal</span>
          <span className="value" id="summary-subtotal">$0 CLP</span>
        </div>
        <div className="summary-row">
          <span>IVA (19%)</span>
          <span className="value" id="summary-iva">$0 CLP</span>
        </div>
        <div className="summary-row">
          <span>Envío estimado</span>
          <span className="value" id="summary-shipping">Gratis</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span className="value" id="summary-total">$0 CLP</span>
        </div>

        <button type="button" className="btn btn-primary" id="checkout-button">
          Proceder al Pago
        </button>

        <a href="/Catalogue" className="link-muted keep-shopping-link keep-shopping-link-bottom">
          + Agregar otro producto antes de pagar
        </a>

        <p className="cart-secure-note">
          🛡️ Compra 100% segura con Webpay. Despachos climatizados.
        </p>
      </aside>
    </section>
  </main>        
        </>
    )   
}

export default ShoppingCart