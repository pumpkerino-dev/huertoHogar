// Muestra u oculta mensajes dentro de un elemento <p class="form-message">

export function showMessage(element, text, isSuccess) {
  if (!element) return;
  element.textContent = text;
  element.classList.toggle("success", Boolean(isSuccess));
}

export function clearMessage(element) {
  if (!element) return;
  element.textContent = "";
  element.classList.remove("success");
}
