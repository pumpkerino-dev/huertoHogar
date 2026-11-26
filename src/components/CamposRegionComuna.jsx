import { Col, Form } from "react-bootstrap";
import Campo from "./Campo";
import { comunasDeRegion, regiones } from "../data/regiones";

/**
 * Selectores de Región y Comuna dependientes (como en la plantilla del curso):
 * al cambiar la región se vacía la comuna y solo se ofrecen las comunas de esa región.
 * onCambiar recibe { region, comuna } para que el formulario padre actualice sus datos.
 */
function CamposRegionComuna({ idPrefijo, region, comuna, errores = {}, onCambiar }) {
  const comunas = comunasDeRegion(region);
  return (
    <>
      <Col xs={12} md={6}>
        <Campo id={`${idPrefijo}-region`} etiqueta="Región" error={errores.region}>
          <Form.Select size="sm" name="region" value={region ?? ""} isInvalid={Boolean(errores.region)}
            autoComplete="address-level1" onChange={(e) => onCambiar({ region: e.target.value, comuna: "" })}>
            <option value="">Selecciona una región</option>
            {regiones.map((r) => (
              <option key={r.id} value={r.nombre}>{r.nombre}</option>
            ))}
          </Form.Select>
        </Campo>
      </Col>
      <Col xs={12} md={6}>
        <Campo id={`${idPrefijo}-comuna`} etiqueta="Comuna" error={errores.comuna}>
          <Form.Select size="sm" name="comuna" value={comuna ?? ""} isInvalid={Boolean(errores.comuna)}
            autoComplete="address-level2" disabled={!region} onChange={(e) => onCambiar({ region, comuna: e.target.value })}>
            <option value="">{region ? "Selecciona una comuna" : "Primero elige la región"}</option>
            {comunas.map((c) => (
              <option key={c.id} value={c.nombre}>{c.nombre}</option>
            ))}
          </Form.Select>
        </Campo>
      </Col>
    </>
  );
}

export default CamposRegionComuna;
