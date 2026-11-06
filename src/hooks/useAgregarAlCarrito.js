import { useState } from 'react';
import { useCart } from '../contexto/useCart';

// Custom hook: agrega un producto al carrito y deja "added" en true por un segundo,
// para que el botón muestre "✓ Añadido". Lo usan ProductoCatalogo y OfertasDestac.
export function useAgregarAlCarrito(product) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    function handleAddToCart() {
        addToCart(product, 1);
        setAdded(true);

        setTimeout(() => {
            setAdded(false);
        }, 1000);
    }

    return { added, handleAddToCart };
}
