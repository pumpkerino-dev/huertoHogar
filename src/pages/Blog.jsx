/*Css Especifico*/
import '../css/pages/blog.css'
import '../App.css'


function Blog() {
    return(
        <>
<main className="container blog-page">
    <header className="blog-header">
        <h1 className="blog-title">Blog HuertoHogar</h1>
        <p className="blog-subtitle">Consejos de nutrición, sustentabilidad, recetas rústicas y crónicas desde el Maule y el sur de Chile.</p>
    </header>
    <article className="featured-post">
        <div className="featured-img-wrapper">
            <img src="img/blog-destacado.png" alt="Verduras frescas en mesa de madera" />
        </div>
        <div className="featured-content">
            <span className="blog-badge">RECETAS Y NUTRICIÓN</span>
            <h2 className="featured-title">
                <a href="/BlogN">La importancia de las frutas en tu dieta diaria.</a>
            </h2>
            <p className="featured-excerpt">
                Descubre cómo aprovechar al máximo las manzanas Fuji del Maule y las hortalizas frescas de primavera en platos deliciosos, saludables y con toda la sazón de nuestra tierra sureña.
            </p>
            <div className="featured-meta">
                <span>Por Catalina Fuentes S.</span>
                <span className="meta-separator">•</span>
                <span>Octubre 12, 2025</span>
            </div>
        </div>
    </article>
    <div className="blog-layout">
        <section className="articles-grid">
            <article className="article-card">
                <div className="article-img-wrapper">
                    <img src="img/blog-miel.jpg" alt="Bosques nativos de Valdivia" />
                </div>
                <div className="article-content">
                    <span className="blog-badge">SOSTENIBILIDAD</span>
                    <h3 className="article-title">
                        <a href="/BlogN1">El origen de nuestra miel: Bosques nativos de Valdivia</a>
                    </h3>
                    <p className="article-excerpt">
                        Viajamos al sur para entender el proceso apícola sustentable detrás de cada frasco.
                    </p>
                </div>
            </article>
            <article className="article-card">
                <div className="article-img-wrapper">
                    <img src="img/blog-huella-carbono.png" alt="Campos de cultivo sustentable" />
                </div>
                <div className="article-content">
                    <span className="blog-badge">AGRICULTURA LOCAL</span>
                    <h3 className="article-title">
                        <a href="/BlogN2">Huella de Carbono: El verdadero impacto de com...</a>
                    </h3>
                    <p className="article-excerpt">
                        Cómo reducir drásticamente las emisiones de CO2 al elegir productos de temporada.
                    </p>
                </div>
            </article>
            <article className="article-card">
                <div className="article-img-wrapper">
                    <img src="img/blog-lacteos.png" alt="Leche fresca de pastoreo" />
                </div>
                <div className="article-content">
                    <span className="blog-badge">NUTRICIÓN</span>
                    <h3 className="article-title">
                        <a href="/BlogN3">Lácteos de Osorno: ¿Por qué preferir leches de pastoreo?</a>
                    </h3>
                    <p className="article-excerpt">
                        Los beneficios nutricionales de los lácteos tradicionales provenientes de vacas alimentadas a pasto libre.
                    </p>
                </div>
            </article>
            <article className="article-card">
                <div className="article-img-wrapper">
                    <img src="img/blog-zanahorias.png" alt="Zanahorias rústicas asadas" />
                </div>
                <div className="article-content">
                    <span className="blog-badge">RECETAS</span>
                    <h3 className="article-title">
                        <a href="/BlogN4">Zanahorias rústicas asadas con miel y romero</a>
                    </h3>
                    <p className="article-excerpt">
                        Un acompañamiento perfecto con toques dulces y hierbas del jardín sureño.
                    </p>
                </div>
            </article>
            <article className="article-card">
                <div className="article-img-wrapper">
                    <img src="img/blog-agricultores.png" alt="Agricultor de pimientos" />
                </div>
                <div className="article-content">
                    <span className="blog-badge">AGRICULTURA LOCAL</span>
                    <h3 className="article-title">
                        <a href="/BlogN5">Pequeños agricultores: El motor de nuestra economía</a>
                    </h3>
                    <p className="article-excerpt">
                        Conoce a Don Segundo, productor de pimientos del Maule que abastece tu mesa.
                    </p>
                </div>
            </article>
            <article className="article-card">
                <div className="article-img-wrapper">
                    <img src="img/blog-frutas.png" alt="Canasta de frutas de estación" />
                </div>
                <div className="article-content">
                    <span className="blog-badge">NUTRICIÓN</span>
                    <h3 className="article-title">
                        <a href="/BlogN6">Frutas de estación: El calendario chileno del huerto</a>
                    </h3>
                    <p className="article-excerpt">
                        La guía definitiva para saber cuándo las bayas y cítricos están en su punto de madurez.
                    </p>
                </div>
            </article>
        </section>
        <aside className="blog-sidebar">
            <div className="sidebar-widget newsletter-widget">
                <h3 className="widget-title">Boletín de Campo</h3>
                <p className="newsletter-text">
                    Recibe recetas de temporada y ofertas exclusivas directamente en tu correo electrónico cada semana.
                </p>
                <form className="newsletter-form">
                    <label for="newsletter-email">Correo electrónico</label>
                    <input
                            type="email"
                            id="newsletter-email"
                            placeholder="Tu correo electrónico"
                            required
                            className="newsletter-input"
                    />
                    <button type="submit" className="btn-subscribe">Suscríbete</button>
                </form>
            </div>
        </aside>
    </div>
</main>
        </>
    )
}

export default Blog