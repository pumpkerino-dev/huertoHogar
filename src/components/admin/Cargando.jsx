import { Spinner } from 'react-bootstrap';

function Cargando() {
  return (
    <div className="text-center my-4" role="status" aria-label="Cargando">
      <Spinner animation="border" variant="success" />
    </div>
  );
}

export default Cargando;
