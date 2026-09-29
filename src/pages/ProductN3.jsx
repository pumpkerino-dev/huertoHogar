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

function ProductN3() {
    return(
        <>
<main className="container product-page">

    <section className="product-main-grid">

        <div className="product-gallery">
            <div className="main-image-wrapper">
                <img src="img/prod-thumb-1.png" alt="Manzanas Fuji del Maule" className="main-image"/>
            </div>
            <div className="thumbnail-list">
                <button className="thumb-btn active">
                    <img src="img/prod-thumb-2.png" alt="Miniatura 1"/>
                </button>
                <button className="thumb-btn">
                    <img src="img/prod-thumb-3.png" alt="Miniatura 2"/>
                </button>
                <button className="thumb-btn">
                    <img src="img/prod-thumb-4.png" alt="Miniatura 3"/>
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

            <h1 className="product-title">Manzanas Fuji del Maule</h1>

            <div className="product-price">
                <span className="price-amount">$1.200 CLP</span>
                <span className="price-unit">por kilo</span>
            </div>

            <p className="product-description">
                Nuestras manzanas Fuji son cultivadas con extremo cuidado en las tierras del Valle del Maule. Destacan por su característico dulzor natural, una textura crujiente insuperable y una frescura garantizada por la cosecha diaria.
            </p>

            <div className="info-box">
                <h4 className="info-box-title">INFORMACIÓN DE ORIGEN</h4>
                <div className="info-row">
                    <span className="info-label">Código:</span>
                    <span className="info-value text-dark">FR001</span>
                </div>
                <div className="info-row">
                    <span className="info-label">Origen:</span>
                    <span className="info-value text-dark">Valle del Maule, Maule, Chile</span>
                </div>
                <div className="info-row">
                    <span className="info-label">Prácticas Sostenibles:</span>
                    <span className="info-value text-green">Sin Pesticidas Químicos</span>
                </div>
            </div>

            <div className="eco-alert">
                <img src="img/check-icon.png" alt="Hoja" className="eco-icon"/>
                <div className="eco-text">
                    <strong>Huella de Carbono Reducida</strong>
                    <p>Al comprar este producto local reduces 2.5 kg de emisiones de CO2.</p>
                </div>
            </div>

            <div className="purchase-actions">
                <div className="quantity-selector">
                    <button className="qty-btn" type="button" id="decrease">-</button>
                    <span className="qty-current" id="quantity" data-max="150" data-unit="Kilo">1 Kilo</span>
                    <button className="qty-btn" type="button" id="increase">+</button>
                </div>
                <button className="btn-add-cart-large">Añadir al Carrito</button>
            </div>

        </div>
    </section>

    <section className="product-reviews-section">
        <h2 className="reviews-title">Opiniones de Clientes</h2>

        <div className="reviews-list">

            <article className="review-card">
                <header className="review-header">
                    <div className="reviewer-info">
                        <h4 className="reviewer-name">María José P.</h4>
                        <span className="review-date">Hace 2 días</span>
                    </div>
                    <div className="review-stars">
                        <span className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                    </div>
                </header>
                <p className="review-text">
                    ¡Excelente frescura! Son súper dulces y crujientes. Ideales para las colaciones de los niños. Se nota el cultivo local.
                </p>
                <div className="review-image-attached">
                    <img src="img/review-manzanas.png" alt="Foto subida por el cliente"/>
                </div>
            </article>

            <article className="review-card">
                <header className="review-header">
                    <div className="reviewer-info">
                        <h4 className="reviewer-name">Rodrigo T.</h4>
                        <span className="review-date">Hace 1 semana</span>
                    </div>
                    <div className="review-stars">
                        <span className="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
                    </div>
                </header>
                <p className="review-text">
                    Muy ricas, llegaron en perfecto estado y bien empaquetadas en caja reciclada. Recomendadas.
                </p>
            </article>

        </div>
    </section>

</main>        
        </>
    )
}

export default ProductN3