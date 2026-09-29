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

function BlogN3() {
    return(
        <>
<main className="container single-post-page">

    <article className="post-layout">



        <aside className="post-media">

            <div className="post-img-wrapper">

                <img
                        src="img/noticia-foto1C.png"
                        alt="Imagen noticia 1"
                        className="post-image"
                />

            </div>

            <div className="post-img-wrapper">

                <img
                        src="img/noticia-foto2C.png"
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
                    Lácteos de Osorno: ¿Por qué preferir leches de pastoreo?
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
                    Cuando pensamos en leche, probablemente imaginamos un vaso,
                    una caja en el refrigerador y listo. Pero detrás de cada litro
                    existe todo un proceso que comienza mucho antes de llegar a nuestra cocina.
                </p>

                <p>
                    En Osorno, una de las zonas más conocidas por su tradición ganadera,
                    muchas familias y productores trabajan con sistemas de pastoreo
                    donde las vacas pueden alimentarse de manera natural en amplias praderas.
                </p>

                <h2>
                    ¿Qué significa que una vaca sea de pastoreo?
                </h2>

                <p>
                    Básicamente, significa que buena parte de su alimentación proviene
                    del pasto disponible en el campo. Sí, literalmente pasan gran parte
                    del día comiendo pasto mientras nosotros seguimos preguntándonos
                    qué vamos a cocinar para la cena.
                </p>

                <p>
                    Este tipo de manejo busca aprovechar los recursos naturales de la zona
                    y mantener una relación más cercana entre la producción ganadera
                    y el entorno.
                </p>

                <blockquote>
                    "Mientras nosotros discutimos si la leche va con cereal,
                    las vacas ya resolvieron el desayuno hace horas."
                </blockquote>

                <h2>
                    Más que un vaso de leche
                </h2>

                <p>
                    Los lácteos forman parte de la alimentación de muchas familias y
                    aportan nutrientes importantes como proteínas, calcio y otros
                    componentes que contribuyen a una dieta equilibrada.
                </p>

                <p>
                    Además, elegir productos provenientes de productores locales permite
                    apoyar a las personas que mantienen viva la actividad agrícola
                    y ganadera de distintas regiones de Chile.
                </p>

                <h2>
                    El campo detrás de cada litro
                </h2>

                <p>
                    Detrás de una botella de leche no hay solamente una vaca y una máquina.
                    Hay alimentación, cuidado de los animales, trabajo diario,
                    manejo de las praderas, transporte y muchas horas dedicadas
                    a conseguir un producto de calidad.
                </p>

                <p>
                    Y sí, todo eso ocurre mientras nosotros probablemente seguimos
                    mirando el refrigerador esperando que aparezca mágicamente algo rico.
                </p>

                <p>
                    Por eso, la próxima vez que tomes un vaso de leche,
                    recuerda que puede haber comenzado muy lejos de tu mesa,
                    en las verdes praderas del sur de Chile.
                </p>

                <p>
                    Porque entre una vaca tranquila, un campo enorme y un productor
                    que se levanta temprano, hay mucho más trabajo del que parece.
                </p>

            </div>


        </section>

    </article>

</main>        
        </>
    )
}

export default BlogN3