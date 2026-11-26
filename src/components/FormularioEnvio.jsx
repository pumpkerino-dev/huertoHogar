import { Col, Row } from "react-bootstrap";
import Campo from "./Campo";
import CamposRegionComuna from "./CamposRegionComuna";
import { sugerenciasCorreo } from "../utils/validation";

const INDICACIONES_SUGERIDAS = [
  "Dejar en conserjería",
  "Llamar al llegar",
  "Tocar el timbre",
  "Entregar en horario de oficina",
  "Casa con reja verde",
];

/** Datos de envío del Checkout (mismos campos que comprar.html de la plantilla). */
function FormularioEnvio({ envio, errores, onCambiar }) {
  const cambiar = (e) => onCambiar({ ...envio, [e.target.name]: e.target.value });
  const campo = (nombre) => ({ nombre, valor: envio[nombre], error: errores[nombre], onChange: cambiar });

  return (
    <Row className="g-2">
      <Col xs={12} md={6}><Campo id="envio-nombre" etiqueta="Nombre" autoComplete="given-name" maxLength={50} {...campo("nombre")} /></Col>
      <Col xs={12} md={6}><Campo id="envio-apellidos" etiqueta="Apellidos" autoComplete="family-name" maxLength={100} {...campo("apellidos")} /></Col>
      <Col xs={12}>
        <Campo id="envio-correo" etiqueta="Correo" type="email" autoComplete="email" maxLength={100}
          list="envio-correo-sugerencias" {...campo("correo")} />
        <datalist id="envio-correo-sugerencias">
          {sugerenciasCorreo(envio.correo).map((correo) => <option key={correo} value={correo} />)}
        </datalist>
      </Col>
      <Col xs={12} md={8}>
        <Campo id="envio-calle" etiqueta="Calle y número" autoComplete="address-line1" maxLength={300}
          placeholder="Av. Providencia 1245" {...campo("calle")} />
      </Col>
      <Col xs={12} md={4}>
        <Campo id="envio-departamento" etiqueta="Departamento (opcional)" autoComplete="address-line2" maxLength={100}
          placeholder="Depto 302" {...campo("departamento")} />
      </Col>
      <CamposRegionComuna idPrefijo="envio" region={envio.region} comuna={envio.comuna} errores={errores}
        onCambiar={(zona) => onCambiar({ ...envio, ...zona })} />
      <Col xs={12}>
        <Campo id="envio-indicaciones" etiqueta="Indicaciones para la entrega (opcional)" maxLength={300}
          list="envio-indicaciones-sugerencias" placeholder="Ej: Dejar en conserjería" {...campo("indicaciones")} />
        <datalist id="envio-indicaciones-sugerencias">
          {INDICACIONES_SUGERIDAS.map((texto) => <option key={texto} value={texto} />)}
        </datalist>
      </Col>
    </Row>
  );
}

export default FormularioEnvio;
