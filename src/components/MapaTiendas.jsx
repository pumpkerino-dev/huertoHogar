import { useState } from 'react';
import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { TIENDAS, urlMapa } from '../data/tiendas';

/** Lista de tiendas y un mapa de Google Maps embebido que cambia según la tienda elegida. */
function MapaTiendas() {
  const [seleccionada, setSeleccionada] = useState(TIENDAS[0]);

  return (
    <Row className="g-3">
      <Col xs={12} md={4}>
        <ListGroup aria-label="Tiendas HuertoHogar"
          style={{ '--bs-list-group-active-bg': 'var(--bs-success)', '--bs-list-group-active-border-color': 'var(--bs-success)' }}>
          {TIENDAS.map((tienda) => (
            <ListGroup.Item key={tienda.id} action active={tienda.id === seleccionada.id}
              onClick={() => setSeleccionada(tienda)}>
              <div className="fw-semibold">
                {tienda.ciudad} {tienda.matriz && <Badge bg="warning" text="dark">Matriz</Badge>}
              </div>
              <div className="small">{tienda.direccion} · {tienda.region}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col xs={12} md={8}>
        <Card className="border-0 shadow-sm h-100 overflow-hidden">
          <iframe
            key={seleccionada.id}
            title={`Mapa de la tienda de ${seleccionada.ciudad}`}
            src={urlMapa(seleccionada)}
            className="w-100 h-100 border-0"
            style={{ minHeight: 320 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </Card>
      </Col>
    </Row>
  );
}

export default MapaTiendas;
