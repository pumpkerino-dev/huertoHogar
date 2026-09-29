/*Css Especifico*/
import '../css/pages/product-catalog.css'
/*Css Reutilizable*/
import '../css/components/buttons.css'
import '../css/components/forms.css'
/*Css General*/
import '../css/base/variables.css'
import '../css/base/reset.css'
/*Reglas Responsive*/
import '../css/responsive.css'

function Catalogue() {
    return(
        <>
<main className="container catalog-page">

    <div className="catalog-layout">

        <aside className="catalog-sidebar">
            <h2 className="sidebar-title">Filtros Avanzados</h2>

            <div className="filter-group">
                <h3 className="filter-subtitle">CATEGORÍA</h3>

                <label className="custom-checkbox">
                    <input type="checkbox" data-filter="category" value="frutas"/>
                    <span className="checkmark"></span>
                    Frutas
                </label>

                <label className="custom-checkbox">
                    <input type="checkbox" data-filter="category" value="verduras"/>
                    <span className="checkmark"></span>
                    Verduras
                </label>

                <label className="custom-checkbox">
                    <input type="checkbox" data-filter="category" value="organicos"/>
                    <span className="checkmark"></span>
                    Orgánicos
                </label>

                <label className="custom-checkbox">
                    <input type="checkbox" data-filter="category" value="lacteos"/>
                    <span className="checkmark"></span>
                    Lácteos
                </label>
            </div>

            <div className="filter-group">
                <h3 className="filter-subtitle">ORIGEN</h3>

                <label className="custom-checkbox">
                    <input type="checkbox" data-filter="origin" value="maule"/>
                    <span className="checkmark"></span>
                    Valle del Maule
                </label>

                <label className="custom-checkbox">
                    <input type="checkbox" data-filter="origin" value="ohiggins"/>
                    <span className="checkmark"></span>
                    Región de O'Higgins
                </label>

                <label className="custom-checkbox">
                    <input type="checkbox" data-filter="origin" value="osorno"/>
                    <span className="checkmark"></span>
                    Osorno
                </label>

                <label className="custom-checkbox">
                    <input type="checkbox" data-filter="origin" value="apicultores-locales"/>
                    <span className="checkmark"></span>
                    Apicultores locales
                </label>
            </div>

            <div className="filter-group">
                <h3 className="filter-subtitle">CERTIFICACIÓN</h3>

                <label className="custom-checkbox">
                    <input type="checkbox" data-filter="certification" value="organica"/>
                    <span className="checkmark"></span>
                    Certificación Orgánica
                </label>

                <label className="custom-checkbox">
                    <input type="checkbox" data-filter="certification" value="sin-pesticidas"/>
                    <span className="checkmark"></span>
                    Sin Pesticidas
                </label>

                <label className="custom-checkbox">
                    <input type="checkbox" data-filter="certification" value="produccion-local"/>
                    <span className="checkmark"></span>
                    Producción Local
                </label>
            </div>
        </aside>


        <section className="catalog-content">

            <header className="catalog-topbar">
                <div className="sort-container">
                    <span className="sort-label">Ordenar por:</span>

                    <div className="sort-dropdown">
                        <button className="sort-btn" aria-haspopup="true">
                            Popularidad
                        </button>

                        <ul className="sort-menu">
                            <li>
                                <a href="#" className="active">Popularidad</a>
                            </li>
                            <li>
                                <a href="#">Menor precio</a>
                            </li>
                            <li>
                                <a href="#">Mayor precio</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>

            <div className="catalog-grid">

                <article className="product-card"
                         data-category="verduras"
                         data-origin=""
                         data-certification=""
                         data-price="700">

                    <a href="/ProductN1">
                        <div className="card-img-wrapper">
                            <img src="img/prod-thumb-1C.png" alt="Espinacas Frescas"/>
                        </div>
                    </a>

                    <div className="card-body">
                        <h3 className="card-title">
                            <a href="/ProductN1">Espinacas Frescas</a>
                        </h3>

                        <p className="card-desc">
                            Espinacas frescas cultivadas bajo prácticas orgánicas.
                        </p>

                        <div className="card-price-row">
                            <span className="card-price">$700 CLP / bolsa de 500 g</span>
                            <span className="card-stars">⭐⭐⭐⭐☆</span>
                        </div>

                        <button className="btn-add-cart">Añadir al carrito</button>
                    </div>
                </article>

                <article className="product-card"
                         data-category="lacteos"
                         data-origin="osorno"
                         data-certification=""
                         data-price="1250">

                    <a href="/ProductN2">
                        <div className="card-img-wrapper">
                            <img src="img/prod-thumb-1A.png" alt="Leche Entera"/>
                        </div>
                    </a>

                    <div className="card-body">
                        <h3 className="card-title">
                            <a href="/ProductN2">Leche Entera</a>
                        </h3>

                        <p className="card-desc">
                            Leche fresca de productores locales de Osorno.
                        </p>

                        <div className="card-price-row">
                            <span className="card-price">$1.250 CLP / 1 L</span>
                            <span className="card-stars">⭐⭐⭐⭐⭐</span>
                        </div>

                        <button className="btn-add-cart">Añadir al carrito</button>
                    </div>
                </article>

                <article className="product-card"
                         data-category="frutas"
                         data-origin="maule"
                         data-certification=""
                         data-price="1200">

                    <a href="/ProductN3">
                        <div className="card-img-wrapper">
                            <img src="img/prod-thumb-1.png" alt="Manzanas Fuji"/>
                        </div>
                    </a>

                    <div className="card-body">
                        <h3 className="card-title">
                            <a href="/ProductN3">Manzanas Fuji</a>
                        </h3>

                        <p className="card-desc">
                            Manzanas crujientes y dulces del Valle del Maule.
                        </p>

                        <div className="card-price-row">
                            <span className="card-price">$1.200 CLP / kg</span>
                            <span className="card-stars">⭐⭐⭐⭐⭐</span>
                        </div>

                        <button className="btn-add-cart">Añadir al carrito</button>
                    </div>
                </article>

                <article className="product-card"
                         data-category="organicos"
                         data-origin="apicultores-locales"
                         data-certification="organica"
                         data-price="5000">

                    <a href="/ProductN4">
                        <div className="card-img-wrapper">
                            <img src="img/prod-thumb-1B.png" alt="Miel Orgánica"/>
                        </div>
                    </a>

                    <div className="card-body">
                        <h3 className="card-title">
                            <a href="/ProductN4">Miel Orgánica</a>
                        </h3>

                        <p className="card-desc">
                            Miel pura producida por apicultores locales.
                        </p>

                        <div className="card-price-row">
                            <span className="card-price">$5.000 CLP / frasco de 500 g</span>
                            <span className="card-stars">⭐⭐⭐⭐☆</span>
                        </div>

                        <button className="btn-add-cart">Añadir al carrito</button>
                    </div>
                </article>

                <article className="product-card"
                         data-category="frutas"
                         data-origin=""
                         data-certification=""
                         data-price="1000">

                    <a href="/ProductN5">
                        <div className="card-img-wrapper">
                            <img src="img/prod-thumb-1H.png" alt="Naranjas Valencia"/>
                        </div>
                    </a>

                    <div className="card-body">
                        <h3 className="card-title">
                            <a href="/ProductN5">Naranjas Valencia</a>
                        </h3>

                        <p className="card-desc">
                            Naranjas jugosas y ricas en vitamina C.
                        </p>

                        <div className="card-price-row">
                            <span className="card-price">$1.000 CLP / kg</span>
                            <span className="card-stars">⭐⭐⭐⭐☆</span>
                        </div>

                        <button className="btn-add-cart">Añadir al carrito</button>
                    </div>
                </article>

                <article className="product-card"
                         data-category="verduras"
                         data-origin=""
                         data-certification=""
                         data-price="1500">

                    <a href="/ProductN6">
                        <div className="card-img-wrapper">
                            <img src="img/prod-thumb-1G.png" alt="Pimientos Tricolores"/>
                        </div>
                    </a>

                    <div className="card-body">
                        <h3 className="card-title">
                            <a href="/ProductN6">Pimientos Tricolores</a>
                        </h3>

                        <p className="card-desc">
                            Pimientos rojos, amarillos y verdes ricos en vitaminas.
                        </p>

                        <div className="card-price-row">
                            <span className="card-price">$1.500 CLP / kg</span>
                            <span className="card-stars">⭐⭐⭐⭐⭐</span>
                        </div>

                        <button className="btn-add-cart">Añadir al carrito</button>
                    </div>
                </article>

                <article className="product-card"
                         data-category="frutas"
                         data-origin=""
                         data-certification=""
                         data-price="800">

                    <a href="/ProductN7">
                        <div className="card-img-wrapper">
                            <img src="img/prod-thumb-2F.png" alt="Plátanos Cavendish"/>
                        </div>
                    </a>

                    <div className="card-body">
                        <h3 className="card-title">
                            <a href="/ProductN7">Plátanos Cavendish</a>
                        </h3>

                        <p className="card-desc">
                            Plátanos dulces y ricos en potasio, ideales como snack.
                        </p>

                        <div className="card-price-row">
                            <span className="card-price">$800 CLP / kg</span>
                            <span className="card-stars">⭐⭐⭐⭐☆</span>
                        </div>

                        <button className="btn-add-cart">Añadir al carrito</button>
                    </div>
                </article>

                <article className="product-card"
                         data-category="organicos"
                         data-origin=""
                         data-certification="organica"
                         data-price="3500">

                    <a href="/ProductN8">
                        <div className="card-img-wrapper">
                            <img src="img/prod-thumb-1E.png" alt="Quinua Orgánica"/>
                        </div>
                    </a>

                    <div className="card-body">
                        <h3 className="card-title">
                            <a href="/ProductN8">Quinua Orgánica</a>
                        </h3>

                        <p className="card-desc">
                            Quinua seleccionada para una alimentación saludable.
                        </p>

                        <div className="card-price-row">
                            <span className="card-price">$3.500 CLP / bolsa de 500 g</span>
                            <span className="card-stars">⭐⭐⭐⭐☆</span>
                        </div>

                        <button className="btn-add-cart">Añadir al carrito</button>
                    </div>
                </article>

                <article className="product-card"
                         data-category="verduras"
                         data-origin="ohiggins"
                         data-certification="sin-pesticidas"
                         data-price="900">

                    <a href="/ProductN9">
                        <div className="card-img-wrapper">
                            <img src="img/prod-thumb-4D.png" alt="Zanahorias Orgánicas"/>
                        </div>
                    </a>

                    <div className="card-body">
                        <h3 className="card-title">
                            <a href="/ProductN9">Zanahorias Orgánicas</a>
                        </h3>

                        <p className="card-desc">
                            Zanahorias crujientes cultivadas sin pesticidas.
                        </p>

                        <div className="card-price-row">
                            <span className="card-price">$900 CLP / kg</span>
                            <span className="card-stars">⭐⭐⭐⭐⭐</span>
                        </div>

                        <button className="btn-add-cart">Añadir al carrito</button>
                    </div>
                </article>

            </div>

        </section>
    </div>

</main>        
        </>
    )
}

export default Catalogue