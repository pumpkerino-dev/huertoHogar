import { createContext } from 'react';

// Contexto del carrito: { cart, addToCart, updateQuantity, removeFromCart, clearCart, subtotal }
// Misma estructura que la autenticación: cartContext.js + CartContext.jsx (Provider) + useCart.js (hook)
export const CartContext = createContext(null);
