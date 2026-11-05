import { Button, Modal } from "react-bootstrap";

/** Modal genérico de confirmación (ej: "¿Eliminar este producto?"). */
function ConfirmModal({ show, titulo = "Confirmar", mensaje, textoConfirmar = "Eliminar", onConfirmar, onCancelar }) {
  return (
    <Modal show={show} onHide={onCancelar} centered>
      <Modal.Header closeButton>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{mensaje}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancelar}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirmar}>
          {textoConfirmar}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
