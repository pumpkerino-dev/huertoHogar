/*Css Especifico*/
import '../css/pages/blog.css'
import '../App.css'
import BlogCard from '../components/BlogCard';
import { articuloDestacado, articulosBlog } from "../data/blog";
import { Link } from 'react-router-dom';
/*Aqui weas para validar facilmente*/
const dominiosAceptados = [
    'gmail.com',
    'hotmail.com',
    'outlook.com',
    'duocuc.cl'
];
/* Aqui va la wea pal .map */




/* es harto xd */
function Blog() {
    function handleNewsletterSubmit(event) {
        event.preventDefault();

        const email = event.currentTarget.elements.email.value
            .trim()
            .toLowerCase();

        const partes = email.split('@');

        const tieneFormatoBasico =
            partes.length === 2 &&
            partes[0].length > 0 &&
            partes[1].length > 0 &&
            !/\s/.test(email);

        const dominioAceptado =
            tieneFormatoBasico &&
            dominiosAceptados.includes(partes[1]);

        if (dominioAceptado) {
            alert('Correo aceptado. ¡Gracias por tu interés en el Boletín de Campo!');
        } else {
            alert('Correo no válido. Ingresa un correo con @ y un dominio permitido.');
        }
    }
    return(
        <>
<main className="container blog-page">
    <header className="blog-header">
        <h1 className="blog-title">Blog HuertoHogar</h1>
        <p className="blog-subtitle">Consejos de nutrición, sustentabilidad, recetas rústicas y crónicas desde el Maule y el sur de Chile.</p>
    </header>

    <article className="featured-post">

        <div className="featured-img-wrapper">
            <img
                src={articuloDestacado.image}
                alt="Verduras frescas en mesa de madera"
            />
        </div>

        <div className="featured-content">

        <span className="blog-badge">
            RECETAS Y NUTRICIÓN
        </span>

            <h2 className="featured-title">
                <Link to={`/Blog/${articuloDestacado.id}`}>
                    {articuloDestacado.title}
                </Link>
            </h2>

            <p className="featured-excerpt">
                {articuloDestacado.excerpt}
            </p>

            <div className="featured-meta">

                <span>{articuloDestacado.author}</span>

                <span className="meta-separator">•</span>

                <span>{articuloDestacado.date}</span>

            </div>

        </div>

    </article>

    <div className="blog-layout">
        <section className="articles-grid">

            {articulosBlog.map((article) => (
                <BlogCard
                    key={article.id}
                    article={article}
                />
            ))}

        </section>

        <aside className="blog-sidebar">
            <div className="sidebar-widget newsletter-widget">
                <h3 className="widget-title">Boletín de Campo</h3>
                <p className="newsletter-text">
                    Recibe recetas de temporada y ofertas exclusivas directamente en tu correo electrónico cada semana.
                </p>
                <form
                    className="newsletter-form"
                    onSubmit={handleNewsletterSubmit}
                >
                    <label htmlFor="newsletter-email">
                        Correo electrónico
                    </label>

                    <input
                        type="text"
                        id="newsletter-email"
                        name="email"
                        placeholder="Tu correo electrónico"
                        required
                        className="newsletter-input"
                    />

                    <button
                        type="submit"
                        className="btn-subscribe"
                    >
                        Suscríbete
                    </button>
                </form>
            </div>
        </aside>
    </div>
</main>
        </>
    )
}

export default Blog