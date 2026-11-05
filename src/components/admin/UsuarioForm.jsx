import { useState } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import Campo from "../Campo";
import { sinErrores, validarUsuario } from "../../utils/validation";

const VACIO = { nombre: "", email: "", password: "", telefono: "", direccion: "", rol: "CLIENTE" };

/** Formulario "Nuevo usuario" / "Editar usuario" (incluye asignar el rol). */
function UsuarioForm({ show, usuario, esUsuarioActual, onGuardar, onCancelar }) {
  const esNuevo = !usuario;
  const [datos, setDatos] = useState(() =>
    usuario
      ? { ...VACIO, ...usuario, password: "", telefono: usuario.telefono ?? "", direccion: usuario.direccion ?? "" }
      : VACIO
  );
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
      await onGuardar({ ...datos, nombre: datos.nombre.trim(), email: datos.email.trim() });
    } catch (err) {
      setErrorServidor(err.message);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Modal show={show} onHide={onCancelar} centered scrollable>
      <Form noValidate onSubmit={enviar}>
        <Modal.Header closeButton className="py-2">
          <Modal.Title as="h5">{esNuevo ? "Nuevo usuario" : "Editar usuario"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-2">
          {errorServidor && <Alert variant="danger" className="py-2">{errorServidor}</Alert>}
          <Row className="g-2">
            <Col xs={12}><Campo id="usr-nombre" etiqueta="Nombre completo" {...campo("nombre")} /></Col>
            <Col xs={12}>
              <Campo id="usr-email" etiqueta="Correo" type="email" disabled={esUsuarioActual}
                ayuda={esUsuarioActual ? "No puedes cambiar tu propio correo con la sesión iniciada." : undefined}
                {...campo("email")} />
            </Col>
            <Col xs={12}>
              <Campo id="usr-password" type="password" autoComplete="new-password"
                etiqueta={`Contraseña ${esNuevo ? "" : "(dejar vacía para no cambiarla)"}`} {...campo("password")} />
            </Col>
            <Col xs={12} md={6}><Campo id="usr-telefono" etiqueta="Teléfono" {...campo("telefono")} /></Col>
            <Col xs={12} md={6}>
              <Campo id="usr-rol" etiqueta="Rol" ayuda={esUsuarioActual ? "No puedes cambiar tu propio rol." : undefined}>
                <Form.Select size="sm" name="rol" value={datos.rol} onChange={cambiar} disabled={esUsuarioActual}>
                  <option value="CLIENTE">Cliente</option>
                  <option value="ADMIN">Administrador</option>
                </Form.Select>
              </Campo>
            </Col>
            <Col xs={12}><Campo id="usr-direccion" etiqueta="Dirección" {...campo("direccion")} /></Col>
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
