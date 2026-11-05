/*Css Especifico*/
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import '../css/pages/product-catalog.css';
import '../App.css';
import ProductoCatalogo from '../components/ProductoCatalogo';
import { useCategorias, useProductos } from '../hooks/useCatalogo';
import { coincideBusqueda, ordenarPorPrecio } from '../utils/busqueda';
import { nombreCortoCategoria } from '../utils/producto';

// Los productos vienen del backend (GET /api/v1/productos) a través del hook useProductos().

function Catalogue({ filtersVisible }) {

    const [searchParams] = useSearchParams();
    const [sortBy, setSortBy] = useState('popularidad');
    // Leer la categoría enviada desde el Header o Footer
    const categoryFromUrl = searchParams.get('categoria');
    const searchTerm = searchParams.get('buscar') ?? '';

    const { productos, cargando, error } = useProductos();
    const { categorias } = useCategorias();

    // Estados de los filtros
    const [filters, setFilters] = useState(() => ({
        category: categoryFromUrl ? [categoryFromUrl] : [],
        origin: [],
        certification: []
    }));

    // Actualizar la categoría cuando cambie la URL (?categoria=frutas desde el Header o Footer).
    // Se ajusta durante el render (patrón recomendado por React) en vez de en un useEffect.
    const [ultimaCategoriaUrl, setUltimaCategoriaUrl] = useState(categoryFromUrl);
    if (categoryFromUrl !== ultimaCategoriaUrl) {
        setUltimaCategoriaUrl(categoryFromUrl);
        const esValida = categorias.some(c => c.id === categoryFromUrl);
        setFilters(current => ({
            ...current,
            category: esValida ? [categoryFromUrl] : []
        }));
    }

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

            // Misma búsqueda que las sugerencias del Header (utils/busqueda.js)
            const matchesSearch = coincideBusqueda(product, searchTerm);

            return (
                matchesCategory &&
                matchesOrigin &&
                matchesCertification &&
                matchesSearch
            );
        });

    }, [productos, filters, searchTerm]);
    // Ordenar los productos filtrados
    const sortedProducts = useMemo(() => {
        // Menor/mayor precio; si hay empate de precio, se ordena por nombre
        return ordenarPorPrecio(filteredProducts, sortBy);
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

                            {categorias.map(c => ({ value: c.id, label: nombreCortoCategoria(c.nombre) })).map(option => (
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

                            {cargando ? (
                                <p className="cart-empty" role="status">Cargando productos...</p>
                            ) : error ? (
                                <p className="cart-empty" role="alert">{error}</p>
                            ) : sortedProducts.length > 0 ? (

                                sortedProducts.map(product => (
                                    <ProductoCatalogo
                                        key={product.code}
                                        product={product}
                                    />
                                ))

                            ) : (

                                <p className="cart-empty" role="status">
                                    {searchTerm.trim()
                                        ? `No se encontraron productos para "${searchTerm.trim()}" con los filtros seleccionados.`
                                        : 'No se encontraron productos con los filtros seleccionados.'}
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