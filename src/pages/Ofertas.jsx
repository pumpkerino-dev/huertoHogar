import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductoCatalogo from '../components/ProductoCatalogo';
import { useProductos } from '../hooks/useCatalogo';
import { formatoCLP } from '../utils/producto';
import '../css/pages/product-catalog.css';
import '../App.css';

/** OFERTAS (ofertas.html de la plantilla): productos cuyo precio original es mayor al precio actual. */
function Ofertas() {
    const { productos, cargando, error } = useProductos();
    const ofertas = productos
        .filter((p) => Number(p.originalPrice) > Number(p.price))
        .sort((a, b) => (b.originalPrice - b.price) / b.originalPrice - (a.originalPrice - a.price) / a.originalPrice);
    const ahorroMaximo = ofertas.reduce((max, p) => Math.max(max, p.originalPrice - p.price), 0);

    return (
        <main>
            <Container className="py-4">
                <h1 className="h3 mb-1">Ofertas</h1>
                <p className="text-muted">
                    Productos frescos con descuento directo de nuestros agricultores
                    {ahorroMaximo > 0 && <> · ahorra hasta <strong>{formatoCLP(ahorroMaximo)}</strong></>}.
                </p>
                <div className="catalog-grid">
                    {cargando ? (
                        <p className="cart-empty" role="status">Cargando ofertas...</p>
                    ) : error ? (
                        <p className="cart-empty" role="alert">{error}</p>
                    ) : ofertas.length > 0 ? (
                        ofertas.map((product) => <ProductoCatalogo key={product.code} product={product} />)
                    ) : (
                        <p className="cart-empty" role="status">
                            Por ahora no hay ofertas. <Link to="/Catalogue">Ver todo el catálogo</Link>
                        </p>
                    )}
                </div>
            </Container>
        </main>
    );
}

export default Ofertas;
