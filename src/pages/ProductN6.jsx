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

function ProductN6() {
    return(
        <>
<main className="container product-page">


    <section className="product-main-grid">

        <div className="product-gallery">
            <div className="main-image-wrapper">
                <img src="img/prod-thumb-1G.png" alt="Pimientos Tricolores" className="main-image"/>
            </div>
            <div className="thumbnail-list">
                <button className="thumb-btn active"><img src="img/prod-thumb-2G.png" alt="Miniatura 1"/></button>
                <button className="thumb-btn"><img src="img/prod-thumb-3G.png" alt="Miniatura 2"/></button>
                <button className="thumb-btn"><img src="img/prod-thumb-4G.png" alt="Miniatura 3"/></button>
            </div>
        </div>

        <div className="product-details">

            <div className="product-status">
                <span className="badge-available">DISPONIBLE</span>
                <div className="product-rating">
                    <span className="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                </div>
            </div>

            <h1 className="product-title">Pimientos Tricolores</h1>

            <div className="product-price">
                <span className="price-amount">$1.500 CLP</span>
                <span className="price-unit">por kilo</span>
            </div>

            <p className="product-description">
                Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas, añaden un toque vibrante y saludable a cualquier receta.
            </p>

            <div className="info-box">
                <h4 className="info-box-title">INFORMACIÓN DEL PRODUCTO</h4>
                <div className="info-row">
                    <span className="info-label">Código:</span>
                    <span className="info-value text-dark">VR003</span>
                </div>
                <div className="info-row">
                    <span className="info-label">Variedades:</span>
                    <span className="info-value text-dark">Rojo, amarillo y verde</span>
                </div>
            </div>

            <div className="eco-alert">
                <img src="img/check-icon.png" alt="Hoja" className="eco-icon"/>
                <div className="eco-text">
                    <strong>Producto Fresco</strong>
                    <p>Seleccionado para mantener su frescura y calidad.</p>
                </div>
            </div>

            <div className="purchase-actions">
                <div className="quantity-selector">
                    <button className="qty-btn" type="button" id="decrease">-</button>
                    <span className="qty-current" id="quantity" data-max="120" data-unit="Kilo">1 Kilo</span>
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

export default ProductN6