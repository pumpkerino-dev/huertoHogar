import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexto/useCart';

function formatOfferPrice(price) {
    return `$${Math.round(Number(price)).toLocaleString('es-CL')}`;
}

function OfertasDestac({ product }) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);
    const hasOffer = Number(product.originalPrice) > Number(product.price);

    function handleAddToCart() {
        addToCart(product, 1);
        setAdded(true);

        setTimeout(() => {
            setAdded(false);
        }, 1000);
    }

    return (
        <div className="product-card">

            {/* Imagen del producto */}
            <Link to={`/Product/${product.code}`}>
                <div className="product-img-wrapper">
                    <img
                        src={product.image}
                        alt={product.name}
                    />
                </div>
            </Link>

            <div className="product-info">

                <span className="product-origin">
                    {product.originLabel}
                </span>

                {/* Nombre del producto */}
                <h3 className="product-name">
                    <Link to={`/Product/${product.code}`}>
                        {product.name}
                    </Link>
                </h3>

                <div className="product-pricing">
                    {hasOffer && (
                        <span className="price-old">
            {formatOfferPrice(product.originalPrice)}
        </span>
                    )}

                    <span className="price-current">
        {hasOffer
            ? formatOfferPrice(product.price)
            : product.priceLabel}
    </span>
                </div>

                {/* Botón independiente del enlace */}
                <button
                    type="button"
                    className="btn-add-cart"
                    onClick={handleAddToCart}
                    disabled={added}
                >
                    {added ? '✓ Añadido' : 'Añadir al Carrito'}
                </button>

            </div>
        </div>
    );
}

export default OfertasDestac;