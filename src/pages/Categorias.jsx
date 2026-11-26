import { Container, Col, Nav, Row, Badge } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';
import ProductoCatalogo from '../components/ProductoCatalogo';
import { useCategorias, useProductos } from '../hooks/useCatalogo';
import '../css/pages/product-catalog.css';
import '../App.css';

/**
 * CATEGORÍAS (categorias.html de la plantilla): menú de categorías traídas del backend
 * y los productos de la categoría elegida (/Categorias/frutas).
 */
function Categorias() {
    const { id } = useParams();
    const { categorias } = useCategorias();
    const { productos, cargando, error } = useProductos();
    const actual = categorias.find((c) => c.id === id) ?? categorias[0];
    const visibles = actual ? productos.filter((p) => p.category === actual.id) : [];

    return (
        <main>
            <Container className="py-4">
                <h1 className="h3 mb-3">Categorías</h1>
                <Row className="g-4">
                    <Col xs={12} lg={3}>
                        <Nav variant="pills" className="flex-row flex-lg-column flex-nowrap overflow-auto gap-1" aria-label="Categorías">
                            {categorias.map((c) => (
                                <Nav.Link key={c.id} as={NavLink} to={`/Categorias/${c.id}`} active={c.id === actual?.id}
                                    className="d-flex justify-content-between align-items-center text-nowrap gap-2">
                                    {c.nombre} <Badge bg="light" text="dark">{c.cantidadProductos}</Badge>
                                </Nav.Link>
                            ))}
                        </Nav>
                    </Col>
                    <Col xs={12} lg={9}>
                        {actual && (
                            <>
                                <h2 className="h5 mb-1">{actual.nombre}</h2>
                                <p className="text-muted small">{actual.descripcion}</p>
                            </>
                        )}
                        <div className="catalog-grid">
                            {cargando ? (
                                <p className="cart-empty" role="status">Cargando productos...</p>
                            ) : error ? (
                                <p className="cart-empty" role="alert">{error}</p>
                            ) : visibles.length > 0 ? (
                                visibles.map((product) => <ProductoCatalogo key={product.code} product={product} />)
                            ) : (
                                <p className="cart-empty" role="status">Esta categoría todavía no tiene productos.</p>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default Categorias;
