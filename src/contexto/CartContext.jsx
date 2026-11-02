import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'huertohogar-cart';

// Recuperar carrito guardado
function getStoredCart() {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (!stored) return [];

        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error('Error al recuperar el carrito:', error);
        return [];
    }
}

// Unificar los datos de los productos
function normalizeProduct(product) {
    const unit = product.detail?.unit ?? product.unit ?? 'Unidad';
    const max = product.detail?.maxQuantity ?? product.maxQuantity;

    return {
        id: product.code ?? product.id,
        name: product.name,
        image: product.image ?? '',
        unit,
        unitPlural: product.detail?.unitPlural ?? product.unitPlural ?? `${unit}s`,
        unitPrice: Number(product.price ?? product.unitPrice),
        maxQuantity: max == null ? null : Number(max),
        originalUnitPrice: Number(product.originalPrice) > Number(product.price ?? product.unitPrice)
            ? Number(product.originalPrice)
            : null,
    };
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState(getStoredCart);

    // Guardar cambios en el navegador
    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        } catch (error) {
            console.error('Error al guardar el carrito:', error);
        }
    }, [cart]);

    // Agregar un producto
    function addToCart(product, quantity = 1) {
        const newItem = normalizeProduct(product);

        if (
            !newItem.id ||
            !newItem.name ||
            !Number.isFinite(newItem.unitPrice) ||
            newItem.unitPrice < 0
        ) {
            console.error('Los datos del producto no son válidos:', product);
            return;
        }

        const amount = Math.max(1, Math.floor(Number(quantity) || 1));

        setCart(currentCart => {
            const existing = currentCart.find(item => item.id === newItem.id);

            if (existing) {
                const max = newItem.maxQuantity ?? existing.maxQuantity ?? Infinity;

                return currentCart.map(item =>
                    item.id === newItem.id
                        ? {
                            ...item,
                            ...newItem,
                            quantity: Math.min(item.quantity + amount, max)
                        }
                        : item
                );
            }

            const max = newItem.maxQuantity ?? Infinity;

            return [
                ...currentCart,
                {
                    ...newItem,
                    quantity: Math.min(amount, max)
                }
            ];
        });
    }

    // Modificar cantidad desde el carrito
    function updateQuantity(id, quantity) {
        const amount = Math.floor(Number(quantity));

        if (!Number.isFinite(amount) || amount < 1) return;

        setCart(currentCart =>
            currentCart.map(item => {
                if (item.id !== id) return item;

                const max = item.maxQuantity ?? Infinity;

                return {
                    ...item,
                    quantity: Math.min(amount, max)
                };
            })
        );
    }

    // Eliminar un producto
    function removeFromCart(id) {
        setCart(currentCart =>
            currentCart.filter(item => item.id !== id)
        );
    }

    // Vaciar carrito
    function clearCart() {
        setCart([]);
    }

    // Calcular subtotal
    const subtotal = cart.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                subtotal
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// Permitir usar el carrito desde cualquier componente
export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart debe utilizarse dentro de CartProvider.');
    }

    return context;
}