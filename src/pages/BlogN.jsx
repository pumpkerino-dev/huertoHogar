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

function BlogN() {
    return(
        <>
<main className="container single-post-page">

    <article className="post-layout">



        <aside className="post-media">

            <div className="post-img-wrapper">

                <img
                        src="img/noticia-fotoA.png"
                        alt="Imagen noticia 1"
                        className="post-image"
                />

            </div>

            <div className="post-img-wrapper">

                <img
                        src="img/noticia-fotoB.png"
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
                    La importancia de las frutas en tu dieta diaria.
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
                    Comer frutas todos los días no tiene por qué sentirse como una
                    misión imposible. De hecho, puede ser bastante sencillo cuando
                    tenemos productos frescos, de temporada y llenos de sabor.
                </p>

                <p>
                    Desde las manzanas Fuji del Maule hasta las hortalizas frescas
                    que aparecen en primavera, el campo chileno tiene suficientes
                    ingredientes para preparar comidas ricas sin necesidad de
                    complicarse demasiado.
                </p>

                <h2>
                    Una manzana puede hacer mucho
                </h2>

                <p>
                    Las manzanas son uno de esos alimentos que funcionan prácticamente
                    para todo. Puedes comerlas solas, cortarlas en una ensalada,
                    mezclarlas con avena o simplemente guardarlas en tu mochila
                    para cuando aparezca el hambre.
                </p>

                <p>
                    Las Fuji, por ejemplo, destacan por su sabor dulce y su textura
                    crujiente. Además, tienen la ventaja de que no necesitas saber
                    cocinar absolutamente nada para disfrutarlas.
                </p>

                <blockquote>
                    "La mejor receta para una manzana sigue siendo: encontrar una,
                    lavarla y comértela."
                </blockquote>

                <h2>
                    Frutas, verduras y un poco de imaginación
                </h2>

                <p>
                    Una alimentación variada también significa combinar frutas con
                    verduras y otros alimentos. Una ensalada con ingredientes frescos,
                    unas verduras asadas o un plato sencillo de temporada pueden
                    convertirse en una comida mucho más interesante.
                </p>

                <p>
                    Y no hace falta convertir la cocina en un laboratorio. A veces
                    solo necesitas cortar unos ingredientes, agregar un poco de
                    aliño y esperar que todo salga bien.
                </p>

                <h2>
                    Comer de temporada también suma
                </h2>

                <p>
                    Elegir frutas y verduras que están en temporada permite aprovechar
                    productos disponibles en su momento natural y, además, apoyar
                    a los agricultores que trabajan durante todo el año para llevar
                    estos alimentos hasta nuestras mesas.
                </p>

                <p>
                    También hay algo bastante agradable en saber de dónde viene
                    lo que estás comiendo. Una manzana del Maule no apareció por
                    accidente en el supermercado: detrás de ella hubo árboles,
                    agricultores, cosecha, transporte y bastante trabajo.
                </p>

                <p>
                    Así que la próxima vez que tengas una fruta frente a ti,
                    no la mires como un simple snack. Puede ser el comienzo de
                    una buena comida, un postre improvisado o simplemente una
                    excusa para no terminar comiendo cualquier cosa a las once
                    de la noche.
                </p>

            </div>


        </section>

    </article>

</main>        
        </>
    )
}

export default BlogN