/*Css Especifico*/
import '../css/pages/nosotros.css'
import '../App.css'
import MapaTiendas from '../components/MapaTiendas'
import { VIDEO_YOUTUBE } from '../data/tiendas'

function Nosotros() {
    return(
        <>
<main className="container custom-grid-page">
    <section className="split-section">
        <div className="split-images">
            <div className="img-wrapper">
                <img src="/img/foto-bloque-1.png" alt="Foto 1" className="split-img" />
            </div>
            <div className="img-wrapper">
                <img src="/img/foto-bloque-2.png" alt="Foto 2" className="split-img" />
            </div>
        </div>
        <div className="split-texts">
            <div className="text-pill">
                <p>Esquizofrenico de turno.</p>
                <img
                    src="/img/natie.gif"
                    alt="Nice Nature"
                    className="natie-gif"
                />
            </div>
            <div className="text-pill">
                <p>Esquizofrenica de turno.</p>
                <img
                    src="/img/speed.gif"
                    alt="IShowMeat"
                    className="speed-gif"
                />
            </div>
        </div>
    </section>

    <section className="my-5">
        <h2 className="h4 mb-2">Del campo a tu hogar</h2>
        <p className="text-muted">
            HuertoHogar conecta a pequeños agricultores de Chile con familias que buscan productos frescos,
            orgánicos y de temporada. Conoce cómo trabajan quienes cultivan lo que llega a tu mesa.
        </p>
        <div className="ratio ratio-16x9 rounded overflow-hidden shadow-sm mx-auto" style={{ maxWidth: 800 }}>
            <iframe
                src={VIDEO_YOUTUBE}
                title="Video: agricultura familiar en Chile"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
        </div>
    </section>

    <section className="my-5">
        <h2 className="h4 mb-2">Nuestras tiendas</h2>
        <p className="text-muted">Estamos presentes en 7 ciudades. Elige una para verla en el mapa.</p>
        <MapaTiendas />
    </section>
</main>
        </>
    )
}

export default Nosotros