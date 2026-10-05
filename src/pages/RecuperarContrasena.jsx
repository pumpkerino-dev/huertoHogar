/*Css Especifico*/
import '../css/pages/recuperar-contrasena.css'
import '../App.css'

function RecuperarContrasena() {
    return(
        <>
  <main>
    <section className="recovery-section">
      <div className="recovery-card">

        <div className="recovery-step" data-step="email">
          <h1>Recuperar Contraseña</h1>
          <p className="recovery-card-subtitle">
            Ingresa el correo con el que creaste tu cuenta y te enviaremos un código para restablecer tu contraseña.
          </p>
          <form id="recovery-email-form" novalidate>
            <label className="field-label" for="recovery-email">Correo Electrónico</label>
            <input type="email" id="recovery-email" placeholder="ejemplo@correo.cl" required />

            <p className="form-message" id="recovery-email-message" role="alert"></p>

            <button type="submit" className="btn btn-primary">Enviar Código</button>
          </form>
        </div>

        <div className="recovery-step" data-step="code" hidden>
          <h1>Ingresa tu Código</h1>
          <p className="recovery-card-subtitle">
            Enviamos un código de 6 dígitos a <strong id="recovery-code-target-email"></strong>.
          </p>

          <div className="recovery-demo-note">
            🧪 Como esta es una demo sin servidor de correo real, tu código es:
            <div className="recovery-demo-code" id="recovery-demo-code">000000</div>
          </div>

          <form id="recovery-code-form" novalidate>
            <label className="field-label" for="recovery-code">Código de Verificación</label>
            <input type="text" id="recovery-code" placeholder="123456" maxlength="6" required />

            <p className="form-message" id="recovery-code-message" role="alert"></p>

            <button type="submit" className="btn btn-primary">Verificar Código</button>
          </form>
          <button type="button" className="recovery-link-button" id="recovery-back-to-email">
            ¿Correo equivocado? Volver atrás
          </button>
        </div>

        <div className="recovery-step" data-step="new-password" hidden>
          <h1>Crea tu Nueva Contraseña</h1>
          <p className="recovery-card-subtitle">
            Elige una contraseña nueva para tu cuenta.
          </p>
          <form id="recovery-password-form" novalidate>
            <label className="field-label" for="recovery-new-password">Nueva Contraseña</label>
            <input type="password" id="recovery-new-password" placeholder="Mínimo 8 caracteres" minlength="8" required />

            <label className="field-label" for="recovery-confirm-password">Confirmar Contraseña</label>
            <input type="password" id="recovery-confirm-password" placeholder="Repite tu contraseña" minlength="8" required />

            <p className="form-message" id="recovery-password-message" role="alert"></p>

            <button type="submit" className="btn btn-primary">Guardar Nueva Contraseña</button>
          </form>
        </div>

        <div className="recovery-step recovery-success" data-step="done" hidden>
          <div className="recovery-success-icon">✅</div>
          <h1>¡Contraseña Actualizada!</h1>
          <p className="recovery-card-subtitle">
            Ya puedes iniciar sesión con tu nueva contraseña.
          </p>
          <a href="/Login" className="btn btn-primary" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>
            Ir a Iniciar Sesión
          </a>
        </div>

      </div>
    </section>
  </main>        
        </>
    )
}

export default RecuperarContrasena