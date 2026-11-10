import { Alert } from 'react-bootstrap';

/** Mensajes de error y de éxito de las páginas del admin (Bootstrap Alert). */
function Avisos({ error, exito, onCerrarError, onCerrarExito }) {
  return (
    <>
      {error && <Alert variant="danger" dismissible onClose={onCerrarError}>{error}</Alert>}
      {exito && <Alert variant="success" dismissible onClose={onCerrarExito}>{exito}</Alert>}
    </>
  );
}

export default Avisos;
