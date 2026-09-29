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

function ProductN1() {
    return(
        <>
<main className="container product-page">

    <section className="product-main-grid">

        <div className="product-gallery">
            <div className="main-image-wrapper">
                <img src="img/prod-thumb-1C.png" alt="Espinacas Frescas" className="main-image"/>
            </div>
            <div className="thumbnail-list">
                <button className="thumb-btn active"><img src="img/prod-thumb-2C.png" alt="Miniatura 1"/></button>
                <button className="thumb-btn"><img src="img/prod-thumb-3C.png" alt="Miniatura 2"/></button>
                <button className="thumb-btn"><img src="img/prod-thumb-4C.png" alt="Miniatura 3"/></button>
            </div>
        </div>

        <div className="product-details">

            <div className="product-status">
                <span className="badge-available">DISPONIBLE</span>
                <div className="product-rating">
                    <span className="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                </div>
            </div>

            <h1 className="product-title">Espinacas Frescas</h1>

            <div className="product-price">
                <span className="price-amount">$700 CLP</span>
                <span className="price-unit">por bolsa de 500 g</span>
            </div>

            <p className="product-description">
                Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Cultivadas bajo prácticas orgánicas que garantizan su calidad y valor nutricional.
            </p>

            <div className="info-box">
                <h4 className="info-box-title">INFORMACIÓN DEL PRODUCTO</h4>
                <div className="info-row">
                    <span className="info-label">Código:</span>
                    <span className="info-value text-dark">VR002</span>
                </div>
                <div className="info-row">
                    <span className="info-label">Presentación:</span>
                    <span className="info-value text-dark">500 g</span>
                </div>
            </div>

            <div className="eco-alert">
                <img src="img/check-icon.png" alt="Hoja" className="eco-icon"/>
                <div className="eco-text">
                    <strong>Producto Orgánico</strong>
                    <p>Cultivadas bajo prácticas orgánicas para garantizar su calidad.</p>
                </div>
            </div>

            <div className="purchase-actions">
                <div className="quantity-selector">
                    <button className="qty-btn" type="button" id="decrease">-</button>
                    <span className="qty-current" id="quantity" data-max="80" data-unit="Bolsa">1 Bolsa</span>
                    <button className="qty-btn" type="button" id="increase">+</button>
                </div>
                <button className="btn-add-cart-large">Añadir al Carrito</button>
            </div>

        </div>
    </section>

</main>        
        </>
    )
}

export default ProductN1