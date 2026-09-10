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

// BÚSQUEDA DESDE EL HEADER (?buscar=...)
const searchParams = new URLSearchParams(window.location.search);
const searchTerm = searchParams.get("buscar");

if (searchTerm) {

    const headerSearchInput = document.querySelector(".search-bar input");

    if (headerSearchInput) {
        headerSearchInput.value = searchTerm;
    }

    const normalizedTerm = searchTerm.trim().toLowerCase();

    document.querySelectorAll(".product-card").forEach((card) => {

        const nameEl = card.querySelector(".card-title");
        const name = nameEl ? nameEl.textContent.toLowerCase() : "";

        const matches = name.includes(normalizedTerm);

        card.style.display = matches ? "" : "none";
    });
}
// BÚSQUEDA AL PRESIONAR ENTER
const searchInput = document.querySelector(".search-bar input");

if (searchInput) {
    searchInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            const searchText = this.value.trim();

            if (searchText) {
                window.location.href =
                    `product-catalog.html?buscar=${encodeURIComponent(searchText)}`;
            }
        }
    });
}
// ==========================================================================
// AÑADIR AL CARRITO (product-catalog.html y fichas de producto)
// ==========================================================================
const CART_STORAGE_KEY = "huertohogar-cart";

function getStoredCart() {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

function saveStoredCart(items) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    updateHeaderCartBadge(items);
}

function updateHeaderCartBadge(items) {
    const badge = document.querySelector(".cart-total");
    if (!badge) return;
    const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    badge.textContent = "$" + Math.round(total).toLocaleString("es-CL");
}
updateHeaderCartBadge(getStoredCart());

function addToCart(item) {
    const cart = getStoredCart();
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
        existing.quantity += item.quantity;
    } else {
        cart.push(item);
    }
    saveStoredCart(cart);
}

// Feedback visual rápido en el botón (sin dependencias externas)
function showAddedFeedback(button) {
    const originalText = button.textContent;
    button.textContent = "✓ Añadido";
    button.disabled = true;
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 1000);
}

// Extrae la unidad del texto de precio, ej: "$1.200 CLP / kg" -> "kg"
function extractUnit(priceText) {
    const parts = priceText.split("/");
    return parts.length > 1 ? parts[1].trim() : "unidad";
}

// ---- Tarjetas del catálogo (product-catalog.html) ----
document.querySelectorAll(".product-card .btn-add-cart").forEach((button) => {
    button.addEventListener("click", () => {
        const card = button.closest(".product-card");
        const link = card.querySelector("a[href]");
        const id = link.getAttribute("href").replace(".html", "").toLowerCase();
        const name = card.querySelector(".card-title").textContent.trim();
        const image = card.querySelector(".card-img-wrapper img").getAttribute("src");
        const priceText = card.querySelector(".card-price").textContent;
        const unitPrice = Number(card.dataset.price);
        const unit = extractUnit(priceText);

        addToCart({ id, name, unit, unitPrice, image, quantity: 1 });
        showAddedFeedback(button);
    });
});

// ---- Botón "Añadir al Carrito" de cada página de producto ----
document.querySelectorAll(".btn-add-cart-large").forEach((button) => {
    button.addEventListener("click", () => {

        const productPage = document.querySelector(".product-page");

        const name = productPage
            .querySelector(".product-title")
            .textContent
            .trim();

        const image = productPage
            .querySelector(".main-image")
            .getAttribute("src");

        const priceText = productPage
            .querySelector(".price-amount")
            .textContent;

        const unitPrice = Number(
            priceText.replace(/\D/g, "")
        );

        const quantityElement = productPage.querySelector("#quantity");
        const quantity = Number(
            quantityElement.textContent.trim().split(" ")[0]
        );

        const unit = quantityElement.dataset.unit;

        const id = productPage
            .querySelector(".info-value.text-dark")
            .textContent
            .trim();

        addToCart({
            id,
            name,
            unit,
            unitPrice,
            image,
            quantity
        });

        showAddedFeedback(button);
    });
});