function CategDestacada({ image, alt, title, description, href = "/Catalogue" }) {
    return (
        <a href={href} className="category-card">
            <div className="card-img-wrapper">
                <img src={image} alt={alt} />
            </div>

            <div className="category-content">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </a>
    );
}

export default CategDestacada;