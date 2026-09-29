/*Css Especifico*/
import '../css/pages/terminoCondicionPreguntasDespacho.css'
/*Css Reutilizable*/
import '../css/components/buttons.css'
import '../css/components/forms.css'
/*Css General*/
import '../css/base/variables.css'
import '../css/base/reset.css'
/*Reglas Responsive*/
import '../css/responsive.css'

function PoliticaDeDespacho() {
    return(
        <>
<main className="container terms-page">


    <article className="terms-wrapper">

        <header className="terms-header">
            <h1 className="terms-title">Políticas de Despacho</h1>
            <p className="terms-date">
                Información sobre entregas, cobertura y seguimiento de pedidos.
            </p>
        </header>

        <div className="terms-content">

            <h2>1. Información general</h2>
            <p>
                HuertoHogar realiza despachos de productos frescos y de calidad
                a distintas zonas de Chile. Las condiciones de entrega pueden
                variar según la ubicación del cliente y la disponibilidad del
                servicio en cada zona.
            </p>

            <h2>2. Dirección de entrega</h2>
            <p>
                El cliente debe ingresar una dirección de entrega correcta y
                completa al momento de realizar su pedido. HuertoHogar utilizará
                esta información para coordinar el despacho y entregar los
                productos en el lugar indicado.
            </p>

            <h2>3. Fecha de entrega</h2>
            <p>
                Durante el proceso de compra, el cliente podrá seleccionar una
                fecha de entrega preferida entre las opciones disponibles para
                su zona y pedido.
            </p>

            <h2>4. Preparación del pedido</h2>
            <p>
                Los productos son preparados antes de su despacho procurando
                mantener sus condiciones de calidad y frescura. La disponibilidad
                de cada producto se encuentra indicada en el catálogo al momento
                de realizar la compra.
            </p>

            <h2>5. Seguimiento del pedido</h2>
            <p>
                Una vez confirmado el pedido, el cliente podrá consultar su estado
                y realizar seguimiento del despacho mediante las herramientas
                disponibles en su cuenta.
            </p>

            <h2>6. Recepción del pedido</h2>
            <p>
                Se recomienda que el cliente o una persona autorizada se encuentre
                disponible para recibir el pedido en la fecha seleccionada.
                En caso de existir dificultades para realizar la entrega,
                HuertoHogar podrá contactar al cliente utilizando los datos
                registrados.
            </p>

            <h2>7. Consultas sobre el despacho</h2>
            <p>
                Para consultas relacionadas con entregas, fechas de despacho o
                seguimiento de pedidos, puedes comunicarte con HuertoHogar a
                través del correo electrónico:
                <strong>contacto@huertohogar.cl</strong>.
            </p>

        </div>

    </article>

</main>        
        </>
    )
}

export default PoliticaDeDespacho