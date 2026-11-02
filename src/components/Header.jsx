/* CSS Específico */
import '../css/layout/header.css';
import '../App.css';

import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { productos } from '../pages/Catalogue.jsx';
import { useCart } from '../contexto/CartContext.jsx';

function Header({ onToggleFilters }) {

    const { subtotal } = useCart();

    const navigate = useNavigate();
    const location = useLocation();

    const [searchText, setSearchText] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Sincronizar el buscador con la URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);

        setSearchText(params.get('buscar') ?? '');
        setShowSuggestions(false);

    }, [location.search]);

    // Buscar coincidencias mientras se escribe
    const normalizedSearch = searchText.trim().toLowerCase();

    const searchResults = normalizedSearch
        ? productos.filter(product =>
            product.name.toLowerCase().includes(normalizedSearch)
        ).slice(0, 5)
        : [];

    // Buscar al presionar Enter
    function handleSearch(event) {

        if (event.key === 'Enter') {
            event.preventDefault();

            const term = searchText.trim();

            setShowSuggestions(false);

            navigate(
                term
                    ? `/Catalogue?buscar=${encodeURIComponent(term)}`
                    : '/Catalogue'
            );
        }

        // Cerrar sugerencias con Escape
        if (event.key === 'Escape') {
            setShowSuggestions(false);
        }
    }

    // Mostrar u ocultar filtros
    function handleFilterToggle() {

        if (location.pathname.toLowerCase() === '/catalogue') {
            onToggleFilters?.();
        } else {
            navigate('/Catalogue');
        }
    }

    return (
        <>
            <header className="site-header">

                <div className="header-inner">

                    {/* LOGO */}
                    <a href="/Home" className="brand">

                        <span className="brand-icon">
                            <img
                                src="/img/logo.png"
                                alt="Logo Huerto Hogar"
                            />
                        </span>

                        <span className="brand-text">

                            <span className="brand-title">
                                HUERTO HOGAR
                            </span>

                            <span className="brand-subtitle">
                                DEL CAMPO AL HOGAR
                            </span>

                        </span>

                    </a>

                    {/* BUSCADOR */}
                    <div
                        className="search-bar"
                        onBlur={(event) => {
                            if (!event.currentTarget.contains(event.relatedTarget)) {
                                setShowSuggestions(false);
                            }
                        }}
                    >

                        <span className="search-icon">
                            <img
                                src="/img/lupa.png"
                                alt="Buscar"
                            />
                        </span>

                        <input
                            type="text"
                            placeholder="Buscar frutas, verduras, orgánicos..."
                            value={searchText}
                            onChange={(event) => {
                                setSearchText(event.target.value);
                                setShowSuggestions(true);
                            }}
                            onKeyDown={handleSearch}
                            onFocus={() => setShowSuggestions(true)}
                        />

                        {/* BOTÓN DE FILTROS */}
                        <button
                            className="search-filter"
                            type="button"
                            aria-label="Filtros"
                            id="filter-toggle"
                            onClick={handleFilterToggle}
                        >
                            <img
                                src="/img/filtro.png"
                                alt="Filtros"
                            />
                        </button>

                        {/* SUGERENCIAS AUTOMÁTICAS */}
                        {showSuggestions && normalizedSearch && (

                            <div className="search-suggestions">

                                {searchResults.length > 0 ? (

                                    searchResults.map(product => (

                                        <Link
                                            key={product.code}
                                            to={`/Product/${product.code}`}
                                            className="search-suggestion"
                                            onClick={() => setShowSuggestions(false)}
                                        >

                                            <img
                                                src={product.image}
                                                alt={product.name}
                                            />

                                            <div className="suggestion-info">

                                                <strong>
                                                    {product.name}
                                                </strong>

                                                <span>
                                                    {product.priceLabel}
                                                </span>

                                            </div>

                                        </Link>

                                    ))

                                ) : (

                                    <p className="search-no-results">
                                        No se encontraron productos.
                                    </p>

                                )}

                            </div>

                        )}

                    </div>

                    {/* CUENTA */}
                    <a
                        href="/Login"
                        className="account-link"
                    >

                        <span className="account-icon">
                            <img
                                src="/img/icono-usuario.png"
                                alt="Cuenta"
                            />
                        </span>

                        Mi Cuenta

                    </a>

                    {/* CARRITO */}
                    <a
                        href="/ShoppingCart"
                        className="cart-link"
                    >

                        <span className="cart-icon">
                            <img
                                src="/img/carrito.png"
                                alt="Carrito"
                            />
                        </span>

                        <span className="cart-info">

                            <span className="cart-title">
                                Carrito
                            </span>

                            <span className="cart-total">
                                ${Math.round(subtotal).toLocaleString('es-CL')}
                            </span>

                        </span>

                    </a>

                </div>

                {/* NAVEGACIÓN */}
                <nav className="site-nav">

                    <ul>

                        <li>
                            <a href="/Nosotros">
                                Nosotros
                            </a>
                        </li>

                        <li>
                            <a href="/Catalogue?categoria=frutas">
                                Frutas
                            </a>
                        </li>

                        <li>
                            <a href="/Catalogue?categoria=verduras">
                                Verduras
                            </a>
                        </li>

                        <li>
                            <a href="/Catalogue?categoria=organicos">
                                Orgánicos
                            </a>
                        </li>

                        <li>
                            <a href="/Catalogue?categoria=lacteos">
                                Lácteos
                            </a>
                        </li>

                        <li>
                            <a href="/blog">
                                Blog
                            </a>
                        </li>

                    </ul>

                </nav>

            </header>
        </>
    );
}

export default Header;