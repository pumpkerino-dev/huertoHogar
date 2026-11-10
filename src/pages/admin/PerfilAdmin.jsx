import { Badge, Card, Col, Row } from "react-bootstrap";
import EncabezadoPagina from "../../components/admin/EncabezadoPagina";
import FormularioPerfil from "../../components/FormularioPerfil";
import { useAuth } from "../../contexto/useAuth";

/** PERFIL del administrador: reutiliza el mismo FormularioPerfil del perfil del cliente. */
function PerfilAdmin() {
  const { usuario } = useAuth();
  return (
    <>
      <EncabezadoPagina titulo="Mi perfil" descripcion="Tus datos como administrador de HuertoHogar." />
      <Row className="g-3">
        <Col lg={4}>
          <Card className="border-0 shadow-sm text-center h-100">
            <Card.Body>
              <i className="bi bi-person-circle text-success" style={{ fontSize: "4rem" }} aria-hidden="true" />
              <h2 className="h5 mt-2 mb-1">{usuario?.nombre}</h2>
              <p className="text-muted small mb-2">{usuario?.email}</p>
              <Badge bg="danger">Administrador</Badge>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white fw-semibold">Información personal</Card.Header>
            <Card.Body><FormularioPerfil /></Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default PerfilAdmin;
