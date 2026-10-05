/*Css Especifico*/
import '../css/pages/products.css'
import '../App.css'

function ProductN2() {
    return(
        <>
<main className="container product-page">

    <section className="product-main-grid">

        <div className="product-gallery">
            <div className="main-image-wrapper">
                <img src="img/prod-thumb-1A.png" alt="Leche Entera" className="main-image"/>
            </div>
            <div className="thumbnail-list">
                <button className="thumb-btn active"><img src="img/prod-thumb-2A.png" alt="Miniatura 1"/></button>
                <button className="thumb-btn"><img src="img/prod-thumb-3A.png" alt="Miniatura 2"/></button>
                <button className="thumb-btn"><img src="img/prod-thumb-4A.png" alt="Miniatura 3"/></button>
            </div>
        </div>

        <div className="product-details">

            <div className="product-status">
                <span className="badge-available">DISPONIBLE</span>
                <div className="product-rating">
                    <span className="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                </div>
            </div>

            <h1 className="product-title">Leche Entera</h1>

            <div className="product-price">
                <span className="price-amount">$1.250 CLP</span>
                <span className="price-unit">por 1 L</span>
            </div>

            <p className="product-description">
                Leche entera de origen local, seleccionada por su frescura y calidad. Un producto tradicional ideal para acompañar desayunos, preparaciones y el consumo diario de toda la familia.
            </p>

            <div className="info-box">
                <h4 className="info-box-title">INFORMACIÓN DE ORIGEN</h4>
                <div className="info-row">
                    <span className="info-label">Código:</span>
                    <span className="info-value text-dark">PL001</span>
                </div>
                <div className="info-row">
                    <span className="info-label">Origen:</span>
                    <span className="info-value text-dark">Osorno, Chile</span>
                </div>
                <div className="info-row">
                    <span className="info-label">Presentación:</span>
                    <span className="info-value text-dark">1 L</span>
                </div>
            </div>

            <div className="eco-alert">
                <img src="img/check-icon.png" alt="Hoja" className="eco-icon"/>
                <div className="eco-text">
                    <strong>Producción Local</strong>
                    <p>Producto proveniente de productores locales de la zona de Osorno.</p>
                </div>
            </div>

            <div className="purchase-actions">
                <div className="quantity-selector">
                    <button className="qty-btn" type="button" id="decrease">-</button>
                    <span className="qty-current" id="quantity" data-max="60" data-unit="Litro">1 Litro</span>
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

export default ProductN2