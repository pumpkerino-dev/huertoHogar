/*Css Especifico*/
import '../css/pages/blog-generico.css'
import '../App.css'

function BlogN5() {
    return(
        <>
<main className="container single-post-page">

    <article className="post-layout">


        <aside className="post-media">

            <div className="post-img-wrapper">

                <img
                        src="img/noticia-foto1.jpg"
                        alt="Imagen noticia 1"
                        className="post-image"
                />

            </div>

            <div className="post-img-wrapper">

                <img
                        src="img/noticia-foto2.jpg"
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
                    Pequeños agricultores: El motor de nuestra economía
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
                    Todo comenzó con una pregunta aparentemente sencilla:
                    ¿qué pasa si comes una fruta? Spoiler: no explotas.
                    De hecho, probablemente hasta te haga bien.
                </p>

                <p>
                    Las frutas son básicamente los snacks que la naturaleza
                    decidió regalarte sin necesidad de instalar Steam,
                    actualizar drivers ni esperar que tu PC reinicie por
                    tercera vez.
                </p>

                <h2>
                    La importancia del cultivo sustentable
                </h2>

                <p>
                    Cultivar de forma sustentable es básicamente tratar a la
                    tierra como si fuera tu compañero de equipo. No puedes
                    entrar, romper todo, sacar los recursos y luego decir
                    "gg". Hay que dejar algo para el siguiente jugador.
                </p>

                <p>
                    Los agricultores locales llevan años haciendo ese trabajo:
                    plantar, cuidar, cosechar y volver a hacerlo. Mientras tanto,
                    uno en la casa intenta que una planta de interior sobreviva
                    más de dos semanas.
                </p>

                <blockquote>
                    "La tierra te da comida, pero también te da una humilde
                    cachetada cuando intentas cultivar algo sin saber lo que haces."
                </blockquote>

                <p>
                    Así que la próxima vez que veas una manzana Fuji, recuerda
                    todo el camino que hizo para llegar hasta ti. Y si está rica,
                    agradece. Si está demasiado buena, también puedes fingir que
                    entendiste algo de agricultura y decir "se nota la calidad del
                    suelo".
                </p>

            </div>

        </section>

    </article>

</main>        
        </>
    )
}

export default BlogN5