/*Css Especifico*/
import '../css/pages/Nosotros.css'
import '../App.css'

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
            </div>
            <div className="text-pill">
                <p>Esquizofrenica de turno.</p>
            </div>
        </div>
    </section>
</main>
        </>
    )
}

export default Nosotros