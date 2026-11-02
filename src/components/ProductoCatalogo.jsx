import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexto/CartContext.jsx';

function formatOfferPrice(price) {
    return `$${Math.round(Number(price)).toLocaleString('es-CL')}`;
}

function ProductoCatalogo({ product }) {
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
        <article
            className="product-card"
            data-category={product.category}
            data-origin={product.origin}
            data-certification={product.certification}
            data-price={product.price}
        >
            <Link to={`/Product/${product.code}`}>
                <div className="card-img-wrapper">
                    <img src={product.image} alt={product.name} />
                </div>
            </Link>

            <div className="card-body">
                <h3 className="card-title">
                    <Link to={`/Product/${product.code}`}>
                        {product.name}
                    </Link>
                </h3>

                <p className="card-desc">
                    {product.description}
                </p>

                <div className="card-price-row">
                    {hasOffer && (
                        <span className="card-price-original">
            {formatOfferPrice(product.originalPrice)}
        </span>
                    )}

                    <span className="card-price">
        {hasOffer
            ? formatOfferPrice(product.price)
            : product.priceLabel}
    </span>

                    <span className="card-stars">
        {product.stars}
    </span>
                </div>

                <button
                    type="button"
                    className="btn-add-cart"
                    onClick={handleAddToCart}
                    disabled={added}
                >
                    {added ? '✓ Añadido' : 'Añadir al carrito'}
                </button>
            </div>
        </article>
    );
}

export default ProductoCatalogo;