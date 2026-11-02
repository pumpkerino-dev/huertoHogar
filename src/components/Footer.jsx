/*Css Especifico*/
import '../css/layout/footer.css'
import '../App.css'

function Footer() {
    return(
        <>
<footer className="site-footer">
    <div className="footer-top">
        <div className="footer-brand">
            <a
                    href="/Home"
                    className="brand"
            >
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
            <p>
                Conectamos a las familias de Chile con productores agrícolas
                locales. Comprometidos con la sustentabilidad y el comercio justo.
            </p>
        </div>
        <div className="footer-col">
            <h3>
                Categorías
            </h3>
            <ul>
                <li>
                    <a href="/Catalogue?categoria=frutas">
                        Frutas Frescas
                    </a>
                </li>
                <li>
                    <a href="/Catalogue?categoria=verduras">
                        Verduras del Valle
                    </a>
                </li>
                <li>
                    <a href="/Catalogue?categoria=organicos">
                        Productos Orgánicos
                    </a>
                </li>
                <li>
                    <a href="/Catalogue?categoria=lacteos">
                        Lácteos Artesanales
                    </a>
                </li>
            </ul>
        </div>
        <div className="footer-col">
            <h3>
                HuertoHogar
            </h3>
            <ul>
                <li>
                    <a href="/Nosotros">
                        Sobre Nosotros
                    </a>
                </li>
                <li>
                    <a href="/BlogN5">
                        Nuestros Agricultores
                    </a>
                </li>
                <li>
                    <a href="/politicaDeDespacho">
                        Políticas de Despacho
                    </a>
                </li>
                <li>
                    <a href="/blog">
                        Sustentabilidad
                    </a>
                </li>
            </ul>
        </div>
        <div className="footer-col">
            <h3>
                Ayuda
            </h3>
            <ul>
                <li>
                    <a href="/PreguntasFrecuentes">
                        Preguntas Frecuentes
                    </a>
                </li>
                <li>
                    <a href="/Nosotros">
                        Contacto
                    </a>
                </li>
                <li>
                    <a href="/terminoCondiciones">
                        Términos y Condiciones
                    </a>
                </li>
                <li>
                    <a href="/Profile">
                        Seguimiento de Envío
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <div className="footer-bottom">
        <p>
            © 2026 HuertoHogar SpA. Todos los derechos reservados.
        </p>
        <p>
            Diseñado con ❤️ en el Maule, Chile.
        </p>
    </div>
</footer>
        </>
    )
}

export default Footer