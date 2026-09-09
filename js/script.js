// Selector de cantidad del producto
const quantity = document.getElementById("quantity");
const decrease = document.getElementById("decrease");
const increase = document.getElementById("increase");

if (quantity && decrease && increase) {

    let currentQuantity = 1;
    const maxQuantity = Number(quantity.dataset.max);
    const unit = quantity.dataset.unit;

    // Aumentar cantidad
    increase.addEventListener("click", () => {
        if (currentQuantity < maxQuantity) {
            currentQuantity++;
            quantity.textContent = `${currentQuantity} ${unit}${currentQuantity > 1 ? "s" : ""}`;
        }
    });

    // Disminuir cantidad
    decrease.addEventListener("click", () => {
        if (currentQuantity > 1) {
            currentQuantity--;
            quantity.textContent = `${currentQuantity} ${unit}${currentQuantity > 1 ? "s" : ""}`;
        }
    });
}

// correo blog
const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = newsletterForm.querySelector(".newsletter-input").value.trim();
        const emailPattern = /^[^\s@]+@(gmail\.com|hotmail\.com|outlook\.com|duocuc\.cl)$/i;
        if (emailPattern.test(email)) {
            alert("Correo aceptado. ¡Te has suscrito al Boletín de Campo!");
        } else {
            alert("Correo no válido. Ingresa una dirección de correo válida.");
        }
    });
}

// FILTROS DEL CATÁLOGO
const filters = document.querySelectorAll("[data-filter]");
const products = document.querySelectorAll(".product-card");

function applyFilters() {
    const selected = {
        category: [],
        origin: [],
        certification: []
    };

    filters.forEach(filter => {
        if (filter.checked) {
            selected[filter.dataset.filter].push(filter.value);
        }
    });

    products.forEach(product => {
        const matchesCategory =
            selected.category.length === 0 ||
            selected.category.includes(product.dataset.category);

        const matchesOrigin =
            selected.origin.length === 0 ||
            selected.origin.includes(product.dataset.origin);

        const matchesCertification =
            selected.certification.length === 0 ||
            selected.certification.includes(product.dataset.certification);

        product.style.display =
            matchesCategory &&
            matchesOrigin &&
            matchesCertification
                ? ""
                : "none";
    });
}

filters.forEach(filter => {
    filter.addEventListener("change", applyFilters);
});

// ORDENAR PRODUCTOS
const catalogGrid = document.querySelector(".catalog-grid");
const sortOptions = document.querySelectorAll(".sort-menu a");

if (catalogGrid && sortOptions.length > 0) {

    const originalProducts = [...catalogGrid.querySelectorAll(".product-card")];

    sortOptions.forEach(option => {
        option.addEventListener("click", function (event) {
            event.preventDefault();

            const optionText = this.textContent.trim();
            let products = [...catalogGrid.querySelectorAll(".product-card")];

            if (optionText === "Menor precio") {
                products.sort((a, b) =>
                    Number(a.dataset.price) - Number(b.dataset.price)
                );
            }

            if (optionText === "Mayor precio") {
                products.sort((a, b) =>
                    Number(b.dataset.price) - Number(a.dataset.price)
                );
            }

            if (optionText === "Popularidad") {
                products = [...originalProducts];
            }

            products.forEach(product => {
                catalogGrid.appendChild(product);
            });

            sortOptions.forEach(item => item.classList.remove("active"));
            this.classList.add("active");

            document.querySelector(".sort-btn").textContent = optionText;
        });
    });
}

// FILTRO DESDE EL MENU DEL HEADER
const params = new URLSearchParams(window.location.search);
const categoryFromUrl = params.get("categoria");

if (categoryFromUrl) {
    const categoryFilter = document.querySelector(
        `[data-filter="category"][value="${categoryFromUrl}"]`
    );

    if (categoryFilter) {
        categoryFilter.checked = true;
        applyFilters();
    }
}

// BOTÓN DE FILTROS DEL HEADER
const filterToggle = document.getElementById("filter-toggle");
const catalogSidebar = document.querySelector(".catalog-sidebar");
const catalogLayout = document.querySelector(".catalog-layout");

if (filterToggle) {
    filterToggle.addEventListener("click", () => {

        if (catalogSidebar && catalogLayout) {
            catalogSidebar.classList.toggle("hidden");
            catalogLayout.classList.toggle("filters-hidden");
        } else {
            window.location.href = "product-catalog.html";
        }

    });
}