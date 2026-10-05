/*Css Especifico*/
import '../css/pages/terminoCondicionPreguntasDespacho.css'
import '../App.css'

function TerminoCondiciones() {
    return(
        <>
<main className="container terms-page">

    <article className="terms-wrapper">

        <header className="terms-header">
            <h1 className="terms-title">Términos y Condiciones</h1>
            <p className="terms-date">Última actualización: 9 de Septiembre de 2026</p>
        </header>

        <div className="terms-content">
            <h2>1. Introducción</h2>
            <p>
                Bienvenido a HuertoHogar. Al acceder y utilizar nuestro sitio web, aceptas cumplir con los siguientes términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, te sugerimos no utilizar nuestro sitio.
            </p>

            <h2>2. Uso del Sitio Web</h2>
            <p>
                El contenido de las páginas de este sitio web es para tu información general y uso exclusivo. Está sujeto a cambios sin previo aviso. Ni nosotros ni terceros ofrecemos ninguna garantía en cuanto a la exactitud o idoneidad de la información y los materiales encontrados o ofrecidos en este sitio para un propósito particular.
            </p>
            <ul>
                <li>El uso de cualquier información o material en este sitio web es bajo tu propio riesgo.</li>
                <li>Es tu responsabilidad garantizar que cualquier producto, servicio o información disponible a través de este sitio web cumpla con tus requisitos específicos.</li>
            </ul>

            <h2>3. Propiedad Intelectual</h2>
            <p>
                Este sitio web contiene material que es de nuestra propiedad o está bajo licencia. Este material incluye, pero no se limita a, el diseño, la presentación, la apariencia y los gráficos. Queda prohibida la reproducción salvo de conformidad con el aviso de copyright, que forma parte de estos términos y condiciones.
            </p>

            <h2>4. Modificaciones</h2>
            <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web. Es tu responsabilidad revisar periódicamente esta página para estar al tanto de las actualizaciones.
            </p>

            <h2>5. Contacto</h2>
            <p>
                Si tienes alguna pregunta sobre estos Términos y Condiciones, por favor contáctanos a través de nuestro correo electrónico: <strong>contacto@huertohogar.cl</strong>.
            </p>
        </div>

    </article>

</main>        
        </>
    )
}

export default TerminoCondiciones