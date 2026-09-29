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

function ProductN5() {
    return(
        <>
<main className="container product-page">


    <section className="product-main-grid">

        <div className="product-gallery">
            <div className="main-image-wrapper">
                <img src="img/prod-thumb-1H.png" alt="Naranjas Valencia" className="main-image"/>
            </div>
            <div className="thumbnail-list">
                <button className="thumb-btn active">
                    <img src="img/prod-thumb-2H.png" alt="Miniatura 1"/>
                </button>
                <button className="thumb-btn">
                    <img src="img/prod-thumb-3H.png" alt="Miniatura 2"/>
                </button>
                <button className="thumb-btn">
                    <img src="img/prod-thumb-4H.png" alt="Miniatura 3"/>
                </button>
            </div>
        </div>

        <div className="product-details">

            <div className="product-status">
                <span className="badge-available">DISPONIBLE</span>
                <div className="product-rating">
                    <span className="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                </div>
            </div>

            <h1 className="product-title">Naranjas Valencia</h1>

            <div className="product-price">
                <span className="price-amount">$1.000 CLP</span>
                <span className="price-unit">por kilo</span>
            </div>

            <p className="product-description">
                Naranjas Valencia jugosas y ricas en vitamina C, ideales para zumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas que aseguran su dulzura y jugosidad.
            </p>

            <div className="info-box">
                <h4 className="info-box-title">INFORMACIÓN DEL PRODUCTO</h4>
                <div className="info-row">
                    <span className="info-label">Código:</span>
                    <span className="info-value text-dark">FR002</span>
                </div>
                <div className="info-row">
                    <span className="info-label">Prácticas Sostenibles:</span>
                    <span className="info-value text-green">Producción responsable</span>
                </div>
            </div>

            <div className="eco-alert">
                <img src="img/check-icon.png" alt="Hoja" className="eco-icon"/>
                <div className="eco-text">
                    <strong>Producto Fresco</strong>
                    <p>Producto seleccionado para mantener su frescura y calidad.</p>
                </div>
            </div>

            <div className="purchase-actions">
                <div className="quantity-selector">
                    <button className="qty-btn" type="button" id="decrease">-</button>
                    <span className="qty-current" id="quantity" data-max="200" data-unit="Kilo">1 Kilo</span>
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

export default ProductN5