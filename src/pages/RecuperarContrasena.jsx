/*Css Especifico*/
import '../css/pages/recuperar-contrasena.css'
import '../App.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mensajeDeError } from '../api'
import * as authService from '../services/authService'
import { isCorreoPermitido, isValidEmail, passwordsMatch, sugerenciasCorreo, validatePassword } from '../utils/validation'

// Pasos: 1) correo -> 2) código de 6 dígitos -> 3) nueva contraseña -> listo.
// El backend genera el código (POST /auth/recuperar), lo verifica (POST /auth/recuperar/verificar)
// y guarda la nueva contraseña (POST /auth/restablecer).
const claseCampo = (error) => (error ? 'is-invalid' : undefined)

function RecuperarContrasena() {
  const [paso, setPaso] = useState('email')
  const [email, setEmail] = useState('')
  const [codigo, setCodigo] = useState('')
  const [codigoDemo, setCodigoDemo] = useState('')
  const [password, setPassword] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  const ejecutar = async (accion, siguiente, porDefecto) => {
    setEnviando(true)
    setError('')
    try {
      await accion()
      setPaso(siguiente)
    } catch (err) {
      setError(mensajeDeError(err, porDefecto))
    } finally {
      setEnviando(false)
    }
  }

  const enviarCorreo = (e) => {
    e.preventDefault()
    if (!isValidEmail(email)) return setError('Ingresa un correo electrónico válido.')
    if (!isCorreoPermitido(email)) return setError('Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.')
    ejecutar(async () => {
      const respuesta = await authService.solicitarRecuperacion(email.trim())
      setCodigoDemo(respuesta.codigoDemo)
      setCodigo('')
    }, 'codigo', 'No se pudo enviar el código')
  }

  const enviarCodigo = (e) => {
    e.preventDefault()
    if (!/^\d{6}$/.test(codigo)) return setError('El código tiene 6 números.')
    ejecutar(() => authService.verificarCodigo(email.trim(), codigo), 'password', 'No se pudo verificar el código')
  }

  const enviarPassword = (e) => {
    e.preventDefault()
    const problemas = validatePassword(password)
    if (problemas.length > 0) return setError('Contraseña no válida: ' + problemas.join(' '))
    if (!passwordsMatch(password, confirmar)) return setError('Las contraseñas no coinciden.')
    ejecutar(() => authService.restablecerPassword(email.trim(), codigo, password), 'listo', 'No se pudo guardar la contraseña')
  }

  const volverAlCorreo = () => {
    setPaso('email')
    setError('')
  }

  return (
    <main>
      <section className="recovery-section">
        <div className="recovery-card">

          {paso === 'email' && (
            <div className="recovery-step">
              <h1>Recuperar Contraseña</h1>
              <p className="recovery-card-subtitle">
                Ingresa el correo con el que creaste tu cuenta y te enviaremos un código para restablecer tu contraseña.
              </p>
              <form noValidate onSubmit={enviarCorreo}>
                <label className="field-label" htmlFor="recovery-email">Correo Electrónico</label>
                <input type="email" id="recovery-email" placeholder="ejemplo@gmail.com" autoComplete="email" maxLength={100}
                  list="recovery-email-sugerencias" value={email} onChange={(e) => { setEmail(e.target.value); setError('') }}
                  className={claseCampo(error)} required />
                <datalist id="recovery-email-sugerencias">
                  {sugerenciasCorreo(email).map((correo) => <option key={correo} value={correo} />)}
                </datalist>
                <p className="form-message" role="alert">{error}</p>
                <button type="submit" className="btn btn-primary" disabled={enviando}>
                  {enviando ? 'Enviando...' : 'Enviar Código'}
                </button>
              </form>
              <Link to="/Login" className="recovery-link-button d-inline-block">Volver a Iniciar Sesión</Link>
            </div>
          )}

          {paso === 'codigo' && (
            <div className="recovery-step">
              <h1>Ingresa tu Código</h1>
              <p className="recovery-card-subtitle">
                Si <strong>{email.trim()}</strong> está registrado, le enviamos un código de 6 dígitos válido por 10 minutos.
              </p>
              <div className="recovery-demo-note">
                🧪 Como esta es una demo sin servidor de correo real, tu código es:
                <div className="recovery-demo-code" data-testid="codigo-demo">{codigoDemo}</div>
              </div>
              <form noValidate onSubmit={enviarCodigo}>
                <label className="field-label" htmlFor="recovery-code">Código de Verificación</label>
                <input type="text" id="recovery-code" placeholder="123456" maxLength={6} inputMode="numeric"
                  autoComplete="one-time-code" value={codigo} onChange={(e) => { setCodigo(e.target.value.replace(/\D/g, '')); setError('') }}
                  className={claseCampo(error)} required />
                <p className="form-message" role="alert">{error}</p>
                <button type="submit" className="btn btn-primary" disabled={enviando}>
                  {enviando ? 'Verificando...' : 'Verificar Código'}
                </button>
              </form>
              <button type="button" className="recovery-link-button" onClick={volverAlCorreo}>
                ¿Correo equivocado? Volver atrás
              </button>
            </div>
          )}

          {paso === 'password' && (
            <div className="recovery-step">
              <h1>Crea tu Nueva Contraseña</h1>
              <p className="recovery-card-subtitle">
                Elige una contraseña nueva para tu cuenta: entre 8 y 10 caracteres, con mayúscula, minúscula y número.
              </p>
              <form noValidate onSubmit={enviarPassword}>
                <label className="field-label" htmlFor="recovery-new-password">Nueva Contraseña</label>
                <input type="password" id="recovery-new-password" placeholder="8 a 10 caracteres" autoComplete="new-password"
                  minLength={8} maxLength={10} value={password} onChange={(e) => { setPassword(e.target.value); setError('') }}
                  className={claseCampo(error)} required />

                <label className="field-label" htmlFor="recovery-confirm-password">Confirmar Contraseña</label>
                <input type="password" id="recovery-confirm-password" placeholder="Repite tu contraseña" autoComplete="new-password"
                  minLength={8} maxLength={10} value={confirmar} onChange={(e) => { setConfirmar(e.target.value); setError('') }}
                  className={claseCampo(error)} required />

                <p className="form-message" role="alert">{error}</p>
                <button type="submit" className="btn btn-primary" disabled={enviando}>
                  {enviando ? 'Guardando...' : 'Guardar Nueva Contraseña'}
                </button>
              </form>
            </div>
          )}

          {paso === 'listo' && (
            <div className="recovery-step recovery-success">
              <div className="recovery-success-icon">✅</div>
              <h1>¡Contraseña Actualizada!</h1>
              <p className="recovery-card-subtitle">
                Ya puedes iniciar sesión con tu nueva contraseña.
              </p>
              <Link to="/Login" className="btn btn-primary" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>
                Ir a Iniciar Sesión
              </Link>
            </div>
          )}

        </div>
      </section>
    </main>
  )
}

export default RecuperarContrasena
