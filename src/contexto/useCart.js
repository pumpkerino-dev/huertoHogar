import { useContext } from 'react';
import { CartContext } from './cartContext';

// Permitir usar el carrito desde cualquier componente
export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart debe utilizarse dentro de CartProvider.');
    }

    return context;
}
