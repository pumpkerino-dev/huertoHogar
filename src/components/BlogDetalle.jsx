import {useParams, Link} from 'react-router-dom';

import {articuloDestacado, articulosBlog} from '../pages/Blog';

/* CSS específico */
import '../css/pages/blog-generico.css';
import '../App.css';

function BlogDetalle() {

    const {id} = useParams();

    // Reunimos el artículo destacado y los otros seis artículos.
    const todosLosArticulos = [
        articuloDestacado,
        ...articulosBlog
    ];

    // Buscamos el artículo correspondiente a la URL.
    const article = todosLosArticulos.find(
        (item) => item.id === id
    );

    // Si el identificador no existe, mostramos un mensaje.
    if (!article) {
        return (
            <main className="container single-post-page">
                <h1>Artículo no encontrado</h1>
                <Link to="/Blog">Volver al blog</Link>
            </main>
        );
    }

    const detail = article.detail;

    return (
        <main className="container single-post-page">

            <article className="post-layout">

                <aside className="post-media">

                    {detail.images.map((image, index) => (

                        <div className="post-img-wrapper" key={image.src}>
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="post-image"
                            />
                        </div>

                    ))}

                </aside>

                <section className="post-content">

                    <header className="post-header">

                        <span className="blog-badge">
                            {detail.category}
                        </span>

                        <h1 className="post-title">
                            {article.title}
                        </h1>

                        <div className="post-meta">

                            <span>
                                {article.author || "Por Claudoski Bertincoshk"}
                            </span>

                            <span className="meta-separator">
                                •
                            </span>

                            <span>
                                {article.date || "Octubre 12, 2026"}
                            </span>

                        </div>

                    </header>

                    <div className="post-body">

                        {detail.content.map((block, index) => {

                            if (block.type === "p") {
                                return (
                                    <p key={index}>
                                        {block.text}
                                    </p>
                                );
                            }

                            if (block.type === "h2") {
                                return (
                                    <h2 key={index}>
                                        {block.text}
                                    </h2>
                                );
                            }

                            if (block.type === "quote") {
                                return (
                                    <blockquote key={index}>
                                        "{block.text}"
                                    </blockquote>
                                );
                            }

                            return null;

                        })}

                    </div>

                </section>

            </article>

        </main>
    );
}

export default BlogDetalle;
