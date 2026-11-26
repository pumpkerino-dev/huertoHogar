/*Css Especifico*/
import '../css/pages/login.css'
import '../App.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexto/useAuth'
import { mensajeDeError } from '../api'
import { normalizarRun, sugerenciasCorreo, validarLogin, validarRegistro } from '../utils/validation'
import { comunasDeRegion, regiones } from '../data/regiones'

const REGISTRO_VACIO = {
  run: '', nombre: '', apellidos: '', email: '', password: '', confirmar: '', fechaNacimiento: '',
  telefono: '', region: '', comuna: '', direccion: '', terminos: false,
}

// Clase de Bootstrap para pintar el borde del input en rojo si tiene error
const claseCampo = (errores, campo) => (errores[campo] ? 'is-invalid' : undefined)

function Login() {
  const navigate = useNavigate()
  const { iniciarSesion, registrarse } = useAuth()

  // ----- Iniciar sesión -----
  const [login, setLogin] = useState({ email: '', password: '' })
  const [erroresLogin, setErroresLogin] = useState({})
  const [mensajeLogin, setMensajeLogin] = useState({ texto: '', exito: false })

  // ----- Crear cuenta -----
  const [registro, setRegistro] = useState(REGISTRO_VACIO)
  const [erroresRegistro, setErroresRegistro] = useState({})
  const [mensajeRegistro, setMensajeRegistro] = useState({ texto: '', exito: false })

  const [enviando, setEnviando] = useState(false)

  const cambiarLogin = (e) => setLogin({ ...login, [e.target.name]: e.target.value })

  const cambiarRegistro = (e) => {
    const { name, value, type, checked } = e.target
    const cambios = { [name]: type === 'checkbox' ? checked : value }
    if (name === 'region') cambios.comuna = ''
    setRegistro({ ...registro, ...cambios })
  }

  // Admin y vendedor -> panel de administración; cliente -> su perfil
  const redirigirSegunRol = (usuario) =>
    navigate(usuario.rol === 'ADMIN' || usuario.rol === 'VENDEDOR' ? '/admin' : '/Profile')

  const enviarLogin = async (e) => {
    e.preventDefault()
    const errores = validarLogin(login)
    setErroresLogin(errores)
    if (Object.keys(errores).length > 0) {
      setMensajeLogin({ texto: Object.values(errores)[0], exito: false })
      return
    }

    setEnviando(true)
    try {
      const usuario = await iniciarSesion(login.email.trim(), login.password)
      setMensajeLogin({ texto: `¡Hola, ${usuario.nombre.split(' ')[0]}!`, exito: true })
      redirigirSegunRol(usuario)
    } catch (err) {
      setMensajeLogin({ texto: mensajeDeError(err, 'No se pudo iniciar sesión'), exito: false })
    } finally {
      setEnviando(false)
    }
  }

  const enviarRegistro = async (e) => {
    e.preventDefault()
    const errores = validarRegistro(registro)
    setErroresRegistro(errores)
    if (Object.keys(errores).length > 0) {
      setMensajeRegistro({ texto: Object.values(errores)[0], exito: false })
      return
    }

    setEnviando(true)
    try {
      const usuario = await registrarse({
        run: normalizarRun(registro.run),
        nombre: registro.nombre.trim(),
        apellidos: registro.apellidos.trim(),
        email: registro.email.trim(),
        password: registro.password,
        fechaNacimiento: registro.fechaNacimiento || null,
        telefono: registro.telefono.trim(),
        region: registro.region,
        comuna: registro.comuna,
        direccion: registro.direccion.trim(),
      })
      setMensajeRegistro({ texto: '¡Cuenta creada! Te llevamos a tu perfil...', exito: true })
      redirigirSegunRol(usuario)
    } catch (err) {
      setMensajeRegistro({ texto: mensajeDeError(err, 'No se pudo crear la cuenta'), exito: false })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <>
      <main>
        <section className="auth-section">
          <div className="auth-heading">
            <span className="auth-heading-icon">
              <img src="/img/logo.png" alt="Logo Huerto Hogar" />
            </span>
            <h1>HUERTO HOGAR</h1>
            <p className="auth-heading-subtitle">DEL CAMPO AL HOGAR</p>
          </div>

          <div className="auth-card">

            <form id="login-form" className="auth-col" noValidate onSubmit={enviarLogin}>
              <h2>Iniciar Sesión</h2>
              <p className="auth-col-subtitle">
                Bienvenido de vuelta, disfruta lo fresco del huerto
              </p>

              <label className="field-label" htmlFor="login-email">Correo Electrónico</label>
              <input type="email" id="login-email" name="email" placeholder="ejemplo@duoc.cl" autoComplete="username"
                list="login-email-sugerencias" maxLength={100}
                value={login.email} onChange={cambiarLogin} className={claseCampo(erroresLogin, 'email')} required />
              <datalist id="login-email-sugerencias">
                {sugerenciasCorreo(login.email).map((correo) => <option key={correo} value={correo} />)}
              </datalist>

              <label className="field-label" htmlFor="login-password">Contraseña</label>
              <input type="password" id="login-password" name="password" placeholder="••••••••"
                autoComplete="current-password" maxLength={10}
                value={login.password} onChange={cambiarLogin} className={claseCampo(erroresLogin, 'password')} required />

              <div className="field-row">
                <label className="checkbox-label">
                  <input type="checkbox" id="remember-me" name="remember" />
                  Recordarme
                </label>
                <Link to="/RecuperarContrasena" className="link-muted">Olvidé mi contraseña</Link>
              </div>

              <p className={`form-message${mensajeLogin.exito ? ' success' : ''}`} id="login-message" role="alert">
                {mensajeLogin.texto}
              </p>

              <button type="submit" className="btn btn-primary" disabled={enviando}>Iniciar Sesión</button>

              <div className="divider"><span>O continuar con</span></div>

              <div className="social-row">
                <button type="button" className="btn btn-social" data-provider="Google">
                  <img src="/img/google.png" alt="" className="social-icon" width="14" height="14" />
                  Google
                </button>
                <button type="button" className="btn btn-social" data-provider="Apple">
                  <img src="/img/apple.png" alt="" className="social-icon" width="14" height="14" />
                  Apple
                </button>
              </div>
            </form>

            <form id="register-form" className="auth-col" noValidate onSubmit={enviarRegistro}>
              <h2>Crear Cuenta</h2>
              <p className="auth-col-subtitle">
                Únete a la red y apoya a pequeños agricultores
              </p>

              <div className="field-grid">
                <div>
                  <label className="field-label" htmlFor="register-run">RUN</label>
                  <input type="text" id="register-run" name="run" placeholder="ej: 123456785" maxLength={12}
                    value={registro.run} onChange={cambiarRegistro} className={claseCampo(erroresRegistro, 'run')} required />
                </div>
                <div>
                  <label className="field-label" htmlFor="register-birth">Fecha de nacimiento (opcional)</label>
                  <input type="date" id="register-birth" name="fechaNacimiento" autoComplete="bday"
                    value={registro.fechaNacimiento} onChange={cambiarRegistro} className={claseCampo(erroresRegistro, 'fechaNacimiento')} />
                </div>
              </div>

              <div className="field-grid">
                <div>
                  <label className="field-label" htmlFor="register-name">Nombre</label>
                  <input type="text" id="register-name" name="nombre" placeholder="ej: María José" autoComplete="given-name" maxLength={50}
                    value={registro.nombre} onChange={cambiarRegistro} className={claseCampo(erroresRegistro, 'nombre')} required />
                </div>
                <div>
                  <label className="field-label" htmlFor="register-lastname">Apellidos</label>
                  <input type="text" id="register-lastname" name="apellidos" placeholder="ej: Silva Rojas" autoComplete="family-name" maxLength={100}
                    value={registro.apellidos} onChange={cambiarRegistro} className={claseCampo(erroresRegistro, 'apellidos')} required />
                </div>
              </div>

              <label className="field-label" htmlFor="register-email">Correo Electrónico</label>
              <input type="email" id="register-email" name="email" placeholder="ejemplo@gmail.com" autoComplete="email"
                list="register-email-sugerencias" maxLength={100}
                value={registro.email} onChange={cambiarRegistro} className={claseCampo(erroresRegistro, 'email')} required />
              <datalist id="register-email-sugerencias">
                {sugerenciasCorreo(registro.email).map((correo) => <option key={correo} value={correo} />)}
              </datalist>

              <div className="field-grid">
                <div>
                  <label className="field-label" htmlFor="register-password">Contraseña</label>
                  <input type="password" id="register-password" name="password" placeholder="8 a 10 caracteres" autoComplete="new-password"
                    minLength={8} maxLength={10}
                    value={registro.password} onChange={cambiarRegistro} className={claseCampo(erroresRegistro, 'password')} required />
                </div>
                <div>
                  <label className="field-label" htmlFor="register-confirm-password">Confirmar Contraseña</label>
                  <input type="password" id="register-confirm-password" name="confirmar" placeholder="Repite tu contraseña" autoComplete="new-password"
                    minLength={8} maxLength={10}
                    value={registro.confirmar} onChange={cambiarRegistro} className={claseCampo(erroresRegistro, 'confirmar')} required />
                </div>
              </div>

              <label className="field-label" htmlFor="register-phone">Teléfono (opcional)</label>
              <input type="tel" id="register-phone" name="telefono" placeholder="ej: +56 9 1234 5678" autoComplete="tel"
                value={registro.telefono} onChange={cambiarRegistro} className={claseCampo(erroresRegistro, 'telefono')} />

              <div className="field-grid field-grid-zona">
                <div>
                  <label className="field-label" htmlFor="register-region">Región</label>
                  <select id="register-region" name="region" autoComplete="address-level1"
                    value={registro.region} onChange={cambiarRegistro} className={claseCampo(erroresRegistro, 'region')} required>
                    <option value="">Selecciona una región</option>
                    {regiones.map((r) => <option key={r.id} value={r.nombre}>{r.nombre}</option>)}
                  </select>
                </div>
                <div>
                  <label className="field-label" htmlFor="register-comuna">Comuna</label>
                  <select id="register-comuna" name="comuna" autoComplete="address-level2" disabled={!registro.region}
                    value={registro.comuna} onChange={cambiarRegistro} className={claseCampo(erroresRegistro, 'comuna')} required>
                    <option value="">{registro.region ? 'Selecciona una comuna' : 'Primero elige la región'}</option>
                    {comunasDeRegion(registro.region).map((c) => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                  </select>
                </div>
              </div>

              <label className="field-label" htmlFor="register-address">Dirección de Despacho</label>
              <input type="text" id="register-address" name="direccion" placeholder="Calle y número, depto." autoComplete="street-address"
                maxLength={300}
                value={registro.direccion} onChange={cambiarRegistro} className={claseCampo(erroresRegistro, 'direccion')} required />

              <label className="checkbox-label terms-label">
                <input type="checkbox" id="accept-terms" name="terminos"
                  checked={registro.terminos} onChange={cambiarRegistro} required />
                <span>
                  Acepto los <Link to="/TerminoCondiciones">Términos y Condiciones</Link>
                  {' '}y las <Link to="/PoliticaDeDespacho">Políticas de Envío</Link>.
                </span>
              </label>

              <p className={`form-message${mensajeRegistro.exito ? ' success' : ''}`} id="register-message" role="alert">
                {mensajeRegistro.texto}
              </p>

              <button type="submit" className="btn btn-primary" disabled={enviando}>Crear Cuenta</button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}

export default Login
