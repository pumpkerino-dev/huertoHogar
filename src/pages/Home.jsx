/*Css Especifico*/
import '../css/pages/page-home.css'
import '../App.css'

function Home() {
    return(
        <>
<main>

    <section class="hero-section">
        <img src="img/hero-banner.png" alt="Familia en campo agrícola" class="hero-image" />
    </section>
    <section class="home-section container">
        <header class="section-header">
            <h2 class="section-title">Categorías Destacadas</h2>
            <p class="section-subtitle">Selección fresca cosechada en su punto óptimo de madurez</p>
        </header>
        <div class="grid-4-cols">
            <a href="/Catalogue" class="category-card">
                <div class="card-img-wrapper">
                    <img src="img/categoria-frutas.png" alt="Frutas" />
                </div>
                <div class="category-content">
                    <h3>Frutas</h3>
                    <p>Manzanas, cítricos y bayas de temporada</p>
                </div>
            </a>
            <a href="/Catalogue" class="category-card">
                <div class="card-img-wrapper">
                    <img src="img/categoria-verduras.png" alt="Verduras" />
                </div>
                <div class="category-content">
                    <h3>Verduras</h3>
                    <p>Zanahorias, espinacas y hortalizas orgánicas</p>
                </div>
            </a>
            <a href="/Catalogue" class="category-card">
                <div class="card-img-wrapper">
                    <img src="img/categorias-organicos.png" alt="Orgánicos" />
                </div>
                <div class="category-content">
                    <h3>Orgánicos</h3>
                    <p>Miel, granos y frutos secos certificados</p>
                </div>
            </a>
            <a href="/Catalogue" class="category-card">
                <div class="card-img-wrapper">
                    <img src="img/categoria-lacteos.png" alt="Lácteos" />
                </div>
                <div class="category-content">
                    <h3>Lácteos</h3>
                    <p>Leche, quesos y mantequillas de campo</p>
                </div>
            </a>
        </div>
    </section>
    <section class="home-section container">
        <header class="section-header flex-header">
            <div>
                <h2 class="section-title">Ofertas Especiales</h2>
                <p class="section-subtitle">Productos frescos con descuento directo de agricultores</p>
            </div>
            <a href="/Catalogue" class="link-all">Ver Todas las Ofertas &rarr;</a>
        </header>
        <div class="grid-4-cols">
            <div class="product-card">
                <div class="product-img-wrapper">
                    <img src="img/manzana-fuji.png" alt="Manzanas Fuji" />
                </div>
                <div class="product-info">
                    <span class="product-origin">VALLE DEL MAULE</span>
                    <h3 class="product-name">Manzanas Fuji</h3>
                    <div class="product-pricing">
                        <span class="price-current">$1.200 CLP / KG</span>
                    </div>
                    <button class="btn-add-cart">Añadir al Carrito</button>
                </div>
            </div>
            <div class="product-card">
                <div class="product-img-wrapper">
                    <img src="img/miel-organica.png" alt="Miel Orgánica" />
                </div>
                <div class="product-info">
                    <span class="product-origin">APICULTORES LOCALES</span>
                    <h3 class="product-name">Miel Orgánica</h3>
                    <div class="product-pricing">
                        <span class="price-current">$5.000 CLP / 500g</span>
                    </div>
                    <button class="btn-add-cart">Añadir al Carrito</button>
                </div>
            </div>
            <div class="product-card">
                <div class="product-img-wrapper">
                    <img src="img/zanahorias-organicas.png" alt="Zanahorias de Campo" />
                </div>
                <div class="product-info">
                    <span class="product-origin">Región de O’Higgins</span>
                    <h3 class="product-name">Zanahorias de Campo</h3>
                    <div class="product-pricing">
                        <span class="price-current">$900 CLP / KG</span>
                    </div>
                    <button class="btn-add-cart">Añadir al Carrito</button>
                </div>
            </div>
            <div class="product-card">
                <div class="product-img-wrapper">
                    <img src="img/leche-entera.png" alt="Leche Entera 1L" />
                </div>
                <div class="product-info">
                    <span class="product-origin">OSORNO</span>
                    <h3 class="product-name">Leche Entera 1L</h3>
                    <div class="product-pricing">
                        <span class="price-current">$1.250 CLP / 1L</span>
                    </div>
                    <button class="btn-add-cart">Añadir al Carrito</button>
                </div>
            </div>
        </div>
    </section>
    <section class="mission-section">
        <div class="container mission-layout">
            <div class="mission-text">
                <h2 class="section-title">Nuestra Misión y Presencia</h2>
                <p>Buscamos democratizar el acceso a productos agrícolas frescos y 100% orgánicos, conectando directamente a las huertas familiares del centro-sur chileno con los hogares que valoran la alimentación sana, el sabor natural y la sustentabilidad.</p>
                <ul class="mission-list">
                    <li>
                        <img src="img/check-icon.png" alt="✓" class="list-icon"/>
                        <span>Cero intermediarios: Mayor rentabilidad para el agricultor y mejor precio final.</span>
                    </li>
                    <li>
                        <img src="img/check-icon.png" alt="✓" class="list-icon"/>
                        <span>Prácticas sustentables y huella de carbono minimizada en cada entrega.</span>
                    </li>
                </ul>
            </div>
            <div class="mission-map-card">
                <div class="map-illustration">
                    <img src="img/mapa-chile.png" alt="Mapa de Chile" />
                </div>
                <div class="map-info">
                    <h3>Nuestras 9 Sedes</h3>
                    <p>Nuestra red de distribución local abarca la geografía de Chile:</p>
                    <ul class="locations-list">
                        <li>Viña del Mar</li>
                        <li>Valparaíso</li>
                        <li>Santiago (Matriz)</li>
                        <li>Talca</li>
                        <li>Nacimiento</li>
                        <li>Concepción</li>
                        <li>Villarrica</li>
                        <li>Valdivia</li>
                        <li>Puerto Varas</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</main>
        </>
    )
}

export default Home