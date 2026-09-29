/*Css Especifico*/
import '../css/layout/header.css'
/*Css Reutilizable*/
import '../css/components/buttons.css'
import '../css/components/forms.css'
/*Css General*/
import '../css/base/variables.css'
import '../css/base/reset.css'
/*Reglas Responsive*/
import '../css/responsive.css'

function Header() {
    return(
        <>
<header className="site-header">
    <div className="header-inner">
        <a href="/Home" className="brand">

            <span className="brand-icon">
                <img
                        src="img/logo.png"
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
        <div className="search-bar">

            <span className="search-icon">
                <img
                        src="img/lupa.png"
                        alt="Buscar"
                />
            </span>

            <input
                    type="text"
                    placeholder="Buscar frutas, verduras, orgánicos..."
            />

            <button
                    className="search-filter"
                    type="button"
                    aria-label="Filtros"
                    id="filter-toggle"
            >
                <img
                        src="img/filtro.png"
                        alt="Filtros"
                />
            </button>

        </div>
        <a
                href="/Login"
                className="account-link"
        >

            <span className="account-icon">

                <img
                        src="img/icono-usuario.png"
                        alt="Cuenta"
                />

            </span>

            Mi Cuenta

        </a>
        <a
                href="/ShoppingCart"
                className="cart-link"
        >
            <span className="cart-icon">

                <img
                        src="img/carrito.png"
                        alt="Carrito"
                />
            </span>
            <span className="cart-info">

                <span className="cart-title">
                    Carrito
                </span>

                <span className="cart-total">
                    $0
                </span>
            </span>
        </a>
    </div>
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
    )
}

export default Header