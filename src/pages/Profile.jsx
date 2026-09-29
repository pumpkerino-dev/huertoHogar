/*Css Especifico*/
import '../css/pages/profile.css'
/*Css Reutilizable*/
import '../css/components/buttons.css'
import '../css/components/forms.css'
/*Css General*/
import '../css/base/variables.css'
import '../css/base/reset.css'
/*Reglas Responsive*/
import '../css/responsive.css'

function Profile() {
    return(
        <>
  <main>
    <section className="profile-section">
      <div className="profile-grid">

        <nav className="account-nav">
          <h2>Mi Cuenta</h2>
          <ul>
            <li><a href="#" data-panel="perfil">Mi Perfil</a></li>
            <li><a href="#" data-panel="pedidos" className="active">Mis Pedidos</a></li>
            <li><a href="#" data-panel="pedidos" data-scroll-to="tracking-card-anchor">Seguimiento</a></li>
            <li><a href="#" data-panel="direcciones">Direcciones</a></li>
            <li><a href="#" data-panel="pago">Métodos de Pago</a></li>
            <li><a href="#" data-panel="configuracion">Configuración</a></li>
          </ul>
        </nav>

        <div className="account-panel" id="panel-perfil" hidden>
          <div className="profile-card">
            <h2>Información Personal</h2>
            <form id="profile-form" novalidate>
              <label className="field-label" for="profile-name">Nombre Completo</label>
              <input type="text" id="profile-name" name="name" value="María González Silva" required />

              <label className="field-label" for="profile-address">Dirección de Despacho</label>
              <input type="text" id="profile-address" name="address" value="Av. Providencia 1245, Apt 402, Santiago" required />

              <div className="field-grid-2">
                <div>
                  <label className="field-label" for="profile-phone">Teléfono</label>
                  <input type="tel" id="profile-phone" name="phone" value="+56 9 8765 4321" required />
                </div>
                <div>
                  <label className="field-label" for="profile-email">Email</label>
                  <input type="email" id="profile-email" name="email" value="maria.gonzalez@email.cl" required />
                </div>
              </div>

              <label className="field-label" for="profile-payment">Método de Pago predeterminado</label>
              <input type="text" id="profile-payment" name="payment" value="Webpay Crédito ---- 5678" readonly />

              <p className="form-message" id="profile-message" role="alert"></p>

              <button type="submit" className="btn btn-primary" style={{ width: "auto", padding: "10px 22px" }}>
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>

        <div className="account-panel" id="panel-pedidos">
          <div className="tracking-card" id="tracking-card-anchor">
            <div className="tracking-card-header">
              <h2>Sigue tu Pedido Activo</h2>
              <span className="order-badge" id="order-badge">#HH-9824</span>
            </div>

            <div className="order-progress">
              <div className="progress-step">
                <span className="dot"></span>
                <span className="label">Preparando</span>
              </div>
              <div className="progress-step">
                <span className="dot"></span>
                <span className="label">En Camino</span>
              </div>
              <div className="progress-step">
                <span className="dot"></span>
                <span className="label">Entregado</span>
              </div>
            </div>

            <div className="delivery-route">
              <div className="route-track">
                <span className="dot-start"></span>
                <span className="line"></span>
                <span className="dot-end"></span>
              </div>
              <div>
                <h3>Ruta de Entrega</h3>
                <p id="route-origin">Huerto Maule (Talca)</p>
                <p id="route-destination">Providencia, Santiago</p>
                <p className="eta" id="route-eta">Llegada aprox: Hoy, 17:30 hrs</p>
              </div>
            </div>

            <div className="courier-row">
              <span className="courier-avatar">
                <img id="courier-avatar" src="img/icono-usuario.png" alt="Repartidor" />
                </span>
                <div>
                  <p className="courier-name" id="courier-name">Manuel Rojas Espinoza</p>
                  <p className="courier-role" id="courier-role">Despachador Climatizado · Camioneta Verde</p>
                </div>
              </div>
          </div>

          <div className="notifications-card">
            <h2>Notificaciones recientes</h2>
            <div className="notification-list" id="notification-list">
            </div>
          </div>

          <div className="history-card">
            <h2>Historial de Pedidos</h2>
            <div className="order-list" id="order-history-list">
            </div>
          </div>
        </div>

        <div className="account-panel" id="panel-direcciones" hidden>
          <div className="profile-card">
            <h2>Mis Direcciones</h2>
            <div className="address-list" id="address-list">
            </div> 
            <button type="button" className="btn btn-outline" id="add-address-button" style={{ width: "auto", padding: "10px 22px", marginTop: "14px" }}>
              + Agregar dirección
            </button>
          </div>
        </div>

        <div className="account-panel" id="panel-pago" hidden>
          <div className="profile-card">
            <h2>Métodos de Pago</h2>
            <div className="address-list" id="payment-method-list">

            </div>
            <button type="button" className="btn btn-outline" id="add-payment-method-button" style={{ width: "auto", padding: "10px 22px", marginTop: "14px" }}>
              + Agregar método de pago
            </button>
          </div>
        </div>


        <div className="account-panel" id="panel-configuracion" hidden>
          <div className="profile-card">
            <h2>Configuración de la Cuenta</h2>
            <form id="settings-form" novalidate>
              <label className="checkbox-label" style={{ marginTop: "14px" }}>
                <input type="checkbox" id="config-notif-pedidos" checked />
                Recibir notificaciones de pedidos por correo
              </label>
              <label className="checkbox-label" style={{ marginTop: "10px" }}>
                <input type="checkbox" id="config-notif-ofertas" checked />
                Recibir ofertas y novedades de HuertoHogar
              </label>
              <label className="field-label" for="config-idioma" style={{ marginTop: "16px" }}>Idioma</label>
              <select id="config-idioma">
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>

              <p className="form-message" id="settings-message" role="alert"></p>

              <button type="submit" className="btn btn-primary" style={{ width: "auto", padding: "10px 22px" }}>
                Guardar Configuración
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>        
        </>
    )
}

export default Profile