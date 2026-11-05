import { Form } from "react-bootstrap";

/**
 * Campo de formulario reutilizable (Bootstrap): etiqueta + input + mensaje de error.
 * Sirve para los dos enfoques del tutorial de formularios:
 *  - Controlado (useState): se le pasan "nombre", "valor" y "onChange".
 *  - React Hook Form: se le pasa "registro={register('campo')}" y RHF maneja el valor.
 */
function Campo({ id, nombre, etiqueta, valor, error, onChange, ayuda, registro, children, ...props }) {
  const conexion = registro ?? { name: nombre, value: valor ?? "", onChange };
  return (
    <Form.Group controlId={id}>
      <Form.Label className="small mb-1">{etiqueta}</Form.Label>
      {children ?? (
        <Form.Control size="sm" {...conexion} isInvalid={Boolean(error)} {...props} />
      )}
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      {ayuda && <Form.Text>{ayuda}</Form.Text>}
    </Form.Group>
  );
}

export default Campo;
