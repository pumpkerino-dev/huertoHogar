import { Link } from 'react-router-dom';

import '../css/pages/cart.css';
import '../App.css';

function EasterEgg() {
    return (
        <main className="checkout-page">
            <section className="cart-summary checkout-panel easter-egg-panel">

                <audio autoPlay>
                    <source src="/img/easteregg.mp3" type="audio/mpeg" />
                </audio>

                <h2>¡WHO THE FUCK IS GIGA NIGGA WHAT THE FUCK!</h2>

                <img
                    src="/img/easteregg.gif"
                    alt="Easter egg"
                    className="easter-egg-image"
                />
                <img
                    src="/img/easteregg2.gif"
                    alt="Easter egg 2"
                    className="easter-egg-image"
                />

                <Link to="/Checkout" className="btn btn-primary">
                    Volver al checkout
                </Link>
            </section>
        </main>
    );
}

export default EasterEgg;