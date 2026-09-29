/*Css Especifico*/
import '../css/pages/blog-generico.css'
/*Css Reutilizable*/
import '../css/components/buttons.css'
import '../css/components/forms.css'
/*Css General*/
import '../css/base/variables.css'
import '../css/base/reset.css'
/*Reglas Responsive*/
import '../css/responsive.css'

function BlogN2() {
    return(
        <>
<main className="container single-post-page">

    <article className="post-layout">



        <aside className="post-media">

            <div className="post-img-wrapper">

                <img
                        src="img/noticia-foto1B.jpg"
                        alt="Imagen noticia 1"
                        className="post-image"
                />

            </div>

            <div className="post-img-wrapper">

                <img
                        src="img/noticia-foto2B.jpg"
                        alt="Imagen noticia 2"
                        className="post-image"
                />

            </div>

        </aside>



        <section className="post-content">



            <header className="post-header">

                <span className="blog-badge">
                    AGRICULTURA LOCAL
                </span>

                <h1 className="post-title">
                    Huella de Carbono: El verdadero impacto de consumir productos de temporada
                </h1>

                <div className="post-meta">

                    <span>
                        Por Claudoski Bertincoshk
                    </span>

                    <span className="meta-separator">
                        •
                    </span>

                    <span>
                        Octubre 12, 2026
                    </span>

                </div>

            </header>



            <div className="post-body">

                <p>
                    Todo empieza con una pregunta bastante simple:
                    ¿cuánto CO2 puede generar una comida antes de llegar a tu plato?
                </p>

                <p>
                    Spoiler: probablemente más de lo que imaginas.
                    Y no, la lechuga no está conspirando contra el planeta.
                    El problema está en todo el viaje que puede hacer un alimento
                    antes de llegar a tu refrigerador.
                </p>

                <h2>
                    El viaje de cada alimento
                </h2>

                <p>
                    Un producto puede pasar por campos, bodegas, camiones,
                    centros de distribución y finalmente una tienda antes de
                    terminar en tu cocina.
                </p>

                <p>
                    Mientras más distancia recorre y más procesos necesita,
                    mayor puede ser su impacto ambiental. En cambio, elegir
                    productos de temporada y de productores cercanos puede
                    reducir parte de ese recorrido.
                </p>

                <blockquote>
                    "A veces la forma más ecológica de comer no necesita una
                    tecnología futurista. Solo necesita mirar qué está creciendo cerca."
                </blockquote>

                <h2>
                    Comer según la temporada
                </h2>

                <p>
                    Las frutas y verduras de temporada suelen tener una ventaja
                    bastante evidente: están disponibles cuando naturalmente
                    deberían estarlo.
                </p>

                <p>
                    Eso significa que no necesitan convertirse en protagonistas
                    de una misión internacional solo para aparecer en tu ensalada.
                    Menos transporte, menos procesos innecesarios y, en muchos casos,
                    una opción más cercana a los productores locales.
                </p>

                <p>
                    Además, hay algo bastante satisfactorio en comprar alimentos
                    que vienen de agricultores de tu propio país y saber que no
                    recorrieron medio planeta antes de llegar a tu mesa.
                </p>

                <h2>
                    Pequeños cambios, gran diferencia
                </h2>

                <p>
                    No necesitas convertirte en un guerrero ecológico que calcula
                    las emisiones de cada zanahoria antes de comerla.
                </p>

                <p>
                    Empezar por elegir productos locales, preferir alimentos
                    de temporada y evitar compras innecesarias ya puede ser un
                    pequeño paso en la dirección correcta.
                </p>

                <p>
                    Así que la próxima vez que estés frente a una manzana, una
                    naranja o unas zanahorias, piensa en su viaje antes de llegar
                    hasta ti.
                </p>

                <p>
                    Y recuerda: comer de temporada no significa comer aburrido.
                    Significa dejar que el campo haga su trabajo y, de paso,
                    darle unas vacaciones al camión que tendría que traerlo
                    desde la otra punta del mundo.
                </p>

            </div>


        </section>

    </article>

</main>        
        </>
    )
}

export default BlogN2