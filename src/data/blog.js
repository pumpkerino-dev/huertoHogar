// Artículos del blog (antes estaban dentro de pages/Blog.jsx).
// Se movieron a src/data para separar datos de componentes, igual que los productos.

export const articuloDestacado = {
    id: "destacado",
    image: "/img/blog-destacado.png",
    title: "La importancia de las frutas en tu dieta diaria.",
    excerpt: "Descubre cómo aprovechar al máximo las manzanas Fuji del Maule y las hortalizas frescas de primavera en platos deliciosos, saludables y con toda la sazón de nuestra tierra sureña.",
    author: "Por Claudoski Bertincoshk",
    date: "Octubre 12, 2026",

    detail: {
        category: "AGRICULTURA LOCAL",
        images: [
            { src: "/img/noticia-fotoA.png", alt: "Imagen noticia 1" },
            { src: "/img/noticia-fotoB.png", alt: "Imagen noticia 2" }
        ],
        content: [
            { type: "p", text: "Comer frutas todos los días no tiene por qué sentirse como una misión imposible. De hecho, puede ser bastante sencillo cuando tenemos productos frescos, de temporada y llenos de sabor." },
            { type: "p", text: "Desde las manzanas Fuji del Maule hasta las hortalizas frescas que aparecen en primavera, el campo chileno tiene suficientes ingredientes para preparar comidas ricas sin necesidad de complicarse demasiado." },
            { type: "h2", text: "Una manzana puede hacer mucho" },
            { type: "p", text: "Las manzanas son uno de esos alimentos que funcionan prácticamente para todo. Puedes comerlas solas, cortarlas en una ensalada, mezclarlas con avena o simplemente guardarlas en tu mochila para cuando aparezca el hambre." },
            { type: "p", text: "Las Fuji, por ejemplo, destacan por su sabor dulce y su textura crujiente. Además, tienen la ventaja de que no necesitas saber cocinar absolutamente nada para disfrutarlas." },
            { type: "quote", text: "La mejor receta para una manzana sigue siendo: encontrar una, lavarla y comértela." },
            { type: "h2", text: "Frutas, verduras y un poco de imaginación" },
            { type: "p", text: "Una alimentación variada también significa combinar frutas con verduras y otros alimentos. Una ensalada con ingredientes frescos, unas verduras asadas o un plato sencillo de temporada pueden convertirse en una comida mucho más interesante." },
            { type: "p", text: "Y no hace falta convertir la cocina en un laboratorio. A veces solo necesitas cortar unos ingredientes, agregar un poco de aliño y esperar que todo salga bien." },
            { type: "h2", text: "Comer de temporada también suma" },
            { type: "p", text: "Elegir frutas y verduras que están en temporada permite aprovechar productos disponibles en su momento natural y, además, apoyar a los agricultores que trabajan durante todo el año para llevar estos alimentos hasta nuestras mesas." },
            { type: "p", text: "También hay algo bastante agradable en saber de dónde viene lo que estás comiendo. Una manzana del Maule no apareció por accidente en el supermercado: detrás de ella hubo árboles, agricultores, cosecha, transporte y bastante trabajo." },
            { type: "p", text: "Así que la próxima vez que tengas una fruta frente a ti, no la mires como un simple snack. Puede ser el comienzo de una buena comida, un postre improvisado o simplemente una excusa para no terminar comiendo cualquier cosa a las once de la noche." }
        ]
    }
};

export const articulosBlog = [
    {
        id: "miel",
        title: "El origen de nuestra miel: Bosques nativos de Valdivia",
        image: "/img/blog-miel.jpg",
        alt: "Bosques nativos de Valdivia",
        category: "SOSTENIBILIDAD",
        excerpt: "Viajamos al sur para entender el proceso apícola sustentable detrás de cada frasco.",
        href: "/Blog/miel",

        detail: {
            category: "AGRICULTURA LOCAL",
            images: [
                { src: "/img/noticia-foto1A.jpg", alt: "Imagen noticia 1" },
                { src: "/img/noticia-foto2A.jpg", alt: "Imagen noticia 2" }
            ],
            content: [
                { type: "p", text: "Viajamos al sur para entender el proceso apícola sustentable detrás de cada frasco." },
                { type: "p", text: "—Hola. Soy una abeja." },
                { type: "p", text: "—Sí, una abeja. No, no soy una avispa. Tampoco quiero hablar de eso." },
                { type: "p", text: "—¿Sabes qué es lo más extraño de trabajar todo el día haciendo miel?" },
                { type: "p", text: "—Que después llega un humano, mira el frasco durante cinco segundos y dice: \"Mmm, qué rica\"." },
                { type: "p", text: "—¿QUÉ SIGNIFICA \"QUÉ RICA\"? ¡YO LLEVO TODO EL DÍA TRABAJANDO!" },
                { type: "p", text: "—Bueno... técnicamente no todo el día." },
                { type: "p", text: "—Pero casi." },
                { type: "h2", text: "Una abeja tiene preguntas" },
                { type: "p", text: "—Conseguir néctar no es tan fácil. Hay flores por todas partes, pero no todas sirven. Uno tiene que buscar, volar, volver a la colmena y explicar que encontró un lugar excelente." },
                { type: "p", text: "—¿Y qué recibes a cambio?" },
                { type: "p", text: "—Miel." },
                { type: "p", text: "—¿Y quién se queda con la miel?" },
                { type: "p", text: "—Exacto. Los humanos." },
                { type: "quote", text: "Espera... ¿me estás diciendo que hacemos la miel y los humanos se la comen?" },
                { type: "p", text: "—Sí." },
                { type: "p", text: "—..." },
                { type: "p", text: "—Eso explica muchas cosas." },
                { type: "h2", text: "Al menos cuidan nuestro hogar" },
                { type: "p", text: "—Pero tampoco todo es malo. Cuando los apicultores trabajan de forma responsable, cuidan las colmenas, respetan el entorno y protegen los lugares donde vivimos." },
                { type: "p", text: "—Y eso sí importa." },
                { type: "p", text: "—Porque sin flores no hay néctar." },
                { type: "p", text: "—Sin néctar no hay miel." },
                { type: "p", text: "—Sin miel..." },
                { type: "p", text: "—Bueno, supongo que los humanos tendrían que inventar otra cosa para ponerle a las tostadas." },
                { type: "p", text: "—Y sinceramente, prefiero no imaginarlo." },
                { type: "p", text: "—Así que la próxima vez que veas un frasco de miel, recuerda que detrás hay flores, bosques, abejas y una cantidad preocupante de horas de trabajo." },
                { type: "p", text: "—Ahora, si me disculpas..." },
                { type: "p", text: "—Tengo una reunión." },
                { type: "p", text: "—Una reunión importantísima." },
                { type: "p", text: "—Hay flores nuevas." },
                { type: "p", text: "—Y esta vez pienso quedarme con la miel." }
            ]
        }
    },

    {
        id: "huella-carbono",
        title: "Huella de Carbono: El verdadero impacto de consumir productos de temporada",
        image: "/img/blog-huella-carbono.png",
        alt: "Campos de cultivo sustentable",
        category: "AGRICULTURA LOCAL",
        excerpt: "Cómo reducir drásticamente las emisiones de CO2 al elegir productos de temporada.",
        href: "/Blog/huella-carbono",

        detail: {
            category: "AGRICULTURA LOCAL",
            images: [
                { src: "/img/noticia-foto1B.jpg", alt: "Imagen noticia 1" },
                { src: "/img/noticia-foto2B.jpg", alt: "Imagen noticia 2" }
            ],
            content: [
                { type: "p", text: "Todo empieza con una pregunta bastante simple: ¿cuánto CO2 puede generar una comida antes de llegar a tu plato?" },
                { type: "p", text: "Spoiler: probablemente más de lo que imaginas. Y no, la lechuga no está conspirando contra el planeta. El problema está en todo el viaje que puede hacer un alimento antes de llegar a tu refrigerador." },
                { type: "h2", text: "El viaje de cada alimento" },
                { type: "p", text: "Un producto puede pasar por campos, bodegas, camiones, centros de distribución y finalmente una tienda antes de terminar en tu cocina." },
                { type: "p", text: "Mientras más distancia recorre y más procesos necesita, mayor puede ser su impacto ambiental. En cambio, elegir productos de temporada y de productores cercanos puede reducir parte de ese recorrido." },
                { type: "quote", text: "A veces la forma más ecológica de comer no necesita una tecnología futurista. Solo necesita mirar qué está creciendo cerca." },
                { type: "h2", text: "Comer según la temporada" },
                { type: "p", text: "Las frutas y verduras de temporada suelen tener una ventaja bastante evidente: están disponibles cuando naturalmente deberían estarlo." },
                { type: "p", text: "Eso significa que no necesitan convertirse en protagonistas de una misión internacional solo para aparecer en tu ensalada. Menos transporte, menos procesos innecesarios y, en muchos casos, una opción más cercana a los productores locales." },
                { type: "p", text: "Además, hay algo bastante satisfactorio en comprar alimentos que vienen de agricultores de tu propio país y saber que no recorrieron medio planeta antes de llegar a tu mesa." },
                { type: "h2", text: "Pequeños cambios, gran diferencia" },
                { type: "p", text: "No necesitas convertirte en un guerrero ecológico que calcula las emisiones de cada zanahoria antes de comerla." },
                { type: "p", text: "Empezar por elegir productos locales, preferir alimentos de temporada y evitar compras innecesarias ya puede ser un pequeño paso en la dirección correcta." },
                { type: "p", text: "Así que la próxima vez que estés frente a una manzana, una naranja o unas zanahorias, piensa en su viaje antes de llegar hasta ti." },
                { type: "p", text: "Y recuerda: comer de temporada no significa comer aburrido. Significa dejar que el campo haga su trabajo y, de paso, darle unas vacaciones al camión que tendría que traerlo desde la otra punta del mundo." }
            ]
        }
    },

    {
        id: "lacteos",
        title: "Lácteos de Osorno: ¿Por qué preferir leches de pastoreo?",
        image: "/img/blog-lacteos.png",
        alt: "Leche fresca de pastoreo",
        category: "NUTRICIÓN",
        excerpt: "Los beneficios nutricionales de los lácteos tradicionales provenientes de vacas alimentadas a pasto libre.",
        href: "/Blog/lacteos",

        detail: {
            category: "AGRICULTURA LOCAL",
            images: [
                { src: "/img/noticia-foto1C.png", alt: "Imagen noticia 1" },
                { src: "/img/noticia-foto2C.png", alt: "Imagen noticia 2" }
            ],
            content: [
                { type: "p", text: "Cuando pensamos en leche, probablemente imaginamos un vaso, una caja en el refrigerador y listo. Pero detrás de cada litro existe todo un proceso que comienza mucho antes de llegar a nuestra cocina." },
                { type: "p", text: "En Osorno, una de las zonas más conocidas por su tradición ganadera, muchas familias y productores trabajan con sistemas de pastoreo donde las vacas pueden alimentarse de manera natural en amplias praderas." },
                { type: "h2", text: "¿Qué significa que una vaca sea de pastoreo?" },
                { type: "p", text: "Básicamente, significa que buena parte de su alimentación proviene del pasto disponible en el campo. Sí, literalmente pasan gran parte del día comiendo pasto mientras nosotros seguimos preguntándonos qué vamos a cocinar para la cena." },
                { type: "p", text: "Este tipo de manejo busca aprovechar los recursos naturales de la zona y mantener una relación más cercana entre la producción ganadera y el entorno." },
                { type: "quote", text: "Mientras nosotros discutimos si la leche va con cereal, las vacas ya resolvieron el desayuno hace horas." },
                { type: "h2", text: "Más que un vaso de leche" },
                { type: "p", text: "Los lácteos forman parte de la alimentación de muchas familias y aportan nutrientes importantes como proteínas, calcio y otros componentes que contribuyen a una dieta equilibrada." },
                { type: "p", text: "Además, elegir productos provenientes de productores locales permite apoyar a las personas que mantienen viva la actividad agrícola y ganadera de distintas regiones de Chile." },
                { type: "h2", text: "El campo detrás de cada litro" },
                { type: "p", text: "Detrás de una botella de leche no hay solamente una vaca y una máquina. Hay alimentación, cuidado de los animales, trabajo diario, manejo de las praderas, transporte y muchas horas dedicadas a conseguir un producto de calidad." },
                { type: "p", text: "Y sí, todo eso ocurre mientras nosotros probablemente seguimos mirando el refrigerador esperando que aparezca mágicamente algo rico." },
                { type: "p", text: "Por eso, la próxima vez que tomes un vaso de leche, recuerda que puede haber comenzado muy lejos de tu mesa, en las verdes praderas del sur de Chile." },
                { type: "p", text: "Porque entre una vaca tranquila, un campo enorme y un productor que se levanta temprano, hay mucho más trabajo del que parece." }
            ]
        }
    },

    {
        id: "zanahorias",
        title: "Zanahorias rústicas asadas con miel y romero",
        image: "/img/blog-zanahorias.png",
        alt: "Zanahorias rústicas asadas",
        category: "RECETAS",
        excerpt: "Un acompañamiento perfecto con toques dulces y hierbas del jardín sureño.",
        href: "/Blog/zanahorias",

        detail: {
            category: "AGRICULTURA LOCAL",
            images: [
                { src: "/img/noticia-foto1D.png", alt: "Imagen noticia 1" },
                { src: "/img/noticia-foto2D.png", alt: "Imagen noticia 2" }
            ],
            content: [
                { type: "p", text: "Hay platos que parecen demasiado simples para ser importantes, y después aparecen unas zanahorias asadas con miel y romero para demostrar que estábamos completamente equivocados." },
                { type: "p", text: "Esta receta combina el dulzor natural de las zanahorias con el aroma del romero y un toque de miel. El resultado es un acompañamiento sencillo, económico y bastante difícil de arruinar." },
                { type: "h2", text: "El secreto está en el horno" },
                { type: "p", text: "Las zanahorias pueden comerse de muchas formas, pero al asarlas comienzan a tomar un sabor más intenso y una textura ligeramente crujiente por fuera mientras permanecen suaves por dentro." },
                { type: "p", text: "Basta con cortarlas, agregar un poco de aceite, miel, romero y los condimentos que tengas a mano. Después solo queda meterlas al horno y esperar mientras toda la cocina empieza a oler demasiado bien." },
                { type: "quote", text: "Si una zanahoria puede terminar dorada, dulce y crujiente, probablemente merece una segunda oportunidad." },
                { type: "h2", text: "Miel, romero y zanahorias" },
                { type: "p", text: "La miel aporta un toque dulce que combina muy bien con el sabor natural de las zanahorias. El romero, por otro lado, agrega ese aroma de hierbas que hace que parezca que sabemos cocinar mucho más de lo que realmente sabemos." },
                { type: "p", text: "Lo mejor de esta receta es que no requiere ingredientes extraños ni técnicas complicadas. Si sabes cortar una zanahoria y encender un horno, ya tienes aproximadamente el 90% del conocimiento necesario." },
                { type: "h2", text: "Un acompañamiento para cualquier ocasión" },
                { type: "p", text: "Puedes servir estas zanahorias junto a carnes, ensaladas, arroz o prácticamente cualquier plato que necesite un poco de color y sabor adicional." },
                { type: "p", text: "También funcionan perfectamente como excusa para decir que preparaste una \"guarnición gourmet\" cuando en realidad solamente mezclaste algunas zanahorias con miel y las metiste al horno." },
                { type: "p", text: "Así que la próxima vez que tengas zanahorias olvidadas en el refrigerador, no las mires con tristeza. Dales un poco de miel, algo de romero y una oportunidad de convertirse en la estrella inesperada de la comida." }
            ]
        }
    },

    {
        id: "agricultores",
        title: "Pequeños agricultores: El motor de nuestra economía",
        image: "/img/blog-agricultores.png",
        alt: "Agricultor de pimientos",
        category: "AGRICULTURA LOCAL",
        excerpt: "Conoce a Don Segundo, productor de pimientos del Maule que abastece tu mesa.",
        href: "/Blog/agricultores",

        detail: {
            category: "AGRICULTURA LOCAL",
            images: [
                { src: "/img/noticia-foto1.jpg", alt: "Imagen noticia 1" },
                { src: "/img/noticia-foto2.jpg", alt: "Imagen noticia 2" }
            ],
            content: [
                { type: "p", text: "Todo comenzó con una pregunta aparentemente sencilla: ¿qué pasa si comes una fruta? Spoiler: no explotas. De hecho, probablemente hasta te haga bien." },
                { type: "p", text: "Las frutas son básicamente los snacks que la naturaleza decidió regalarte sin necesidad de instalar Steam, actualizar drivers ni esperar que tu PC reinicie por tercera vez." },
                { type: "h2", text: "La importancia del cultivo sustentable" },
                { type: "p", text: "Cultivar de forma sustentable es básicamente tratar a la tierra como si fuera tu compañero de equipo. No puedes entrar, romper todo, sacar los recursos y luego decir \"gg\". Hay que dejar algo para el siguiente jugador." },
                { type: "p", text: "Los agricultores locales llevan años haciendo ese trabajo: plantar, cuidar, cosechar y volver a hacerlo. Mientras tanto, uno en la casa intenta que una planta de interior sobreviva más de dos semanas." },
                { type: "quote", text: "La tierra te da comida, pero también te da una humilde cachetada cuando intentas cultivar algo sin saber lo que haces." },
                { type: "p", text: "Así que la próxima vez que veas una manzana Fuji, recuerda todo el camino que hizo para llegar hasta ti. Y si está rica, agradece. Si está demasiado buena, también puedes fingir que entendiste algo de agricultura y decir \"se nota la calidad del suelo\"." }
            ]
        }
    },

    {
        id: "frutas",
        title: "Frutas de estación: El calendario chileno del huerto",
        image: "/img/blog-frutas.png",
        alt: "Canasta de frutas de estación",
        category: "NUTRICIÓN",
        excerpt: "La guía definitiva para saber cuándo las bayas y cítricos están en su punto de madurez.",
        href: "/Blog/frutas",

        detail: {
            category: "AGRICULTURA LOCAL",
            images: [
                { src: "/img/noticia-foto1E.png", alt: "Imagen noticia 1" },
                { src: "/img/noticia-foto2E.png", alt: "Imagen noticia 2" }
            ],
            content: [
                { type: "p", text: "Hay frutas que aparecen en el mercado como si hubieran llegado por sorpresa, pero la verdad es que cada una tiene su propio momento del año para brillar." },
                { type: "p", text: "Conocer las frutas de estación permite aprovechar productos cuando están en su mejor momento, con buen sabor y listos para convertirse en cualquier cosa que tengas ganas de preparar." },
                { type: "h2", text: "El calendario del huerto" },
                { type: "p", text: "En Chile, las temporadas cambian bastante según la zona y el clima. Mientras algunas frutas comienzan a aparecer en primavera, otras esperan hasta el verano para llegar con todo." },
                { type: "p", text: "Las bayas suelen convertirse en protagonistas durante los meses más cálidos, mientras que los cítricos aparecen con fuerza en otras épocas del año. El huerto, básicamente, tiene su propio calendario y nadie le avisó que nosotros queríamos todo el año." },
                { type: "quote", text: "La fruta no llega tarde. Nosotros simplemente llegamos demasiado temprano." },
                { type: "h2", text: "Bayas: pequeñas pero peligrosas" },
                { type: "p", text: "Frutillas, frambuesas, moras y otras bayas pueden convertirse rápidamente en las protagonistas de un desayuno, un postre o incluso una simple merienda." },
                { type: "p", text: "Son fáciles de combinar con yogur, avena, cereales o simplemente comerlas directamente del recipiente mientras prometes que \"solo vas a sacar una más\"." },
                { type: "h2", text: "Y después llegan los cítricos" },
                { type: "p", text: "Naranjas, mandarinas y otros cítricos aportan sabor, frescura y ese pequeño toque ácido que hace que uno cierre los ojos durante el primer bocado y piense que acaba de descubrir una nueva fruta." },
                { type: "p", text: "También son bastante versátiles: puedes comerlos solos, preparar jugos, incorporarlos a ensaladas o utilizarlos para darle un poco más de vida a distintas recetas." },
                { type: "h2", text: "Comer según la temporada" },
                { type: "p", text: "Elegir frutas de estación ayuda a aprovechar mejor los productos disponibles en cada momento del año y permite descubrir sabores diferentes a medida que cambia el calendario." },
                { type: "p", text: "Así que la próxima vez que veas una fruta que no has comprado en meses, probablemente no sea una coincidencia. El huerto acaba de anunciar que comenzó una nueva temporada." },
                { type: "p", text: "Y sí, probablemente termines comprando más de lo necesario. Pero al menos ahora tendrás una explicación científica: \"estaba en temporada\"." }
            ]
        }
    }
];
