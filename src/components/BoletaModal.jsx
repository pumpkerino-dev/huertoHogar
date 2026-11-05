import { Button, Modal } from "react-bootstrap";
import BoletaDetalle from "./BoletaDetalle";

/** Modal "Mostrar boleta": envuelve BoletaDetalle para verla sin cambiar de página. */
function BoletaModal({ orden, onCerrar }) {
  return (
    <Modal show={Boolean(orden)} onHide={onCerrar} size="lg" centered scrollable>
      <Modal.Header closeButton className="py-2">
        <Modal.Title as="h5">Boleta {orden?.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BoletaDetalle orden={orden} />
      </Modal.Body>
      <Modal.Footer className="py-2">
        <Button size="sm" variant="secondary" onClick={onCerrar}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BoletaModal;
