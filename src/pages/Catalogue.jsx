/*Css Especifico*/
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import '../css/pages/product-catalog.css';
import '../App.css';
import ProductoCatalogo from '../components/ProductoCatalogo';

/*AQUI IRA LA MIERDA GIGANTE DE DATOS */
/* CAMBIA EL PRECIO CON PRICE COMO PRECIO FINAL Y EL ORIGINALPRICE ES EL PRE-OFERTA*/

export const productos = [
    {
        code: "VR002",
        name: "Espinacas Frescas",
        image: "/img/prod-thumb-1C.png",
        description: "Espinacas frescas cultivadas bajo prácticas orgánicas.",
        price: 700,
        priceLabel: "$700 CLP / bolsa de 500 g",
        stars: "⭐⭐⭐⭐☆",
        category: "verduras",
        origin: "",
        certification: "",

        detail: {
            thumbnails: [
                "/img/prod-thumb-2C.png",
                "/img/prod-thumb-3C.png",
                "/img/prod-thumb-4C.png"
            ],
            priceDisplay: "$700 CLP",
            priceUnit: "por bolsa de 500 g",
            description: "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Cultivadas bajo prácticas orgánicas que garantizan su calidad y valor nutricional.",
            infoTitle: "INFORMACIÓN DEL PRODUCTO",
            infoRows: [
                { label: "Código", value: "VR002" },
                { label: "Presentación", value: "500 g" }
            ],
            ecoTitle: "Producto Orgánico",
            ecoDescription: "Cultivadas bajo prácticas orgánicas para garantizar su calidad.",
            maxQuantity: 80,
            unit: "Bolsa",
            unitPlural: "Bolsas"
        }
    },

    {
        code: "PL001",
        name: "Leche Entera",
        image: "/img/prod-thumb-1A.png",
        description: "Leche fresca de productores locales de Osorno.",
        price: 950,
        originalPrice: 1250,
        priceLabel: "$1.250 CLP / 1 L",
        stars: "⭐⭐⭐⭐⭐",
        category: "lacteos",
        origin: "osorno",
        certification: "",
        originLabel: "OSORNO",

        detail: {
            thumbnails: [
                "/img/prod-thumb-2A.png",
                "/img/prod-thumb-3A.png",
                "/img/prod-thumb-4A.png"
            ],
            priceDisplay: "$1.250 CLP",
            priceUnit: "por 1 L",
            description: "Leche entera de origen local, seleccionada por su frescura y calidad. Un producto tradicional ideal para acompañar desayunos, preparaciones y el consumo diario de toda la familia.",
            infoTitle: "INFORMACIÓN DE ORIGEN",
            infoRows: [
                { label: "Código", value: "PL001" },
                { label: "Origen", value: "Osorno, Chile" },
                { label: "Presentación", value: "1 L" }
            ],
            ecoTitle: "Producción Local",
            ecoDescription: "Producto proveniente de productores locales de la zona de Osorno.",
            maxQuantity: 60,
            unit: "Litro",
            unitPlural: "Litros"
        }
    },

    {
        code: "FR001",
        name: "Manzanas Fuji",
        image: "/img/prod-thumb-1.png",
        description: "Manzanas crujientes y dulces del Valle del Maule.",
        price: 900,
        originalPrice: 1200,
        priceLabel: "$1.200 CLP / kg",
        stars: "⭐⭐⭐⭐⭐",
        category: "frutas",
        origin: "maule",
        certification: "",
        originLabel: "VALLE DEL MAULE",

        detail: {
            thumbnails: [
                "/img/prod-thumb-2.png",
                "/img/prod-thumb-3.png",
                "/img/prod-thumb-4.png"
            ],
            priceDisplay: "$1.200 CLP",
            priceUnit: "por kilo",
            description: "Nuestras manzanas Fuji son cultivadas con extremo cuidado en las tierras del Valle del Maule. Destacan por su característico dulzor natural, una textura crujiente insuperable y una frescura garantizada por la cosecha diaria.",
            infoTitle: "INFORMACIÓN DE ORIGEN",
            infoRows: [
                { label: "Código", value: "FR001" },
                { label: "Origen", value: "Valle del Maule, Maule, Chile" },
                { label: "Prácticas Sostenibles", value: "Sin Pesticidas Químicos", className: "text-green" }
            ],
            ecoTitle: "Huella de Carbono Reducida",
            ecoDescription: "Al comprar este producto local reduces 2.5 kg de emisiones de CO2.",
            maxQuantity: 150,
            unit: "Kilo",
            unitPlural: "Kilos"
        }
    },

    {
        code: "PO001",
        name: "Miel Orgánica",
        image: "/img/prod-thumb-1B.png",
        description: "Miel pura producida por apicultores locales.",
        price: 5000,
        priceLabel: "$5.000 CLP / frasco de 500 g",
        stars: "⭐⭐⭐⭐☆",
        category: "organicos",
        origin: "apicultores-locales",
        certification: "organica",
        originLabel: "APICULTORES LOCALES",

        detail: {
            thumbnails: [
                "/img/prod-thumb-2B.png",
                "/img/prod-thumb-3B.png",
                "/img/prod-thumb-4B.png"
            ],
            priceDisplay: "$5.000 CLP",
            priceUnit: "por frasco de 500 g",
            description: "Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable, perfecta para endulzar de manera natural tus comidas y bebidas.",
            infoTitle: "INFORMACIÓN DEL PRODUCTO",
            infoRows: [
                { label: "Código", value: "PO001" },
                { label: "Origen", value: "Apicultores locales" }
            ],
            ecoTitle: "Producción Local",
            ecoDescription: "Miel producida por apicultores locales mediante prácticas responsables.",
            maxQuantity: 50,
            unit: "Frasco",
            unitPlural: "Frascos"
        }
    },

    {
        code: "FR002",
        name: "Naranjas Valencia",
        image: "/img/prod-thumb-1H.png",
        description: "Naranjas jugosas y ricas en vitamina C.",
        price: 1000,
        priceLabel: "$1.000 CLP / kg",
        stars: "⭐⭐⭐⭐☆",
        category: "frutas",
        origin: "",
        certification: "",

        detail: {
            thumbnails: [
                "/img/prod-thumb-2H.png",
                "/img/prod-thumb-3H.png",
                "/img/prod-thumb-4H.png"
            ],
            priceDisplay: "$1.000 CLP",
            priceUnit: "por kilo",
            description: "Naranjas Valencia jugosas y ricas en vitamina C, ideales para zumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas que aseguran su dulzura y jugosidad.",
            infoTitle: "INFORMACIÓN DEL PRODUCTO",
            infoRows: [
                { label: "Código", value: "FR002" },
                { label: "Prácticas Sostenibles", value: "Producción responsable", className: "text-green" }
            ],
            ecoTitle: "Producto Fresco",
            ecoDescription: "Producto seleccionado para mantener su frescura y calidad.",
            maxQuantity: 200,
            unit: "Kilo",
            unitPlural: "Kilos"
        }
    },

    {
        code: "VR003",
        name: "Pimientos Tricolores",
        image: "/img/prod-thumb-1G.png",
        description: "Pimientos rojos, amarillos y verdes ricos en vitaminas.",
        price: 1500,
        priceLabel: "$1.500 CLP / kg",
        stars: "⭐⭐⭐⭐⭐",
        category: "verduras",
        origin: "",
        certification: "",

        detail: {
            thumbnails: [
                "/img/prod-thumb-2G.png",
                "/img/prod-thumb-3G.png",
                "/img/prod-thumb-4G.png"
            ],
            priceDisplay: "$1.500 CLP",
            priceUnit: "por kilo",
            description: "Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas, añaden un toque vibrante y saludable a cualquier receta.",
            infoTitle: "INFORMACIÓN DEL PRODUCTO",
            infoRows: [
                { label: "Código", value: "VR003" },
                { label: "Variedades", value: "Rojo, amarillo y verde" }
            ],
            ecoTitle: "Producto Fresco",
            ecoDescription: "Seleccionado para mantener su frescura y calidad.",
            maxQuantity: 120,
            unit: "Kilo",
            unitPlural: "Kilos"
        }
    },

    {
        code: "FR003",
        name: "Plátanos Cavendish",
        image: "/img/prod-thumb-2F.png",
        description: "Plátanos dulces y ricos en potasio, ideales como snack.",
        price: 800,
        priceLabel: "$800 CLP / kg",
        stars: "⭐⭐⭐⭐☆",
        category: "frutas",
        origin: "",
        certification: "",

        detail: {
            thumbnails: [
                "/img/prod-thumb-1F.png",
                "/img/prod-thumb-3F.png",
                "/img/prod-thumb-4F.png"
            ],
            priceDisplay: "$800 CLP",
            priceUnit: "por kilo",
            description: "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Son ricos en potasio y vitaminas, ideales para mantener una dieta equilibrada.",
            infoTitle: "INFORMACIÓN DEL PRODUCTO",
            infoRows: [
                { label: "Código", value: "FR003" },
                { label: "Prácticas Sostenibles", value: "Producción responsable", className: "text-green" }
            ],
            ecoTitle: "Producto Fresco",
            ecoDescription: "Seleccionado para mantener su frescura y calidad.",
            maxQuantity: 250,
            unit: "Kilo",
            unitPlural: "Kilos"
        }
    },

    {
        code: "PO003",
        name: "Quinua Orgánica",
        image: "/img/prod-thumb-1E.png",
        description: "Quinua seleccionada para una alimentación saludable.",
        price: 3500,
        priceLabel: "$3.500 CLP / bolsa de 500 g",
        stars: "⭐⭐⭐⭐☆",
        category: "organicos",
        origin: "",
        certification: "organica",

        detail: {
            thumbnails: [
                "/img/prod-thumb-2E.png",
                "/img/prod-thumb-3E.png",
                "/img/prod-thumb-4E.png"
            ],
            priceDisplay: "$3.500 CLP",
            priceUnit: "por bolsa de 500 g",
            description: "Quinua orgánica seleccionada por su calidad y valor nutricional. Ideal para acompañamientos, ensaladas y preparaciones saludables, ofreciendo una alternativa versátil para una alimentación equilibrada.",
            infoTitle: "INFORMACIÓN DEL PRODUCTO",
            infoRows: [
                { label: "Código", value: "PO003" },
                { label: "Presentación", value: "500 g" }
            ],
            ecoTitle: "Producto Orgánico",
            ecoDescription: "Seleccionado mediante prácticas responsables para mantener su calidad natural.",
            maxQuantity: 60,
            unit: "Bolsa",
            unitPlural: "Bolsas"
        }
    },

    {
        code: "VR001",
        name: "Zanahorias Orgánicas",
        image: "/img/prod-thumb-4D.png",
        description: "Zanahorias crujientes cultivadas sin pesticidas.",
        price: 900,
        priceLabel: "$900 CLP / kg",
        stars: "⭐⭐⭐⭐⭐",
        category: "verduras",
        origin: "ohiggins",
        certification: "sin-pesticidas",
        originLabel: "REGIÓN DE O'HIGGINS",

        detail: {
            thumbnails: [
                "/img/prod-thumb-2D.png",
                "/img/prod-thumb-3D.png",
                "/img/prod-thumb-1D.png"
            ],
            priceDisplay: "$900 CLP",
            priceUnit: "por kilo",
            description: "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins. Excelente fuente de vitamina A y fibra, ideales para ensaladas, jugos o como snack saludable.",
            infoTitle: "INFORMACIÓN DEL PRODUCTO",
            infoRows: [
                { label: "Código", value: "VR001" },
                { label: "Prácticas Sostenibles", value: "Sin pesticidas químicos", className: "text-green" }
            ],
            ecoTitle: "Producto Orgánico",
            ecoDescription: "Cultivadas sin pesticidas químicos para conservar su calidad natural.",
            maxQuantity: 100,
            unit: "Kilo",
            unitPlural: "Kilos"
        }
    }
];


/* es solo unos pocos... */

function Catalogue({ filtersVisible }) {

    const [searchParams] = useSearchParams();
    const [sortBy, setSortBy] = useState('popularidad');
    // Leer la categoría enviada desde el Header o Footer
    const categoryFromUrl = searchParams.get('categoria');
    const searchTerm = (searchParams.get('buscar') ?? '')
        .trim()
        .toLowerCase();

    // Estados de los filtros
    const [filters, setFilters] = useState(() => ({
        category: categoryFromUrl ? [categoryFromUrl] : [],
        origin: [],
        certification: []
    }));

    // Actualizar la categoría cuando cambie la URL
    useEffect(() => {

        const validCategories = [
            'frutas',
            'verduras',
            'organicos',
            'lacteos'
        ];

        const selectedCategory =
            validCategories.includes(categoryFromUrl)
                ? [categoryFromUrl]
                : [];

        setFilters(current => ({
            ...current,
            category: selectedCategory
        }));

    }, [categoryFromUrl]);

    // Gestionar cambios en los checkbox
    function handleFilterChange(event) {

        const { dataset, value, checked } = event.target;
        const filterType = dataset.filter;

        setFilters(current => ({
            ...current,

            [filterType]: checked
                ? [...current[filterType], value]
                : current[filterType].filter(item => item !== value)
        }));
    }

    // Filtrar productos
    const filteredProducts = useMemo(() => {

        return productos.filter(product => {

            const matchesCategory =
                filters.category.length === 0 ||
                filters.category.includes(product.category);

            const matchesOrigin =
                filters.origin.length === 0 ||
                filters.origin.includes(product.origin);

            const matchesCertification =
                filters.certification.length === 0 ||
                filters.certification.includes(product.certification);

            const matchesSearch =
                product.name.toLowerCase().includes(searchTerm);

            return (
                matchesCategory &&
                matchesOrigin &&
                matchesCertification &&
                matchesSearch
            );
        });

    }, [filters, searchTerm]);
    // Ordenar los productos filtrados
    const sortedProducts = useMemo(() => {

        const sorted = [...filteredProducts];

        if (sortBy === 'menorPrecio') {
            sorted.sort((a, b) => a.price - b.price);
        }

        if (sortBy === 'mayorPrecio') {
            sorted.sort((a, b) => b.price - a.price);
        }

        return sorted;

    }, [filteredProducts, sortBy]);

    return (
        <>
            <main className="container catalog-page">

                <div className={`catalog-layout ${filtersVisible ? '' : 'filters-hidden'}`}>

                    <aside className={`catalog-sidebar ${filtersVisible ? '' : 'hidden'}`}>

                        <h2 className="sidebar-title">
                            Filtros Avanzados
                        </h2>

                        {/* CATEGORÍA */}
                        <div className="filter-group">

                            <h3 className="filter-subtitle">CATEGORÍA</h3>

                            {[
                                { value: 'frutas', label: 'Frutas' },
                                { value: 'verduras', label: 'Verduras' },
                                { value: 'organicos', label: 'Orgánicos' },
                                { value: 'lacteos', label: 'Lácteos' }
                            ].map(option => (
                                <label className="custom-checkbox" key={option.value}>

                                    <input
                                        type="checkbox"
                                        data-filter="category"
                                        value={option.value}
                                        checked={filters.category.includes(option.value)}
                                        onChange={handleFilterChange}
                                    />

                                    <span className="checkmark"></span>
                                    {option.label}

                                </label>
                            ))}

                        </div>

                        {/* ORIGEN */}
                        <div className="filter-group">

                            <h3 className="filter-subtitle">ORIGEN</h3>

                            {[
                                { value: 'maule', label: 'Valle del Maule' },
                                { value: 'ohiggins', label: "Región de O'Higgins" },
                                { value: 'osorno', label: 'Osorno' },
                                { value: 'apicultores-locales', label: 'Apicultores locales' }
                            ].map(option => (
                                <label className="custom-checkbox" key={option.value}>

                                    <input
                                        type="checkbox"
                                        data-filter="origin"
                                        value={option.value}
                                        checked={filters.origin.includes(option.value)}
                                        onChange={handleFilterChange}
                                    />

                                    <span className="checkmark"></span>
                                    {option.label}

                                </label>
                            ))}

                        </div>

                        {/* CERTIFICACIÓN */}
                        <div className="filter-group">

                            <h3 className="filter-subtitle">CERTIFICACIÓN</h3>

                            {[
                                { value: 'organica', label: 'Certificación Orgánica' },
                                { value: 'sin-pesticidas', label: 'Sin Pesticidas' },
                                { value: 'produccion-local', label: 'Producción Local' }
                            ].map(option => (
                                <label className="custom-checkbox" key={option.value}>

                                    <input
                                        type="checkbox"
                                        data-filter="certification"
                                        value={option.value}
                                        checked={filters.certification.includes(option.value)}
                                        onChange={handleFilterChange}
                                    />

                                    <span className="checkmark"></span>
                                    {option.label}

                                </label>
                            ))}

                        </div>

                    </aside>

                    <section className="catalog-content">

                        <header className="catalog-topbar">

                            <div className="sort-container">

                                <span className="sort-label">
                                    Ordenar por:
                                </span>

                                <div className="sort-dropdown">

                                    <button className="sort-btn" aria-haspopup="true">
                                        {sortBy === 'popularidad' && 'Popularidad'}
                                        {sortBy === 'menorPrecio' && 'Menor precio'}
                                        {sortBy === 'mayorPrecio' && 'Mayor precio'}
                                    </button>

                                    <ul className="sort-menu">

                                        <li>
                                            <a
                                                href="#"
                                                className={sortBy === 'popularidad' ? 'active' : ''}
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    setSortBy('popularidad');
                                                }}
                                            >
                                                Popularidad
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                href="#"
                                                className={sortBy === 'menorPrecio' ? 'active' : ''}
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    setSortBy('menorPrecio');
                                                }}
                                            >
                                                Menor precio
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                href="#"
                                                className={sortBy === 'mayorPrecio' ? 'active' : ''}
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    setSortBy('mayorPrecio');
                                                }}
                                            >
                                                Mayor precio
                                            </a>
                                        </li>

                                    </ul>

                                </div>

                            </div>

                        </header>

                        {/* RESULTADOS DEL CATÁLOGO */}
                        <div className="catalog-grid">

                            {sortedProducts.length > 0 ? (

                                sortedProducts.map(product => (
                                    <ProductoCatalogo
                                        key={product.code}
                                        product={product}
                                    />
                                ))

                            ) : (

                                <p className="cart-empty">
                                    No se encontraron productos con los filtros seleccionados.
                                </p>

                            )}

                        </div>

                    </section>

                </div>

            </main>
        </>
    );
}


export default Catalogue