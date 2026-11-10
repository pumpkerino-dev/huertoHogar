/* CSS Específico */
import '../css/layout/header.css';
import '../App.css';

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useProductos } from '../hooks/useCatalogo';
import { buscarProductos } from '../utils/busqueda';
import { useCart } from '../contexto/useCart';
import { useAuth } from '../contexto/useAuth';
import { formatoCLP } from '../utils/producto';

function Header({ onToggleFilters }) {

    const { subtotal } = useCart();
    const { usuario, esAdmin, cerrarSesion } = useAuth();

    // Con sesión: muestra el primer nombre y lleva al panel (admin) o al perfil (cliente)
    const rutaCuenta = !usuario ? '/Login' : esAdmin ? '/admin' : '/Profile';
    const textoCuenta = usuario ? usuario.nombre.split(' ')[0] : 'Mi Cuenta';

    const navigate = useNavigate();
    const location = useLocation();

    const { productos } = useProductos();
    const enCatalogo = location.pathname.toLowerCase() === '/catalogue';

    // El texto del buscador se sincroniza con la URL (?buscar=...).
    // Se hace durante el render (patrón recomendado por React) en vez de en un useEffect.
    const busquedaEnUrl = new URLSearchParams(location.search).get('buscar') ?? '';
    const [searchText, setSearchText] = useState(busquedaEnUrl);
    const [ultimaBusquedaUrl, setUltimaBusquedaUrl] = useState(busquedaEnUrl);
    const [showSuggestions, setShowSuggestions] = useState(false);

    if (busquedaEnUrl !== ultimaBusquedaUrl) {
        setUltimaBusquedaUrl(busquedaEnUrl);
        setSearchText(busquedaEnUrl);
    }

    // Resultados con la MISMA función que usa el catálogo (utils/busqueda.js)
    const normalizedSearch = searchText.trim();
    const allResults = normalizedSearch ? buscarProductos(productos, normalizedSearch) : [];
    const searchResults = allResults.slice(0, 5); // en el menú se muestran máximo 5

    // URL del catálogo con la búsqueda (conserva otros filtros, como ?categoria=)
    function urlCatalogo(term) {
        const params = new URLSearchParams(enCatalogo ? location.search : '');
        if (term) params.set('buscar', term);
        else params.delete('buscar');
        const query = params.toString();
        return query ? `/Catalogue?${query}` : '/Catalogue';
    }

    // Mientras se escribe estando en el catálogo, los resultados se actualizan solos
    function handleSearchChange(event) {
        const value = event.target.value;
        setSearchText(value);
        setShowSuggestions(true);
        if (enCatalogo) {
            setUltimaBusquedaUrl(value.trim());
            navigate(urlCatalogo(value.trim()), { replace: true });
        }
    }

    // Buscar al presionar Enter
    function handleSearch(event) {

        if (event.key === 'Enter') {
            event.preventDefault();

            const term = searchText.trim();

            setShowSuggestions(false);

            navigate(urlCatalogo(term));
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
                            onChange={handleSearchChange}
                            aria-label="Buscar productos"
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
                                {allResults.length > searchResults.length && (
                                    <Link
                                        to={urlCatalogo(normalizedSearch)}
                                        className="search-suggestion search-see-all"
                                        onClick={() => setShowSuggestions(false)}
                                    >
                                        Ver los {allResults.length} resultados
                                    </Link>
                                )}

                            </div>

                        )}

                    </div>

                    {/* CUENTA */}
                    <Link
                        to={rutaCuenta}
                        className="account-link"
                        title={esAdmin ? 'Ir al panel de administración' : undefined}
                    >

                        <span className="account-icon">
                            <img
                                src="/img/icono-usuario.png"
                                alt="Cuenta"
                            />
                        </span>

                        {textoCuenta}

                    </Link>

                    {usuario && (
                        <button
                            type="button"
                            className="logout-link"
                            onClick={() => {
                                cerrarSesion();
                                navigate('/');
                            }}
                        >
                            Salir
                        </button>
                    )}

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
                                {formatoCLP(subtotal)}
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

                        {esAdmin && (
                            <li>
                                <Link to="/admin" className="nav-admin">
                                    Panel Admin
                                </Link>
                            </li>
                        )}

                    </ul>

                </nav>

            </header>
        </>
    );
}

export default Header;