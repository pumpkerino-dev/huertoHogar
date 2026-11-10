import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import Campo from "./Campo";
import { useAuth } from "../contexto/useAuth";
import { mensajeDeError } from "../api";
import { sinErrores, validarPerfil } from "../utils/validation";

/**
 * Formulario "Información personal" del usuario logueado.
 * Se reutiliza en el perfil del cliente (/Profile) y en el perfil del admin (/admin/perfil).
 * El correo y el rol se muestran pero no se editan (el correo identifica la sesión).
 */
function FormularioPerfil() {
  const { usuario, actualizarPerfil } = useAuth();
  const [datos, setDatos] = useState(() => ({
    nombre: usuario?.nombre ?? "",
    telefono: usuario?.telefono ?? "",
    direccion: usuario?.direccion ?? "",
  }));
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState(null); // { tipo: "success" | "danger", texto }
  const [guardando, setGuardando] = useState(false);

  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  const guardar = async (e) => {
    e.preventDefault();
    const encontrados = validarPerfil(datos);
    setErrores(encontrados);
    if (!sinErrores(encontrados)) return;

    setGuardando(true);
    try {
      await actualizarPerfil({
        nombre: datos.nombre.trim(),
        telefono: datos.telefono.trim(),
        direccion: datos.direccion.trim(),
      });
      setMensaje({ tipo: "success", texto: "Datos actualizados correctamente." });
    } catch (err) {
      setMensaje({ tipo: "danger", texto: mensajeDeError(err, "No se pudieron guardar los cambios") });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Form noValidate onSubmit={guardar} aria-label="Información personal">
      <Row className="g-3">
        <Col xs={12}>
          <Campo id="perfil-nombre" nombre="nombre" etiqueta="Nombre completo"
            valor={datos.nombre} error={errores.nombre} onChange={cambiar} />
        </Col>
        <Col xs={12}>
          <Campo id="perfil-direccion" nombre="direccion" etiqueta="Dirección de despacho"
            valor={datos.direccion} error={errores.direccion} onChange={cambiar} placeholder="Calle, Número, Comuna" />
        </Col>
        <Col xs={12} md={6}>
          <Campo id="perfil-telefono" nombre="telefono" etiqueta="Teléfono" type="tel"
            valor={datos.telefono} error={errores.telefono} onChange={cambiar} placeholder="+56 9 1234 5678" />
        </Col>
        <Col xs={12} md={6}>
          <Campo id="perfil-email" nombre="email" etiqueta="Correo" type="email"
            valor={usuario?.email} readOnly ayuda="El correo no se puede cambiar." />
        </Col>
      </Row>

      {mensaje && (
        <Alert variant={mensaje.tipo} className="mt-3 mb-0 py-2" role={mensaje.tipo === "danger" ? "alert" : "status"}>
          {mensaje.texto}
        </Alert>
      )}

      <Button type="submit" variant="success" className="mt-3" disabled={guardando}>
        {guardando ? "Guardando..." : "Guardar cambios"}
      </Button>
    </Form>
  );
}

export default FormularioPerfil;
