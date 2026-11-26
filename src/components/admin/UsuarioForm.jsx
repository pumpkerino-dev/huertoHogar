import { useState } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import Campo from "../Campo";
import CamposRegionComuna from "../CamposRegionComuna";
import { normalizarRun, sinErrores, sugerenciasCorreo, validarUsuario } from "../../utils/validation";
import { ROLES } from "../../utils/roles";


const VACIO = {
  run: "", nombre: "", apellidos: "", email: "", password: "", fechaNacimiento: "", telefono: "",
  region: "", comuna: "", direccion: "", rol: "CLIENTE",
};

/** Formulario "Nuevo usuario" / "Editar usuario" (incluye el tipo de usuario: Administrador, Vendedor o Cliente). */
function UsuarioForm({ show, usuario, esUsuarioActual, onGuardar, onCancelar }) {
  const esNuevo = !usuario;
  const [datos, setDatos] = useState(() => {
    if (!usuario) return VACIO;
    const copia = { ...VACIO, password: "" };
    Object.keys(VACIO).forEach((clave) => {
      if (clave !== "password" && usuario[clave] != null) copia[clave] = usuario[clave];
    });
    return copia;
  });
  const [errores, setErrores] = useState({});
  const [errorServidor, setErrorServidor] = useState("");
  const [guardando, setGuardando] = useState(false);

  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });
  const campo = (nombre) => ({ nombre, valor: datos[nombre], error: errores[nombre], onChange: cambiar });

  const enviar = async (e) => {
    e.preventDefault();
    const encontrados = validarUsuario(datos, esNuevo);
    setErrores(encontrados);
    if (!sinErrores(encontrados)) return;

    setGuardando(true);
    setErrorServidor("");
    try {
      await onGuardar({
        ...datos,
        run: normalizarRun(datos.run),
        nombre: datos.nombre.trim(),
        apellidos: datos.apellidos.trim(),
        email: datos.email.trim(),
        direccion: datos.direccion.trim(),
        fechaNacimiento: datos.fechaNacimiento || null,
      });
    } catch (err) {
      setErrorServidor(err.message);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Modal show={show} onHide={onCancelar} size="lg" centered scrollable>
      <Form noValidate onSubmit={enviar}>
        <Modal.Header closeButton className="py-2">
          <Modal.Title as="h5">{esNuevo ? "Nuevo usuario" : "Editar usuario"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-2">
          {errorServidor && <Alert variant="danger" className="py-2">{errorServidor}</Alert>}
          <Row className="g-2">
            <Col xs={12} md={4}>
              <Campo id="usr-run" etiqueta="RUN" placeholder="123456785" maxLength={12}
                ayuda="Sin puntos ni guion" {...campo("run")} />
            </Col>
            <Col xs={12} md={4}><Campo id="usr-nombre" etiqueta="Nombre" maxLength={50} {...campo("nombre")} /></Col>
            <Col xs={12} md={4}><Campo id="usr-apellidos" etiqueta="Apellidos" maxLength={100} {...campo("apellidos")} /></Col>
            <Col xs={12} md={6}>
              <Campo id="usr-email" etiqueta="Correo" type="email" maxLength={100} list="usr-email-sugerencias"
                disabled={esUsuarioActual} autoComplete="off"
                ayuda={esUsuarioActual ? "No puedes cambiar tu propio correo con la sesión iniciada." : "@duoc.cl, @profesor.duoc.cl o @gmail.com"}
                {...campo("email")} />
              <datalist id="usr-email-sugerencias">
                {sugerenciasCorreo(datos.email).map((correo) => <option key={correo} value={correo} />)}
              </datalist>
            </Col>
            <Col xs={12} md={6}>
              <Campo id="usr-password" type="password" autoComplete="new-password" maxLength={10}
                etiqueta={`Contraseña ${esNuevo ? "" : "(dejar vacía para no cambiarla)"}`}
                ayuda="8 a 10 caracteres, con mayúscula, minúscula y número" {...campo("password")} />
            </Col>
            <Col xs={12} md={4}>
              <Campo id="usr-fecha" etiqueta="Fecha de nacimiento" type="date" {...campo("fechaNacimiento")} />
            </Col>
            <Col xs={12} md={4}><Campo id="usr-telefono" etiqueta="Teléfono" type="tel" {...campo("telefono")} /></Col>
            <Col xs={12} md={4}>
              <Campo id="usr-rol" etiqueta="Tipo de usuario" error={errores.rol}
                ayuda={esUsuarioActual ? "No puedes cambiar tu propio rol." : undefined}>
                <Form.Select size="sm" name="rol" value={datos.rol} onChange={cambiar} disabled={esUsuarioActual}>
                  {ROLES.map((r) => <option key={r.valor} value={r.valor}>{r.texto}</option>)}
                </Form.Select>
              </Campo>
            </Col>
            <CamposRegionComuna idPrefijo="usr" region={datos.region} comuna={datos.comuna} errores={errores}
              onCambiar={(zona) => setDatos({ ...datos, ...zona })} />
            <Col xs={12}>
              <Campo id="usr-direccion" etiqueta="Dirección" placeholder="Calle y número" maxLength={300} {...campo("direccion")} />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="py-2">
          <Button size="sm" variant="secondary" onClick={onCancelar}>Cancelar</Button>
          <Button size="sm" type="submit" variant="success" disabled={guardando}>
            {guardando ? "Guardando..." : "Guardar"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default UsuarioForm;
