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

function PreguntasFrecuentes() {
    return(
        <>
<main className="container terms-page">

    <article className="terms-wrapper">

        <header className="terms-header">
            <h1 className="terms-title">Preguntas Frecuentes</h1>
            <p className="terms-date">
                Información sobre compras, productos, despachos y seguimiento de pedidos.
            </p>
        </header>

        <div className="terms-content">

            <h2>1. ¿Qué es HuertoHogar?</h2>
            <p>
                HuertoHogar es una tienda en línea dedicada a la venta de productos
                frescos y de calidad provenientes de productores agrícolas locales.
                Nuestro objetivo es acercar frutas, verduras, productos orgánicos y
                lácteos a clientes de distintas regiones de Chile.
            </p>

            <h2>2. ¿Qué productos puedo encontrar?</h2>
            <p>
                En HuertoHogar puedes encontrar frutas frescas, verduras orgánicas,
                productos orgánicos y productos lácteos. La disponibilidad,
                presentación y precio de cada producto se indican en su respectiva
                ficha dentro del catálogo.
            </p>

            <h2>3. ¿Cómo puedo realizar una compra?</h2>
            <p>
                Para realizar una compra puedes revisar el catálogo, seleccionar los
                productos que deseas y agregarlos al carrito. Luego debes revisar
                el resumen de tu pedido, ingresar los datos necesarios para la entrega
                y confirmar la compra.
            </p>

            <h2>4. ¿Puedo modificar mi carrito antes de comprar?</h2>
            <p>
                Sí. Antes de confirmar el pedido puedes agregar, eliminar o modificar
                las cantidades de los productos seleccionados. El total de la compra
                se actualizará de acuerdo con los cambios realizados.
            </p>

            <h2>5. ¿Cómo se realiza el despacho?</h2>
            <p>
                HuertoHogar gestiona el despacho de los pedidos a la dirección
                registrada por el cliente. Durante el proceso de compra se debe
                proporcionar la información necesaria para realizar la entrega
                correctamente.
            </p>

            <h2>6. ¿Puedo elegir una fecha de entrega?</h2>
            <p>
                El sistema contempla la selección de una fecha de entrega preferida,
                de acuerdo con las opciones disponibles para el pedido y la zona
                correspondiente.
            </p>

            <h2>7. ¿Cómo puedo revisar el estado de mi pedido?</h2>
            <p>
                Una vez realizada la compra, el cliente puede consultar el estado
                de su pedido y realizar seguimiento del despacho mediante las
                herramientas disponibles en su cuenta.
            </p>

            <h2>8. ¿Qué ocurre cuando mi pedido es confirmado?</h2>
            <p>
                Al confirmar una compra se genera la información correspondiente
                al pedido y se entrega una confirmación al cliente. El estado del
                pedido podrá actualizarse durante las distintas etapas del proceso
                de preparación y despacho.
            </p>

            <h2>9. ¿Puedo dejar una opinión sobre un producto?</h2>
            <p>
                Sí. HuertoHogar contempla la posibilidad de que los clientes
                publiquen reseñas y valoraciones sobre los productos adquiridos,
                permitiendo compartir su experiencia con otros usuarios.
            </p>

            <h2>10. ¿Cómo puedo contactar a HuertoHogar?</h2>
            <p>
                Para realizar consultas o solicitar información adicional puedes
                comunicarte con HuertoHogar mediante el correo electrónico:
                <strong>contacto@huertohogar.cl</strong>.
            </p>

        </div>

    </article>

</main>        
        </>
    )
}

export default PreguntasFrecuentes