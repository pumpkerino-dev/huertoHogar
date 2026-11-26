import { useState } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import Campo from "../Campo";
import { validarProducto } from "../../utils/producto";
import { sinErrores } from "../../utils/validation";

const VACIO = {
  codigo: "", nombre: "", descripcion: "", categoria: "", precio: "", precioOriginal: "",
  unidad: "kg", stock: "", stockCritico: "", origen: "", imagen: "",
};

const UNIDADES_SUGERIDAS = ["kg", "unidad", "bolsa 500 g", "frasco 500 g", "1 L", "atado"];
const ORIGENES_SUGERIDOS = ["Valle del Maule", "Región de O'Higgins", "Osorno", "Región de Los Lagos", "Región del Biobío", "Región de la Araucanía"];

/**
 * Formulario "Nuevo producto" / "Editar producto" (modal compacto para pantallas de notebook).
 * Con soloLectura=true es el "Detalle del producto" del VENDEDOR: muestra los datos sin poder cambiarlos.
 * Recibe las categorías desde la BD (prop), para incluir las que cree el admin.
 * (El padre le pone key={producto?.id ?? "nuevo"} para reiniciar el estado al cambiar.)
 */
function ProductoForm({ show, producto, categorias, onGuardar, onCancelar, soloLectura = false }) {
  const [datos, setDatos] = useState(() =>
    producto
      ? { ...VACIO, ...producto, precioOriginal: producto.precioOriginal ?? "", stockCritico: producto.stockCritico ?? "" }
      : { ...VACIO, categoria: categorias[0]?.id ?? "" }
  );
  const [errores, setErrores] = useState({});
  const [errorServidor, setErrorServidor] = useState("");
  const [guardando, setGuardando] = useState(false);

  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });
  // Props comunes de cada campo: valor, error y onChange según su nombre
  const campo = (nombre) => ({ nombre, valor: datos[nombre], error: errores[nombre], onChange: cambiar });

  const enviar = async (e) => {
    e.preventDefault();
    const encontrados = validarProducto(datos);
    setErrores(encontrados);
    if (!sinErrores(encontrados)) return;

    setGuardando(true);
    setErrorServidor("");
    try {
      await onGuardar({
        ...datos,
        codigo: datos.codigo.trim().toUpperCase(),
        nombre: datos.nombre.trim(),
        precio: Number(datos.precio),
        precioOriginal: datos.precioOriginal === "" ? null : Number(datos.precioOriginal),
        stock: Number(datos.stock),
        stockCritico: datos.stockCritico === "" ? null : Number(datos.stockCritico),
      });
    } catch (err) {
      setErrorServidor(err.message);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Modal show={show} onHide={onCancelar} size="xl" centered scrollable>
      <Form noValidate onSubmit={enviar}>
        <Modal.Header closeButton className="py-2">
          <Modal.Title as="h5">{soloLectura ? "Detalle del producto" : producto ? "Editar producto" : "Nuevo producto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-2">
          {errorServidor && <Alert variant="danger" className="py-2">{errorServidor}</Alert>}
          <fieldset disabled={soloLectura}>
          <Row className="g-2">
            <Col xs={6} lg={2}><Campo id="prod-codigo" etiqueta="Código" placeholder="FR001" {...campo("codigo")} /></Col>
            <Col xs={6} lg={4}><Campo id="prod-nombre" etiqueta="Nombre" {...campo("nombre")} /></Col>
            <Col xs={6} lg={3}>
              <Campo id="prod-categoria" etiqueta="Categoría">
                <Form.Select size="sm" name="categoria" value={datos.categoria} onChange={cambiar}>
                  {categorias.map((c) => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </Form.Select>
              </Campo>
            </Col>
            <Col xs={6} lg={3}>
              <Campo id="prod-origen" etiqueta="Origen" placeholder="Valle del Maule" list="prod-origen-sugerencias" {...campo("origen")} />
              <datalist id="prod-origen-sugerencias">
                {ORIGENES_SUGERIDOS.map((o) => <option key={o} value={o} />)}
              </datalist>
            </Col>

            <Col xs={6} lg={2}><Campo id="prod-precio" etiqueta="Precio (CLP)" type="number" min={0} {...campo("precio")} /></Col>
            <Col xs={6} lg={2}>
              <Campo id="prod-precioOriginal" etiqueta="Precio antes de oferta" type="number" min={0}
                placeholder="Sin oferta" {...campo("precioOriginal")} />
            </Col>
            <Col xs={6} lg={2}>
              <Campo id="prod-unidad" etiqueta="Unidad" placeholder="kg" list="prod-unidad-sugerencias" {...campo("unidad")} />
              <datalist id="prod-unidad-sugerencias">
                {UNIDADES_SUGERIDAS.map((u) => <option key={u} value={u} />)}
              </datalist>
            </Col>
            <Col xs={6} lg={2}><Campo id="prod-stock" etiqueta="Stock" type="number" min={0} {...campo("stock")} /></Col>
            <Col xs={6} lg={2}>
              <Campo id="prod-stockCritico" etiqueta="Stock crítico" type="number" min={0} placeholder="Ej: 10"
                ayuda="Avisa cuando el stock llegue a este valor" {...campo("stockCritico")} />
            </Col>
            <Col xs={6} lg={2}>
              <Form.Label className="small mb-1" htmlFor="prod-imagen">Imagen (ruta en /public)</Form.Label>
              <div className="d-flex align-items-center gap-2">
                <img src={datos.imagen || "/img/logo.png"} alt="" className="thumb-producto flex-shrink-0"
                  onError={(e) => { e.currentTarget.src = "/img/logo.png"; }} />
                <Form.Control size="sm" id="prod-imagen" name="imagen" value={datos.imagen ?? ""}
                  onChange={cambiar} placeholder="/img/prod-thumb-1.png" />
              </div>
            </Col>

            <Col xs={12}>
              <Campo id="prod-descripcion" etiqueta="Descripción" as="textarea" rows={3} maxLength={500} {...campo("descripcion")} />
            </Col>
          </Row>
          </fieldset>
        </Modal.Body>
        <Modal.Footer className="py-2">
          <Button size="sm" variant="secondary" onClick={onCancelar}>{soloLectura ? "Cerrar" : "Cancelar"}</Button>
          {!soloLectura && (
            <Button size="sm" type="submit" variant="success" disabled={guardando}>
              {guardando ? "Guardando..." : "Guardar"}
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ProductoForm;
