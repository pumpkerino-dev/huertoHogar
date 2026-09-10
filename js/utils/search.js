// Conecta la barra de búsqueda del header en páginas que no tienen su
// propio catálogo de productos (login, carrito, perfil, recuperar
// contraseña): al buscar, te lleva a product-catalog.html con el término
// como parámetro, igual que ya hacen los links de categoría (?categoria=).

export function wireHeaderSearch(inputSelector = ".search-bar input") {
  const input = document.querySelector(inputSelector);
  if (!input) return;

  const goSearch = () => {
    const term = input.value.trim();
    if (!term) return;
    window.location.href = "product-catalog.html?buscar=" + encodeURIComponent(term);
  };

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") goSearch();
  });

  const icon = input.closest(".search-bar")?.querySelector(".search-icon");
  if (icon) {
    icon.style.cursor = "pointer";
    icon.addEventListener("click", goSearch);
  }
}
