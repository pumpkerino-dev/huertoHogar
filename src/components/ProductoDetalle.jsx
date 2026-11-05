import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useProductos } from '../hooks/useCatalogo';
import { useCart } from '../contexto/useCart';

/* CSS específico */
import '../css/pages/products.css';
import '../App.css';

function formatOfferPrice(price) {
    return `$${Math.round(Number(price)).toLocaleString('es-CL')}`;
}

function ProductoDetalle() {

    const { code } = useParams();
    const { productos, cargando } = useProductos();
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    function handleAddToCart() {
        addToCart(product, quantity);
        setAdded(true);

        setTimeout(() => {
            setAdded(false);
        }, 1000);
    }
    const product = productos.find(
        (item) => item.code === code
    );

    const hasOffer = product && Number(product.originalPrice) > Number(product.price);

    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(null);
    const [activeThumbnail, setActiveThumbnail] = useState(-1);

    // Al cambiar de producto (otra URL), se reinician cantidad e imagen.
    // Se hace durante el render (patrón recomendado por React) en vez de en un useEffect.
    const [codigoMostrado, setCodigoMostrado] = useState(code);
    if (code !== codigoMostrado) {
        setCodigoMostrado(code);
        setQuantity(1);
        setActiveImage(null);
        setActiveThumbnail(-1);
    }

    if (!product && cargando) {
        return (
            <main className="container product-page">
                <p>Cargando producto...</p>
            </main>
        );
    }

    if (!product) {
        return (
            <main className="container product-page">
                <h1>Producto no encontrado</h1>
                <Link to="/Catalogue">Volver al catálogo</Link>
            </main>
        );
    }

    const detail = product.detail;

    function decreaseQuantity() {
        setQuantity(current => Math.max(1, current - 1));
    }

    function increaseQuantity() {
        setQuantity(current => Math.min(detail.maxQuantity, current + 1));
    }

    return (
        <main className="container product-page">

            <section className="product-main-grid">

                <div className="product-gallery">

                    <div className="main-image-wrapper">
                        <img
                            src={activeImage || product.image}
                            alt={product.name}
                            className="main-image"
                        />
                    </div>

                    <div className="thumbnail-list">

                        {detail.thumbnails.map((image, index) => (

                            <button
                                key={image}
                                type="button"
                                className={`thumb-btn ${activeThumbnail === index ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveImage(image);
                                    setActiveThumbnail(index);
                                }}
                            >
                                <img
                                    src={image}
                                    alt={`Miniatura ${index + 1} de ${product.name}`}
                                />
                            </button>

                        ))}

                    </div>

                </div>

                <div className="product-details">

                    <div className="product-status">
                        <span className="badge-available">
                            DISPONIBLE
                        </span>
                    </div>

                    <h1 className="product-title">
                        {product.name}
                    </h1>

                    <div className="product-price">
                        {hasOffer && (
                            <span className="price-old">
            {formatOfferPrice(product.originalPrice)}
        </span>
                        )}

                        <span className="price-amount">
        {hasOffer
            ? formatOfferPrice(product.price)
            : detail.priceDisplay}
    </span>

                        <span className="price-unit">
        {detail.priceUnit}
    </span>
                    </div>

                    <p className="product-description">
                        {detail.description}
                    </p>

                    <div className="info-box">

                        <h4 className="info-box-title">
                            {detail.infoTitle}
                        </h4>

                        {detail.infoRows.map((row, index) => (

                            <div className="info-row" key={index}>

                                <span className="info-label">
                                    {row.label}:
                                </span>

                                <span className={`info-value ${row.className || 'text-dark'}`}>
                                    {row.value}
                                </span>

                            </div>

                        ))}

                    </div>

                    <div className="eco-alert">

                        <img
                            src="/img/check-icon.png"
                            alt="Hoja"
                            className="eco-icon"
                        />

                        <div className="eco-text">
                            <strong>{detail.ecoTitle}</strong>
                            <p>{detail.ecoDescription}</p>
                        </div>

                    </div>

                    <div className="purchase-actions">

                        <div className="quantity-selector">

                            <button
                                className="qty-btn"
                                type="button"
                                onClick={decreaseQuantity}
                                disabled={quantity <= 1}
                            >
                                -
                            </button>

                            <span className="qty-current">
                                {quantity} {quantity === 1 ? detail.unit : detail.unitPlural}
                            </span>

                            <button
                                className="qty-btn"
                                type="button"
                                onClick={increaseQuantity}
                                disabled={quantity >= detail.maxQuantity}
                            >
                                +
                            </button>

                        </div>

                        <button
                            className="btn-add-cart-large"
                            type="button"
                            onClick={handleAddToCart}
                            disabled={added}
                        >
                            {added ? '✓ Añadido' : 'Añadir al Carrito'}
                        </button>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default ProductoDetalle;
