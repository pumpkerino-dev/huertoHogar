/*Css Especifico*/
import '../css/pages/login.css'
import '../App.css'
function Login() {
    return(
        <>
  <main>
    <section className="auth-section">
      <div className="auth-heading">
        <span className="auth-heading-icon">
          <img src="img/logo.png" alt="Logo Huerto Hogar" />
        </span>
        <h1>HUERTO HOGAR</h1>
        <p className="auth-heading-subtitle">DEL CAMPO AL HOGAR</p>
      </div>

      <div className="auth-card">

        <form id="login-form" className="auth-col" novalidate>
          <h2>Iniciar Sesión</h2>
          <p className="auth-col-subtitle">
            Bienvenido de vuelta, disfruta lo fresco del huerto
          </p>

          <label className="field-label" for="login-email">Correo Electrónico</label>
          <input type="email" id="login-email" name="email" placeholder="ejemplo@correo.cl" required />

          <label className="field-label" for="login-password">Contraseña</label>
          <input type="password" id="login-password" name="password" placeholder="••••••••" required />

          <div className="field-row">
            <label className="checkbox-label">
              <input type="checkbox" id="remember-me" name="remember" />
              Recordarme
            </label>
            <a href="/RecuperarContrasena" className="link-muted">Olvidé mi contraseña</a>
          </div>

          <p className="form-message" id="login-message" role="alert"></p>

          <button type="submit" className="btn btn-primary">Iniciar Sesión</button>

          <div className="divider"><span>O continuar con</span></div>

          <div className="social-row">
            <button type="button" className="btn btn-social" data-provider="Google">
              <img src="img/google.png" alt="" className="social-icon" width="14" height="14" />
              Google
            </button>
            <button type="button" className="btn btn-social" data-provider="Apple">
              <img src="img/apple.png" alt="" className="social-icon" width="14" height="14" />
              Apple
            </button>
          </div>
        </form>

        <form id="register-form" className="auth-col" novalidate>
          <h2>Crear Cuenta</h2>
          <p className="auth-col-subtitle">
            Únete a la red y apoya a pequeños agricultores
          </p>

          <label className="field-label" for="register-name">Nombre Completo</label>
          <input type="text" id="register-name" name="name" placeholder="ej: María José Silva" required />

          <label className="field-label" for="register-email">Correo Electrónico</label>
          <input type="email" id="register-email" name="email" placeholder="ejemplo@correo.cl" required />

          <div className="field-grid">
            <div>
              <label className="field-label" for="register-password">Contraseña</label>
              <input type="password" id="register-password" name="password" placeholder="Mínimo 8 caracteres" minlength="8" required />
            </div>
            <div>
              <label className="field-label" for="register-confirm-password">Confirmar Contraseña</label>
              <input type="password" id="register-confirm-password" name="confirm-password" placeholder="Repite tu contraseña" minlength="8" required />
            </div>
          </div>

          <label className="checkbox-label terms-label">
            <input type="checkbox" id="accept-terms" name="terms" required />
            <span>
              Acepto los <a href="/TerminoCondiciones" data-modal-target="modal-terminos">Términos y Condiciones</a>
              y las <a href="/PoliticaDeDespacho" data-modal-target="modal-politicas">Políticas de Envío</a>.
            </span>
          </label>

          <label className="field-label" for="register-phone">Teléfono</label>
          <input type="tel" id="register-phone" name="phone" placeholder="ej: +56 9 1234 5678" required />

          <label className="field-label" for="register-address">Dirección de Despacho (Regional / Santiago)</label>
          <input type="text" id="register-address" name="address" placeholder="Calle, Número, Comuna, Ciudad" required />

          <p className="form-message" id="register-message" role="alert"></p>

          <button type="submit" className="btn btn-primary">Crear Cuenta</button>
        </form>
      </div>
    </section>
  </main>        
        </>
    )
}

export default Login