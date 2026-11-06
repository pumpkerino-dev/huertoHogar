import { useCart } from '../contexto/useCart';
import { formatoPrecio as formatPrice } from '../utils/producto';


function ProductoCarrito({ item }) {

    const { updateQuantity, removeFromCart } = useCart();

    return (
        <article className="cart-item">

            {/* Información del producto */}
            <div className="cart-item-info">

                <div className="cart-item-thumb">
                    <img
                        src={item.image}
                        alt={item.name}
                    />
                </div>

                <div>
                    <div className="cart-item-name">
                        {item.name}
                    </div>

                    {item.originalUnitPrice != null && (
                        <div className="cart-item-unit receipt-original-price">
                            Precio normal: {formatPrice(item.originalUnitPrice)} / {item.unit}
                        </div>
                    )}

                    <div className="cart-item-unit">
                        {item.originalUnitPrice != null && 'Precio oferta: '}
                        {formatPrice(item.unitPrice)} / {item.unit}
                    </div>
                </div>

            </div>

            {/* Control de cantidad */}
            <div className="qty-control">

                <button
                    type="button"
                    aria-label={`Disminuir cantidad de ${item.name}`}
                    disabled={item.quantity <= 1}
                    onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                    }
                >
                    -
                </button>

                <span>
                    {item.quantity}
                </span>

                <button
                    type="button"
                    aria-label={`Aumentar cantidad de ${item.name}`}
                    disabled={
                        item.maxQuantity != null &&
                        item.quantity >= item.maxQuantity
                    }
                    onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                    }
                >
                    +
                </button>

            </div>

            {/* Precio total del producto */}
            <div className="cart-item-price">
                {formatPrice(item.unitPrice * item.quantity)}
            </div>

            {/* Eliminar producto */}
            <button
                type="button"
                className="cart-item-remove"
                onClick={() => removeFromCart(item.id)}
            >
                Eliminar
            </button>

        </article>
    );
}

export default ProductoCarrito;