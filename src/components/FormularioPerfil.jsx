import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import Campo from "./Campo";
import CamposRegionComuna from "./CamposRegionComuna";
import { useAuth } from "../contexto/useAuth";
import { mensajeDeError } from "../api";
import { sinErrores, validarPerfil } from "../utils/validation";

/**
 * Formulario "Información personal" del usuario logueado.
 * Se reutiliza en el perfil del cliente (/Profile) y en el perfil del admin (/admin/perfil).
 * El RUN, el correo y el rol se muestran pero no se editan (el correo identifica la sesión).
 */
function FormularioPerfil() {
  const { usuario, actualizarPerfil } = useAuth();
  const [datos, setDatos] = useState(() => ({
    nombre: usuario?.nombre ?? "",
    apellidos: usuario?.apellidos ?? "",
    fechaNacimiento: usuario?.fechaNacimiento ?? "",
    telefono: usuario?.telefono ?? "",
    region: usuario?.region ?? "",
    comuna: usuario?.comuna ?? "",
    direccion: usuario?.direccion ?? "",
  }));
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState(null); // { tipo: "success" | "danger", texto }
  const [guardando, setGuardando] = useState(false);

  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });
  const campo = (nombre) => ({ nombre, valor: datos[nombre], error: errores[nombre], onChange: cambiar });

  const guardar = async (e) => {
    e.preventDefault();
    const encontrados = validarPerfil(datos);
    setErrores(encontrados);
    if (!sinErrores(encontrados)) return;

    setGuardando(true);
    try {
      await actualizarPerfil({
        ...datos,
        nombre: datos.nombre.trim(),
        apellidos: datos.apellidos.trim(),
        telefono: datos.telefono.trim(),
        direccion: datos.direccion.trim(),
        fechaNacimiento: datos.fechaNacimiento || null,
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
        <Col xs={12} md={6}>
          <Campo id="perfil-nombre" etiqueta="Nombre" autoComplete="given-name" {...campo("nombre")} />
        </Col>
        <Col xs={12} md={6}>
          <Campo id="perfil-apellidos" etiqueta="Apellidos" autoComplete="family-name" {...campo("apellidos")} />
        </Col>
        <Col xs={12} md={6}>
          <Campo id="perfil-run" nombre="run" etiqueta="RUN" valor={usuario?.run} readOnly ayuda="El RUN no se puede cambiar." />
        </Col>
        <Col xs={12} md={6}>
          <Campo id="perfil-email" nombre="email" etiqueta="Correo" type="email"
            valor={usuario?.email} readOnly ayuda="El correo no se puede cambiar." />
        </Col>
        <Col xs={12} md={6}>
          <Campo id="perfil-fecha" etiqueta="Fecha de nacimiento (opcional)" type="date" autoComplete="bday"
            {...campo("fechaNacimiento")} />
        </Col>
        <Col xs={12} md={6}>
          <Campo id="perfil-telefono" etiqueta="Teléfono (opcional)" type="tel" autoComplete="tel"
            placeholder="+56 9 1234 5678" {...campo("telefono")} />
        </Col>
        <CamposRegionComuna idPrefijo="perfil" region={datos.region} comuna={datos.comuna} errores={errores}
          onCambiar={(zona) => setDatos({ ...datos, ...zona })} />
        <Col xs={12}>
          <Campo id="perfil-direccion" etiqueta="Dirección de despacho" autoComplete="street-address"
            placeholder="Calle y número" {...campo("direccion")} />
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
