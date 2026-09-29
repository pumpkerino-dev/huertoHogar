/*Css Especifico*/
import '../css/pages/products.css'
/*Css Reutilizable*/
import '../css/components/buttons.css'
import '../css/components/forms.css'
/*Css General*/
import '../css/base/variables.css'
import '../css/base/reset.css'
/*Reglas Responsive*/
import '../css/responsive.css'

function ProductN4() {
    return(
        <>
<main class="container product-page">

    <section class="product-main-grid">

        <div class="product-gallery">
            <div class="main-image-wrapper">
                <img src="img/prod-thumb-1B.png" alt="Miel Orgánica" class="main-image"/>
            </div>
            <div class="thumbnail-list">
                <button class="thumb-btn active"><img src="img/prod-thumb-2B.png" alt="Miniatura 1"/></button>
                <button class="thumb-btn"><img src="img/prod-thumb-3B.png" alt="Miniatura 2"/></button>
                <button class="thumb-btn"><img src="img/prod-thumb-4B.png" alt="Miniatura 3"/></button>
            </div>
        </div>

        <div class="product-details">

            <div class="product-status">
                <span class="badge-available">DISPONIBLE</span>
                <div class="product-rating">
                    <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                </div>
            </div>

            <h1 class="product-title">Miel Orgánica</h1>

            <div class="product-price">
                <span class="price-amount">$5.000 CLP</span>
                <span class="price-unit">por frasco de 500 g</span>
            </div>

            <p class="product-description">
                Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable, perfecta para endulzar de manera natural tus comidas y bebidas.
            </p>

            <div class="info-box">
                <h4 class="info-box-title">INFORMACIÓN DEL PRODUCTO</h4>
                <div class="info-row">
                    <span class="info-label">Código:</span>
                    <span class="info-value text-dark">PO001</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Origen:</span>
                    <span class="info-value text-dark">Apicultores locales</span>
                </div>
            </div>

            <div class="eco-alert">
                <img src="img/check-icon.png" alt="Hoja" class="eco-icon"/>
                <div class="eco-text">
                    <strong>Producción Local</strong>
                    <p>Miel producida por apicultores locales mediante prácticas responsables.</p>
                </div>
            </div>

            <div class="purchase-actions">
                <div class="className-selector">
                    <button class="qty-btn" type="button" id="decrease">-</button>
                    <span class="qty-current" id="className" data-max="50" data-unit="Frasco">1 Frasco</span>
                    <button class="qty-btn" type="button" id="increase">+</button>
                </div>
                <button class="btn-add-cart-large">Añadir al Carrito</button>
            </div>

        </div>
    </section>

</main>        
        </>
    )
}

export default ProductN4