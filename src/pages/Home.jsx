/*Css Especifico*/
import '../css/pages/page-home.css'
import '../App.css'
import CategDestacada from '../components/CategDestacada.jsx';
import OfertasDestac from '../components/OfertasDestac.jsx';
import { useProductos } from '../hooks/useCatalogo';

const categoriasDestacadas = [
    {
        title: "Frutas",
        description: "Manzanas, cítricos y bayas de temporada",
        image: "img/categoria-frutas.png",
        alt: "Frutas",
        href: "/Catalogue"
    },
    {
        title: "Verduras",
        description: "Zanahorias, espinacas y hortalizas orgánicas",
        image: "img/categoria-verduras.png",
        alt: "Verduras",
        href: "/Catalogue"
    },
    {
        title: "Orgánicos",
        description: "Miel, granos y frutos secos certificados",
        image: "img/categorias-organicos.png",
        alt: "Productos orgánicos",
        href: "/Catalogue"
    },
    {
        title: "Lácteos",
        description: "Leche, quesos y mantequillas de campo",
        image: "img/categoria-lacteos.png",
        alt: "Productos lácteos",
        href: "/Catalogue"
    }
];

const CODIGOS_DESTACADOS = ['FR001', 'PO001', 'VR001', 'PL001'];

function Home() {
    const { productos } = useProductos();
    const ofertasDestacadas = CODIGOS_DESTACADOS
        .map(code => productos.find(product => product.code === code))
        .filter(Boolean);

    return(
        <>
<main>

    <section className="hero-section">
        <img src="/img/hero-banner.png" alt="Familia en campo agrícola" className="hero-image" />
    </section>
    <section className="home-section container">
        <header className="section-header">
            <h2 className="section-title">Categorías Destacadas</h2>
            <p className="section-subtitle">Selección fresca cosechada en su punto óptimo de madurez</p>
        </header>
        <div className="grid-4-cols">
            {categoriasDestacadas.map((categoria) => (
                <CategDestacada
                    key={categoria.title}
                    image={categoria.image}
                    alt={categoria.alt}
                    title={categoria.title}
                    description={categoria.description}
                    href={categoria.href}
                />
            ))}
        </div>
    </section>
    <section className="home-section container">
        <header className="section-header flex-header">
            <div>
                <h2 className="section-title">Ofertas Especiales</h2>
                <p className="section-subtitle">Productos frescos con descuento directo de agricultores</p>
            </div>
            <a href="/Catalogue" className="link-all">Ver Todas las Ofertas &rarr;</a>
        </header>
        <div className="grid-4-cols">
            {ofertasDestacadas.map((product) => (
                <OfertasDestac
                    key={product.code}
                    product={product}
                />
            ))}
        </div>
    </section>
    <section className="mission-section">
        <div className="container mission-layout">
            <div className="mission-text">
                <h2 className="section-title">Nuestra Misión y Presencia</h2>
                <p>Buscamos democratizar el acceso a productos agrícolas frescos y 100% orgánicos, conectando directamente a las huertas familiares del centro-sur chileno con los hogares que valoran la alimentación sana, el sabor natural y la sustentabilidad.</p>
                <ul className="mission-list">
                    <li>
                        <img src="/img/check-icon.png" alt="✓" className="list-icon"/>
                        <span>Cero intermediarios: Mayor rentabilidad para el agricultor y mejor precio final.</span>
                    </li>
                    <li>
                        <img src="/img/check-icon.png" alt="✓" className="list-icon"/>
                        <span>Prácticas sustentables y huella de carbono minimizada en cada entrega.</span>
                    </li>
                </ul>
            </div>
            <div className="mission-map-card">
                <div className="map-illustration">
                    <img src="/img/mapa-chile.png" alt="Mapa de Chile" />
                </div>
                <div className="map-info">
                    <h3>Nuestras 9 Sedes</h3>
                    <p>Nuestra red de distribución local abarca la geografía de Chile:</p>
                    <ul className="locations-list">
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